// pages/api/payment.js
import { getConnection } from "../../utils/db";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { userId, amount } = req.body;

  if (!userId || !amount || amount <= 0) {
    return res.status(400).json({ error: "Invalid input" });
  }

  let connection;

  try {
    connection = await getConnection();

    await connection.query(
      "UPDATE users SET credit = credit + ? WHERE id = ?",
      [amount, userId]
    );

    res.status(200).json({ success: true });
  } catch (err) {
    console.error("DB error:", err);
    res.status(500).json({ error: "Database update failed" });
  } finally {
    if (connection) connection.release();
  }
}
