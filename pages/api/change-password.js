import { getConnection } from "../../utils/db";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method Not Allowed" });

  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Token missing" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { currentPassword, newPassword } = req.body;
    const db = await getConnection();

    const [rows] = await db.execute("SELECT password FROM users WHERE id = ?", [decoded.userId]);
    const user = rows[0];
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) return res.status(403).json({ error: "Current password is incorrect" });

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await db.execute("UPDATE users SET password = ? WHERE id = ?", [hashedPassword, decoded.userId]);

    res.status(200).json({ message: "Password updated" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}
