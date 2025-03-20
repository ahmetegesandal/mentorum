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
  const userData = useContext(UserContext);
  const setUserData = userData?.setUserData;

  const [credit, setCredit] = useState(userData?.credit || 0);
  const [isLoading, setIsLoading] = useState(true);
  const [isManagedByParent, setIsManagedByParent] = useState(false);
  const [parentInfo, setParentInfo] = useState(null);

  useEffect(() => {
    if (!userData || !userData?.id) return;

    const fetchParentInfo = async () => {
      try {
        console.log("📡 API İsteği: get-parent-info-credit", userData?.id);
        const response = await axios.get(
          `/api/get-parent-info-credit?user_id=${userData?.id}`
        );
        console.log("✅ API Yanıtı: get-parent-info-credit", response.data);

        setIsManagedByParent(response.data.isManagedByParent);
        if (response.data.isManagedByParent) {
          setParentInfo({
            id: response.data.parent_id,
            name: response.data.parent_name,
            surname: response.data.parent_surname,
            credit: response.data.parent_credit,
          });
          setCredit(response.data.parent_credit);
        } else {
          console.log("📡 API İsteği: user-credit (Student)", userData?.id);
          const userCreditResponse = await axios.get(
            `/api/user-credit?user_id=${userData?.id}`
          );
          console.log(
            "✅ API Yanıtı: user-credit (Student)",
            userCreditResponse.data
          );
          setCredit(userCreditResponse.data.credit);
        }
      } catch (error) {
        console.error(
          "❌ Veli kontrolü veya kredi bilgisi alınırken hata oluştu:",
          error
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchParentInfo();
    const interval = setInterval(fetchParentInfo, 5000);

    return () => clearInterval(interval);
  }, [userData?.id]);

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
          <li className="nav-item me-2">
            {isManagedByParent && parentInfo
              ? `Veliniz: ${parentInfo.name} ${parentInfo.surname} - Kredi: ${credit} ₺`
              : `${credit} ₺`}
          </li>

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
