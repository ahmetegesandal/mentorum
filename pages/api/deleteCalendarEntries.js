import { getConnection } from "../../utils/db";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Sadece POST metodu desteklenir." });
  }

  const { ids } = req.body;

  if (!Array.isArray(ids) || ids.length === 0) {
    return res.status(400).json({ message: "Silinecek kayıt bulunamadı." });
  }

  let connection;

  try {
    connection = await getConnection();

    const placeholders = ids.map(() => "?").join(",");
    const [result] = await connection.execute(
      `DELETE FROM calendar WHERE id IN (${placeholders})`,
      ids
    );

    res.status(200).json({
      message: `${result.affectedRows} kayıt başarıyla silindi.`,
    });
  } catch (error) {
    console.error("Toplu silme hatası:", error);
    res.status(500).json({ message: "Sunucu hatası oluştu." });
  } finally {
    if (connection) connection.release();
  }
}
