import { createNotification } from "../services/notificationsService.js";

router.post("/send-message", async (req, res) => {
  const { senderId, receiverId, message } = req.body;

  // Mesajı kaydet
  const connection = await getConnection();
  try {
    await connection.execute(
      "INSERT INTO messages (sender_id, receiver_id, content) VALUES (?, ?, ?)",
      [senderId, receiverId, message]
    );

    // Alıcıya bildirim gönder
    await createNotification(receiverId, "Yeni Mesaj", "Bir mesajınız var!");

    res.json({ success: true });
  } catch (error) {
    console.error("Mesaj gönderme hatası:", error);
    res.status(500).json({ error: "Sunucu hatası" });
  } finally {
    connection.release();
  }
});
