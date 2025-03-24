import { getConnection } from "../../utils/db";
import bcrypt from "bcryptjs";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { token, password } = req.body;

  try {
    const db = await getConnection();

    // Token kontrolü
    const [rows] = await db.query(
      "SELECT * FROM password_reset_tokens WHERE token = ? LIMIT 1",
      [token]
    );

    if (!rows.length || new Date(rows[0].expires_at) < new Date()) {
      return res
        .status(400)
        .json({ error: "Geçersiz ya da süresi dolmuş token" });
    }

    const userId = rows[0].user_id;

    // Şifre güncelleme
    const hashed = await bcrypt.hash(password, 10);
    await db.query("UPDATE users SET password = ? WHERE id = ?", [
      hashed,
      userId,
    ]);

    // Token silme
    await db.query("DELETE FROM password_reset_tokens WHERE token = ?", [
      token,
    ]);

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("Şifre sıfırlama hatası:", err);
    return res.status(500).json({ error: "Sunucu hatası" });
  }
}
