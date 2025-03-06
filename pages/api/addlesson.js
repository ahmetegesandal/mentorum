import { getConnection } from "../../utils/db";
import multer from "multer";
import path from "path";
import fs from "fs/promises";

export const config = {
  api: {
    bodyParser: false, // Multer ile dosya yüklemek için bodyParser'ı kapat
  },
};

// Multer ile dosya yükleme ayarları
const upload = multer({
  storage: multer.diskStorage({
    destination: "./public/uploads/lessons",
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  }),
  limits: { fileSize: 2 * 1024 * 1024 }, // Max 2MB
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  return new Promise((resolve, reject) => {
    upload.single("lesson_photo")(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ error: "Fotoğraf yükleme hatası." });
      }

      const { teacher_id, category_id, title, description, price, language } =
        req.body;

      if (
        !teacher_id ||
        !category_id ||
        !title ||
        !description ||
        !price ||
        !language
      ) {
        return res.status(400).json({ error: "Tüm alanlar zorunludur." });
      }

      const lessonPhoto = req.file
        ? `/uploads/lessons/${req.file.filename}`
        : null;

      let db;
      try {
        db = await getConnection();
        const query = `
          INSERT INTO lessons (teacher_id, category_id, title, description, price, language, lesson_photo)
          VALUES (?, ?, ?, ?, ?, ?, ?)
        `;

        await db.execute(query, [
          teacher_id,
          category_id,
          title,
          description,
          price,
          language,
          lessonPhoto,
        ]);

        res.status(200).json({ message: "Ders başarıyla eklendi" });
      } catch (error) {
        console.error("❌ [HATA] Veritabanı hatası:", error);
        res.status(500).json({ error: "Ders eklenirken hata oluştu." });
      } finally {
        if (db) db.release();
      }
      resolve();
    });
  });
}
