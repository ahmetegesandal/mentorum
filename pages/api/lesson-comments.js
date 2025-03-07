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

    const [reviews] = await db.execute(
      `SELECT reviews.id, reviews.student_id, reviews.rating, reviews.comment, reviews.created_at, 
              users.name AS student_name, users.surname AS student_surname, users.photo AS student_photo 
       FROM reviews
       JOIN students ON reviews.student_id = students.user_id
       JOIN users ON students.user_id = users.id
       WHERE reviews.lesson_id = ?
       ORDER BY reviews.created_at DESC`,
      [lesson_id]
    );

    res.status(200).json(reviews);
  } catch (error) {
    console.error("Yorumları getirirken hata oluştu:", error);
    res.status(500).json({ error: "Yorumları çekerken hata oluştu." });
  } finally {
    if (db) db.release();
  }
}
