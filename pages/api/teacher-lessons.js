import { getConnection } from "../../utils/db";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { teacherId } = req.query;

  if (!teacherId) {
    return res.status(400).json({ error: "Öğretmen ID gerekli." });
  }

  let db;
  try {
    db = await getConnection();
    const query = `
      SELECT 
        lessons.id, 
        lessons.title, 
        lessons.category_id, 
        categories.name AS category_name, 
        lessons.price, 
        lessons.lesson_photo
      FROM lessons
      JOIN categories ON lessons.category_id = categories.id
      WHERE lessons.teacher_id = ?;
    `;
    const [lessons] = await db.execute(query, [teacherId]);
    res.status(200).json(lessons);
  } catch (error) {
    console.error("Dersleri çekerken hata:", error);
    res.status(500).json({ error: "Dersler getirilemedi." });
  } finally {
    if (db) db.release();
  }
}
