import { getConnection } from "../../utils/db";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Sadece POST metodu desteklenir" });
  }

  const { teacher_id, date, time, is_available } = req.body;

  if (!teacher_id || !date || !time) {
    return res.status(400).json({ message: "Tüm alanlar zorunludur." });
  }

  try {
    const connection = await getConnection();
    const query =
      "INSERT INTO calendar (teacher_id, date, time, is_available) VALUES (?, ?, ?, ?)";
    const values = [teacher_id, date, time, is_available];

    await connection.execute(query, values);
    await connection.release();

    res.status(200).json({ message: "Başarıyla eklendi" });
  } catch (error) {
    console.error("Veritabanı hatası:", error);
    res.status(500).json({ message: "Sunucu hatası" });
  }
}
