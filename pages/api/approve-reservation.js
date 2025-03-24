import { getConnection } from "../../utils/db";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { reservation_id, teacher_id } = req.body;
  let db;

  try {
    db = await getConnection();
    console.log(
      "🚀 Başlatıldı | Rezervasyon:",
      reservation_id,
      "Öğretmen:",
      teacher_id
    );

    const [reservation] = await db.execute(
      `SELECT student_id, lesson_id, date, time, status 
       FROM reservations 
       WHERE id = ? AND teacher_id = ?`,
      [reservation_id, teacher_id]
    );

    if (!reservation.length) {
      console.log("❌ Rezervasyon yok veya yetkisiz.");
      return res
        .status(404)
        .json({ error: "Rezervasyon bulunamadı veya öğretmene ait değil." });
    }

    const { student_id, lesson_id, date, time, status } = reservation[0];
    console.log("🔍 Rezervasyon Bilgisi:", {
      student_id,
      lesson_id,
      date,
      time,
      status,
    });

    if (status === "cancelled") {
      return res
        .status(400)
        .json({ error: "Bu rezervasyon zaten iptal edilmiş." });
    }
    if (status === "confirmed") {
      return res.status(400).json({ error: "Rezervasyon zaten onaylanmış." });
    }

    const [lesson] = await db.execute(
      "SELECT price FROM lessons WHERE id = ?",
      [lesson_id]
    );
    if (!lesson.length) {
      return res.status(404).json({ error: "Ders bulunamadı!" });
    }
    const lessonPrice = lesson[0].price;
    console.log("💰 Ders Ücreti:", lessonPrice);

    // Öğrenci user_id'sini al (users.id)
    const studentUserId = student_id; // çünkü reservation.student_id zaten users tablosundaki id

    // Veli kontrolü: öğrenci user_id'ye bağlı student.id bulunur → sonra veli ilişkisi aranır
    const [studentRow] = await db.execute(
      "SELECT id FROM students WHERE user_id = ?",
      [studentUserId]
    );
    const studentTableId = studentRow.length ? studentRow[0].id : null;

    console.log("📌 students.id (studentTableId):", studentTableId);

    const [parentUser] = await db.execute(
      `SELECT sp.student_id, sp.parent_id AS sp_parent_id, p.parent_id AS parent_user_id, u.id AS user_id, u.name, u.surname, u.credit
       FROM student_parents sp
       JOIN parents p ON sp.parent_id = p.id
       JOIN users u ON p.parent_id = u.id
       WHERE sp.student_id = ?
       LIMIT 1`,
      [studentTableId]
    );

    console.log("📦 Veli sorgu sonucu:", parentUser);

    let payerUserId = studentUserId;
    let payerRole = "student";

    if (parentUser.length) {
      payerUserId = parentUser[0].user_id;
      payerRole = "parent";
      console.log(
        `👨‍👩‍👧 Veli bulundu | Veli user_id: ${payerUserId}, İsim: ${parentUser[0].name} ${parentUser[0].surname}, Kredi: ${parentUser[0].credit}`
      );
    } else {
      console.log(
        "ℹ️ Öğrenciye ait veli bulunamadı, kredi öğrenciden düşülecek."
      );
    }

    console.log(`💳 Tahsilat yapılacak kişi (${payerRole}):`, payerUserId);

    const [payer] = await db.execute("SELECT credit FROM users WHERE id = ?", [
      payerUserId,
    ]);
    if (!payer.length) {
      return res
        .status(404)
        .json({
          error: `${payerRole === "parent" ? "Veli" : "Öğrenci"} bulunamadı!`,
        });
    }

    if (payer[0].credit < lessonPrice) {
      return res.status(400).json({
        error: `${
          payerRole === "parent" ? "Velinin" : "Öğrencinin"
        } yeterli kredisi yok! (Gerekli: ${lessonPrice}, Mevcut: ${
          payer[0].credit
        })`,
      });
    }

    await db.execute("UPDATE users SET credit = credit - ? WHERE id = ?", [
      lessonPrice,
      payerUserId,
    ]);
    console.log("✅ Kredi düşüldü | Kullanıcı:", payerUserId);

    await db.execute(
      "UPDATE reservations SET status = 'confirmed' WHERE id = ?",
      [reservation_id]
    );
    console.log("✅ Rezervasyon onaylandı");

    await db.execute(
      `INSERT INTO live_classes (lesson_id, teacher_id, student_id, date, time, status, reservation_id) 
       VALUES (?, ?, ?, ?, ?, 'scheduled', ?)`,
      [lesson_id, teacher_id, studentUserId, date, time, reservation_id]
    );
    console.log("✅ Canlı ders oluşturuldu");

    res.status(200).json({
      success: true,
      message: `Rezervasyon onaylandı ve canlı ders oluşturuldu! (Kesilen Kredi: ${lessonPrice}, Tahsil Edilen: ${payerRole})`,
    });
  } catch (error) {
    console.error("❌ HATA:", error);
    res.status(500).json({ error: "Rezervasyon onaylanırken hata oluştu." });
  } finally {
    if (db) db.release();
  }
}
