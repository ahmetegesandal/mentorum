import { getConnection } from "../../../utils/db";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  const { id } = req.query;
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Yetkisiz erişim. Token eksik." });
  }

  let connection;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    /*console.log(
      "📌 Gelen Token Kullanıcı ID:",
      decoded.id,
      "| API'ye Gelen ID:",
      id
    );*/

    connection = await getConnection();

    if (req.method === "GET") {
      // 📌 Kullanıcı bilgilerini çek ve rolünü belirle
      const [user] = await connection.execute(
        `SELECT users.*, 
                COALESCE(t.role, s.role, users.role, 'unknown') AS role
         FROM users
         LEFT JOIN (SELECT user_id, 'teacher' AS role FROM teachers) t ON users.id = t.user_id
         LEFT JOIN (SELECT user_id, 'student' AS role FROM students) s ON users.id = s.user_id
         WHERE users.id = ?`,
        [id]
      );

      //console.log("📌 SQL'den Dönen Kullanıcı Verisi:", user);

      if (user.length === 0) {
        return res.status(404).json({ message: "Kullanıcı bulunamadı." });
      }

      let userData = {
        ...user[0],
        role: user[0].role,
      };

      // 🏫 Kullanıcı öğretmense öğretmen bilgilerini ekle
      if (userData.role === "teacher") {
        const [teacherInfo] = await connection.execute(
          `SELECT bio, expertise FROM teachers WHERE user_id = ?`,
          [id]
        );
        userData.teacher_info = teacherInfo.length ? teacherInfo[0] : null;
      }

      // 🎓 Kullanıcı öğrenciyse öğrenci bilgilerini ekle
      if (userData.role === "student") {
        const [studentInfo] = await connection.execute(
          `SELECT grade FROM students WHERE user_id = ?`,
          [id]
        );
        userData.student_info = studentInfo.length ? studentInfo[0] : null;
      }

      res.status(200).json(userData);
    } else {
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${req.method} not allowed`);
    }
  } catch (error) {
    console.error("❌ Hata:", error);
    res
      .status(401)
      .json({ message: "Yetkisiz erişim. Token geçersiz veya SQL hatası." });
  } finally {
    if (connection) connection.release();
  }
}
