import { getConnection } from "../../utils/db";
import multer from "multer";
import path from "path";
import fs from "fs";

const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      const uploadDir = path.join(process.cwd(), "public/uploads/lessons");
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }
      cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname);
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) {
      return cb(new Error("Sadece resim dosyaları yüklenebilir!"), false);
    }
    cb(null, true);
  },
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  upload.single("lesson_photo")(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }

    const db = await getConnection();
    const { id, title, description, price, category_id, grade, language } =
      req.body;
    let newPhoto = req.file ? `/uploads/lessons/${req.file.filename}` : null;

    if (
      !id ||
      !title ||
      !description ||
      !price ||
      !category_id ||
      !grade ||
      !language
    ) {
      return res.status(400).json({ error: "Tüm alanlar zorunludur!" });
    }

    try {
      const [existingLesson] = await db.execute(
        "SELECT lesson_photo FROM lessons WHERE id = ?",
        [id]
      );
      const existingPhoto = existingLesson.length
        ? existingLesson[0].lesson_photo
        : null;

      if (newPhoto && existingPhoto && existingPhoto !== newPhoto) {
        const oldPath = path.join(process.cwd(), "public", existingPhoto);
        if (fs.existsSync(oldPath)) {
          fs.unlinkSync(oldPath);
        }
      }

      const lessonPhoto = newPhoto || existingPhoto;

      const query = `
        UPDATE lessons 
        SET title = ?, description = ?, price = ?, category_id = ?, lesson_photo = ?, grade = ?, language = ?
        WHERE id = ?
      `;

      const [result] = await db.execute(query, [
        title,
        description,
        price,
        category_id,
        lessonPhoto,
        grade,
        language,
        id,
      ]);

      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Ders bulunamadı!" });
      }

      res
        .status(200)
        .json({ message: "Ders başarıyla güncellendi!", lessonPhoto });
    } catch (error) {
      console.error("Ders güncelleme hatası:", error);
      res.status(500).json({ error: "Ders güncellenirken hata oluştu!" });
    } finally {
      db.release();
    }
  });
}
