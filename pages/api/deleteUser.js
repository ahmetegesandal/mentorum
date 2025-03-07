import { getConnection } from "../../utils/db";

export default async function handler(req, res) {
  if (req.method !== "DELETE") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { id } = req.query;
  if (!id) return res.status(400).json({ error: "User ID is required" });

  const db = await getConnection();

  try {
    console.log(`🟢 [Başlangıç] Silme işlemi başlatıldı. Kullanıcı ID: ${id}`);

    // Kullanıcının rolünü öğren
    const [user] = await db.execute("SELECT id, role FROM users WHERE id = ?", [
      id,
    ]);

    if (user.length === 0) {
      console.log(`🔴 [HATA] Kullanıcı bulunamadı! ID: ${id}`);
      return res.status(404).json({ error: "User not found" });
    }

    const role = user[0].role;
    console.log(`🟡 Kullanıcı rolü: ${role}`);

    // **Eğer kullanıcı bir veliyse**
    if (role === "parent") {
      console.log("🟢 Veli tespit edildi. Parent ID alınıyor...");

      // **1️⃣ `parents` tablosundan parent_id'yi çekiyoruz**
      const [parent] = await db.execute(
        "SELECT id FROM parents WHERE parent_id = ?",
        [id]
      );

      if (parent.length > 0) {
        const parentId = parent[0].id;
        console.log(`🟡 Parent ID bulundu: ${parentId}`);

        // **2️⃣ Bağlı öğrenci ID'lerini al**
        const [linkedStudents] = await db.execute(
          "SELECT student_id FROM student_parents WHERE parent_id = ?",
          [parentId]
        );

        const studentIds = linkedStudents.map((student) => student.student_id);
        console.log(`🟡 Bağlı öğrenciler bulundu: ${studentIds.join(", ")}`);

        if (studentIds.length > 0) {
          // **3️⃣ Bağlı öğrencilerin `user_id` değerlerini al**
          console.log("🟢 Öğrencilerin user_id değerleri çekiliyor...");
          const [studentUsers] = await db.execute(
            `SELECT user_id FROM students WHERE id IN (${studentIds
              .map(() => "?")
              .join(", ")})`,
            studentIds
          );

          const studentUserIds = studentUsers.map((stu) => stu.user_id);
          console.log(`🟡 Öğrenci user_id'leri: ${studentUserIds}`);

          // **4️⃣ Öğrenciye bağlı `reviews` verileri sil**
          console.log("🟢 Öğrenciye bağlı `reviews` verileri siliniyor...");
          await db.execute(
            `DELETE FROM reviews WHERE student_id IN (${studentIds
              .map(() => "?")
              .join(", ")})`,
            studentIds
          );

          // **5️⃣ Öğrenciye bağlı `messages` verileri sil**
          console.log("🟢 Öğrenciye bağlı `messages` verileri siliniyor...");
          await db.execute(
            `DELETE FROM messages WHERE sender_id IN (${studentUserIds
              .map(() => "?")
              .join(", ")}) OR receiver_id IN (${studentUserIds
              .map(() => "?")
              .join(", ")})`,
            [...studentUserIds, ...studentUserIds]
          );

          // **6️⃣ Öğrenciye bağlı `notifications` verileri sil**
          console.log(
            "🟢 Öğrenciye bağlı `notifications` verileri siliniyor..."
          );
          await db.execute(
            `DELETE FROM notifications WHERE user_id IN (${studentUserIds
              .map(() => "?")
              .join(", ")})`,
            studentUserIds
          );

          // **7️⃣ `student_parents` tablosundaki ilişkileri kaldır**
          console.log(
            "🟢 Bağlı öğrenci ilişkileri (student_parents) siliniyor..."
          );
          await db.execute("DELETE FROM student_parents WHERE parent_id = ?", [
            parentId,
          ]);

          // **8️⃣ `students` tablosundan öğrencileri kaldır**
          console.log("🟢 Bağlı öğrenciler students tablosundan siliniyor...");
          await db.execute(
            `DELETE FROM students WHERE id IN (${studentIds
              .map(() => "?")
              .join(", ")})`,
            studentIds
          );

          // **9️⃣ `users` tablosundan öğrencileri kaldır**
          if (studentUserIds.length > 0) {
            console.log("🟢 Bağlı öğrenciler users tablosundan siliniyor...");
            await db.execute(
              `DELETE FROM users WHERE id IN (${studentUserIds
                .map(() => "?")
                .join(", ")})`,
              studentUserIds
            );
          }
        }

        // **🔟 `parents` tablosundan veliyi kaldır**
        console.log("🟢 Veli parents tablosundan siliniyor...");
        await db.execute("DELETE FROM parents WHERE id = ?", [parentId]);

        // **1️⃣1️⃣ `users` tablosundan veliyi kaldır**
        console.log("🟢 Veli users tablosundan siliniyor...");
        await db.execute("DELETE FROM users WHERE id = ?", [id]);
      }
    }

    if (role === "student") {
      console.log("🟢 Öğrenci tespit edildi, silme işlemi başlatılıyor...");

      // **1️⃣ Öğrenciye bağlı `student_parents` ilişkilerini sil**
      console.log(
        "🟢 Öğrenciye bağlı `student_parents` ilişkileri siliniyor..."
      );
      await db.execute("DELETE FROM student_parents WHERE student_id = ?", [
        id,
      ]);

      // **2️⃣ Öğrenciye bağlı diğer bağımlı verileri sil**
      console.log("🟢 Öğrenciye bağlı `reviews` verileri siliniyor...");
      await db.execute("DELETE FROM reviews WHERE student_id = ?", [id]);

      console.log("🟢 Öğrenciye bağlı `messages` verileri siliniyor...");
      await db.execute(
        "DELETE FROM messages WHERE sender_id = ? OR receiver_id = ?",
        [id, id]
      );

      console.log("🟢 Öğrenciye bağlı `notifications` verileri siliniyor...");
      await db.execute("DELETE FROM notifications WHERE user_id = ?", [id]);

      // **3️⃣ Önce `students` tablosundan kaydı kaldır**
      console.log("🟢 Öğrenci `students` tablosundan siliniyor...");
      await db.execute("DELETE FROM students WHERE user_id = ?", [id]); // **Önemli düzeltme burada!**

      // **4️⃣ En son `users` tablosundan öğrenciyi kaldır**
      console.log("🟢 Öğrenci `users` tablosundan siliniyor...");
      await db.execute("DELETE FROM users WHERE id = ?", [id]);

      console.log("✅ Öğrenci başarıyla silindi.");
    }

    // **✅ Eğer kullanıcı bir öğretmense**
    if (role === "teacher") {
      console.log("🟢 Öğretmen tespit edildi, silme işlemi başlatılıyor...");

      // **1️⃣ Öğretmene bağlı `lessons` verilerini sil**
      console.log("🟢 Öğretmene bağlı `lessons` verileri siliniyor...");
      await db.execute("DELETE FROM lessons WHERE teacher_id = ?", [id]);

      // **2️⃣ Öğretmene bağlı `reviews` verilerini sil**
      console.log("🟢 Öğretmene bağlı `reviews` verileri siliniyor...");
      await db.execute(
        "DELETE FROM reviews WHERE student_id IN (SELECT id FROM students WHERE user_id = ?)",
        [id]
      );

      // **3️⃣ Öğretmene bağlı `messages` verilerini sil**
      console.log("🟢 Öğretmene bağlı `messages` verileri siliniyor...");
      await db.execute(
        "DELETE FROM messages WHERE sender_id = ? OR receiver_id = ?",
        [id, id]
      );

      // **4️⃣ Öğretmene bağlı `notifications` verilerini sil**
      console.log("🟢 Öğretmene bağlı `notifications` verileri siliniyor...");
      await db.execute("DELETE FROM notifications WHERE user_id = ?", [id]);

      // **5️⃣ Öğretmen `teachers` tablosundan kaldırılıyor**
      console.log("🟢 Öğretmen `teachers` tablosundan siliniyor...");
      await db.execute("DELETE FROM teachers WHERE user_id = ?", [id]);

      // **6️⃣ En son olarak `users` tablosundan öğretmeni kaldır**
      console.log("🟢 Öğretmen `users` tablosundan siliniyor...");
      await db.execute("DELETE FROM users WHERE id = ?", [id]);
    }

    console.log(
      `✅ [Tamamlandı] Silme işlemi tamamlandı: Kullanıcı ID = ${id}`
    );
    res
      .status(200)
      .json({ message: "User and related records deleted successfully" });
  } catch (error) {
    console.error("❌ [HATA] Kullanıcı silme hatası:", error.message);
    res.status(500).json({ error: `Silme işlemi başarısız: ${error.message}` });
  } finally {
    db.end();
  }
}
