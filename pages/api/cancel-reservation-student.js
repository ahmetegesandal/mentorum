import { getConnection } from "../../utils/db";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { reservation_id, user_id } = req.body;

  if (!reservation_id || !user_id) {
    return res
      .status(400)
      .json({ error: "Rezervasyon ID veya Kullanıcı ID eksik!" });
  }

  let db;
  try {
    db = await getConnection();

    // Rezervasyonun bilgilerini al
    const [reservation] = await db.execute(
      "SELECT date, status FROM reservations WHERE id = ? AND student_id = ?",
      [reservation_id, user_id]
    );

    if (!reservation.length) {
      return res
        .status(404)
        .json({ error: "Rezervasyon bulunamadı veya yetkiniz yok!" });
    }

    const { date, status } = reservation[0];
    const reservationDate = new Date(date);
    const currentDate = new Date();
    const hoursDifference = (reservationDate - currentDate) / (1000 * 60 * 60);

    // Ders başlamadan en az 24 saat önce iptal edilebilir
    if (hoursDifference < 24) {
      return res
        .status(400)
        .json({
          error:
            "Rezervasyon, ders saatine 24 saatten az kaldığında iptal edilemez!",
        });
    }

    if (status === "cancelled") {
      return res
        .status(400)
        .json({ error: "Bu rezervasyon zaten iptal edilmiş!" });
    }

    // Rezervasyonu iptal et
    await db.execute(
      "UPDATE reservations SET status = 'cancelled' WHERE id = ? AND student_id = ?",
      [reservation_id, user_id]
    );

    res
      .status(200)
      .json({ success: true, message: "Rezervasyon başarıyla iptal edildi." });
  } catch (error) {
    console.error("❌ API Hatası:", error);
    res
      .status(500)
      .json({ error: "Rezervasyon iptali sırasında hata oluştu." });
  } finally {
    if (db) db.release();
  }
}
