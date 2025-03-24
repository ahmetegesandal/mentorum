import { getConnection } from "../../../../utils/db";

export default async function handler(req, res) {
  const connection = await getConnection();

  if (req.method === "POST") {
    const { user_id, comment } = req.body;
    const { id } = req.query; // URL'den ticket_id al

    if (!user_id || !comment) {
      return res.status(400).json({ error: "user_id ve comment gereklidir" });
    }

    try {
      const [result] = await connection.execute(
        "INSERT INTO ticket_comments (ticket_id, user_id, comment, created_at) VALUES (?, ?, ?, NOW())",
        [id, user_id, comment]
      );

      return res.status(201).json({ success: true, id: result.insertId });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    } finally {
      connection.release();
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}
