const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("New client connected:", socket.id);

  // Kullanıcı kaydını yap ve odasına katıl
  socket.on("register", (userId) => {
    console.log(`User ${userId} registered with socket ID ${socket.id}`);
    socket.userId = userId; // Kullanıcı ID'sini sakla
  });

  // Mesaj göndermek için kullanıcının doğru odasına iletme
  socket.on("sendMessage", (data) => {
    const roomName = getRoomName(data.sender_id, data.receiver_id); // Oda ismini oluştur
    console.log(`Sending message to room: ${roomName}`);
    io.to(roomName).emit("receiveMessage", data); // Mesajı yalnızca doğru odadaki kullanıcılara gönder
  });

  // Room'a katılma: Her kullanıcı doğru odaya katılmalı
  socket.on("joinRoom", (data) => {
    const roomName = getRoomName(data.sender_id, data.receiver_id);
    socket.join(roomName); // Kullanıcıyı odaya kat
    console.log(`User ${data.sender_id} joined room ${roomName}`);
  });

  // Kullanıcı bağlantısı kesildiğinde room bilgilerini temizle
  socket.on("disconnect", () => {
    console.log(`User ${socket.userId} disconnected`);
  });
});

// Sender ve Receiver'a göre benzersiz oda ismi oluştur
function getRoomName(senderId, receiverId) {
  // Oda ismini sender_id ve receiver_id'yi sıralayarak oluşturuyoruz.
  return senderId < receiverId
    ? `${senderId}-${receiverId}`
    : `${receiverId}-${senderId}`;
}

server.listen(3001, () => {
  console.log("WebSocket Server running on port 3001");
});
