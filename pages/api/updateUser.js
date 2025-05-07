import { getConnection } from "../../utils/db";
import multer from "multer";
import path from "path";
import fs from "fs";

const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      const uploadDir = path.join(process.cwd(), "public/img/avatars");
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }
      cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname);
      cb(null, `${Date.now()}${ext}`);
    },
  }),
  limits: { fileSize: 2 * 1024 * 1024 },
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
  if (req.method !== "PUT") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  upload.single("photo")(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }

    const db = await getConnection();
    const { id, username, name, surname, email, credit, is_approved } =
      req.body;
    let photo = req.file ? req.file.filename : null;

    if (!id || !username || !name || !surname || !email || !credit) {
      return res.status(400).json({ error: "Tüm alanlar zorunludur!" });
    }

    try {
      const [existingUser] = await db.execute(
        "SELECT photo FROM users WHERE id = ?",
        [id]
      );

      if (existingUser.length === 0) {
        return res.status(404).json({ error: "Kullanıcı bulunamadı!" });
      }

      if (photo && existingUser[0].photo) {
        const oldPhotoPath = path.join(
          process.cwd(),
          "public/img/avatars",
          existingUser[0].photo
        );
        if (fs.existsSync(oldPhotoPath)) {
          fs.unlinkSync(oldPhotoPath);
        }
      } else {
        photo = existingUser[0].photo;
      }

      await db.execute(
        `UPDATE users SET username = ?, name = ?, surname = ?, email = ?, photo = ?, credit = ? WHERE id = ?`,
        [username, name, surname, email, photo, credit, id]
      );

      const [checkTeacher] = await db.execute(
        `SELECT user_id FROM teachers WHERE user_id = ?`,
        [id]
      );

      if (checkTeacher.length && is_approved !== undefined) {
        await db.execute(
          `UPDATE teachers SET is_approved = ? WHERE user_id = ?`,
          [parseInt(is_approved), id]
        );
      }

      res
        .status(200)
        .json({ message: "Kullanıcı başarıyla güncellendi!", photo });
    } catch (error) {
      console.error("Kullanıcı güncelleme hatası:", error);
      res.status(500).json({ error: "Kullanıcı güncellenirken hata oluştu!" });
    } finally {
      db.release();
    }
  });
}
