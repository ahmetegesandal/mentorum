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

    // Parent ID'nin gerçekten parents tablosunda olup olmadığını kontrol et ve kullanıcı bilgilerini getir
    const parentQuery =
      "SELECT p.id, u.name, u.surname, u.credit FROM parents p JOIN users u ON p.parent_id = u.id WHERE p.id = ?";
    const [parentResult] = await db.execute(parentQuery, [parent_id]);

    if (parentResult.length === 0) {
      return res.status(200).json({ isManagedByParent: false });
    }

    res.status(200).json({
      isManagedByParent: true,
      parent_id: parentResult[0].id,
      parent_name: parentResult[0].name,
      parent_surname: parentResult[0].surname,
      parent_credit: parentResult[0].credit,
    });
  } catch (error) {
    console.error("❌ API Hatası:", error);
    res.status(500).json({ error: "Veli bilgisi alınırken hata oluştu." });
  } finally {
    if (db) db.release();
  }
}
