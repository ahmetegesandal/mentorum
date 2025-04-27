import { getConnection } from "../../utils/db";

export default async function handler(req, res) {
  const db = await getConnection();

  if (req.method === "GET") {
    try {
      const [tickets] = await db.execute(`
        SELECT 
          tickets.id, 
          tickets.user_id, 
          users.username,
          tickets.subject, 
          tickets.description, 
          tickets.created_at
        FROM tickets
        INNER JOIN users ON tickets.user_id = users.id
      `);

      res.status(200).json(tickets);
    } catch (error) {
      console.error("Tüm destek talepleri alınamadı:", error);
      res.status(500).json({ message: "Tüm destek talepleri alınamadı", error });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
