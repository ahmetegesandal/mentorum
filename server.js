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
  socket.on("sendMessage", (data) => {
    const roomName = getRoomName(data.sender_id, data.receiver_id);
    console.log(`📤 Mesaj ${roomName} odasına gönderildi.`);
    io.to(roomName).emit("receiveMessage", data);
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
