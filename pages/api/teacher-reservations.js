import { getConnection } from "../../utils/db";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { teacher_id } = req.query;

  if (!teacher_id) {
    return res.status(400).json({ error: "Öğretmen ID eksik!" });
  }

  let db;
  try {
    db = await getConnection();

    const [reservations] = await db.execute(
      `SELECT r.id, r.date, r.time, r.status, 
              u.name AS student_name, u.surname AS student_surname
       FROM reservations r
       JOIN users u ON r.student_id = u.id
       WHERE r.teacher_id = ? ORDER BY r.date ASC`,
      [teacher_id]
    );

    res.status(200).json({ reservations });
  } catch (error) {
    console.error("❌ API Hatası:", error);
    res.status(500).json({ error: "Rezervasyonları çekerken hata oluştu." });
  } finally {
    if (db) db.release();
  }
}
