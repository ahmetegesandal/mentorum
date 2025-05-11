import { getConnection } from "../../../utils/db";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  let db;

  try {
    db = await getConnection();
    const [rows] = await db.execute(`
      SELECT id, title, slug, description, image, created_at
      FROM blogs
      ORDER BY created_at DESC
    `);
    res.status(200).json(rows);
  } catch (error) {
    console.error("Blog listesi çekilirken hata:", error);
    res.status(500).json({ error: error.message });
  } finally {
    if (db) db.release();
  }
}
