import { getConnection } from "../../utils/db";
import jwt from "jsonwebtoken";
import sendMailWithTemplate from "../../lib/sendMailWithTemplate";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Yalnızca POST desteklenir." });
  }

  const { token } = req.body;

  if (!token) {
    return res.status(400).json({ message: "Token zorunludur." });
  }

  let connection;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded?.userId;

    if (!userId) {
      return res.status(401).json({ message: "Token geçersiz." });
    }

    connection = await getConnection();
    const [rows] = await connection.execute(
      "SELECT * FROM users WHERE id = ?",
      [userId]
    );

    if (!rows.length) {
      return res.status(404).json({ message: "Kullanıcı bulunamadı." });
    }

    const user = rows[0];

    if (!user.two_factor_enabled) {
      return res.status(400).json({ message: "2FA aktif değil." });
    }

    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 dakika

    await connection.execute(
      `UPDATE users SET two_factor_code = ?, two_factor_expires_at = ? WHERE id = ?`,
      [code, expiresAt, user.id]
    );

    await sendMailWithTemplate({
      to: user.email,
      subject: "Mentorum - Yeni Doğrulama Kodu",
      templateName: "two-factor-code",
      variables: { code },
    });

    return res.status(200).json({ message: "Kod tekrar gönderildi." });
  } catch (err) {
    console.error("Resend 2FA error:", err);
    return res.status(500).json({ message: "Sunucu hatası." });
  } finally {
    if (connection) connection.release();
  }
}
