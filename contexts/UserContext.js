import { createContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import jwt from "jsonwebtoken";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const router = useRouter();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!router.isReady) return;

    // Eğer kullanıcı "/"" sayfasındaysa yetkilendirme kontrolünü atla
    if (
      router.pathname === "/" ||
      router.pathname === "/register" ||
      router.pathname === "/404"
    ) {
      setLoading(false);
      return;
    }

    const token = localStorage.getItem("token");

    if (!token) {
      router.replace("/sign-in");
      setLoading(false);
      return;
    }

    try {
      const decoded = jwt.decode(token);
      if (!decoded) {
        localStorage.removeItem("token");
        router.replace("/sign-in");
        setLoading(false);
        return;
      }

      const fetchUserData = async () => {
        try {
          const response = await fetch(`/api/users/${decoded.userId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (!response.ok) {
            throw new Error("Kullanıcı doğrulanamadı.");
          }

          const data = await response.json();
          setUserData(data);
        } catch (error) {
          localStorage.removeItem("token");
          router.replace("/sign-in");
        } finally {
          setLoading(false);
        }
      };

      fetchUserData();
    } catch (err) {
      localStorage.removeItem("token");
      router.replace("/sign-in");
      setLoading(false);
    }
  }, [router.isReady, router.pathname]); // router.pathname eklendi

  return (
    <UserContext.Provider value={userData}>
      {!loading && children}
    </UserContext.Provider>
  );
};
