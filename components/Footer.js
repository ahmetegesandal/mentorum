import Logo from "../components/Logo";
import { useTranslation } from "next-i18next";

const MainNavbar = () => {
  const { t } = useTranslation("common");
  return (
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
              {t("footerDesc")}
             </p>
            </div>
            <div className="col-lg-2 col-md-4 col-sm-6">
              <h6 className="footer-title mb-6 fs-5"> {t("footerMentorumAbaout")}</h6>
              <ul className="list-unstyled">
                <li className="mb-4">
                  <a
                    href="../vertical-menu-template/"
                    target="_blank"
                    className="footer-link"
                  >
                    {t("WhoWeAre")}
                  </a>
                </li>
                <li className="mb-4">
                  <a
                    href="../horizontal-menu-template/"
                    target="_blank"
                    className="footer-link"
                  >
                    {t("Career")}
                  </a>
                </li>
                <li className="mb-4">
                  <a
                    href="../vertical-menu-template-bordered/"
                    target="_blank"
                    className="footer-link"
                  >
                    {t("NewsCenter")}
                  </a>
                </li>
                <li className="mb-4">
                  <a
                    href="../vertical-menu-template-semi-dark/"
                    target="_blank"
                    className="footer-link"
                  >
                    {t("Prices")}
                  </a>
                </li>
                <li className="mb-4">
                  <a
                    href="../vertical-menu-template-dark/"
                    target="_blank"
                    className="footer-link"
                  >
                    {t("StudentRules")}
                  </a>
                </li>
              </ul>
            </div>
            {/** <div className="col-lg-2 col-md-4 col-sm-6">
              <h6 className="footer-title mb-6 fs-5"> {t("footerMentorumAbaout")}</h6>
              <ul className="list-unstyled">
                <li className="mb-4">
                  <a
                    href="../vertical-menu-template/"
                    target="_blank"
                    className="footer-link"
                  >
                    {t("WhoWeAre")}
                  </a>
                </li>
                <li className="mb-4">
                  <a
                    href="../horizontal-menu-template/"
                    target="_blank"
                    className="footer-link"
                  >
                    {t("Career")}
                  </a>
                </li>
                <li className="mb-4">
                  <a
                    href="../vertical-menu-template-bordered/"
                    target="_blank"
                    className="footer-link"
                  >
                    {t("NewsCenter")}
                  </a>
                </li>
                <li className="mb-4">
                  <a
                    href="../vertical-menu-template-semi-dark/"
                    target="_blank"
                    className="footer-link"
                  >
                    {t("Prices")}
                  </a>
                </li>
                <li className="mb-4">
                  <a
                    href="../vertical-menu-template-dark/"
                    target="_blank"
                    className="footer-link"
                  >
                    {t("StudentRules")}
                  </a>
                </li>
              </ul>
            </div> */}
            <div className="col-lg-2 col-md-4 col-sm-6">
              <h6 className="footer-title mb-6 fs-5">Pages</h6>
              <ul className="list-unstyled">
                <li className="mb-4">
                  <a href="pricing-page.html" className="footer-link">
                    {t("Reviews")}
                  </a>
                </li>
                <li className="mb-4">
                  <a href="payment-page.html" className="footer-link">
                    {t("CustomerService")}
                    <span className="badge bg-primary ms-2"></span>
                  </a>
                </li>
                <li className="mb-4">
                  <a href="checkout-page.html" className="footer-link">
                    {t("FAQ")}
                  </a>
                </li>
                <li className="mb-4">
                  <a href="help-center-landing.html" className="footer-link">
                    {t("Contact")}
                  </a>
                </li>
                <li className="mb-4">
                  <a
                    href="../vertical-menu-template/auth-login-cover.html"
                    target="_blank"
                    className="footer-link"
                  >
                    {t("freeLesson")}
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
              <img src="img/front-pages/icons/twitter.svg" alt="twitter icon" />
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
  );
};

export default MainNavbar;
