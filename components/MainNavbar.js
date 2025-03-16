import { useEffect } from "react";
import Logo from "../components/Logo";
import LanguageSwitcher from "../components/LanguageSwitcher";
import ThemeSwitcher from "../components/ThemeSwitcher";

const MainNavbar = () => {
  useEffect(() => {
    const dropdowns = document.querySelectorAll(".nav-item.dropdown");

    dropdowns.forEach((dropdown) => {
      dropdown.addEventListener("mouseenter", function () {
        this.querySelector(".dropdown-menu").classList.add("show");
      });

      dropdown.addEventListener("mouseleave", function () {
        this.querySelector(".dropdown-menu").classList.remove("show");
      });
    });
  }, []);

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
              <Logo />
            </a>
          </div>

          <div
            className="collapse navbar-collapse landing-nav-menu"
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav me-auto">
              {/* HOME Dropdown */}
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle fw-medium" href="#" role="button">
                  Nasıl Çalışır
                </a>
                <ul className="dropdown-menu">
                  <li><a className="dropdown-item" href="/">Ana Sayfa</a></li>
                  <li><a className="dropdown-item" href="/about">Hakkımızda</a></li>
                </ul>
              </li>

              {/* FEATURES Dropdown */}
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle fw-medium" href="#" role="button">
                  Features
                </a>
                <ul className="dropdown-menu">
                  <li><a className="dropdown-item" href="#feature1">Feature 1</a></li>
                  <li><a className="dropdown-item" href="#feature2">Feature 2</a></li>
                  <li><a className="dropdown-item" href="#feature3">Feature 3</a></li>
                </ul>
              </li>

              {/* TEAM Dropdown */}
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle fw-medium" href="#" role="button">
                  Team
                </a>
                <ul className="dropdown-menu">
                  <li><a className="dropdown-item" href="#team1">Ekibimiz</a></li>
                  <li><a className="dropdown-item" href="#team2">Referanslar</a></li>
                </ul>
              </li>
              <li className="nav-item">
                  <a className="nav-link fw-medium" href="/contact">
                    Derslerimiz
                  </a>
                </li>

              {/* FAQ Dropdown */}
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle fw-medium" href="#" role="button">
                  FAQ
                </a>
                <ul className="dropdown-menu">
                  <li><a className="dropdown-item" href="#faq1">Sık Sorulan Sorular</a></li>
                  <li><a className="dropdown-item" href="#faq2">Yardım Merkezi</a></li>
                </ul>
              </li>

              <li className="nav-item">
                  <a className="nav-link fw-medium" href="/contact">
                    Fiyatlarımız
                  </a>
                </li>

              {/* İLETİŞİM Dropdown */}
              <li className="nav-item">
        <a className="nav-link fw-medium" href="/contact">
          İletişime Geç
        </a>
            </li>
            </ul>
          </div>

          <ul className="navbar-nav flex-row align-items-center ms-auto">
            {/* Language Switcher */}
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

            {/* Theme Switcher */}
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

            {/* Login/Register */}
            <li>
              <a href="/sign-in" className="btn btn-primary" target="_blank">
                <span className="tf-icons ti ti-login scaleX-n1-rtl me-md-1"></span>
                <span className="d-none d-md-block">Login/Register</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default MainNavbar;