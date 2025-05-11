import { getConnection } from "../../../utils/db";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { slug } = req.query;
  let db;

  try {
    db = await getConnection();
    const [rows] = await db.execute(`
      SELECT id, title, slug, content, image, created_at
      FROM blogs
      WHERE slug = ?
      LIMIT 1
    `, [slug]);

    if (rows.length === 0) {
      return res.status(404).json({ error: "Blog bulunamadı" });
    }

    res.status(200).json(rows[0]);
  } catch (error) {
    console.error("Blog detay çekilirken hata:", error);
    res.status(500).json({ error: error.message });
  } finally {
    if (db) db.release();
  }
}
