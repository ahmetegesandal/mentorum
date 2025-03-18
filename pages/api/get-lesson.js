import { getConnection } from "../../utils/db";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { id } = req.query;
  if (!id) return res.status(400).json({ error: "Lesson ID is required" });

  let db;
  try {
    db = await getConnection();

    // **Dersi getir ve öğretmen bilgilerini dahil et**
    const query = `
      SELECT 
        lessons.id, 
        lessons.title, 
        lessons.description, 
        lessons.price, 
        lessons.category_id, 
        lessons.lesson_photo,
        lessons.grade,
        categories.name AS category_name,
        users.id AS teacher_id,
        users.name AS teacher_name,
        users.surname AS teacher_surname,
        users.email AS teacher_email,
        users.photo AS teacher_photo
      FROM lessons
      JOIN categories ON lessons.category_id = categories.id
      JOIN teachers ON lessons.teacher_id = teachers.user_id
      JOIN users ON teachers.user_id = users.id
      WHERE lessons.id = ?;
    `;

    const [lesson] = await db.execute(query, [id]);

    if (lesson.length === 0) {
      return res.status(404).json({ error: "Ders bulunamadı." });
    }

    res.status(200).json(lesson[0]);
  } catch (error) {
    console.error("Ders getirme hatası:", error);
    res.status(500).json({ error: "Ders bilgisi alınamadı." });
  } finally {
    if (db) db.release();
  }
}
