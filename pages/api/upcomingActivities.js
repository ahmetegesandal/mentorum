// /pages/api/upcomingActivities.js
import { getConnection } from "../../utils/db";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Sadece GET metodu desteklenir." });
  }

  const { userId, role } = req.query;

  if (!userId || !role) {
    return res.status(400).json({ message: "Kullanıcı ID ve rol gerekli." });
  }

  let connection;

  try {
    connection = await getConnection();

    const today = new Date().toISOString().split("T")[0];
    let results = [];

    if (role === "teacher") {
      const [reservations] = await connection.execute(
        `SELECT r.date, r.time, l.title, 'Rezervasyon' AS type
         FROM reservations r
         JOIN lessons l ON l.id = r.lesson_id
         WHERE r.teacher_id = ? AND r.date >= ?
         ORDER BY r.date ASC, r.time ASC
         LIMIT 5`,
        [userId, today]
      );

      const [live] = await connection.execute(
        `SELECT lc.date, lc.time, l.title, 'Canlı Ders' AS type
         FROM live_classes lc
         JOIN lessons l ON l.id = lc.lesson_id
         WHERE lc.teacher_id = ? AND lc.date >= ?
         ORDER BY lc.date ASC, lc.time ASC
         LIMIT 5`,
        [userId, today]
      );

      results = [...reservations, ...live]
        .sort(
          (a, b) =>
            new Date(`${a.date}T${a.time}`) - new Date(`${b.date}T${b.time}`)
        )
        .slice(0, 5);
    } else if (role === "student") {
      const [reservations] = await connection.execute(
        `SELECT r.date, r.time, l.title, 'Rezervasyon' AS type
         FROM reservations r
         JOIN lessons l ON l.id = r.lesson_id
         WHERE r.student_id = ? AND r.date >= ?
         ORDER BY r.date ASC, r.time ASC
         LIMIT 5`,
        [userId, today]
      );

      const [live] = await connection.execute(
        `SELECT lc.date, lc.time, l.title, 'Canlı Ders' AS type
         FROM live_classes lc
         JOIN lessons l ON l.id = lc.lesson_id
         WHERE lc.student_id = ? AND lc.date >= ?
         ORDER BY lc.date ASC, lc.time ASC
         LIMIT 5`,
        [userId, today]
      );

      results = [...reservations, ...live]
        .sort(
          (a, b) =>
            new Date(`${a.date}T${a.time}`) - new Date(`${b.date}T${b.time}`)
        )
        .slice(0, 5);
    } else if (role === "parent") {
      // önce parent'ın çocuklarını al
      const [children] = await connection.execute(
        `SELECT student_id FROM student_parents WHERE parent_id = ?`,
        [userId]
      );

      const childIds = children.map((c) => c.student_id);

      if (childIds.length === 0) {
        return res.status(200).json({ items: [] });
      }

      const placeholders = childIds.map(() => "?").join(",");

      const [reservations] = await connection.execute(
        `SELECT r.date, r.time, l.title, 'Rezervasyon' AS type
         FROM reservations r
         JOIN lessons l ON l.id = r.lesson_id
         WHERE r.student_id IN (${placeholders}) AND r.date >= ?
         ORDER BY r.date ASC, r.time ASC
         LIMIT 5`,
        [...childIds, today]
      );

      const [live] = await connection.execute(
        `SELECT lc.date, lc.time, l.title, 'Canlı Ders' AS type
         FROM live_classes lc
         JOIN lessons l ON l.id = lc.lesson_id
         WHERE lc.student_id IN (${placeholders}) AND lc.date >= ?
         ORDER BY lc.date ASC, lc.time ASC
         LIMIT 5`,
        [...childIds, today]
      );

      results = [...reservations, ...live]
        .sort(
          (a, b) =>
            new Date(`${a.date}T${a.time}`) - new Date(`${b.date}T${b.time}`)
        )
        .slice(0, 5);
    }

    res.status(200).json({ items: results });
  } catch (error) {
    console.error("Etkinlik verisi alınamadı:", error);
    res.status(500).json({ message: "Sunucu hatası." });
  } finally {
    if (connection) connection.release();
  }
}
