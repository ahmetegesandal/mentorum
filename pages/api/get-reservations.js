import { getConnection } from "../../utils/db";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { teacher_id } = req.query;

  if (!teacher_id) {
    console.log("❌ Öğretmen ID eksik!");
    return res.status(400).json({ error: "Öğretmen ID eksik!" });
  }

  let db;
  try {
    db = await getConnection();

    console.log(
      `📌 Teacher ID: ${teacher_id} için rezervasyonlar sorgulanıyor...`
    );

    // 📌 Bekleyen veya onaylanmış rezervasyonları getir
    const [reservations] = await db.execute(
      "SELECT date, time, status FROM reservations WHERE teacher_id = ? AND status IN ('pending', 'approved')",
      [teacher_id]
    );

    console.log("📌 Getirilen Rezervasyonlar:", reservations);

    res.status(200).json(reservations);
  } catch (error) {
    console.error("❌ API Hatası:", error);
    res.status(500).json({ error: "Rezervasyonlar çekilirken hata oluştu." });
  } finally {
    if (db) db.release();
  }
}
