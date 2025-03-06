import { getConnection } from "../../utils/db";

export default async function handler(req, res) {
  const db = await getConnection();

  try {
    const [rows] = await db.execute("SELECT id, name FROM categories");
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  } finally {
    db.release();
  }
}
