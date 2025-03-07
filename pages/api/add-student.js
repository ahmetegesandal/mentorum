import { getConnection } from "../../utils/db";
import bcrypt from "bcrypt";
import multer from "multer";
import path from "path";

// 📌 Multer dosya yükleme ayarları
const storage = multer.diskStorage({
  destination: path.join(process.cwd(), "public/img/avatars"),
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// API Route için next-connect kullanıyoruz
export const config = {
  api: {
    bodyParser: false, // Multer için bodyParser devre dışı
  },
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // Multer ile dosya yükleme işlemi
  upload.single("photo")(req, res, async (err) => {
    if (err) {
      return res.status(500).json({ error: "Dosya yüklenirken hata oluştu" });
    }

    let db;
    try {
      const { name, surname, username, email, password, grade, parent_id } =
        req.body;
      const photo = req.file
        ? `${req.file.filename}`
        : "/img/avatars/default.png";

      if (!name || !surname || !username || !email || !grade || !parent_id) {
        return res.status(400).json({ error: "Tüm alanlar zorunludur" });
      }

      db = await getConnection();

      // **Parent Kontrolü**
      const [existingParent] = await db.execute(
        "SELECT id FROM parents WHERE parent_id = ?",
        [parent_id]
      );

      let parentDbId =
        existingParent.length > 0
          ? existingParent[0].id
          : (
              await db.execute("INSERT INTO parents (parent_id) VALUES (?)", [
                parent_id,
              ])
            )[0].insertId;

      // **Kullanıcı Adı Kontrolü**
      const [existingUser] = await db.execute(
        "SELECT id FROM users WHERE username = ?",
        [username]
      );
      if (existingUser.length > 0) {
        return res.status(400).json({ error: "Kullanıcı adı zaten mevcut" });
      }

      // **Şifre Hashleme**
      const hashedPassword = await bcrypt.hash(password || "123456", 10);

      // **Kullanıcı Ekle**
      const [userResult] = await db.execute(
        "INSERT INTO users (username, name, surname, email, password, role, photo) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [username, name, surname, email, hashedPassword, "student", photo]
      );

      const userId = userResult.insertId;

      // **Öğrenci Ekle**
      const [studentResult] = await db.execute(
        "INSERT INTO students (user_id, grade) VALUES (?, ?)",
        [userId, grade]
      );

      const studentId = studentResult.insertId;

      // **Veli-Öğrenci Bağlantısı**
      await db.execute(
        "INSERT INTO student_parents (student_id, parent_id) VALUES (?, ?)",
        [studentId, parentDbId]
      );

      res.status(201).json({ message: "Öğrenci başarıyla eklendi", studentId });
    } catch (error) {
      console.error("Öğrenci ekleme hatası:", error);
      res
        .status(500)
        .json({ error: "Öğrenci eklenirken hata oluştu: " + error.message });
    } finally {
      if (db) db.release();
    }
  });
}
