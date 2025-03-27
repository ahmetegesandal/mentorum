import { getConnection } from "../config/db.js";

// Bildirim oluştur
export async function createNotification(userId, title, message) {
  const connection = await getConnection();
  try {
    await connection.execute(
      "INSERT INTO notifications (user_id, title, message) VALUES (?, ?, ?)",
      [userId, title, message]
    );
  } finally {
    connection.release();
  }
}

// Kullanıcının bildirimlerini getir
export async function getNotificationsByUser(userId) {
  const connection = await getConnection();
  try {
    const [rows] = await connection.execute(
      "SELECT * FROM notifications WHERE user_id = ? ORDER BY created_at DESC",
      [userId]
    );
    return rows;
  } finally {
    connection.release();
  }
}

// Bildirimi okundu olarak işaretle
export async function markAsRead(id) {
  const connection = await getConnection();
  try {
    await connection.execute("UPDATE notifications SET is_read = TRUE WHERE id = ?", [id]);
  } finally {
    connection.release();
  }
}

// Bildirimi sil
export async function deleteNotification(id) {
  const connection = await getConnection();
  try {
    await connection.execute("DELETE FROM notifications WHERE id = ?", [id]);
  } finally {
    connection.release();
  }
}
