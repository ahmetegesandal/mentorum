import "../styles/fonts/tabler-icons.css";
import "../styles/demo.css";

import "../styles/pages/page-auth.css";
import "../styles/pages/page-profile.css";
import "../styles/pages/page-misc.css";
import "../styles/pages/app-academy.css";
import "../styles/pages/app-chat.css";


import ChatbotWidget from '../components/ChatbotWidget';

import "../styles/rtl/preloader.css";
import "../styles/rtl/custom.css";

import { useEffect, useState } from "react";
import { ThemeProvider } from "../contexts/ThemeContext";
import Layout from "../components/Layout";
import { LayoutProvider } from "../contexts/LayoutContext";
import { appWithTranslation } from "next-i18next";
import DatabaseStatus from "../components/DatabaseStatus";
import SocketStatus from "../components/SocketStatus";
import Preloader from "../components/Preloader";
import { useRouter } from "next/router";
import { UserProvider } from "../contexts/UserContext";
import GlobalLogoutHandler from "../components/GlobalLogoutHandler";
import ApprovalModal from "../components/ApprovalModal";

function MyApp({ Component, pageProps }) {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const handleFirstLoad = () => {
      setTimeout(() => {
        if (document.readyState === "complete") {
          requestAnimationFrame(() => {
            Promise.all([
              document.fonts.ready,
              new Promise((resolve) => setTimeout(resolve, 500)),
            ]).then(() => {
              setLoading(false);
            });
          });
        }
      }, 1000);
    };

    if (document.readyState === "complete") {
      handleFirstLoad();
    } else {
      window.addEventListener("load", handleFirstLoad);
    }

    return () => {
      window.removeEventListener("load", handleFirstLoad);
    };
  }, []);

  useEffect(() => {
    const handleStart = () => setLoading(true);
    const handleComplete = () => setLoading(false);

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  }, [router]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      import("bootstrap/dist/js/bootstrap.bundle.min.js").catch((err) =>
        console.error("Bootstrap JS yüklenirken hata oluştu:", err)
      );
    }
  }, []);

  useEffect(() => {
    const frontPages = [
      "/",
      "/contact",
      "/how-to-work",
      "/mento-class",
      "/course-summaries",
      "/mlessons"
    ];

    const frontPrefixes = ["/blog"];

    const isFrontPage =
      frontPages.includes(router.pathname) ||
      frontPrefixes.some((prefix) => router.pathname.startsWith(prefix));

    if (isFrontPage) {
      require("../styles/pages/front-page.css");
      require("../styles/pages/front-page-landing.css");
    }
  }, [router.pathname]);

  const excludedPaths = [
    "/", "/sign-in", "/register", "/forgot-password",
    "/verify-2fa", "/how-to-work", "/mento-class", "/course-summaries", "/mlessons", "/contact"
  ];
  
  const excludedPrefixes = ["/blog"];
  
  const shouldShowChatbot =
    !excludedPaths.includes(router.pathname) &&
    !excludedPrefixes.some((prefix) => router.pathname.startsWith(prefix));
  

  return (
    <UserProvider>
      <ThemeProvider>
        <LayoutProvider>
          {loading ? (
            <Preloader />
          ) : (
            <Layout>
              <DatabaseStatus />
              <SocketStatus />
              <GlobalLogoutHandler userId={pageProps.userId} />
              <ApprovalModal />
              <Component {...pageProps} />
              {shouldShowChatbot && <ChatbotWidget />} {}
            </Layout>
          )}
        </LayoutProvider>
      </ThemeProvider>
    </UserProvider>
  );
}

export default appWithTranslation(MyApp);
