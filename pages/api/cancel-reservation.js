import { getConnection } from "../../utils/db";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { reservation_id, user_id } = req.body;

  if (!reservation_id || !user_id) {
    return res.status(400).json({ error: "Eksik parametreler!" });
  }

  let db;
  try {
    db = await getConnection();

    // 🔥 Rezervasyon bilgilerini getir
    const [reservation] = await db.execute(
      "SELECT * FROM reservations WHERE id = ?",
      [reservation_id]
    );

    if (reservation.length === 0) {
      return res.status(404).json({ error: "Rezervasyon bulunamadı." });
    }

    const { status, student_id, teacher_id, price } = reservation[0];

    // 📌 Eğer rezervasyon zaten iptal edilmişse
    if (status === "cancelled") {
      return res
        .status(400)
        .json({ error: "Rezervasyon zaten iptal edilmiş." });
    }

    // 📌 Kullanıcı yetkilendirmesi: Sadece öğrenci veya öğretmen iptal edebilir
    if (user_id !== student_id && user_id !== teacher_id) {
      return res.status(403).json({ error: "Yetkisiz işlem." });
    }

    // 🔥 Rezervasyonu iptal et
    await db.execute(
      "UPDATE reservations SET status = 'cancelled' WHERE id = ?",
      [reservation_id]
    );

    // 📌 Eğer öğrenci iptal ediyorsa, kredisi iade edilir
    if (user_id === student_id) {
      await db.execute("UPDATE users SET credit = credit + ? WHERE id = ?", [
        price,
        student_id,
      ]);
    }

    return res.status(200).json({
      success: true,
      message: "Rezervasyon başarıyla iptal edildi.",
    });
  } catch (error) {
    console.error("❌ API Hatası:", error);
    res.status(500).json({ error: "Rezervasyon iptal edilirken hata oluştu." });
  } finally {
    if (db) db.release();
  }
}
