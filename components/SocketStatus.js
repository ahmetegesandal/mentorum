// components/SocketStatus.js
import { useEffect, useState } from "react";
import { io } from "socket.io-client";

let socket;

const SocketStatus = () => {
  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    socket = io("http://localhost:3001", {
      transports: ["websocket"],
      reconnectionAttempts: 3,
      timeout: 3000,
    });

    // İlk bağlantı durumu kontrolü
    socket.on("connect", () => {
      setIsConnected(true);
    });

    socket.on("connect_error", () => {
      setIsConnected(false);
    });

    socket.on("disconnect", () => {
      setIsConnected(false);
    });

    return () => {
      if (socket) socket.disconnect();
    };
  }, []);

  if (!isConnected) {
    return (
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          backgroundColor: "#000000ee",
          color: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "20px",
          fontWeight: "bold",
          zIndex: 9999,
        }}
      >
        ❌ WebSocket sunucusuna bağlanılamıyor!{" "}
        <strong style={{ marginLeft: 5 }}>Node.js</strong> terminalini başlatın.
      </div>
    );
  }

  return null;
};

export default SocketStatus;
