import { getConnection } from "../../../utils/db";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { id } = req.query;

  try {
    const db = await getConnection();
    const [lesson] = await db.execute("SELECT * FROM lessons WHERE id = ?", [
      id,
    ]);

    if (lesson.length === 0) {
      return res.status(404).json({ error: "Ders bulunamadı" });
    }

    res.status(200).json(lesson[0]);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Ders getirilirken hata oluştu: " + error.message });
  }
}
