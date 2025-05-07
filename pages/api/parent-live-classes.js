// pages/api/parent-live-classes.js
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

    // 1. Velinin öğrenci kayıtlarını bul
    const [parentRows] = await db.execute(
      `SELECT id FROM parents WHERE parent_id = ?`,
      [parent_id]
    );
    console.log("👪 STEP 1 - parents tablosu sonucu:", parentRows);

    if (parentRows.length === 0) {
      console.log("⛔ parents tablosunda eşleşme yok.");
      return res.status(200).json({ liveClasses: [] });
    }

    const internalParentId = parentRows[0].id;

    const [students] = await db.execute(
      `SELECT student_id FROM student_parents WHERE parent_id = ?`,
      [internalParentId]
    );
    console.log("🧒 STEP 2 - student_parents sonucu:", students);

    const studentIds = students.map((row) => row.student_id);
    console.log("✅ studentIds:", studentIds);

    // Öğrencilere ait user_id ve isimleri al
    const [studentUsers] = studentIds.length > 0
      ? await db.query(
          `SELECT s.id AS student_id, u.id AS user_id, u.name AS student_name, u.surname AS student_surname
           FROM students s
           JOIN users u ON s.user_id = u.id
           WHERE s.id IN (${studentIds.map(() => "?").join(",")})`,
          studentIds
        )
      : [ [] ];
    console.log("👤 STEP 3 - students -> users eşleşmeleri:", studentUsers);

    const studentUserMap = Object.fromEntries(
      studentUsers.map((row) => [row.user_id, { name: row.student_name, surname: row.student_surname }])
    );

    // Veli bilgisini de ad-soyad için al
    const [parentInfo] = await db.query(
      `SELECT name AS student_name, surname AS student_surname FROM users WHERE id = ?`,
      [parent_id]
    );
    if (parentInfo.length > 0) {
      studentUserMap[parent_id] = {
        name: parentInfo[0].student_name,
        surname: parentInfo[0].student_surname,
      };
    }

    const studentUserIds = studentUsers.map((row) => row.user_id);
    console.log("✅ studentUserIds:", studentUserIds);

    const allUserIds = [...studentUserIds, Number(parent_id)];
    console.log("🧾 Toplam sorgulanacak kullanıcı ID'leri:", allUserIds);

    // 2. Bu kullanıcı ID'lerine ait canlı dersleri çek (LEFT JOIN ile)
    const [classes] = await db.query(
      `SELECT 
        c.id,
        c.date,
        c.time,
        c.student_id,
        c.meeting_link,
        l.title AS lesson_title,
        tu.name AS teacher_name,
        tu.surname AS teacher_surname
      FROM live_classes c
      LEFT JOIN lessons l ON c.lesson_id = l.id
      LEFT JOIN teachers t ON c.teacher_id = t.user_id
      LEFT JOIN users tu ON t.user_id = tu.id
      WHERE c.student_id IN (${allUserIds.map(() => "?").join(",")})
      ORDER BY c.date DESC, c.time DESC`,
      allUserIds
    );
    console.log("📅 STEP 4 - live_classes sonucu:", classes);

    // Öğrenci adını derslere ekle
    const enriched = classes.map((c) => ({
      ...c,
      student_name: studentUserMap[c.student_id]?.name || "",
      student_surname: studentUserMap[c.student_id]?.surname || ""
    }));

    res.status(200).json({ liveClasses: enriched });
  } catch (error) {
    console.error("❌ Canlı ders API hatası:", error);
    res.status(500).json({ error: "Sunucu hatası." });
  } finally {
    if (db) db.release();
  }
}