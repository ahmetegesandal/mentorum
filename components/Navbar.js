import { useLayout } from "../contexts/LayoutContext";
import LanguageSwitcher from "../components/LanguageSwitcher";
import ThemeSwitcher from "./ThemeSwitcher";
import NavProfileTab from "./NavProfileTab";
import NavNotificationsTab from "./NavNotificationsTab";
import { UserContext } from "../contexts/UserContext";
import { useContext, useEffect, useState } from "react";
import axios from "axios";

const Navbar = () => {
  const { isMenuExpanded, toggleMenu } = useLayout();

  // 🔥 `userData` doğrudan tanımlandı (destructuring YOK)
  const userData = useContext(UserContext);
  const setUserData = userData?.setUserData; // `setUserData` varsa al, yoksa hata vermesin

  const [credit, setCredit] = useState(userData?.credit || 0); // 🔥 Lokal state
  const [isLoading, setIsLoading] = useState(true); // 🔥 Yüklenme durumu

  useEffect(() => {
    // 🔥 Eğer `userData` yüklenmemişse API çağrısı yapma
    if (!userData || !userData.id) return;

    const fetchCredit = async () => {
      try {
        const response = await axios.get(
          `/api/user-credit?user_id=${userData.id}`
        );
        if (response.data.credit !== undefined) {
          setCredit(response.data.credit); // 🔥 Lokal state güncelle
          if (setUserData) {
            setUserData((prev) => ({ ...prev, credit: response.data.credit })); // 🔥 Context güncelle
          }
          setIsLoading(false); // ✅ Yüklenme tamamlandı
        }
      } catch (error) {
        console.error("❌ Kullanıcı kredisi çekilemedi:", error);
      }
    };

    fetchCredit();
    const interval = setInterval(fetchCredit, 5000); // 🔥 Her 5 saniyede güncelle

    return () => clearInterval(interval); // 🔥 Bellek sızıntısını önlemek için temizle
  }, [userData?.id, setUserData]); // 🔥 Hata almamak için `?.` kullanıldı

  // 🔥 Eğer `userData` yüklenmemişse, geçici bir yükleniyor mesajı göster
  if (!userData || isLoading) {
    return (
      <nav className="layout-navbar container-xxl navbar navbar-expand-xl navbar-detached align-items-center bg-navbar-theme">
        <div
          className="navbar-nav-right d-flex align-items-center"
          id="navbar-collapse"
        >
          <ul className="navbar-nav flex-row align-items-center ms-auto">
            <li className="nav-item me-1">Yükleniyor...</li>
          </ul>
        </div>
      </nav>
    );
  }

  return (
    <nav
      className="layout-navbar container-xxl navbar navbar-expand-xl navbar-detached align-items-center bg-navbar-theme"
      id="layout-navbar"
    >
      <div className="layout-menu-toggle navbar-nav align-items-xl-center me-3 me-xl-0 d-xl-none">
        <a
          className="nav-item nav-link px-0 me-xl-4"
          href="#"
          onClick={toggleMenu}
        >
          <i
            className={`ti ${isMenuExpanded ? "ti-x" : "ti-menu-2"} ti-md`}
          ></i>
        </a>
      </div>

      <div
        className="navbar-nav-right d-flex align-items-center"
        id="navbar-collapse"
      >
        <ul className="navbar-nav flex-row align-items-center ms-auto">
          <li className="nav-item me-1">{credit} ₺</li>

          <li className="nav-item dropdown-language dropdown">
            <a
              className="nav-link btn btn-text-secondary btn-icon rounded-pill dropdown-toggle hide-arrow"
              data-bs-toggle="dropdown"
            >
              <i className="ti ti-language rounded-circle ti-md"></i>
            </a>
            <ul className="dropdown-menu dropdown-menu-end">
              <LanguageSwitcher />
            </ul>
          </li>

          <li className="nav-item dropdown-style-switcher dropdown">
            <a
              className="nav-link btn btn-text-secondary btn-icon rounded-pill dropdown-toggle hide-arrow"
              data-bs-toggle="dropdown"
            >
              <i className="ti ti-sun ti-md"></i>
            </a>
            <ul className="dropdown-menu dropdown-menu-end dropdown-styles">
              <ThemeSwitcher />
            </ul>
          </li>

          <NavNotificationsTab />
          <NavProfileTab />
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
