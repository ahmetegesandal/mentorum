import { getConnection } from "../../utils/db";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { teacher_id } = req.query;

  if (!teacher_id) {
    return res.status(400).json({ error: "Öğretmen ID eksik!" });
  }

  let db;
  try {
    db = await getConnection();

    // Öğretmenin uygun gün ve saatlerini al
    const [availableSlots] = await db.execute(
      "SELECT date, time FROM calendar WHERE teacher_id = ? AND is_available = 1 ORDER BY date, time ASC",
      [teacher_id]
    );

    const formattedSlots = availableSlots.reduce((acc, slot) => {
      const startTime = slot.time;
      const [hours, minutes] = startTime.split(":");
      const endTime = new Date();
      endTime.setHours(parseInt(hours) + 1, parseInt(minutes));

      const formattedEndTime = endTime.toTimeString().slice(0, 5);

      const timeRange = `${startTime} - ${formattedEndTime}`;

      if (!acc[slot.date]) {
        acc[slot.date] = [];
      }
      acc[slot.date].push(timeRange);
      return acc;
    }, {});

    res.status(200).json({ availableSlots: formattedSlots });
  } catch (error) {
    console.error("❌ API Hatası:", error);
    res.status(500).json({ error: "Saatler çekilirken hata oluştu." });
  } finally {
    if (db) db.release();
  }
}
