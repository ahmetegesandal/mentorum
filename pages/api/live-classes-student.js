import { getConnection } from "../../utils/db";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { teacher_id, student_id } = req.query;

  if (!teacher_id && !student_id) {
    return res
      .status(400)
      .json({ error: "Öğretmen ID veya Öğrenci ID eksik!" });
  }

  let db;
  try {
    db = await getConnection();

    let query = `SELECT lc.id, lc.date, lc.time, lc.status, lc.meeting_link, 
                        l.title AS lesson_title, 
                        t.name AS teacher_name, t.surname AS teacher_surname, 
                        s.name AS student_name, s.surname AS student_surname
                 FROM live_classes lc
                 JOIN lessons l ON lc.lesson_id = l.id
                 JOIN users t ON lc.teacher_id = t.id
                 JOIN users s ON lc.student_id = s.id`;
    let params = [];

    if (teacher_id) {
      query += " WHERE lc.teacher_id = ?";
      params.push(teacher_id);
    } else if (student_id) {
      query += " WHERE lc.student_id = ?";
      params.push(student_id);
    }

    query += " ORDER BY lc.date ASC";

    const [liveClasses] = await db.execute(query, params);

    res.status(200).json({ liveClasses });
  } catch (error) {
    console.error("❌ API Hatası:", error);
    res.status(500).json({ error: "Canlı dersleri çekerken hata oluştu." });
  } finally {
    if (db) db.release();
  }
}
