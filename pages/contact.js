import Logo from "../components/Logo";
import LanguageSwitcher from "../components/LanguageSwitcher";
import ThemeSwitcher from "../components/ThemeSwitcher";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import MainNavbar from "../components/MainNavbar";
import Footer from "../components/Footer"; // yeni footer kısmı

const Home = () => {
  const { t } = useTranslation("common");
  const router = useRouter();

  return (
    <>
      <MainNavbar />

      <div data-bs-spy="scroll" className="scrollspy-example">
        {/* bu kısımdan sonraki aşağı kısım değiştirilebilir */}
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

      <Footer />
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
