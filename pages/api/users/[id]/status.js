import { getConnection } from "../../../../utils/db";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }

  const { id } = req.query;
  if (!id) return res.status(400).json({ error: "User ID is required" });

  const connection = await getConnection();
  try {
    const [rows] = await connection.execute(
      "SELECT is_online FROM users WHERE id = ?",
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ is_online: rows[0].is_online });
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    await connection.end();
  }
}
