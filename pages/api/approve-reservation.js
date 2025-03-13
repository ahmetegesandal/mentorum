import { getConnection } from "../../utils/db";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { reservation_id, teacher_id } = req.body;
  let db;

  try {
    db = await getConnection();
    console.log("🔍 Checking reservation...");

    // 📌 Step 1: Check if reservation exists and belongs to teacher
    const [reservation] = await db.execute(
      `SELECT student_id, lesson_id, date, time, status 
       FROM reservations 
       WHERE id = ? AND teacher_id = ?`,
      [reservation_id, teacher_id]
    );

    console.log("📌 Reservation data:", reservation);

    if (!reservation.length) {
      return res
        .status(404)
        .json({ error: "Rezervasyon bulunamadı veya öğretmene ait değil." });
    }

    const { student_id, lesson_id, date, time, status } = reservation[0];

    console.log("✅ Extracted reservation details:", {
      student_id,
      lesson_id,
      date,
      time,
      status,
    });

    // ❌ If already cancelled, return error
    if (status === "cancelled") {
      return res
        .status(400)
        .json({ error: "Bu rezervasyon zaten iptal edilmiş." });
    }

    // ✅ If already confirmed, return error
    if (status === "confirmed") {
      return res.status(400).json({ error: "Rezervasyon zaten onaylanmış." });
    }

    // 📌 Step 2: Get lesson price
    const [lesson] = await db.execute(
      "SELECT price FROM lessons WHERE id = ?",
      [lesson_id]
    );
    console.log("📌 Lesson data:", lesson);

    if (!lesson.length) {
      return res.status(404).json({ error: "Ders bulunamadı!" });
    }

    const lessonPrice = lesson[0].price;
    console.log("✅ Lesson price:", lessonPrice);

    // 📌 Step 3: Check student's available credit
    const [student] = await db.execute(
      "SELECT credit FROM users WHERE id = ?",
      [student_id]
    );
    console.log("📌 Student credit data:", student);

    if (!student.length) {
      return res.status(404).json({ error: "Öğrenci bulunamadı!" });
    }

    if (student[0].credit < lessonPrice) {
      return res.status(400).json({
        error: `Öğrencinin yeterli kredisi yok! (Gerekli: ${lessonPrice}, Mevcut: ${student[0].credit})`,
      });
    }

    // 📌 Step 4: Deduct student's credit
    await db.execute("UPDATE users SET credit = credit - ? WHERE id = ?", [
      lessonPrice,
      student_id,
    ]);
    console.log("✅ Student credit updated.");

    // ✅ Step 5: Confirm the reservation
    await db.execute(
      "UPDATE reservations SET status = 'confirmed' WHERE id = ?",
      [reservation_id]
    );
    console.log("✅ Reservation confirmed.");

    // 📌 Step 6: Insert into `live_classes`
    await db.execute(
      `INSERT INTO live_classes (lesson_id, teacher_id, student_id, date, time, status, reservation_id) 
       VALUES (?, ?, ?, ?, ?, 'scheduled', ?);`,
      [lesson_id, teacher_id, student_id, date, time, reservation_id]
    );
    console.log("✅ Live class created with date & time:", { date, time });

    // ✅ Success response
    res.status(200).json({
      success: true,
      message: `Rezervasyon onaylandı ve canlı ders oluşturuldu! (Kesilen Kredi: ${lessonPrice})`,
    });
  } catch (error) {
    console.error("❌ Error:", error);
    res.status(500).json({ error: "Rezervasyon onaylanırken hata oluştu." });
  } finally {
    if (db) db.release();
  }
}
