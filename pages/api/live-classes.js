import { getConnection } from "../../utils/db";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    console.error("❌ Geçersiz HTTP Methodu:", req.method);
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { teacher_id } = req.query;

  if (!teacher_id) {
    console.error("❌ Eksik teacher_id:", req.query);
    return res.status(400).json({ error: "Öğretmen ID eksik!" });
  }

  let db;
  try {
    console.log(`🔍 API İsteği Alındı: teacher_id=${teacher_id}`);

    db = await getConnection();

    const [liveClasses] = await db.execute(
      `SELECT lc.id, r.lesson_id, r.student_id, r.date, r.time, 
       lc.start_time, lc.end_time, lc.meeting_link, lc.status,
       l.title AS lesson_title,
       u.name AS student_name, u.surname AS student_surname
FROM live_classes lc
JOIN reservations r ON lc.reservation_id = r.id  -- ✅ Canlı ders, rezervasyona bağlı
JOIN lessons l ON r.lesson_id = l.id  -- ✅ Ders bilgisi çekildi
JOIN users u ON r.student_id = u.id  -- ✅ Öğrenci bilgisi kullanıcı tablosundan alındı
WHERE lc.teacher_id = ?
ORDER BY lc.start_time DESC;
`,
      [teacher_id]
    );

    console.log(`✅ ${liveClasses.length} ders bulundu.`);
    res.status(200).json({ liveClasses });
  } catch (error) {
    console.error("❌ API Hatası:", error.message, error.stack);
    res.status(500).json({
      error: "Dersler çekilirken hata oluştu.",
      details: error.message,
    });
  } finally {
    if (db) {
      console.log("🛑 Database bağlantısı kapatılıyor...");
      db.release();
    }
  }
}
