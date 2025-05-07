// pages/api/noti/read.js
import { getConnection } from "../../../utils/db";

export default async function handler(req, res) {
  if (req.method !== "PATCH") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { id } = req.query;
  if (!id) {
    return res.status(400).json({ error: "Notification ID is required" });
  }

  let db;
  try {
    db = await getConnection();

    const [result] = await db.execute(
      "UPDATE notifications SET is_read = 1 WHERE id = ?",
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Notification not found" });
    }

    res.status(200).json({ message: "Notification marked as read" });
  } catch (err) {
    console.error("🔴 Failed to update notification:", err);
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    if (db) db.release();
  }
}
