import { getConnection } from "../../utils/db";

export default async function handler(req, res) {
  const db = await getConnection();

  try {
    // Join lessons with categories, teachers, and users
    const query = `
      SELECT 
        lessons.id, 
        lessons.teacher_id, 
        users.name AS teacher_name,
        users.surname AS teacher_surname,  
        users.email AS teacher_email, 
        users.photo AS teacher_profile, 
        lessons.title, 
        lessons.description, 
        lessons.category_id, 
        categories.name AS category_name, 
        lessons.price, 
        lessons.language,
        lessons.lesson_photo,
        COALESCE(AVG(reviews.rating), 0) AS average_rating, 
        COUNT(reviews.id) AS review_count
      FROM lessons
      JOIN categories ON lessons.category_id = categories.id
      JOIN teachers ON lessons.teacher_id = teachers.user_id
      JOIN users ON teachers.user_id = users.id
      LEFT JOIN reviews ON lessons.id = reviews.lesson_id
      GROUP BY lessons.id, lessons.teacher_id, users.name, users.surname, users.email, 
               users.photo, lessons.title, lessons.description, 
               lessons.category_id, categories.name, lessons.price, lessons.language,lessons.lesson_photo;
    `;

    const [rows] = await db.execute(query);
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  } finally {
    db.release();
  }
}
