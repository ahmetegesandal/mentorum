// pages/api/noti.js
import { getConnection } from "../../utils/db";

export default async function handler(req, res) {
  if (req.method !== "GET") return res.status(405).end();

  const { userId, page = 1, limit = 10 } = req.query;
  if (!userId) return res.status(400).json({ error: "userId is required" });

  const offset = (parseInt(page) - 1) * parseInt(limit);
  let db;

  try {
    db = await getConnection();

    const [countRows] = await db.execute(
      "SELECT COUNT(*) AS count FROM notifications WHERE user_id = ?",
      [userId]
    );
    const totalCount = countRows[0].count;

    const [rows] = await db.execute(
      `SELECT id, user_id, message, is_read, created_at, updated_at,
              COALESCE(title, 'Notification') AS title
       FROM notifications
       WHERE user_id = ?
       ORDER BY created_at DESC
       LIMIT ?, ?`,
      [userId, offset, parseInt(limit)]
    );

    res.status(200).json({ notifications: rows, totalCount });
  } catch (error) {
    console.error("Notification fetch error", error);
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    if (db) db.release();
  }
}
