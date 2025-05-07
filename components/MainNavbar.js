import Logo from "../components/Logo";
import LanguageSwitcher from "../components/LanguageSwitcher";
import ThemeSwitcher from "../components/ThemeSwitcher";
import { useTranslation } from "next-i18next";

const MainNavbar = () => {
  const { t } = useTranslation();

  return (
    <nav className="layout-navbar shadow-none py-0 navbar-active">
      <div className="container">
        <div className="navbar navbar-expand-lg landing-navbar px-3 px-md-8">
          <div className="navbar-brand app-brand demo d-flex py-0 py-lg-2 me-4 me-xl-8">
            <button
              className="navbar-toggler border-0 px-0 me-4"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <i className="ti ti-menu-2 ti-lg align-middle text-heading fw-medium"></i>
            </button>

            <a href="/" className="app-brand-link">
              <Logo w={48} h={48} />
            </a>
          </div>

          <div
            className="collapse navbar-collapse landing-nav-menu"
            id="navbarSupportedContent"
          >
            <button
              className="navbar-toggler border-0 text-heading position-absolute end-0 top-0 scaleX-n1-rtl"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <i className="ti ti-x ti-lg"></i>
            </button>
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <a className="nav-link fw-medium" aria-current="page" href="/">
                  Anasayfa
                </a>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle fw-medium"
                  href="#"
                  id="featuresDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Dropdown
                </a>
                <ul
                  className="dropdown-menu"
                  aria-labelledby="featuresDropdown"
                >
                  <li>
                    <a className="dropdown-item" href="#feature1">
                      Feature 1
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#feature2">
                      Feature 2
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#feature3">
                      Feature 3
                    </a>
                  </li>
                </ul>
              </li>

              <li className="nav-item">
                <a className="nav-link fw-medium" href="/contact">
                  İletişim
                </a>
              </li>
            </ul>
          </div>
          <div className="landing-menu-overlay d-lg-none"></div>

          <ul className="navbar-nav flex-row align-items-center ms-auto">
            <li className="nav-item dropdown-style-switcher dropdown me-2 me-xl-1">
              <a
                className="nav-link dropdown-toggle hide-arrow"
                href="javascript:void(0);"
                data-bs-toggle="dropdown"
              >
                <i className="ti ti-lg"></i>
              </a>
              <ul className="dropdown-menu dropdown-menu-end dropdown-styles">
                <li>
                  <a
                    className="dropdown-item"
                    href="javascript:void(0);"
                    data-theme="light"
                  >
                    <span className="align-middle">
                      <i className="ti ti-sun me-3"></i>Light
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    className="dropdown-item"
                    href="javascript:void(0);"
                    data-theme="dark"
                  >
                    <span className="align-middle">
                      <i className="ti ti-moon-stars me-3"></i>Dark
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    className="dropdown-item"
                    href="javascript:void(0);"
                    data-theme="system"
                  >
                    <span className="align-middle">
                      <i className="ti ti-device-desktop-analytics me-3"></i>
                      System
                    </span>
                  </a>
                </li>
              </ul>
            </li>

            <li className="nav-item dropdown-language dropdown">
              <a
                className="nav-link btn btn-text-secondary btn-icon rounded-pill dropdown-toggle hide-arrow"
                href=""
                data-bs-toggle="dropdown"
              >
                <i className="ti ti-language rounded-circle ti-md"></i>
              </a>
              <ul className="dropdown-menu dropdown-menu-end">
                <LanguageSwitcher />
              </ul>
            </li>

            <li className="nav-item dropdown-language dropdown">
              <a
                className="nav-link btn btn-text-secondary btn-icon rounded-pill dropdown-toggle hide-arrow"
                href=""
                data-bs-toggle="dropdown"
              >
                <i className="ti ti-sun ti-md rounded-circle ti-md"></i>
              </a>
              <ul className="dropdown-menu dropdown-menu-end">
                <ThemeSwitcher />
              </ul>
            </li>

            <li>
              <a href="/sign-in" className="btn btn-primary" target="_blank">
                <span className="tf-icons ti ti-login scaleX-n1-rtl me-md-1"></span>
                <span className="d-none d-md-block">{t("MainNavLogin")} </span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default MainNavbar;
