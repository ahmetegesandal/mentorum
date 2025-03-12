import { getConnection } from "../../utils/db";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Yalnızca GET isteği desteklenir" });
  }

  const { userId } = req.query;

  if (!userId) {
    return res.status(400).json({ message: "Kullanıcı ID gereklidir" });
  }

  try {
    const connection = await getConnection();
    const [rows] = await connection.execute(
      "SELECT id, date, time, is_available FROM calendar WHERE teacher_id = ? ORDER BY date DESC",
      [userId]
    );

    res.status(200).json(rows);
  } catch (error) {
    console.error("Takvim verisi alınırken hata oluştu:", error);
    res.status(500).json({ message: "Sunucu hatası" });
  }
}
