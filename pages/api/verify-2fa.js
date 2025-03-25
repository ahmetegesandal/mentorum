import { getConnection } from "../../utils/db";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Yalnızca POST desteklenir." });
  }

  const { token, code } = req.body;
  if (!token || !code) {
    return res.status(400).json({ message: "Token ve kod zorunludur." });
  }

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return res
      .status(401)
      .json({ message: "Token geçersiz veya süresi dolmuş." });
  }

  const userId = decoded.userId;
  let connection;

  try {
    connection = await getConnection();

    const [users] = await connection.execute(
      `SELECT * FROM users WHERE id = ? LIMIT 1`,
      [userId]
    );

    const user = users[0];

    if (!user || !user.two_factor_enabled) {
      return res.status(400).json({ message: "2FA aktif değil." });
    }

    if (user.two_factor_code !== code) {
      return res.status(401).json({ message: "Kod hatalı." });
    }

    if (new Date() > new Date(user.two_factor_expires_at)) {
      return res.status(401).json({ message: "Kod süresi dolmuş." });
    }

    const finalToken = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    await connection.execute(
      `UPDATE users SET two_factor_code = NULL, two_factor_expires_at = NULL WHERE id = ?`,
      [user.id]
    );

    return res.status(200).json({ token: finalToken });
  } catch (err) {
    console.error("2FA doğrulama hatası:", err);
    return res.status(500).json({ message: "Sunucu hatası" });
  } finally {
    if (connection) connection.release();
  }
}
