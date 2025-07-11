import { useEffect, useRef, useContext } from "react";
import { io } from "socket.io-client";
import { UserContext } from "../contexts/UserContext";
import { useRouter } from "next/router";

const GlobalLogoutHandler = () => {
  const socketRef = useRef(null);
  const userData = useContext(UserContext);
  const userId = userData?.id;
  const router = useRouter();

  // Eğer sayfa '/sign-in' ise, WebSocket bağlantısını kurma
  if (
    router.pathname === "/sign-in" ||
    router.pathname === "/" ||
    router.pathname === "/404" ||
    router.pathname === "/register" ||
    router.pathname === "/contact" ||
    router.pathname === "/forgot-password" ||
    router.pathname === "/verify-2fa" ||
    router.pathname === "/how-to-work" ||
    router.pathname === "/mento-class" ||
    router.pathname === "/course-summaries" ||
    router.pathname === "/mlessons"
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

    //console.log(`🔗 WebSocket bağlantısı açılıyor... (userId: ${userId})`);

    socketRef.current = io("http://localhost:3001", {
      query: {
        userId: userId, // Geçerli bir userId gönderilmeli
      },
    });

    socketRef.current.on("connect", () => {
      //console.log("✅ WebSocket bağlantısı açıldı.");
    });

    socketRef.current.on("disconnect", () => {
      //console.log("❌ WebSocket bağlantısı kapandı.");
    });

    return () => {
      if (socketRef.current) {
        //console.log("🔌 WebSocket bağlantısı kapatılıyor...");
        socketRef.current.disconnect();
      }
    };
  }, [userId]); // useEffect her zaman çağrılacak, ama userId yoksa erken çıkış yapacak!

  return null; // **Hata olmaması için her zaman bir şey return edilmeli**
};

export default GlobalLogoutHandler;
