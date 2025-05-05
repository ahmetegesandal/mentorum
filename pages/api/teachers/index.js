import { getConnection } from "../../../utils/db";

export default async function handler(req, res) {
  const db = await getConnection();
  const { grade, category } = req.query;

  let whereClauses = ["t.is_approved = 1"];
  let values = [];

  if (grade) {
    whereClauses.push("l.grade = ?");
    values.push(grade);
  }

if (category) {
  whereClauses.push("l.category_id = ?");
  values.push(category);
}

  const whereSQL = whereClauses.length ? `WHERE ${whereClauses.join(" AND ")}` : "";

  try {
    const [rows] = await db.execute(`
      SELECT 
        t.id AS teacher_id,
        u.name AS teacher_name,
        u.photo,
        t.expertise,
        t.bio,
        t.is_approved,
        COUNT(l.id) AS total_lessons,
        AVG(r.rating) AS average_rating,
        MIN(l.price) AS min_price,
        MAX(l.price) AS max_price
      FROM teachers t
      JOIN users u ON t.user_id = u.id
      LEFT JOIN lessons l ON u.id = l.teacher_id
      LEFT JOIN categories c ON l.category_id = c.id
      LEFT JOIN reviews r ON l.id = r.lesson_id
      ${whereSQL}
      GROUP BY t.id, u.name, u.photo, t.expertise, t.bio, t.is_approved
    `, values);

    res.status(200).json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  } finally {
    db.release();
  }
}
