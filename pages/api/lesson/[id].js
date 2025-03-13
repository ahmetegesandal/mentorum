import { getConnection } from "../../../utils/db";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { id } = req.query;
  let db;

  try {
    db = await getConnection();

    const query = `
      SELECT 
        lessons.*, 
        users.id AS teacher_user_id, 
        users.username AS teacher_username, 
        users.name AS teacher_name, 
        users.surname AS teacher_surname, 
        users.role AS teacher_role,
        users.email AS teacher_email, 
        users.photo AS teacher_photo,
        categories.id AS category_id, 
        categories.name AS category_name
      FROM lessons
      JOIN teachers ON lessons.teacher_id = teachers.user_id
      JOIN users ON teachers.user_id = users.id
      JOIN categories ON lessons.category_id = categories.id
      WHERE lessons.id = ?;
    `;

    const [lesson] = await db.execute(query, [id]);

    if (lesson.length === 0) {
      return res.status(404).json({ error: "Ders bulunamadı" });
    }

    res.status(200).json(lesson[0]);
  } catch (error) {
    console.error("❌ [HATA] Ders getirme hatası:", error);
    res
      .status(500)
      .json({ error: "Ders getirilirken hata oluştu: " + error.message });
  } finally {
    if (db) db.release();
  }
}
