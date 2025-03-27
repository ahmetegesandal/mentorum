import { getConnection } from "../../utils/db";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Sadece POST metodu desteklenir" });
  }

  const { entries } = req.body;

  if (!Array.isArray(entries) || entries.length === 0) {
    return res
      .status(400)
      .json({ message: "En az bir kayıt gönderilmelidir." });
  }

  try {
    const db = await getConnection();
    const query =
      "INSERT INTO calendar (teacher_id, date, time, is_available) VALUES (?, ?, ?, ?)";

    for (const entry of entries) {
      const { teacher_id, date, time, is_available } = entry;
      if (!teacher_id || !date || !time) continue;
      await db.execute(query, [teacher_id, date, time, is_available]);
    }

    await db.release();
    res.status(200).json({ message: "Takvim kayıtları başarıyla eklendi." });
  } catch (error) {
    console.error("Veritabanı hatası:", error);
    res.status(500).json({ message: "Sunucu hatası" });
  }
}
