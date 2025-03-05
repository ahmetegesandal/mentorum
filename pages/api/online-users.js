import { getConnection } from "../../utils/db";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }

  let connection;
  try {
    connection = await getConnection();
    const [rows] = await connection.execute("SELECT id, is_online FROM users");
    res.json(rows);
  } catch (error) {
    console.error("Database error:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    if (connection) {
      connection.release(); // Bağlantıyı havuza geri veriyoruz
    }
  }
}
