import { getConnection } from "../../utils/db";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { class_id, teacher_id, meeting_link } = req.body;

  if (!class_id || !teacher_id || !meeting_link) {
    return res.status(400).json({ error: "Eksik parametreler!" });
  }

  let db;
  try {
    db = await getConnection();

    // 📌 Canlı dersin linkini güncelle ve durumu "ongoing" yap
    await db.execute(
      "UPDATE live_classes SET meeting_link = ?, status = 'ongoing' WHERE id = ? AND teacher_id = ?",
      [meeting_link, class_id, teacher_id]
    );

    res.status(200).json({ success: true, message: "Ders başlatıldı." });
  } catch (error) {
    console.error("❌ API Hatası:", error);
    res.status(500).json({ error: "Ders başlatılırken hata oluştu." });
  } finally {
    if (db) db.release();
  }
}
