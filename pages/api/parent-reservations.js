// pages/api/parent-reservations.js
import { getConnection } from "../../utils/db";

export default async function handler(req, res) {
  const { parent_id } = req.query;
  if (!parent_id) {
    return res.status(400).json({ error: "parent_id gereklidir." });
  }

  let db;
  try {
    db = await getConnection();
    console.log("➡️ parent_id (users.id):", parent_id);

    // STEP 1: Find internal parents.id
    const [parentRows] = await db.execute(
      `SELECT id FROM parents WHERE parent_id = ?`,
      [parent_id]
    );
    console.log("👪 STEP 1 - parents tablosu sonucu:", parentRows);

    if (parentRows.length === 0) {
      console.log("⛔ parents tablosunda eşleşme yok.");
      return res.status(200).json({ reservations: [] });
    }

    const internalParentId = parentRows[0].id;
    console.log("✅ internalParentId:", internalParentId);

    // STEP 2: Fetch student_ids from student_parents
    const [students] = await db.execute(
      `SELECT student_id FROM student_parents WHERE parent_id = ?`,
      [internalParentId]
    );
    console.log("🧒 STEP 2 - student_parents sonucu:", students);

    const studentIds = students.map((row) => row.student_id);
    console.log("✅ studentIds:", studentIds);

    // STEP 3: Match students to user_id
    const [studentUsers] = await db.query(
      `SELECT s.id AS student_id, u.id AS user_id
       FROM students s
       JOIN users u ON s.user_id = u.id
       WHERE s.id IN (${studentIds.map(() => "?").join(",")})`,
      studentIds
    );
    console.log("👤 STEP 3 - students -> users eşleşmeleri:", studentUsers);

    const studentUserIds = studentUsers.map((row) => row.user_id);
    console.log("✅ studentUserIds:", studentUserIds);

    // 👨‍👧 Add parent_id itself (as parent may also reserve)
    const allUserIds = [...studentUserIds, Number(parent_id)];
    console.log("🧾 Toplam aranacak kullanıcı ID'leri:", allUserIds);

    // STEP 4: Fetch reservations (student_id = users.id or parent_id)
    const [reservations] = await db.query(
      `SELECT 
        r.id,
        r.date,
        r.time,
        r.status,
        r.student_id AS student_user_id,
        u.name AS student_name,
        u.surname AS student_surname,
        t.id AS teacher_id,
        tu.name AS teacher_name,
        tu.surname AS teacher_surname,
        l.title AS lesson_title
      FROM reservations r
      LEFT JOIN users u ON r.student_id = u.id
      LEFT JOIN teachers t ON r.teacher_id = t.user_id
      LEFT JOIN users tu ON t.user_id = tu.id
      LEFT JOIN lessons l ON r.lesson_id = l.id
      WHERE r.student_id IN (${allUserIds.map(() => "?").join(",")})
      ORDER BY r.date DESC, r.time DESC`,
      allUserIds
    );

    console.log("📅 STEP 4 - reservations sonucu:", reservations);
    res.status(200).json({ reservations });
  } catch (error) {
    console.error("❌ API HATASI:", error);
    res.status(500).json({ error: "Sunucu hatası." });
  } finally {
    if (db) db.release();
  }
}
