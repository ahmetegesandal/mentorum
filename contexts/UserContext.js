import { createContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import jwt from "jsonwebtoken";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const router = useRouter();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  const publicRoutes = [
    "/",
    "/register",
    "/404",
    "/contact",
    "/forgot-password",
    "/reset-password",
    "/verify-2fa",
    "/how-to-work",
    "/mento-class",
    "/course-summaries",
    "/mlessons",
    "/meeting"
  ];

  const publicRoutePrefixes = [
    "/blog"
  ];

  const isPublicRoute = (pathname) => {
    return (
      publicRoutes.includes(pathname) ||
      publicRoutePrefixes.some((prefix) => pathname.startsWith(prefix))
    );
  };

  useEffect(() => {
    if (!router.isReady) return;

    const pathname = router.pathname;
    if (isPublicRoute(pathname)) {
      setLoading(false);
      return;
    }

    const token = localStorage.getItem("token");
    const verified =
      typeof window !== "undefined"
        ? sessionStorage.getItem("2fa-verified")
        : null;

    if (!token || verified !== "true") {
      handleInvalidToken();
      return;
    }

    try {
      const decoded = jwt.decode(token);
      if (!decoded || !decoded.userId) {
        handleInvalidToken();
        return;
      }

      const fetchUser = async () => {
        try {
          const res = await fetch(`/api/users/${decoded.userId}`, {
            headers: { Authorization: `Bearer ${token}` },
          });

          if (!res.ok) throw new Error("Kullanıcı alınamadı.");
          const data = await res.json();

          if (!data?.id) throw new Error("Eksik kullanıcı.");

          setUserData(data);
          localStorage.setItem("userId", data.id);
        } catch {
          handleInvalidToken();
        } finally {
          setLoading(false);
        }
      };

      fetchUser();
    } catch {
      handleInvalidToken();
    }
  }, [router.isReady, router.pathname]);

  const handleInvalidToken = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    sessionStorage.removeItem("2fa-verified");
    router.replace("/sign-in");
    setLoading(false);
  };

  return (
    <UserContext.Provider value={userData}>
      {!loading && children}
    </UserContext.Provider>
  );
};