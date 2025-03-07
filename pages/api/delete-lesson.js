import { getConnection } from "../../utils/db";
import fs from "fs";
import path from "path";

export default async function handler(req, res) {
  if (req.method !== "DELETE") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { id } = req.query;
  if (!id) return res.status(400).json({ error: "Ders ID gerekli." });

  let db;
  try {
    db = await getConnection();

    // Önce fotoğrafı al
    const [lesson] = await db.execute(
      "SELECT lesson_photo FROM lessons WHERE id = ?",
      [id]
    );

    if (lesson.length === 0) {
      return res.status(404).json({ error: "Ders bulunamadı." });
    }

    const lessonPhoto = lesson[0].lesson_photo;

    // Ders kaydını veritabanından sil
    await db.execute("DELETE FROM lessons WHERE id = ?", [id]);

    // Fotoğrafı sil
    if (lessonPhoto) {
      const filePath = path.join(
        process.cwd(),
        "public/uploads/lessons",
        lessonPhoto
      );
      fs.unlink(filePath, (err) => {
        if (err) console.error("Fotoğraf silinemedi:", err);
      });
    }

    res.status(200).json({ message: "Ders başarıyla silindi." });
  } catch (error) {
    console.error("Ders silme hatası:", error);
    res.status(500).json({ error: "Ders silinirken hata oluştu." });
  } finally {
    if (db) db.release();
  }
}
