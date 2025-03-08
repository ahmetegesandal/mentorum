import { getConnection } from "../../utils/db";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  let db;
  try {
    db = await getConnection();

    const [users] = await db.execute(
      "SELECT id, username, name, surname, email, role, photo, is_online FROM users"
    );

    res.status(200).json({ users: users || [] });
  } catch (error) {
    console.error("❌ Kullanıcıları çekerken hata:", error);
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    if (db) db.release();
  }
}
