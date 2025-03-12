import { getConnection } from "../../utils/db";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { student_id, lesson_id, teacher_id, date, time } = req.body;

  // 🔥 Gelen veriyi kontrol et
  console.log("📌 API'ye Gelen Veri:", {
    student_id,
    lesson_id,
    teacher_id,
    date,
    time,
  });

  // 📌 Eksik parametre kontrolü
  if (!student_id || !lesson_id || !teacher_id || !date || !time) {
    return res
      .status(400)
      .json({ error: "Eksik parametreler! Tüm alanları doldurun." });
  }

  // 📌 Tarih formatı kontrolü (YYYY-MM-DD olmalı)
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(date)) {
    return res
      .status(400)
      .json({ error: "Geçersiz tarih formatı! YYYY-MM-DD olmalı." });
  }

  // 📌 Seçilen tarihi UTC formatına dönüştür
  const formattedDate = new Date(date);
  const utcDate = new Date(
    Date.UTC(
      formattedDate.getFullYear(),
      formattedDate.getMonth(),
      formattedDate.getDate(),
      0,
      0,
      0
    )
  )
    .toISOString()
    .split("T")[0]; // UTC formatında tarih

  let db;
  try {
    db = await getConnection();

    // 📌 Aynı saatte rezervasyon var mı?
    const [existing] = await db.execute(
      "SELECT id FROM reservations WHERE teacher_id = ? AND date = ? AND time = ?",
      [teacher_id, utcDate, time]
    );

    if (existing.length > 0) {
      return res
        .status(400)
        .json({ error: "Bu saat için zaten rezervasyon var!" });
    }

    // 📌 Yeni rezervasyonu ekle
    await db.execute(
      "INSERT INTO reservations (student_id, lesson_id, teacher_id, date, time, status, created_at) VALUES (?, ?, ?, ?, ?, 'pending', NOW())",
      [student_id, lesson_id, teacher_id, utcDate, time]
    );

    res
      .status(200)
      .json({ success: true, message: "Rezervasyon başarıyla eklendi." });
  } catch (error) {
    console.error("❌ Rezervasyon ekleme hatası:", error);
    res.status(500).json({ error: "Rezervasyon eklenirken hata oluştu." });
  } finally {
    if (db) db.release();
  }
}
