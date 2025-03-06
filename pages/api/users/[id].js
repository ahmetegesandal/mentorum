import { getConnection } from "../../../utils/db";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  const { id } = req.query;

  // JWT doğrulama
  const token = req.headers.authorization?.split(" ")[1]; // 'Bearer token' formatından token'ı al

  if (!token) {
    return res.status(401).json({ message: "Yetkisiz erişim." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Token'ı doğrula

    if (req.method === "GET") {
      const connection = await getConnection(); // Veritabanı bağlantısını al
      const [user] = await connection.execute(
        `SELECT 
                    users.* 
                FROM 
                    users 
                WHERE 
                    users.id = ?`,
        [id]
      );

      if (user.length > 0) {
        res.status(200).json(user[0]); // Kullanıcı ve bölüm bilgilerini döndür
      } else {
        res.status(404).json({ message: "Kullanıcı bulunamadı." });
      }

      connection.release(); // Bağlantıyı kapat
    } else {
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${req.method} not allowed`);
    }
  } catch (error) {
    console.error("JWT hatası:", error);
    res.status(401).json({ message: "Geçersiz token." }); // Token geçersizse hata döndür
  }
}
