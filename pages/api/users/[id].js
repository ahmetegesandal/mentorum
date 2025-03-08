import { getConnection } from "../../../utils/db";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  const { id } = req.query;
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Yetkisiz erişim." });
  }

  let connection;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    connection = await getConnection();

    if (req.method === "GET") {
      // 📌 Kullanıcı bilgilerini çek ve rolünü belirle
      const [user] = await connection.execute(
        `SELECT users.*, 
                CASE 
                  WHEN EXISTS (SELECT 1 FROM teachers WHERE teachers.user_id = users.id) THEN 'teacher'
                  WHEN EXISTS (SELECT 1 FROM students WHERE students.user_id = users.id) THEN 'student'
                  WHEN users.role = 'admin' THEN 'admin'
                  WHEN users.role = 'parent' THEN 'parent'
                  ELSE 'unknown'
                END AS role
         FROM users WHERE users.id = ?`,
        [id]
      );

      if (user.length === 0) {
        return res.status(404).json({ message: "Kullanıcı bulunamadı." });
      }

      let userData = {
        ...user[0],
        role: user[0].role, // Kullanıcının rolünü doğrudan alıyoruz
      };

      // 🏫 Kullanıcı öğretmense öğretmen bilgilerini ekle
      if (userData.role === "teacher") {
        const [teacherInfo] = await connection.execute(
          `SELECT bio, experience, specialization FROM teachers WHERE user_id = ?`,
          [id]
        );
        userData.teacher_info = teacherInfo.length ? teacherInfo[0] : null;
      }

      // 🎓 Kullanıcı öğrenciyse öğrenci bilgilerini ekle
      if (userData.role === "student") {
        const [studentInfo] = await connection.execute(
          `SELECT grade, school_name FROM students WHERE user_id = ?`,
          [id]
        );
        userData.student_info = studentInfo.length ? studentInfo[0] : null;
      }

      // 👨‍👩‍👦 Admin veya Parent ise ek bir şey yapmadan döndür
      if (userData.role === "admin" || userData.role === "parent") {
        return res.status(200).json(userData);
      }

      res.status(200).json(userData);
    } else {
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${req.method} not allowed`);
    }
  } catch (error) {
    console.error("❌ JWT veya SQL hatası:", error);
    res.status(401).json({ message: "Geçersiz token veya veritabanı hatası." });
  } finally {
    if (connection) connection.release(); // ✅ Bağlantıyı serbest bırak
  }
}
