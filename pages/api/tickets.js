import { getConnection } from "../../utils/db";

export default async function handler(req, res) {
  const db = await getConnection(); // EKLENDİ!

  if (req.method === "GET") {
    const { user_id } = req.query;
    if (!user_id) {
      return res.status(400).json({ message: "Kullanıcı ID gerekli" });
    }
    try {
      const [tickets] = await db.execute("SELECT * FROM Tickets WHERE user_id = ?", [user_id]);
      res.status(200).json(tickets);
    } catch (error) {
      console.error("Destek talepleri alınamadı:", error);
      res.status(500).json({ message: "Destek talepleri alınamadı", error });
    }
  } 
  
  else if (req.method === "POST") {
    const { user_id, subject, description } = req.body;
    if (!user_id || !subject || !description) {
      return res.status(400).json({ message: "Eksik alanlar mevcut" });
    }
    try {
      await db.execute("INSERT INTO Tickets (user_id, subject, description) VALUES (?, ?, ?)", 
        [user_id, subject, description]);
      res.status(201).json({ message: "Destek talebi oluşturuldu" });
    } catch (error) {
      console.error("Destek talebi oluşturulamadı:", error);
      res.status(500).json({ message: "Destek talebi oluşturulamadı", error });
    }
  } 
  
  else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
