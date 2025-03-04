import { useEffect, useState } from "react";
import { ThemeProvider } from "../contexts/ThemeContext";
import Layout from "../components/Layout";
import { LayoutProvider } from "../contexts/LayoutContext";
import { appWithTranslation } from "next-i18next";
import DatabaseStatus from "../components/DatabaseStatus";
import Preloader from "../components/Preloader";
import { useRouter } from "next/router";
import { UserProvider } from "../contexts/UserContext";

// Global CSS Dosyaları
import "../styles/fonts/fontawesome.css";
import "../styles/fonts/tabler-icons.css";
import "../styles/fonts/flag-icons.css";
import "../styles/demo.css";

// Kütüphane CSS Dosyaları
import "../styles/libs/perfect-scrollbar/perfect-scrollbar.css";
import "../styles/libs/typeahead-js/typeahead.css";
import "../styles/libs/datatables-bs5/datatables.bootstrap5.css";
import "../styles/libs/datatables-responsive-bs5/responsive.bootstrap5.css";
import "../styles/libs/datatables-buttons-bs5/buttons.bootstrap5.css";
import "../styles/libs/apex-charts/apex-charts.css";

// Sayfa Bazlı CSS
import "../styles/pages/page-auth.css";
import "../styles/pages/page-profile.css";
import "../styles/pages/page-misc.css";
import "../styles/pages/app-academy.css";
import "../styles/pages/app-chat.css";
import "../styles/Calendar.css";

import "../styles/rtl/preloader.css"; // Preloader stilini eklemeyi unutma

import "../styles/rtl/custom.css"; // Preloader stilini eklemeyi unutma

function MyApp({ Component, pageProps }) {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Sayfa yüklendiğinde preloader'ı kaldır
  useEffect(() => {
    // Sayfa yüklendiğinde belirli bir süre sonra Preloader'ı kaldır
    const handleComplete = () => {
      setTimeout(() => {
        //console.log("✅ Sayfa yüklendi, Preloader kaldırılıyor...");
        setLoading(false);
      }, 500); // Preloader minimum 2 saniye görünecek
    };

    if (document.readyState === "complete") {
      handleComplete();
    } else {
      window.addEventListener("load", handleComplete);
    }

    return () => {
      window.removeEventListener("load", handleComplete);
    };
  }, []);

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
    if (router.pathname === "/") {
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
              <Component {...pageProps} />
            </Layout>
          )}
        </LayoutProvider>
      </ThemeProvider>
    </UserProvider>
  );
}

export default appWithTranslation(MyApp);
