import { getConnection } from "../../utils/db";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { user_id } = req.query;

  if (!user_id) {
    return res.status(400).json({ error: "Kullanıcı ID eksik!" });
  }

  let db;
  try {
    db = await getConnection();

    // Öğrencinin ID'sini bulmak için students tablosunu kontrol et
    const studentQuery = "SELECT id FROM students WHERE user_id = ?";
    const [studentResult] = await db.execute(studentQuery, [user_id]);

    if (studentResult.length === 0) {
      return res.status(200).json({ isManagedByParent: false });
    }

    const student_id = studentResult[0].id;

    // Öğrenciye bağlı veliyi bulmak için student_parents tablosunu kontrol et
    const studentParentQuery =
      "SELECT parent_id FROM student_parents WHERE student_id = ?";
    const [studentParentResult] = await db.execute(studentParentQuery, [
      student_id,
    ]);

    if (studentParentResult.length === 0) {
      return res.status(200).json({ isManagedByParent: false });
    }

    const parent_id = studentParentResult[0].parent_id;

    // Parent ID'nin gerçekten parents tablosunda olup olmadığını kontrol et
    const parentQuery = "SELECT id FROM parents WHERE id = ?";
    const [parentResult] = await db.execute(parentQuery, [parent_id]);

    const isManagedByParent = parentResult.length > 0;

    res.status(200).json({ isManagedByParent });
  } catch (error) {
    console.error("❌ API Hatası:", error);
    res
      .status(500)
      .json({ error: "Veli yönetimi kontrol edilirken hata oluştu." });
  } finally {
    if (db) db.release();
  }
}
