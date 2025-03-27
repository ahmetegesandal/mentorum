import express from "express";
import { createNotification, getNotificationsByUser, markAsRead, deleteNotification } from "../services/notificationsService.js";

const router = express.Router();

// Kullanıcının bildirimlerini getir
router.get("/:userId", async (req, res) => {
  try {
    const notifications = await getNotificationsByUser(req.params.userId);
    res.json(notifications);
  } catch (error) {
    console.error("Bildirimleri getirme hatası:", error);
    res.status(500).json({ error: "Sunucu hatası" });
  }
});

// Bildirimi okundu olarak işaretle
router.put("/:id/read", async (req, res) => {
  try {
    await markAsRead(req.params.id);
    res.json({ success: true });
  } catch (error) {
    console.error("Bildirim okundu hatası:", error);
    res.status(500).json({ error: "Sunucu hatası" });
  }
});

// Bildirimi sil
router.delete("/:id", async (req, res) => {
  try {
    await deleteNotification(req.params.id);
    res.json({ success: true });
  } catch (error) {
    console.error("Bildirim silme hatası:", error);
    res.status(500).json({ error: "Sunucu hatası" });
  }
});

// Bildirim oluştur
router.post("/", async (req, res) => {
  try {
    const { userId, title, message } = req.body;
    if (!userId || !title || !message) {
      return res.status(400).json({ error: "Eksik veri gönderildi" });
    }

    await createNotification(userId, title, message);
    res.json({ success: true, message: "Bildirim oluşturuldu" });
  } catch (error) {
    console.error("Bildirim oluşturma hatası:", error);
    res.status(500).json({ error: "Sunucu hatası" });
  }
});

export default router;