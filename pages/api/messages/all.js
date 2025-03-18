import { getConnection } from "../../../utils/db";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { user_id } = req.query;

  if (!user_id) {
    return res.status(400).json({ error: "User ID is required" });
  }

  try {
    const connection = await getConnection();

    // Kullanıcının gönderdiği veya aldığı tüm mesajları çek
    const [messages] = await connection.execute(
      `SELECT * FROM messages 
       WHERE sender_id = ? OR receiver_id = ? 
       ORDER BY created_at DESC`,
      [user_id, user_id]
    );

    connection.release(); // Bağlantıyı serbest bırak

    return res.status(200).json(messages);
  } catch (error) {
    console.error("Error fetching messages:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
