import { getConnection } from "../../utils/db";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { lesson_id } = req.query;

  if (!lesson_id) {
    return res.status(400).json({ error: "Ders ID eksik." });
  }

  let db;
  try {
    db = await getConnection();

    console.log(`🔍 [DEBUG] lesson_id: ${lesson_id}`);

    const query = `
      SELECT 
        reviews.id, reviews.student_id, reviews.rating, reviews.comment, reviews.created_at,
        users.id AS user_id, users.username AS user_username, users.name AS user_name, users.surname AS user_surname, users.photo AS user_photo, 
        CASE 
          WHEN students.user_id IS NOT NULL THEN 'student' 
          WHEN parents.parent_id IS NOT NULL THEN 'parent' 
          ELSE 'unknown' 
        END AS role
      FROM reviews
      LEFT JOIN students ON reviews.student_id = students.user_id
      LEFT JOIN parents ON reviews.student_id = parents.parent_id
      JOIN users ON reviews.student_id = users.id
      WHERE reviews.lesson_id = ?
      ORDER BY reviews.created_at DESC`;

    const [reviews] = await db.execute(query, [lesson_id]);

    console.log(`✅ [DEBUG] Toplam yorum sayısı: ${reviews.length}`);

    res.status(200).json(reviews);
  } catch (error) {
    console.error("❌ [HATA] Yorumları getirirken hata oluştu:", error);
    res.status(500).json({ error: "Yorumları çekerken hata oluştu." });
  } finally {
    if (db) db.release();
  }
}
