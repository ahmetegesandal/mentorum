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

    // Public routes where authentication isn't required
    const publicRoutes = [
      "/",
      "/register",
      "/404",
      "/contact",
      "/forgot-password",
    ];
    if (publicRoutes.includes(router.pathname)) {
      setLoading(false);
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      redirectToSignIn();
      return;
    }

    try {
      const decoded = jwt.decode(token);

      // Ensure the decoded token contains a valid userId
      if (!decoded || !decoded.userId) {
        handleInvalidToken();
        return;
      }

      const fetchUserData = async () => {
        try {
          const response = await fetch(`/api/users/${decoded.userId}`, {
            headers: { Authorization: `Bearer ${token}` },
          });

          if (!response.ok) {
            throw new Error("Kullanıcı doğrulanamadı.");
          }

          const data = await response.json();

          // Ensure user data contains an ID before setting it
          if (!data || !data.id) {
            throw new Error("Geçersiz kullanıcı verisi.");
          }

          setUserData(data);
          localStorage.setItem("userId", data.id);
        } catch (error) {
          handleInvalidToken();
        } finally {
          setLoading(false);
        }
      };

      fetchUserData();
    } catch (err) {
      handleInvalidToken();
    }
  }, [router.isReady, router.pathname]);

  // Function to handle invalid token scenarios
  const handleInvalidToken = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    redirectToSignIn();
  };

  // Redirects to sign-in page securely
  const redirectToSignIn = () => {
    router.replace("/sign-in");
    setLoading(false);
  };

  return (
    <UserContext.Provider value={userData}>
      {!loading && children}
    </UserContext.Provider>
  );
};
