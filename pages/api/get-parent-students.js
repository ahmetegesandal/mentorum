import { getConnection } from "../../utils/db";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { parent_id } = req.query;

  if (!parent_id) {
    return res.status(400).json({ error: "Veli ID eksik." });
  }

  let db;
  try {
    db = await getConnection();

    const query = `
      SELECT 
        students.id AS student_id,
        users.id AS user_id,
        users.name,
        users.surname,
        users.photo,
        students.grade
      FROM parents
      JOIN student_parents ON parents.id = student_parents.parent_id
      JOIN students ON student_parents.student_id = students.id
      JOIN users ON students.user_id = users.id
      WHERE parents.parent_id = ?;
    `;

    const [students] = await db.execute(query, [parent_id]);

    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ error: error.message });
  } finally {
    if (db) db.release();
  }
}
