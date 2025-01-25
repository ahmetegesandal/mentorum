import { useLayout } from "../contexts/LayoutContext";
import LanguageSwitcher from "../components/LanguageSwitcher";
import ThemeSwitcher from "./ThemeSwitcher";
import NavProfileTab from "./NavProfileTab";
import NavNotificationsTab from "./NavNotificationsTab";


const Navbar = () => {
  const { isMenuExpanded, toggleMenu } = useLayout();

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
          <li className="nav-item dropdown-language dropdown">
            <a
              className="nav-link btn btn-text-secondary btn-icon rounded-pill dropdown-toggle hide-arrow"
              href=""
              data-bs-toggle="dropdown"
            >
              <i className="ti ti-language rounded-circle ti-md"></i>
            </a>
            <ul className="dropdown-menu dropdown-menu-end">
              <LanguageSwitcher/>
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
              <ThemeSwitcher/>
            </ul>
          </li>


          <NavNotificationsTab/>

          <NavProfileTab/>
        </ul>
      </div>


    </nav>
  );
};

export default Navbar;
