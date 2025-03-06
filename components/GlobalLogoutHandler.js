import { useEffect, useRef, useContext } from "react";
import { io } from "socket.io-client";
import { UserContext } from "../contexts/UserContext";
import { useRouter } from "next/router"; // useRouter'ı import et

const GlobalLogoutHandler = () => {
  const socketRef = useRef(null);
  const userData = useContext(UserContext); // `useContext` her zaman çağrılmalı!
  const userId = userData?.id; // Eğer `userData` boşsa hata almamak için `?.` operatörünü kullan
  const router = useRouter(); // Geçerli sayfa yolunu almak için useRouter'ı kullanıyoruz

  // Eğer sayfa '/sign-in' ise, WebSocket bağlantısını kurma
  if (
    router.pathname === "/sign-in" ||
    router.pathname === "/" ||
    router.pathname === "/404" ||
    router.pathname === "/register"
  ) {
    return null; // '/sign-in' sayfasında WebSocket bağlantısı yapılmayacak
  }

  useEffect(() => {
    if (!userId) {
      console.warn(
        "⚠️ Uyarı: Kullanıcı giriş yapmamış, WebSocket bağlanmayacak."
      );
      return; // **Early return, ama useEffect yine çağrıldı!**
    }

    console.log(`🔗 WebSocket bağlantısı açılıyor... (userId: ${userId})`);

    socketRef.current = io("http://localhost:3001", {
      query: {
        userId: userId, // Geçerli bir userId gönderilmeli
      },
    });

    socketRef.current.on("connect", () => {
      console.log("✅ WebSocket bağlantısı açıldı.");
    });

    socketRef.current.on("disconnect", () => {
      console.log("❌ WebSocket bağlantısı kapandı.");
    });

    return () => {
      if (socketRef.current) {
        console.log("🔌 WebSocket bağlantısı kapatılıyor...");
        socketRef.current.disconnect();
      }
    };
  }, [userId]); // useEffect her zaman çağrılacak, ama userId yoksa erken çıkış yapacak!

  return null; // **Hata olmaması için her zaman bir şey return edilmeli**
};

export default GlobalLogoutHandler;
