import { getConnection } from "../../utils/db";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { id } = req.query;
  if (!id) return res.status(400).json({ error: "User ID is required" });

  try {
    const db = await getConnection();

    // Kullanıcıyı veritabanından getir
    const [user] = await db.execute(
      "SELECT id, username, name, surname, email, role, photo FROM users WHERE id = ?",
      [id]
    );

    if (user.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(user[0]);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: "Error retrieving user: " + error.message });
  }
}
