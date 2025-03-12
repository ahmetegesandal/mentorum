import { getConnection } from "../../utils/db";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Sadece POST metodu desteklenir" });
  }

  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ message: "Kayıt ID belirtilmelidir." });
  }

  try {
    const connection = await getConnection();
    const [result] = await connection.execute(
      "DELETE FROM calendar WHERE id = ?",
      [id]
    );

    await connection.release();

    if (result.affectedRows > 0) {
      res.status(200).json({ message: "Kayıt başarıyla silindi." });
    } else {
      res.status(404).json({ message: "Kayıt bulunamadı." });
    }
  } catch (error) {
    console.error("Veritabanı hatası:", error);
    res.status(500).json({ message: "Sunucu hatası oluştu." });
  }
}
