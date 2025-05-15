import { getConnection } from "../../utils/db";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method Not Allowed" });

  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Token missing" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { enable } = req.body;

    const db = await getConnection();
    await db.execute("UPDATE users SET two_factor_enabled = ? WHERE id = ?", [enable ? 1 : 0, decoded.userId]);

    res.status(200).json({ message: "Two-factor auth updated", enabled: enable });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}
