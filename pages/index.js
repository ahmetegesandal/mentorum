import Logo from "../components/Logo";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import SwiperComponent from "../components/SwiperComponent";
import { useRouter } from "next/router";
import HeroSection from "../components/HeroSection";
import Statistics from "../components/Statistics";
import MainNavbar from "../components/MainNavbar";
import Footer from "../components/Footer";
import Link from "next/link";

const Home = () => {
  const { t } = useTranslation("common");
  const router = useRouter();

  return (
    <>
      <MainNavbar />

      <HeroSection />
      <Statistics />

      <div data-bs-spy="scroll" className="scrollspy-example">
        <section id="landingFeatures" className="section-py landing-features">
          <div className="container">
            <h4 className="text-center mb-1">
              <span className="position-relative fw-extrabold z-1">
              {t("indexExperteacherMessg")}
              <img
                  src="img/front-pages/icons/section-title-icon.png"
                  alt="laptop charging"
                  className="section-title-img position-absolute object-fit-contain bottom-0 z-n1"
                />
              </span>
            </h4>
            <br></br>
            <p className="text-center mb-12 fs-5">
            {t("indexTeacherMessg2")}
            </p>

            <div className="features-icon-wrapper row gx-0 gy-6 g-sm-12">
         {[{
            img: "/img/backgrounds/math.svg",
            alt: "laptop charging",
            title: t("indexMathTitle"),
            description: t("indexMathDesc"),
            link: "/quality-code"
            }, {
             img: "/img/backgrounds/chem.svg",
             alt: "transition up",
             title:  t("indexChemTitle"),
             description: t("indexChemDesc"),
             link: "/continuous-updates"
            }, {
             img: "/img/backgrounds/geography.svg",
             alt: "edit",
             title: t("indexGeographyTitle"),
             description: t("indexGeographyDesc"),
             link: "/starter-kit"
            }, {
            img: "/img/backgrounds/biology.svg",
            alt: "3d select solid",
            title: t("indexBiologyTitle"),
            description: t("indexBiologyDesc"),
            link: "/api-ready"
            }, {
            img: "/img/backgrounds/physics.svg",
            alt: "lifebelt",
            title: t("indexPhysicsTitle"),
            description: t("indexPhysicsDesc"),
            link: "/excellent-support"
            }, {
            img: "/img/backgrounds/turkce.svg",
            alt: "google docs",
            title:t("indexTurcTitle"),
            description: t("indexTurcDesc"),
            link: "/well-documented"
            }].map((feature, index) => (
           <div key={index} className="col-lg-4 col-md-6 col-sm-12 text-center features-icon-box">
              <Link href={feature.link} className="d-block text-decoration-none">
                  <div className="text-center mb-3">
                    <img src={feature.img} alt={feature.alt} className="img-fluid icon-size" />
                  </div>
                    <h5 className="mb-2">{feature.title}</h5>
                    <p className="features-icon-description">{feature.description}</p>
              </Link>
          </div>
      ))}
        </div>
      </div>
    </section>

        <SwiperComponent />

        <section id="landingTeam" className="section-py ">
          <div className="container">
            <div className="text-center mb-4">
              <span className="badge bg-label-primary">{t("indexTeamDesc1")}</span>
            </div>
            <h4 className="text-center mb-1">
              <span className="position-relative fw-extrabold z-1">
              {t("indexTeamProf") } 
                <img
                  src="img/front-pages/icons/section-title-icon.png"
                  alt="laptop charging"
                  className="section-title-img position-absolute object-fit-contain bottom-0 z-n1"
                />
              </span>
              <span className="ms-1">{t("indexTeamDesc2") } </span>
            </h4>
            <p className="text-center mb-md-11 pb-0 pb-xl-12 fs-5">
              {t("indexTeamDesc3")}
            </p>

            {/* Ekip Üyeleri */}
            <div className="row g-4 justify-content-center">
              {[
                {
                  name: "Ahmet Ege Sandal",
                  role: "Lead Developer",
                  image: "ege.jpg",
                },
                {
                  name: "Niyazi Emir Akdemir",
                  role: "Developer",
                  image: "emir.jpg",
                },
                {
                  name: "Muhammed Ufuk Aslan",
                  role: "Developer",
                  image: "ufuk.jpg",
                },
                {
                  name: "Sena Ağaçyetiştiren",
                  role: "Developer",
                  image: "sena.jpg",
                },
                {
                  name: "Hatice Şerife Aladağlı",
                  role: "Developer",
                  image: "hatice.jpg",
                },
                {
                  name: "Furkan Güven",
                  role: "Developer",
                  image: "furkan.jpg",
                },
              ].map((member, index) => (
                <div key={index} className="col-lg-4 col-md-6">
                  <div className="card border-0 shadow-sm text-center p-3 team-card">
                    <div className="position-relative mx-auto">
                      <img
                        src={`/img/avatars/${member.image}`}
                        className="rounded-circle team-avatar img-fluid"
                        alt={member.name}
                      />
                    </div>
                    <div className="card-body">
                      <h5 className="fw-bold mb-1">{member.name}</h5>
                      <p className="text-muted mb-0">{member.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section id="landingFAQ" className="py-5 bg-body landing-faq">
          <div className="container">
            <h4 className="text-center mb-3 position-relative">
              {t("askedQuestions")}
              <span>
                <img
                  src="img/front-pages/icons/section-title-icon.png"
                  alt="laptop charging"
                  className="section-title-img position-absolute object-fit-contain bottom-0 z-n1"
                  style={{ maxWidth: "50px" }}
                />
              </span>
            </h4>
            <p className="text-center mb-4 pb-md-3 fs-5">
              {t("askedQuestionsDesc")}
            </p>

            <div className="row gy-4 align-items-center">
              <div className="col-lg-5 text-center">
                <img
                  src="img/backgrounds/odek2.png"
                  alt="faq boy with logos"
                  className="img-fluid"
                  width={"300"}
                />
              </div>
              <div className="col-lg-7">
                <div className="accordion" id="accordionExample">
                  {/* First FAQ Item */}
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="headingOne">
                      <button
                        className="accordion-button"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#accordionOne"
                        aria-expanded="true"
                        aria-controls="accordionOne"
                      >
                        {t("vxy_what1")}
                      </button>
                    </h2>
                    <div
                      id="accordionOne"
                      className="accordion-collapse collapse"
                      data-bs-parent="#accordionExample"
                    >
                      <div className="accordion-body">{t("vxy_what")}</div>
                    </div>
                  </div>

                  {/* Second FAQ Item */}
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="headingTwo">
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#accordionTwo"
                        aria-expanded="false"
                        aria-controls="accordionTwo"
                      >
                        {t("offer_for")}
                      </button>
                    </h2>
                    <div
                      id="accordionTwo"
                      className="accordion-collapse collapse"
                      data-bs-parent="#accordionExample"
                    >
                      <div className="accordion-body">
                        {t("offer_description")}
                      </div>
                    </div>
                  </div>

                  {/* Third FAQ Item (Active by Default) */}
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="headingThree">
                      <button
                        className="accordion-button"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#accordionThree"
                        aria-expanded="true"
                        aria-controls="accordionThree"
                      >
                        {t("eduSupport")}
                      </button>
                    </h2>
                    <div
                      id="accordionThree"
                      className="accordion-collapse collapse show"
                      data-bs-parent="#accordionExample"
                    >
                      <div className="accordion-body">
                        {t("eduSupportDesc")}
                      </div>
                    </div>
                  </div>

                  {/* Fourth FAQ Item */}
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="headingFour">
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#accordionFour"
                        aria-expanded="false"
                        aria-controls="accordionFour"
                      >
                        {t("OnLessonBenefits")}
                      </button>
                    </h2>
                    <div
                      id="accordionFour"
                      className="accordion-collapse collapse"
                      data-bs-parent="#accordionExample"
                    >
                      <div className="accordion-body">{t("OnLessonDesc")}</div>
                    </div>
                  </div>

                  {/* Fifth FAQ Item */}
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="headingFive">
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#accordionFive"
                        aria-expanded="false"
                        aria-controls="accordionFive"
                      >
                        {t("TeacherBooking")}
                      </button>
                    </h2>
                    <div
                      id="accordionFive"
                      className="accordion-collapse collapse"
                      data-bs-parent="#accordionExample"
                    >
                      <div className="accordion-body">
                        {t("TeacherBookingDesc")}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="landingCTA"
          className="section-py landing-cta position-relative p-lg-0 pb-0"
        >
          <img
            src="img/front-pages/backgrounds/cta-bg-light.png"
            className="position-absolute bottom-0 end-0 scaleX-n1-rtl h-100 w-100 z-n1"
            alt="cta image"
            data-app-light-img="front-pages/backgrounds/cta-bg-light.png"
            data-app-dark-img="front-pages/backgrounds/cta-bg-dark.png"
          />
          <div className="container">
            <div className="row align-items-center gy-12">
              <div className="col-lg-6 text-start text-sm-center text-lg-start">
                <h3 className="cta-title text-primary fw-bold mb-0">
                {t("indexTeacherWant")}              
                </h3>
                <h5 className="text-body mb-8">
                {t("indexTeacherSelection")}        
                </h5>
                <a href="payment-page.html" className="btn btn-lg btn-primary">
                {t("indexteacherRegister")}
                </a>
              </div>
              <div className="col-lg-6 pt-lg-12 text-center text-lg-end">
                <img
                src="img/backgrounds/kitap.png"
                alt="cta dashboard"
                className="img-fluid mt-lg-4 custom-img"
                width="300"
                />
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
