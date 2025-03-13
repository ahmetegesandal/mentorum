import { getConnection } from "../../utils/db";
import multer from "multer";
import path from "path";
import fs from "fs";

export const config = {
  api: { bodyParser: false }, // Multer için bodyParser kapalı
};

// Klasör var mı kontrol et, yoksa oluştur
const uploadPath = path.join(process.cwd(), "public/uploads/lessons");
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

const upload = multer({
  storage: multer.diskStorage({
    destination: uploadPath,
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  }),
  limits: { fileSize: 2 * 1024 * 1024 }, // Max 2MB
}).single("lesson_photo");

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  return new Promise((resolve, reject) => {
    upload(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ error: "Fotoğraf yükleme hatası." });
      }

      console.log("Gelen Body:", req.body);
      console.log("Yüklenen Dosya:", req.file);

      const { teacher_id, category_id, title, description, price, language } =
        JSON.parse(JSON.stringify(req.body));

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
        console.log("✅ Veritabanına bağlandı!");

        const query = `
          INSERT INTO lessons (teacher_id, category_id, title, description, price, language, lesson_photo)
          VALUES (?, ?, ?, ?, ?, ?, ?)
        `;

        const result = await db.execute(query, [
          teacher_id,
          category_id,
          title,
          description,
          price,
          language,
          lessonPhoto,
        ]);

        console.log("✅ Sorgu başarılı:", result);
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
