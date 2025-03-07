import { getConnection } from "../../utils/db";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { student_id, lesson_id, rating, comment } = req.body;

  if (!student_id || !lesson_id || !rating || !comment) {
    return res.status(400).json({ error: "Tüm alanlar zorunludur" });
  }

  let db;
  try {
    db = await getConnection();

    await db.execute(
      "INSERT INTO reviews (student_id, lesson_id, rating, comment, created_at) VALUES (?, ?, ?, ?, NOW())",
      [student_id, lesson_id, rating, comment]
    );

    res.status(201).json({ message: "Yorum başarıyla eklendi." });
  } catch (error) {
    console.error("Yorum eklenirken hata oluştu:", error);
    res.status(500).json({ error: "Yorum eklenirken hata oluştu." });
  } finally {
    if (db) db.release();
  }
}
