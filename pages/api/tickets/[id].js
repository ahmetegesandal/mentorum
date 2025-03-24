import { getConnection } from "../../../utils/db";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { id } = req.query;
  if (!id) {
    return res.status(400).json({ error: "Ticket ID eksik." });
  }

  let db;
  try {
    db = await getConnection();

    // Ticket detaylarını al
    const ticketQuery = "SELECT * FROM tickets WHERE id = ?";
    const [ticketRows] = await db.execute(ticketQuery, [id]);
    if (ticketRows.length === 0) {
      return res.status(404).json({ error: "Ticket not found" });
    }

    // Ticket yorumlarını al
    const commentsQuery = `SELECT tc.*, u.name AS user_name, u.surname AS user_surname 
                 FROM ticket_comments AS tc 
                 JOIN users AS u ON tc.user_id = u.id 
                 WHERE tc.ticket_id = ? 
                 ORDER BY tc.created_at DESC`;
    const [commentRows] = await db.execute(commentsQuery, [id]);

    res.status(200).json({
      ticket: ticketRows[0],
      comments: commentRows,
    });
  } catch (error) {
    console.error(
      "❌ [HATA] Ticket bilgilerini getirirken hata oluştu:",
      error
    );
    res.status(500).json({ error: "Ticket bilgilerini çekerken hata oluştu." });
  } finally {
    if (db) db.release();
  }
}
