import { getConnection } from "../../utils/db";
import bcrypt from "bcrypt";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, surname, username, grade, photo, parent_id } = req.body;
  if (!name || !surname || !username || !grade || !parent_id) {
    return res.status(400).json({ error: "Tüm alanlar zorunludur" });
  }

  const db = await getConnection();

  try {
    // ✅ **1. Parent'ın `parents` tablosunda olup olmadığını kontrol et**
    const [existingParent] = await db.execute(
      "SELECT id FROM parents WHERE parent_id = ?",
      [parent_id]
    );

    let parentDbId;
    if (existingParent.length > 0) {
      parentDbId = existingParent[0].id;
    } else {
      // **Eğer veli `parents` tablosunda yoksa, ekleyelim**
      const [parentInsert] = await db.execute(
        "INSERT INTO parents (parent_id) VALUES (?)",
        [parent_id]
      );
      parentDbId = parentInsert.insertId;
    }

    console.log(`✅ Parent ID bulundu veya eklendi: ${parentDbId}`);

    // ✅ **2. Kullanıcı adı kontrolü**
    const [existingUser] = await db.execute(
      "SELECT id FROM users WHERE username = ?",
      [username]
    );
    if (existingUser.length > 0) {
      return res.status(400).json({ error: "Kullanıcı adı zaten mevcut" });
    }

    // ✅ **3. Varsayılan şifre belirle**
    const defaultPassword = await bcrypt.hash("123456", 10);

    // ✅ **4. users tablosuna ekle**
    const [userResult] = await db.execute(
      "INSERT INTO users (username, name, surname, password, role, photo) VALUES (?, ?, ?, ?, ?, ?)",
      [
        username,
        name,
        surname,
        defaultPassword,
        "student",
        photo || "default.png",
      ]
    );

    const userId = userResult.insertId;
    console.log(`✅ Kullanıcı eklendi. User ID: ${userId}`);

    // ✅ **5. students tablosuna ekle**
    const [studentResult] = await db.execute(
      "INSERT INTO students (user_id, grade) VALUES (?, ?)",
      [userId, grade]
    );

    const studentId = studentResult.insertId;
    console.log(`✅ Öğrenci eklendi. Student ID: ${studentId}`);

    // ✅ **6. student_parents tablosuna ekle**
    await db.execute(
      "INSERT INTO student_parents (student_id, parent_id) VALUES (?, ?)",
      [studentId, parentDbId]
    );

    console.log(
      `✅ Öğrenci-Veli ilişkisi eklendi! Parent ID: ${parentDbId}, Student ID: ${studentId}`
    );

    res.status(201).json({ message: "Öğrenci başarıyla eklendi", studentId });
  } catch (error) {
    console.error("❌ Öğrenci ekleme hatası:", error);
    res
      .status(500)
      .json({ error: "Öğrenci eklenirken hata oluştu: " + error.message });
  } finally {
    db.release();
  }
}
