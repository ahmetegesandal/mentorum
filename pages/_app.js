import { useEffect, useState } from "react";
import { ThemeProvider } from "../contexts/ThemeContext";
import Layout from "../components/Layout";
import { LayoutProvider } from "../contexts/LayoutContext";
import { appWithTranslation } from "next-i18next";
import DatabaseStatus from "../components/DatabaseStatus";
import Preloader from "../components/Preloader";
import { useRouter } from "next/router";
import { UserProvider } from "../contexts/UserContext";
import GlobalLogoutHandler from "../components/GlobalLogoutHandler";

// Global CSS Dosyaları

<<<<<<< HEAD

// Kütüphane CSS Dosyaları
import "../styles/libs/perfect-scrollbar/perfect-scrollbar.css";
import "../styles/libs/typeahead-js/typeahead.css";
import "../styles/libs/datatables-bs5/datatables.bootstrap5.css";
import "../styles/libs/datatables-responsive-bs5/responsive.bootstrap5.css";
import "../styles/libs/datatables-buttons-bs5/buttons.bootstrap5.css";
import "../styles/libs/apex-charts/apex-charts.css";
=======
import "../styles/fonts/tabler-icons.css";
import "../styles/demo.css";
>>>>>>> 11b4d21 (takvim fixleri)

// Sayfa Bazlı CSS
import "../styles/pages/page-auth.css";
import "../styles/pages/page-profile.css";
import "../styles/pages/page-misc.css";
import "../styles/pages/app-academy.css";
import "../styles/pages/app-chat.css";
import "../styles/Calendar.css";

import "../styles/rtl/preloader.css";

import "../styles/rtl/custom.css";

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
              new Promise((resolve) => setTimeout(resolve, 500)), // CSS yüklenmesini beklemek için ekstra süre
            ]).then(() => {
              setLoading(false);
            });
          });
        }
      }, 1000); // En az 1 saniye Preloader'ı göster
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

  // Bootstrap JS'i yalnızca tarayıcı ortamında yükle
  useEffect(() => {
    if (typeof window !== "undefined") {
      import("bootstrap/dist/js/bootstrap.bundle.min.js").catch((err) =>
        console.error("Bootstrap JS yüklenirken hata oluştu:", err)
      );
    }
  }, []);

  // Dinamik CSS yükleme (Ana sayfa için özel CSS)
  useEffect(() => {
    if (router.pathname === "/" || router.pathname === "/contact") {
      import("../styles/pages/front-page.css");
      import("../styles/pages/front-page-landing.css");
    }
  }, [router.pathname]);

  return (
    <UserProvider>
      {/* Kullanıcı bilgisini her yerden erişilebilir hale getiriyoruz */}
      <ThemeProvider>
        <LayoutProvider>
          {loading ? (
            <Preloader /> // Sayfa yüklenene kadar Preloader göster
          ) : (
            <Layout>
              <DatabaseStatus />
              <GlobalLogoutHandler userId={pageProps.userId} />
              <Component {...pageProps} />
            </Layout>
          )}
        </LayoutProvider>
      </ThemeProvider>
    </UserProvider>
  );


}

export default appWithTranslation(MyApp);
