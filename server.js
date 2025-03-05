const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const mysql = require("mysql2");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

// ✅ MySQL bağlantısı
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "my_auth_db",
});

db.connect((err) => {
  if (err) {
    console.error("MySQL bağlantı hatası:", err);
  } else {
    console.log("✅ MySQL bağlantısı başarılı!");
  }
});

// 📌 Kullanıcıları offline yapmak için fonksiyon
function setUserOffline(userId) {
  if (!userId) return;
  db.query(
    "UPDATE users SET is_online = 0 WHERE id = ?",
    [userId],
    (err, result) => {
      if (err) {
        console.error("🔴 Kullanıcı offline durumu güncellenemedi:", err);
      } else {
        console.log(`🔴 Kullanıcı ${userId} offline yapıldı.`);
      }
    }
  );
}

// 📌 Kullanıcıları online yapmak için fonksiyon
function setUserOnline(userId) {
  if (!userId) return;
  db.query(
    "UPDATE users SET is_online = 1 WHERE id = ?",
    [userId],
    (err, result) => {
      if (err) {
        console.error("🔴 Kullanıcı online durumu güncellenemedi:", err);
      } else {
        console.log(`✅ Kullanıcı ${userId} online yapıldı.`);
      }
    }
  );
}

// 📌 Socket.io ile bağlantıları dinle
io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId; // Kullanıcı ID'yi doğrudan bağlantıdan al
  console.log(`🟢 Yeni kullanıcı bağlandı: ${socket.id}, UserID: ${userId}`);

  if (userId) {
    socket.userId = userId; // Kullanıcı ID'yi kaydet
    setUserOnline(userId);
  } else {
    console.log("❌ Hata: WebSocket bağlantısında userId bulunamadı.");
  }

  // Kullanıcı belirli bir sohbete katılır
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

      // Tüm kullanıcılara offline olduğunu bildir
      io.emit("onlineStatus", { userId: socket.userId, isOnline: false });

      // Kullanıcıyı çıkış yaptıktan sonra yeniden giriş yapmasını engelleyin
      // Ekstra bir kontrol ile sadece geçerli bir oturumda kullanıcıyı online yapın
      socket.userId = null; // Kullanıcıyı oturumdan çıkarıyoruz
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

// 📌 Tüm online kullanıcıları almak için API
app.get("/online-users", (req, res) => {
  db.query(
    "SELECT id, username FROM users WHERE is_online = 1",
    (err, results) => {
      if (err) {
        res.status(500).json({ error: "Veritabanı hatası" });
      } else {
        res.json(results);
      }
    }
  );
});

// 📌 Sunucuyu başlat
server.listen(3001, () => {
  console.log("🚀 WebSocket Sunucu 3001 portunda çalışıyor...");
});
