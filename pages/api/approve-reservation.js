import { getConnection } from "../../utils/db";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { reservation_id, teacher_id } = req.body;

  let db;
  try {
    db = await getConnection();

    // 📌 Rezervasyonu kontrol et (Öğretmene ait olup olmadığını doğrula)
    const [reservation] = await db.execute(
      `SELECT student_id, lesson_id, date, time, status 
       FROM reservations 
       WHERE id = ? AND teacher_id = ?`,
      [reservation_id, teacher_id]
    );

    if (!reservation.length) {
      return res
        .status(404)
        .json({ error: "Rezervasyon bulunamadı veya öğretmene ait değil." });
    }

    const { student_id, lesson_id, date, time, status } = reservation[0];

    // ❌ Eğer rezervasyon zaten iptal edildiyse işlem yapma
    if (status === "cancelled") {
      return res
        .status(400)
        .json({ error: "Bu rezervasyon zaten iptal edilmiş." });
    }

    // ✅ Eğer zaten onaylıysa tekrar onaylama
    if (status === "confirmed") {
      return res.status(400).json({ error: "Rezervasyon zaten onaylanmış." });
    }

    // 📌 Dersin fiyatını al
    const [lesson] = await db.execute(
      "SELECT price FROM lessons WHERE id = ?",
      [lesson_id]
    );

    if (!lesson.length) {
      return res.status(404).json({ error: "Ders bulunamadı!" });
    }

    const lessonPrice = lesson[0].price; // 📌 Ders ücreti

    // 📌 Öğrencinin mevcut kredisi var mı?
    const [student] = await db.execute(
      "SELECT credit FROM users WHERE id = ?",
      [student_id]
    );

    if (!student.length) {
      return res.status(404).json({ error: "Öğrenci bulunamadı!" });
    }

    if (student[0].credit < lessonPrice) {
      return res.status(400).json({
        error: `Öğrencinin yeterli kredisi yok! (Gerekli: ${lessonPrice}, Mevcut: ${student[0].credit})`,
      });
    }

    // 📌 Öğrencinin kredisi düşürülüyor
    await db.execute("UPDATE users SET credit = credit - ? WHERE id = ?", [
      lessonPrice,
      student_id,
    ]);

    // ✅ Rezervasyonu onayla (`confirmed` olarak güncelle)
    await db.execute(
      "UPDATE reservations SET status = 'confirmed' WHERE id = ?",
      [reservation_id]
    );

    // 📌 `live_classes` tablosuna ekleme yap!
    await db.execute(
      `INSERT INTO live_classes (lesson_id, teacher_id, student_id, start_time, status, reservation_id) 
       VALUES (?, ?, ?, ?, 'scheduled', ?);`,
      [lesson_id, teacher_id, student_id, `${date} ${time}`, reservation_id]
    );

    res.status(200).json({
      success: true,
      message: `Rezervasyon onaylandı ve canlı ders oluşturuldu! (Kesilen Kredi: ${lessonPrice})`,
    });
  } catch (error) {
    console.error("❌ Onay hatası:", error);
    res.status(500).json({ error: "Rezervasyon onaylanırken hata oluştu." });
  } finally {
    if (db) db.release();
  }
}
