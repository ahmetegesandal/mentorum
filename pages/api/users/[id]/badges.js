import { getConnection } from "../../../../utils/db";

export default async function handler(req, res) {
  const {
    query: { id },
  } = req;

  const db = await getConnection();

  try {
    const [rows] = await db.execute(
      `
      SELECT b.id, b.name, b.icon_path, b.description, ub.earned_at
      FROM user_badges ub
      JOIN badges b ON b.id = ub.badge_id
      WHERE ub.user_id = ?
      ORDER BY ub.earned_at DESC
      `,
      [id]
    );

    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  } finally {
    db.release();
  }
}
