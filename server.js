const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const mysql = require("mysql2/promise"); // ✅ Promise tabanlı MySQL kullan

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

// ✅ MySQL Bağlantı Havuzu
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "my_auth_db",
  waitForConnections: true,
  connectionLimit: 10, // Maksimum 10 bağlantı kullan
  queueLimit: 0,
});

// ✅ Havuzdan bağlantı almak için yardımcı fonksiyon
async function getConnection() {
  return await pool.getConnection();
}

// 📌 Kullanıcıyı offline yap
async function setUserOffline(userId) {
  if (!userId) return;
  let db;
  try {
    db = await getConnection();
    await db.execute("UPDATE users SET is_online = 0 WHERE id = ?", [userId]);
    console.log(`🟡 Kullanıcı offline yapıldı: ${userId}`);
  } catch (error) {
    console.error("❌ Kullanıcı offline durumu güncellenemedi:", error);
  } finally {
    if (db) db.release();
  }
}

// 📌 Kullanıcıyı online yap
async function setUserOnline(userId) {
  if (!userId) return;
  let db;
  try {
    db = await getConnection();
    await db.execute("UPDATE users SET is_online = 1 WHERE id = ?", [userId]);
    console.log(`✅ Kullanıcı ${userId} online yapıldı.`);
  } catch (error) {
    console.error("🔴 Kullanıcı online durumu güncellenemedi:", error);
  } finally {
    if (db) db.release();
  }
}

// 📌 Socket.io Bağlantı Yönetimi
io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId; // Kullanıcı ID'yi doğrudan bağlantıdan al
  console.log(`🟢 Yeni kullanıcı bağlandı: ${socket.id}, UserID: ${userId}`);

  if (userId) {
    socket.userId = userId;
    setUserOnline(userId);
  } else {
    console.log("❌ Hata: WebSocket bağlantısında userId bulunamadı.");
  }

  // Kullanıcı bir odaya katılır
  socket.on("joinRoom", (data) => {
    const roomName = getRoomName(data.sender_id, data.receiver_id);
    socket.join(roomName);
    console.log(
      `📩 Kullanıcı ${data.sender_id}, oda ${roomName} içine katıldı`
    );
  });

  // Mesaj gönderme
  socket.on("sendMessage", async (data) => {
    const roomName = getRoomName(data.sender_id, data.receiver_id);
    io.to(roomName).emit("receiveMessage", data);
  
    try {
      console.log("📨 Gelen mesaj verisi:", JSON.stringify(data, null, 2));
      const db = await getConnection();
  
      let senderName = data.sender_name;
  
      // Eğer sender_name boşsa, veritabanından al
      if (!senderName) {
        console.log("🔎 Veritabanından kullanıcı adı sorgulanıyor...");
        const [senderRows] = await db.execute(
          "SELECT name, surname FROM users WHERE id = ?",
          [data.sender_id]
        );
        senderName =
          senderRows.length && senderRows[0].name && senderRows[0].surname
            ? `${senderRows[0].name} ${senderRows[0].surname}`
            : `Bilinmeyen (${data.sender_id})`;
      }
  
      console.log("📛 Bildirime yazılacak isim:", senderName);
  
      const title = "Yeni Mesaj";
      const message = `📨 ${senderName} size mesaj gönderdi.`;
  
      const [insertRes] = await db.execute(
        "INSERT INTO notifications (user_id, title, message, is_read) VALUES (?, ?, ?, 0)",
        [data.receiver_id, title, message]
      );
  
      console.log("🆕 Bildirim eklendi, insertId:", insertRes.insertId);
  
      io.to(data.receiver_id.toString()).emit("newNotification", {
        id: insertRes.insertId,
        user_id: data.receiver_id,
        title,
        message,
        is_read: 0,
        created_at: new Date().toISOString(),
      });
    } catch (err) {
      console.error("🔴 Bildirim gönderilirken hata:", err);
    }
  });
  

  // Kullanıcı çıkış yaptığında offline yap
  socket.on("disconnect", () => {
    console.log(`❌ Kullanıcı bağlantıyı kapattı: ${socket.id}`);

    if (socket.userId) {
      console.log(`🔴 Kullanıcı ${socket.userId} bağlantıyı kesti.`);
      setUserOffline(socket.userId);
      io.emit("onlineStatus", { userId: socket.userId, isOnline: false });
      socket.userId = null; // Kullanıcıyı temizle
    } else {
      console.log("❌ socket.userId tanımlı değil, offline yapılmadı.");
    }
  });
});

// 📌 Kullanıcıların sohbette oluşturacağı benzersiz oda isimleri
function getRoomName(senderId, receiverId) {
  return senderId < receiverId
    ? `${senderId}-${receiverId}`
    : `${receiverId}-${senderId}`;
}

// 📌 Online Kullanıcıları Getir API
app.get("/online-users", async (req, res) => {
  let db;
  try {
    db = await getConnection();
    const [results] = await db.execute(
      "SELECT id, username FROM users WHERE is_online = 1"
    );
    res.json(results);
  } catch (error) {
    console.error("❌ Online kullanıcıları çekerken hata oluştu:", error);
    res.status(500).json({ error: "Veritabanı hatası" });
  } finally {
    if (db) db.release();
  }
});

// 📌 Sunucuyu başlat
server.listen(3001, () => {
  console.log("🚀 WebSocket Sunucu 3001 portunda çalışıyor...");
});

module.exports = { getConnection, setUserOffline, setUserOnline };
