// pages/api/teacher/[id].js
import { getConnection } from "../../../utils/db";

export default async function handler(req, res) {
  const db = await getConnection();
  const { id } = req.query;

  if (!id) {
    res.status(400).json({ error: "Geçersiz öğretmen ID" });
    return;
  }

  try {
    // Öğretmen bilgisi
    const [teacherRows] = await db.execute(`
      SELECT t.id, u.name, u.surname, u.photo, t.expertise, t.bio
      FROM teachers t
      JOIN users u ON t.user_id = u.id
      WHERE t.id = ?
    `, [id]);

    if (teacherRows.length === 0) {
      res.status(404).json({ error: "Öğretmen bulunamadı" });
      return;
    }

    // Takvim
    const [calendarRows] = await db.execute(`
      SELECT date, time
      FROM calendar
      WHERE teacher_id = ?
    `, [id]);

    // Yorumlar
    const [reviewRows] = await db.execute(`
      SELECT s.name AS student_name, r.comment, r.rating
      FROM reviews r
      JOIN students s ON r.student_id = s.id
      WHERE r.teacher_id = ?
    `, [id]);

    res.status(200).json({
      teacher: teacherRows[0],
      calendar: calendarRows,
      reviews: reviewRows,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  } finally {
    db.release();
  }
}
