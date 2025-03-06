import { getConnection } from "../../utils/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

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
    // Kullanıcıyı veritabanında bul
    const [rows] = await connection.execute(
      "SELECT * FROM users WHERE username = ?",
      [username]
    );

    if (rows.length === 0) {
      return res.status(401).json({ message: "Kullanıcı bulunamadı." });
    }

    const user = rows[0];

    // Şifreyi doğrula
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Geçersiz şifre." });
    }

    // Kullanıcıyı online yap
    await connection.execute("UPDATE users SET is_online = 1 WHERE id = ?", [
      user.id,
    ]);

    // JWT Token oluştur
    const token = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res
      .status(200)
      .json({ message: "Giriş başarılı!", token, userId: user.id });
  } catch (error) {
    console.error("Veritabanı hatası:", error);
    res.status(500).json({ message: "Bir hata oluştu." });
  } finally {
    await connection.release();
  }
}
