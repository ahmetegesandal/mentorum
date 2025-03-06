import { getConnection } from "../../utils/db";

export default async function handler(req, res) {
  const db = await getConnection();

  try {
    const userId = req.query.userId; // Logged-in user's ID

    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }

    // Ensure the user is a parent
    const parentCheckQuery = "SELECT id FROM parents WHERE parent_id = ?";
    const [parentCheck] = await db.execute(parentCheckQuery, [userId]);

    if (parentCheck.length === 0) {
      return res.status(403).json({ error: "User is not a registered parent" });
    }

    // Fetch students linked to this parent
    const query = `
      SELECT 
        students.id AS student_id,
        student_users.id AS user_id,
        student_users.name,
        student_users.surname,
        student_users.username,
        student_users.photo,
        students.grade
      FROM parents
      JOIN student_parents ON parents.id = student_parents.parent_id
      JOIN students ON student_parents.student_id = students.id
      JOIN users AS student_users ON students.user_id = student_users.id
      WHERE parents.parent_id = ?;
    `;

    const [students] = await db.execute(query, [userId]);

    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ error: error.message });
  } finally {
    db.release();
  }
}
