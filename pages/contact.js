import Logo from "../components/Logo";
import LanguageSwitcher from "../components/LanguageSwitcher";
import ThemeSwitcher from "../components/ThemeSwitcher";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";

const Home = () => {
  const { t } = useTranslation("common");
  const router = useRouter();

  return (
    <>
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
                  <a
                    className="nav-link fw-medium"
                    aria-current="page"
                    href="landing-page.html#landingHero"
                  >
                    Home
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link fw-medium"
                    href="landing-page.html#landingFeatures"
                  >
                    Features
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link fw-medium"
                    href="landing-page.html#landingTeam"
                  >
                    Team
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link fw-medium"
                    href="landing-page.html#landingFAQ"
                  >
                    FAQ
                  </a>
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
                  <span className="d-none d-md-block">Login/Register</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div data-bs-spy="scroll" className="scrollspy-example">
        <section id="landingFeatures" className="section-py landing-features">
          <div className="container">
            <div className="text-center mb-4">
              <span className="badge bg-label-primary">Useful Features</span>
            </div>
            <h4 className="text-center mb-1">
              <span className="position-relative fw-extrabold z-1">
                Everything you need
                <img
                  src="img/front-pages/icons/section-title-icon.png"
                  alt="laptop charging"
                  className="section-title-img position-absolute object-fit-contain bottom-0 z-n1"
                />
              </span>
              to start your next project
            </h4>
            <p className="text-center mb-12">
              Not just a set of tools, the package includes ready-to-deploy
              conceptual application.
            </p>
            <div className="features-icon-wrapper row gx-0 gy-6 g-sm-12">
              <div className="col-lg-4 col-sm-6 text-center features-icon-box">
                <div className="text-center mb-4">
                  <img
                    src="img/front-pages/icons/laptop.png"
                    alt="laptop charging"
                  />
                </div>
                <h5 className="mb-2">Quality Code</h5>
                <p className="features-icon-description">
                  Code structure that all developers will easily understand and
                  fall in love with.
                </p>
              </div>
              <div className="col-lg-4 col-sm-6 text-center features-icon-box">
                <div className="text-center mb-4">
                  <img
                    src="img/front-pages/icons/rocket.png"
                    alt="transition up"
                  />
                </div>
                <h5 className="mb-2">Continuous Updates</h5>
                <p className="features-icon-description">
                  Free updates for the next 12 months, including new demos and
                  features.
                </p>
              </div>
              <div className="col-lg-4 col-sm-6 text-center features-icon-box">
                <div className="text-center mb-4">
                  <img src="img/front-pages/icons/paper.png" alt="edit" />
                </div>
                <h5 className="mb-2">Stater-Kit</h5>
                <p className="features-icon-description">
                  Start your project quickly without having to remove
                  unnecessary features.
                </p>
              </div>
              <div className="col-lg-4 col-sm-6 text-center features-icon-box">
                <div className="text-center mb-4">
                  <img
                    src="img/front-pages/icons/check.png"
                    alt="3d select solid"
                  />
                </div>
                <h5 className="mb-2">API Ready</h5>
                <p className="features-icon-description">
                  Just change the endpoint and see your own data loaded within
                  seconds.
                </p>
              </div>
              <div className="col-lg-4 col-sm-6 text-center features-icon-box">
                <div className="text-center mb-4">
                  <img src="img/front-pages/icons/user.png" alt="lifebelt" />
                </div>
                <h5 className="mb-2">Excellent Support</h5>
                <p className="features-icon-description">
                  An easy-to-follow doc with lots of references and code
                  examples.
                </p>
              </div>
              <div className="col-lg-4 col-sm-6 text-center features-icon-box">
                <div className="text-center mb-4">
                  <img
                    src="img/front-pages/icons/keyboard.png"
                    alt="google docs"
                  />
                </div>
                <h5 className="mb-2">Well Documented</h5>
                <p className="features-icon-description">
                  An easy-to-follow doc with lots of references and code
                  examples.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>

      <footer className="landing-footer bg-body footer-text">
        <div className="footer-top position-relative overflow-hidden z-1">
          <img
            src="img/front-pages/backgrounds/footer-bg-light.png"
            alt="footer bg"
            className="footer-bg banner-bg-img z-n1"
            data-app-light-img="front-pages/backgrounds/footer-bg-light.png"
            data-app-dark-img="front-pages/backgrounds/footer-bg-dark.png"
          />
          <div className="container">
            <div className="row gx-0 gy-6 g-lg-10">
              <div className="col-lg-5">
                <a href="landing-page.html" className="app-brand-link mb-6">
                  <Logo />
                </a>
                <p className="footer-text footer-logo-description mb-6">
                  Most developer friendly & highly customisable Admin Dashboard
                  Template.
                </p>
              </div>
              <div className="col-lg-2 col-md-4 col-sm-6">
                <h6 className="footer-title mb-6">Demos</h6>
                <ul className="list-unstyled">
                  <li className="mb-4">
                    <a
                      href="../vertical-menu-template/"
                      target="_blank"
                      className="footer-link"
                    >
                      Vertical Layout
                    </a>
                  </li>
                  <li className="mb-4">
                    <a
                      href="../horizontal-menu-template/"
                      target="_blank"
                      className="footer-link"
                    >
                      Horizontal Layout
                    </a>
                  </li>
                  <li className="mb-4">
                    <a
                      href="../vertical-menu-template-bordered/"
                      target="_blank"
                      className="footer-link"
                    >
                      Bordered Layout
                    </a>
                  </li>
                  <li className="mb-4">
                    <a
                      href="../vertical-menu-template-semi-dark/"
                      target="_blank"
                      className="footer-link"
                    >
                      Semi Dark Layout
                    </a>
                  </li>
                  <li className="mb-4">
                    <a
                      href="../vertical-menu-template-dark/"
                      target="_blank"
                      className="footer-link"
                    >
                      Dark Layout
                    </a>
                  </li>
                </ul>
              </div>
              <div className="col-lg-2 col-md-4 col-sm-6">
                <h6 className="footer-title mb-6">Pages</h6>
                <ul className="list-unstyled">
                  <li className="mb-4">
                    <a href="pricing-page.html" className="footer-link">
                      Pricing
                    </a>
                  </li>
                  <li className="mb-4">
                    <a href="payment-page.html" className="footer-link">
                      Payment<span className="badge bg-primary ms-2">New</span>
                    </a>
                  </li>
                  <li className="mb-4">
                    <a href="checkout-page.html" className="footer-link">
                      Checkout
                    </a>
                  </li>
                  <li className="mb-4">
                    <a href="help-center-landing.html" className="footer-link">
                      Help Center
                    </a>
                  </li>
                  <li className="mb-4">
                    <a
                      href="../vertical-menu-template/auth-login-cover.html"
                      target="_blank"
                      className="footer-link"
                    >
                      Login/Register
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-bottom py-3 py-md-5">
          <div className="container d-flex flex-wrap justify-content-between flex-md-row flex-column text-center text-md-start">
            <div className="mb-2 mb-md-0"></div>
            <div>
              <a
                href="https://github.com/pixinvent"
                className="me-3"
                target="_blank"
              >
                <img src="img/front-pages/icons/github.svg" alt="github icon" />
              </a>
              <a
                href="https://www.facebook.com/pixinvents/"
                className="me-3"
                target="_blank"
              >
                <img
                  src="img/front-pages/icons/facebook.svg"
                  alt="facebook icon"
                />
              </a>
              <a
                href="https://twitter.com/pixinvents"
                className="me-3"
                target="_blank"
              >
                <img
                  src="img/front-pages/icons/twitter.svg"
                  alt="twitter icon"
                />
              </a>
              <a href="https://www.instagram.com/pixinvents/" target="_blank">
                <img
                  src="img/front-pages/icons/instagram.svg"
                  alt="google icon"
                />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}

export default Home;
