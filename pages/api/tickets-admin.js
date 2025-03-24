import { getConnection } from "../../utils/db";

export default async function handler(req, res) {
  const db = await getConnection(); // Veritabanı bağlantısı

  if (req.method === "GET") {
    try {
      const [tickets] = await db.execute("SELECT id, subject, description, created_at FROM Tickets"); // Tüm ticket'ları getir
      res.status(200).json(tickets);
    } catch (error) {
      console.error("Tüm destek talepleri alınamadı:", error);
      res.status(500).json({ message: "Tüm destek talepleri alınamadı", error });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
