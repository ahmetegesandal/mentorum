import { getConnection } from "./db";

export async function getAllUsers() {
  const connection = await getConnection();
  try {
    const [rows] = await connection.query("SELECT username FROM users");
    return rows;
  } finally {
    connection.release();
  }
}





export async function getUserByUsername(username) {
  const connection = await getConnection();
  try {
    // Kullanıcıyı ve rolünü çek
    const [rows] = await connection.query(
      `SELECT users.*, 
              COALESCE(t.role, s.role, users.role, 'unknown') AS role
       FROM users
       LEFT JOIN (SELECT user_id, 'teacher' AS role FROM teachers) t ON users.id = t.user_id
       LEFT JOIN (SELECT user_id, 'student' AS role FROM students) s ON users.id = s.user_id
       WHERE users.username = ?`,
      [username]
    );

    if (rows.length === 0) return null;

    const user = rows[0];

    // Öğretmen bilgilerini çek
    if (user.role === "teacher") {
      const [teacherInfo] = await connection.query(
        `SELECT bio, expertise, is_approved FROM teachers WHERE user_id = ?`,
        [user.id]
      );
      user.teacher_info = teacherInfo[0] || null;
      user.is_approved = teacherInfo[0]?.is_approved || null;
    }

    // Öğrenci bilgilerini çek
    if (user.role === "student") {
      const [studentInfo] = await connection.query(
        `SELECT grade FROM students WHERE user_id = ?`,
        [user.id]
      );
      user.student_info = studentInfo[0] || null;
    }

    return user;
  } finally {
    connection.release();
  }
}
