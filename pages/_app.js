import { useEffect } from "react";
/* import "bootstrap/dist/css/bootstrap.min.css"; */

// Global CSS Dosyaları
import "../styles/fonts/fontawesome.css";
import "../styles/fonts/tabler-icons.css";
import "../styles/fonts/flag-icons.css";
import "../styles/rtl/core.css";
import "../styles/rtl/theme-default.css";
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
// import "../styles/pages/app-calendar.css";
import "../styles/Calendar.css";

// Layout ve Çeviri
import Layout from "../components/Layout";
import { LayoutProvider } from "../contexts/LayoutContext";
import { appWithTranslation } from "next-i18next";
import DatabaseStatus from "../components/DatabaseStatus";

import { useRouter } from "next/router";

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Bootstrap JS'i yalnızca tarayıcı ortamında yükle
      import("bootstrap/dist/js/bootstrap.bundle.min.js").catch((err) =>
        console.error("Bootstrap JS yüklenirken hata oluştu:", err)
      );
    }
  }, []);

  // Sayfaya özel CSS'leri dinamik olarak yükleme
  useEffect(() => {
    if (router.pathname === "/") {
      // Ana sayfa için özel CSS
      import("../styles/pages/front-page.css");
      import("../styles/pages/front-page-landing.css");
    }
  }, [router.pathname]);

  return (
    <LayoutProvider>
      <Layout>
        <DatabaseStatus />
        <Component {...pageProps} />
      </Layout>
    </LayoutProvider>
  );
}

export default appWithTranslation(MyApp);
