import { getConnection } from "../../utils/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import sendMailWithTemplate from "../../lib/sendMailWithTemplate";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Eksik alanlar mevcut." });
  }

  const connection = await getConnection();

  try {
    const [rows] = await connection.execute(
      "SELECT * FROM users WHERE username = ?",
      [username]
    );

    if (rows.length === 0) {
      return res.status(401).json({ message: "Kullanıcı bulunamadı." });
    }

    const user = rows[0];

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Geçersiz şifre." });
    }

    await connection.execute("UPDATE users SET is_online = 1 WHERE id = ?", [
      user.id,
    ]);

    // 🔁 if (user.two_factor_enabled)
    if (user.two_factor_enabled) {
      const code = Math.floor(100000 + Math.random() * 900000).toString();
      const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 dk

      await connection.execute(
        `UPDATE users SET two_factor_code = ?, two_factor_expires_at = ? WHERE id = ?`,
        [code, expiresAt, user.id]
      );

      await sendMailWithTemplate({
        to: user.email,
        subject: "Mentorum - Giriş Doğrulama Kodu",
        templateName: "two-factor-code",
        variables: {
          code: code,
        },
      });

      const tempToken = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
        expiresIn: "5m",
      });

      return res.status(200).json({
        twoFactorRequired: true,
        message: "2FA doğrulama kodu gönderildi.",
        tempToken,
      });
    }

    const token = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      message: "Giriş başarılı!",
      token,
      userId: user.id,
      twoFactorRequired: false,
    });
  } catch (err) {
    console.error("Login Hatası:", err);
    res.status(500).json({ message: "Sunucu hatası" });
  } finally {
    await connection.release();
  }
}
