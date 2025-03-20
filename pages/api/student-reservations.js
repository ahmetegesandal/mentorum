import { getConnection } from "../../utils/db";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { student_id } = req.query;

  if (!student_id) {
    return res.status(400).json({ error: "Öğrenci ID eksik!" });
  }

  let db;
  try {
    db = await getConnection();

    const [reservations] = await db.execute(
      `SELECT r.id, r.date, r.time, r.status, 
              u.name AS teacher_name, u.surname AS teacher_surname, 
              l.title AS lesson_title  
       FROM reservations r
       JOIN users u ON r.teacher_id = u.id
       JOIN lessons l ON r.lesson_id = l.id  
       WHERE r.student_id = ? 
       ORDER BY r.date ASC`,
      [student_id]
    );

    res.status(200).json({ reservations });
  } catch (error) {
    console.error("❌ API Hatası:", error);
    res.status(500).json({ error: "Rezervasyonları çekerken hata oluştu." });
  } finally {
    if (db) db.release();
  }
}
