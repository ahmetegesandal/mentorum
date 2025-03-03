import Logo from "../components/Logo";
import LanguageSwitcher from "../components/LanguageSwitcher";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const Home = () => {
  const { t } = useTranslation("common");
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

              <a href="landing-page.html" className="app-brand-link">
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
                  <a
                    className="nav-link fw-medium"
                    href="landing-page.html#landingContact"
                  >
                    Contact us
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
        <section id="hero-animation">
          <div
            id="landingHero"
            className="section-py landing-hero position-relative"
          >
            <img
              src="img/front-pages/backgrounds/hero-bg.png"
              alt="hero background"
              className="position-absolute top-0 start-50 translate-middle-x object-fit-cover w-100 h-100"
              data-speed="1"
            />
            <div className="container">
              <div className="hero-text-box text-center position-relative">
                <h1 className="text-primary hero-title display-6 fw-extrabold">
                  One dashboard to manage all your businesses
                </h1>
                <h2 className="hero-sub-title h6 mb-6">
                  Production-ready & easy to use Admin Template
                  <br className="d-none d-lg-block" />
                  for Reliability and Customizability.
                </h2>
                <div className="landing-hero-btn d-inline-block position-relative">
                  <span className="hero-btn-item position-absolute d-none d-md-flex fw-medium">
                    Join community
                    <img
                      src="img/front-pages/icons/Join-community-arrow.png"
                      alt="Join community arrow"
                      className="scaleX-n1-rtl"
                    />
                  </span>
                  <a href="#landingPricing" className="btn btn-primary btn-lg">
                    Get early access
                  </a>
                </div>
              </div>
              <div id="heroDashboardAnimation" className="hero-animation-img">
                <a
                  href="../vertical-menu-template/app-ecommerce-dashboard.html"
                  target="_blank"
                >
                  <div
                    id="heroAnimationImg"
                    className="position-relative hero-dashboard-img"
                  >
                    <img
                      src="/img/front-pages/landing-page/hero-dashboard-light.png"
                      alt="hero dashboard"
                      className="animation-img"
                      data-app-light-img="front-pages/landing-page/hero-dashboard-light.png"
                      data-app-dark-img="front-pages/landing-page/hero-dashboard-dark.png"
                    />
                    <img
                      src="img/front-pages/landing-page/hero-elements-light.png"
                      alt="hero elements"
                      className="position-absolute hero-elements-img animation-img top-0 start-0"
                      data-app-light-img="front-pages/landing-page/hero-elements-light.png"
                      data-app-dark-img="front-pages/landing-page/hero-elements-dark.png"
                    />
                  </div>
                </a>
              </div>
            </div>
          </div>
          <div className="landing-hero-blank"></div>
        </section>

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

        <section
          id="landingReviews"
          className="section-py bg-body landing-reviews pb-0"
        >
          <div className="container">
            <div className="row align-items-center gx-0 gy-4 g-lg-5 mb-5 pb-md-5">
              <div className="col-md-6 col-lg-5 col-xl-3">
                <div className="mb-4">
                  <span className="badge bg-label-primary">
                    Real Customers Reviews
                  </span>
                </div>
                <h4 className="mb-1">
                  <span className="position-relative fw-extrabold z-1">
                    What people say
                    <img
                      src="img/front-pages/icons/section-title-icon.png"
                      alt="laptop charging"
                      className="section-title-img position-absolute object-fit-contain bottom-0 z-n1"
                    />
                  </span>
                </h4>
                <p className="mb-5 mb-md-12">
                  See what our customers have to
                  <br className="d-none d-xl-block" />
                  say about their experience.
                </p>
                <div className="landing-reviews-btns">
                  <button
                    id="reviews-previous-btn"
                    className="btn btn-label-primary reviews-btn me-4 scaleX-n1-rtl"
                    type="button"
                  >
                    <i className="ti ti-chevron-left ti-md"></i>
                  </button>
                  <button
                    id="reviews-next-btn"
                    className="btn btn-label-primary reviews-btn scaleX-n1-rtl"
                    type="button"
                  >
                    <i className="ti ti-chevron-right ti-md"></i>
                  </button>
                </div>
              </div>
              <div className="col-md-6 col-lg-7 col-xl-9">
                <div className="swiper-reviews-carousel overflow-hidden">
                  <div className="swiper" id="swiper-reviews">
                    <div className="swiper-wrapper">
                      <div className="swiper-slide">
                        <div className="card h-100">
                          <div className="card-body text-body d-flex flex-column justify-content-between h-100">
                            <div className="mb-4">
                              <img
                                src="img/front-pages/branding/logo-1.png"
                                alt="client logo"
                                className="client-logo img-fluid"
                              />
                            </div>
                            <p>
                              “Vuexy is hands down the most useful front end
                              Bootstrap theme I've ever used. I can't wait to
                              use it again for my next project.”
                            </p>
                            <div className="text-warning mb-4">
                              <i className="ti ti-star-filled"></i>
                              <i className="ti ti-star-filled"></i>
                              <i className="ti ti-star-filled"></i>
                              <i className="ti ti-star-filled"></i>
                              <i className="ti ti-star-filled"></i>
                            </div>
                            <div className="d-flex align-items-center">
                              <div className="avatar me-3 avatar-sm">
                                <img
                                  src="img/avatars/1.png"
                                  alt="Avatar"
                                  className="rounded-circle"
                                />
                              </div>
                              <div>
                                <h6 className="mb-0">Cecilia Payne</h6>
                                <p className="small text-muted mb-0">
                                  CEO of Airbnb
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="swiper-slide">
                        <div className="card h-100">
                          <div className="card-body text-body d-flex flex-column justify-content-between h-100">
                            <div className="mb-4">
                              <img
                                src="img/front-pages/branding/logo-2.png"
                                alt="client logo"
                                className="client-logo img-fluid"
                              />
                            </div>
                            <p>
                              “I've never used a theme as versatile and flexible
                              as Vuexy. It's my go to for building dashboard
                              sites on almost any project.”
                            </p>
                            <div className="text-warning mb-4">
                              <i className="ti ti-star-filled"></i>
                              <i className="ti ti-star-filled"></i>
                              <i className="ti ti-star-filled"></i>
                              <i className="ti ti-star-filled"></i>
                              <i className="ti ti-star-filled"></i>
                            </div>
                            <div className="d-flex align-items-center">
                              <div className="avatar me-3 avatar-sm">
                                <img
                                  src="img/avatars/2.png"
                                  alt="Avatar"
                                  className="rounded-circle"
                                />
                              </div>
                              <div>
                                <h6 className="mb-0">Eugenia Moore</h6>
                                <p className="small text-muted mb-0">
                                  Founder of Hubspot
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="swiper-slide">
                        <div className="card h-100">
                          <div className="card-body text-body d-flex flex-column justify-content-between h-100">
                            <div className="mb-4">
                              <img
                                src="img/front-pages/branding/logo-3.png"
                                alt="client logo"
                                className="client-logo img-fluid"
                              />
                            </div>
                            <p>
                              This template is really clean & well documented.
                              The docs are really easy to understand and it's
                              always easy to find a screenshot from their
                              website.
                            </p>
                            <div className="text-warning mb-4">
                              <i className="ti ti-star-filled"></i>
                              <i className="ti ti-star-filled"></i>
                              <i className="ti ti-star-filled"></i>
                              <i className="ti ti-star-filled"></i>
                              <i className="ti ti-star-filled"></i>
                            </div>
                            <div className="d-flex align-items-center">
                              <div className="avatar me-3 avatar-sm">
                                <img
                                  src="img/avatars/3.png"
                                  alt="Avatar"
                                  className="rounded-circle"
                                />
                              </div>
                              <div>
                                <h6 className="mb-0">Curtis Fletcher</h6>
                                <p className="small text-muted mb-0">
                                  Design Lead at Dribbble
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="swiper-slide">
                        <div className="card h-100">
                          <div className="card-body text-body d-flex flex-column justify-content-between h-100">
                            <div className="mb-4">
                              <img
                                src="img/front-pages/branding/logo-4.png"
                                alt="client logo"
                                className="client-logo img-fluid"
                              />
                            </div>
                            <p>
                              All the requirements for developers have been
                              taken into consideration, so I’m able to build any
                              interface I want.
                            </p>
                            <div className="text-warning mb-4">
                              <i className="ti ti-star-filled"></i>
                              <i className="ti ti-star-filled"></i>
                              <i className="ti ti-star-filled"></i>
                              <i className="ti ti-star-filled"></i>
                              <i className="ti ti-star"></i>
                            </div>
                            <div className="d-flex align-items-center">
                              <div className="avatar me-3 avatar-sm">
                                <img
                                  src="img/avatars/4.png"
                                  alt="Avatar"
                                  className="rounded-circle"
                                />
                              </div>
                              <div>
                                <h6 className="mb-0">Sara Smith</h6>
                                <p className="small text-muted mb-0">
                                  Founder of Continental
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="swiper-slide">
                        <div className="card h-100">
                          <div className="card-body text-body d-flex flex-column justify-content-between h-100">
                            <div className="mb-4">
                              <img
                                src="img/front-pages/branding/logo-5.png"
                                alt="client logo"
                                className="client-logo img-fluid"
                              />
                            </div>
                            <p>
                              “I've never used a theme as versatile and flexible
                              as Vuexy. It's my go to for building dashboard
                              sites on almost any project.”
                            </p>
                            <div className="text-warning mb-4">
                              <i className="ti ti-star-filled"></i>
                              <i className="ti ti-star-filled"></i>
                              <i className="ti ti-star-filled"></i>
                              <i className="ti ti-star-filled"></i>
                              <i className="ti ti-star-filled"></i>
                            </div>
                            <div className="d-flex align-items-center">
                              <div className="avatar me-3 avatar-sm">
                                <img
                                  src="img/avatars/5.png"
                                  alt="Avatar"
                                  className="rounded-circle"
                                />
                              </div>
                              <div>
                                <h6 className="mb-0">Eugenia Moore</h6>
                                <p className="small text-muted mb-0">
                                  Founder of Hubspot
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="swiper-slide">
                        <div className="card h-100">
                          <div className="card-body text-body d-flex flex-column justify-content-between h-100">
                            <div className="mb-4">
                              <img
                                src="img/front-pages/branding/logo-6.png"
                                alt="client logo"
                                className="client-logo img-fluid"
                              />
                            </div>
                            <p>
                              Lorem ipsum dolor sit amet consectetur adipisicing
                              elit. Veniam nemo mollitia, ad eum officia numquam
                              nostrum repellendus consequuntur!
                            </p>
                            <div className="text-warning mb-4">
                              <i className="ti ti-star-filled"></i>
                              <i className="ti ti-star-filled"></i>
                              <i className="ti ti-star-filled"></i>
                              <i className="ti ti-star-filled"></i>
                              <i className="ti ti-star"></i>
                            </div>
                            <div className="d-flex align-items-center">
                              <div className="avatar me-3 avatar-sm">
                                <img
                                  src="img/avatars/1.png"
                                  alt="Avatar"
                                  className="rounded-circle"
                                />
                              </div>
                              <div>
                                <h6 className="mb-0">Sara Smith</h6>
                                <p className="small text-muted mb-0">
                                  Founder of Continental
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="swiper-button-next"></div>
                    <div className="swiper-button-prev"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <hr className="m-0 mt-6 mt-md-12" />
        </section>

        <section id="landingTeam" className="section-py ">
          <div className="container">
            <div className="text-center mb-4">
              <span className="badge bg-label-primary">Ekip</span>
            </div>
            <h4 className="text-center mb-1">
              <span className="position-relative fw-extrabold z-1">
                Profesyonel
                <img
                  src="img/front-pages/icons/section-title-icon.png"
                  alt="laptop charging"
                  className="section-title-img position-absolute object-fit-contain bottom-0 z-n1"
                />
              </span>
              <span className="ms-1">Ekibimiz</span>
            </h4>
            <p className="text-center mb-md-11 pb-0 pb-xl-12">
              Alanında uzman, yetenekli ve yaratıcı ekibimizle tanışın!
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

        <section
          id="landingPricing"
          className="section-py bg-body landing-pricing"
        >
          <div className="container">
            <div className="text-center mb-4">
              <span className="badge bg-label-primary">Pricing Plans</span>
            </div>
            <h4 className="text-center mb-1">
              <span className="position-relative fw-extrabold z-1">
                Tailored pricing plans
                <img
                  src="img/front-pages/icons/section-title-icon.png"
                  alt="laptop charging"
                  className="section-title-img position-absolute object-fit-contain bottom-0 z-n1"
                />
              </span>
              designed for you
            </h4>
            <p className="text-center pb-2 mb-7">
              All plans include 40+ advanced tools and features to boost your
              product.
              <br />
              Choose the best plan to fit your needs.
            </p>
            <div className="text-center mb-12">
              <div className="position-relative d-inline-block pt-3 pt-md-0">
                <label className="switch switch-sm switch-primary me-0">
                  <span className="switch-label fs-6 text-body me-3">
                    Pay Monthly
                  </span>
                  <input
                    type="checkbox"
                    className="switch-input price-duration-toggler"
                    checked
                  />
                  <span className="switch-toggle-slider">
                    <span className="switch-on"></span>
                    <span className="switch-off"></span>
                  </span>
                  <span className="switch-label fs-6 text-body ms-3">
                    Pay Annual
                  </span>
                </label>
                <div className="pricing-plans-item position-absolute d-flex">
                  <img
                    src="img/front-pages/icons/pricing-plans-arrow.png"
                    alt="pricing plans arrow"
                    className="scaleX-n1-rtl"
                  />
                  <span className="fw-medium mt-2 ms-1"> Save 25%</span>
                </div>
              </div>
            </div>
            <div className="row g-6 pt-lg-5">
              <div className="col-xl-4 col-lg-6">
                <div className="card">
                  <div className="card-header">
                    <div className="text-center">
                      <img
                        src="img/front-pages/icons/paper-airplane.png"
                        alt="paper airplane icon"
                        className="mb-8 pb-2"
                      />
                      <h4 className="mb-0">Basic</h4>
                      <div className="d-flex align-items-center justify-content-center">
                        <span className="price-monthly h2 text-primary fw-extrabold mb-0">
                          $19
                        </span>
                        <span className="price-yearly h2 text-primary fw-extrabold mb-0 d-none">
                          $14
                        </span>
                        <sub className="h6 text-muted mb-n1 ms-1">/mo</sub>
                      </div>
                      <div className="position-relative pt-2">
                        <div className="price-yearly text-muted price-yearly-toggle d-none">
                          $ 168 / year
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card-body">
                    <ul className="list-unstyled pricing-list">
                      <li>
                        <h6 className="mb-3">
                          <span className="badge badge-center rounded-pill bg-label-primary p-0 me-2">
                            <i className="ti ti-check ti-14px"></i>
                          </span>
                          Timeline
                        </h6>
                      </li>
                      <li>
                        <h6 className="mb-3">
                          <span className="badge badge-center rounded-pill bg-label-primary p-0 me-2">
                            <i className="ti ti-check ti-14px"></i>
                          </span>
                          Basic search
                        </h6>
                      </li>
                      <li>
                        <h6 className="mb-3">
                          <span className="badge badge-center rounded-pill bg-label-primary p-0 me-2">
                            <i className="ti ti-check ti-14px"></i>
                          </span>
                          Live chat widget
                        </h6>
                      </li>
                      <li>
                        <h6 className="mb-3">
                          <span className="badge badge-center rounded-pill bg-label-primary p-0 me-2">
                            <i className="ti ti-check ti-14px"></i>
                          </span>
                          Email marketing
                        </h6>
                      </li>
                      <li>
                        <h6 className="mb-3">
                          <span className="badge badge-center rounded-pill bg-label-primary p-0 me-2">
                            <i className="ti ti-check ti-14px"></i>
                          </span>
                          Custom Forms
                        </h6>
                      </li>
                      <li>
                        <h6 className="mb-3">
                          <span className="badge badge-center rounded-pill bg-label-primary p-0 me-2">
                            <i className="ti ti-check ti-14px"></i>
                          </span>
                          Traffic analytics
                        </h6>
                      </li>
                      <li>
                        <h6 className="mb-3">
                          <span className="badge badge-center rounded-pill bg-label-primary p-0 me-2">
                            <i className="ti ti-check ti-14px"></i>
                          </span>
                          Basic Support
                        </h6>
                      </li>
                    </ul>
                    <div className="d-grid mt-8">
                      <a
                        href="payment-page.html"
                        className="btn btn-label-primary"
                      >
                        Get Started
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-xl-4 col-lg-6">
                <div className="card border border-primary shadow-xl">
                  <div className="card-header">
                    <div className="text-center">
                      <img
                        src="img/front-pages/icons/plane.png"
                        alt="plane icon"
                        className="mb-8 pb-2"
                      />
                      <h4 className="mb-0">Team</h4>
                      <div className="d-flex align-items-center justify-content-center">
                        <span className="price-monthly h2 text-primary fw-extrabold mb-0">
                          $29
                        </span>
                        <span className="price-yearly h2 text-primary fw-extrabold mb-0 d-none">
                          $22
                        </span>
                        <sub className="h6 text-muted mb-n1 ms-1">/mo</sub>
                      </div>
                      <div className="position-relative pt-2">
                        <div className="price-yearly text-muted price-yearly-toggle d-none">
                          $ 264 / year
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card-body">
                    <ul className="list-unstyled pricing-list">
                      <li>
                        <h6 className="mb-3">
                          <span className="badge badge-center rounded-pill bg-primary p-0 me-2">
                            <i className="ti ti-check ti-14px"></i>
                          </span>
                          Everything in basic
                        </h6>
                      </li>
                      <li>
                        <h6 className="mb-3">
                          <span className="badge badge-center rounded-pill bg-primary p-0 me-2">
                            <i className="ti ti-check ti-14px"></i>
                          </span>
                          Timeline with database
                        </h6>
                      </li>
                      <li>
                        <h6 className="mb-3">
                          <span className="badge badge-center rounded-pill bg-primary p-0 me-2">
                            <i className="ti ti-check ti-14px"></i>
                          </span>
                          Advanced search
                        </h6>
                      </li>
                      <li>
                        <h6 className="mb-3">
                          <span className="badge badge-center rounded-pill bg-primary p-0 me-2">
                            <i className="ti ti-check ti-14px"></i>
                          </span>
                          Marketing automation
                        </h6>
                      </li>
                      <li>
                        <h6 className="mb-3">
                          <span className="badge badge-center rounded-pill bg-primary p-0 me-2">
                            <i className="ti ti-check ti-14px"></i>
                          </span>
                          Advanced chatbot
                        </h6>
                      </li>
                      <li>
                        <h6 className="mb-3">
                          <span className="badge badge-center rounded-pill bg-primary p-0 me-2">
                            <i className="ti ti-check ti-14px"></i>
                          </span>
                          Campaign management
                        </h6>
                      </li>
                      <li>
                        <h6 className="mb-3">
                          <span className="badge badge-center rounded-pill bg-primary p-0 me-2">
                            <i className="ti ti-check ti-14px"></i>
                          </span>
                          Collaboration tools
                        </h6>
                      </li>
                    </ul>
                    <div className="d-grid mt-8">
                      <a href="payment-page.html" className="btn btn-primary">
                        Get Started
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-xl-4 col-lg-6">
                <div className="card">
                  <div className="card-header">
                    <div className="text-center">
                      <img
                        src="img/front-pages/icons/shuttle-rocket.png"
                        alt="shuttle rocket icon"
                        className="mb-8 pb-2"
                      />
                      <h4 className="mb-0">Enterprise</h4>
                      <div className="d-flex align-items-center justify-content-center">
                        <span className="price-monthly h2 text-primary fw-extrabold mb-0">
                          $49
                        </span>
                        <span className="price-yearly h2 text-primary fw-extrabold mb-0 d-none">
                          $37
                        </span>
                        <sub className="h6 text-muted mb-n1 ms-1">/mo</sub>
                      </div>
                      <div className="position-relative pt-2">
                        <div className="price-yearly text-muted price-yearly-toggle d-none">
                          $ 444 / year
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card-body">
                    <ul className="list-unstyled pricing-list">
                      <li>
                        <h6 className="mb-3">
                          <span className="badge badge-center rounded-pill bg-label-primary p-0 me-2">
                            <i className="ti ti-check ti-14px"></i>
                          </span>
                          Everything in premium
                        </h6>
                      </li>
                      <li>
                        <h6 className="mb-3">
                          <span className="badge badge-center rounded-pill bg-label-primary p-0 me-2">
                            <i className="ti ti-check ti-14px"></i>
                          </span>
                          Timeline with database
                        </h6>
                      </li>
                      <li>
                        <h6 className="mb-3">
                          <span className="badge badge-center rounded-pill bg-label-primary p-0 me-2">
                            <i className="ti ti-check ti-14px"></i>
                          </span>
                          Fuzzy search
                        </h6>
                      </li>
                      <li>
                        <h6 className="mb-3">
                          <span className="badge badge-center rounded-pill bg-label-primary p-0 me-2">
                            <i className="ti ti-check ti-14px"></i>
                          </span>
                          A/B testing sanbox
                        </h6>
                      </li>
                      <li>
                        <h6 className="mb-3">
                          <span className="badge badge-center rounded-pill bg-label-primary p-0 me-2">
                            <i className="ti ti-check ti-14px"></i>
                          </span>
                          Custom permissions
                        </h6>
                      </li>
                      <li>
                        <h6 className="mb-3">
                          <span className="badge badge-center rounded-pill bg-label-primary p-0 me-2">
                            <i className="ti ti-check ti-14px"></i>
                          </span>
                          Social media automation
                        </h6>
                      </li>
                      <li>
                        <h6 className="mb-3">
                          <span className="badge badge-center rounded-pill bg-label-primary p-0 me-2">
                            <i className="ti ti-check ti-14px"></i>
                          </span>
                          Sales automation tools
                        </h6>
                      </li>
                    </ul>
                    <div className="d-grid mt-8">
                      <a
                        href="payment-page.html"
                        className="btn btn-label-primary"
                      >
                        Get Started
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="landingFunFacts" className="section-py landing-fun-facts">
          <div className="container">
            <div className="row gy-6">
              <div className="col-sm-6 col-lg-3">
                <div className="card border border-primary shadow-none">
                  <div className="card-body text-center">
                    <img
                      src="img/front-pages/icons/laptop.png"
                      alt="laptop"
                      className="mb-4"
                    />
                    <h3 className="mb-0">7.1k+</h3>
                    <p className="fw-medium mb-0">
                      Support Tickets
                      <br />
                      Resolved
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-sm-6 col-lg-3">
                <div className="card border border-success shadow-none">
                  <div className="card-body text-center">
                    <img
                      src="img/front-pages/icons/user-success.png"
                      alt="laptop"
                      className="mb-4"
                    />
                    <h3 className="mb-0">50k+</h3>
                    <p className="fw-medium mb-0">
                      Join creatives
                      <br />
                      community
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-sm-6 col-lg-3">
                <div className="card border border-info shadow-none">
                  <div className="card-body text-center">
                    <img
                      src="img/front-pages/icons/diamond-info.png"
                      alt="laptop"
                      className="mb-4"
                    />
                    <h3 className="mb-0">4.8/5</h3>
                    <p className="fw-medium mb-0">
                      Highly Rated
                      <br />
                      Products
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-sm-6 col-lg-3">
                <div className="card border border-warning shadow-none">
                  <div className="card-body text-center">
                    <img
                      src="img/front-pages/icons/check-warning.png"
                      alt="laptop"
                      className="mb-4"
                    />
                    <h3 className="mb-0">100%</h3>
                    <p className="fw-medium mb-0">
                      Money Back
                      <br />
                      Guarantee
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="landingFAQ" className="section-py bg-body landing-faq">
          <div className="container">
            <div className="text-center mb-4">
              <span className="badge bg-label-primary">FAQ</span>
            </div>
            <h4 className="text-center mb-1">
              Frequently asked
              <span className="position-relative fw-extrabold z-1">
                questions
                <img
                  src="img/front-pages/icons/section-title-icon.png"
                  alt="laptop charging"
                  className="section-title-img position-absolute object-fit-contain bottom-0 z-n1"
                />
              </span>
            </h4>
            <p className="text-center mb-12 pb-md-4">
              Browse through these FAQs to find answers to commonly asked
              questions.
            </p>
            <div className="row gy-12 align-items-center">
              <div className="col-lg-5">
                <div className="text-center">
                  <img
                    src="img/front-pages/landing-page/faq-boy-with-logos.png"
                    alt="faq boy with logos"
                    className="faq-image"
                  />
                </div>
              </div>
              <div className="col-lg-7">
                <div className="accordion" id="accordionExample">
                  <div className="card accordion-item">
                    <h2 className="accordion-header" id="headingOne">
                      <button
                        type="button"
                        className="accordion-button"
                        data-bs-toggle="collapse"
                        data-bs-target="#accordionOne"
                        aria-expanded="true"
                        aria-controls="accordionOne"
                      >
                        Do you charge for each upgrade?
                      </button>
                    </h2>

                    <div
                      id="accordionOne"
                      className="accordion-collapse collapse"
                      data-bs-parent="#accordionExample"
                    >
                      <div className="accordion-body">
                        Lemon drops chocolate cake gummies carrot cake chupa
                        chups muffin topping. Sesame snaps icing marzipan gummi
                        bears macaroon dragée danish caramels powder. Bear claw
                        dragée pastry topping soufflé. Wafer gummi bears
                        marshmallow pastry pie.
                      </div>
                    </div>
                  </div>
                  <div className="card accordion-item">
                    <h2 className="accordion-header" id="headingTwo">
                      <button
                        type="button"
                        className="accordion-button collapsed"
                        data-bs-toggle="collapse"
                        data-bs-target="#accordionTwo"
                        aria-expanded="false"
                        aria-controls="accordionTwo"
                      >
                        Do I need to purchase a license for each website?
                      </button>
                    </h2>
                    <div
                      id="accordionTwo"
                      className="accordion-collapse collapse"
                      aria-labelledby="headingTwo"
                      data-bs-parent="#accordionExample"
                    >
                      <div className="accordion-body">
                        Dessert ice cream donut oat cake jelly-o pie sugar plum
                        cheesecake. Bear claw dragée oat cake dragée ice cream
                        halvah tootsie roll. Danish cake oat cake pie macaroon
                        tart donut gummies. Jelly beans candy canes carrot cake.
                        Fruitcake chocolate chupa chups.
                      </div>
                    </div>
                  </div>
                  <div className="card accordion-item active">
                    <h2 className="accordion-header" id="headingThree">
                      <button
                        type="button"
                        className="accordion-button"
                        data-bs-toggle="collapse"
                        data-bs-target="#accordionThree"
                        aria-expanded="false"
                        aria-controls="accordionThree"
                      >
                        What is regular license?
                      </button>
                    </h2>
                    <div
                      id="accordionThree"
                      className="accordion-collapse collapse show"
                      aria-labelledby="headingThree"
                      data-bs-parent="#accordionExample"
                    >
                      <div className="accordion-body">
                        Regular license can be used for end products that do not
                        charge users for access or service(access is free and
                        there will be no monthly subscription fee). Single
                        regular license can be used for single end product and
                        end product can be used by you or your client. If you
                        want to sell end product to multiple clients then you
                        will need to purchase separate license for each client.
                        The same rule applies if you want to use the same end
                        product on multiple domains(unique setup). For more info
                        on regular license you can check official description.
                      </div>
                    </div>
                  </div>
                  <div className="card accordion-item">
                    <h2 className="accordion-header" id="headingFour">
                      <button
                        type="button"
                        className="accordion-button collapsed"
                        data-bs-toggle="collapse"
                        data-bs-target="#accordionFour"
                        aria-expanded="false"
                        aria-controls="accordionFour"
                      >
                        What is extended license?
                      </button>
                    </h2>
                    <div
                      id="accordionFour"
                      className="accordion-collapse collapse"
                      aria-labelledby="headingFour"
                      data-bs-parent="#accordionExample"
                    >
                      <div className="accordion-body">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Nobis et aliquid quaerat possimus maxime! Mollitia
                        reprehenderit neque repellat deleniti delectus
                        architecto dolorum maxime, blanditiis earum ea, incidunt
                        quam possimus cumque.
                      </div>
                    </div>
                  </div>
                  <div className="card accordion-item">
                    <h2 className="accordion-header" id="headingFive">
                      <button
                        type="button"
                        className="accordion-button collapsed"
                        data-bs-toggle="collapse"
                        data-bs-target="#accordionFive"
                        aria-expanded="false"
                        aria-controls="accordionFive"
                      >
                        Which license is applicable for SASS application?
                      </button>
                    </h2>
                    <div
                      id="accordionFive"
                      className="accordion-collapse collapse"
                      aria-labelledby="headingFive"
                      data-bs-parent="#accordionExample"
                    >
                      <div className="accordion-body">
                        Lorem ipsum dolor sit amet consectetur, adipisicing
                        elit. Sequi molestias exercitationem ab cum nemo facere
                        voluptates veritatis quia, eveniet veniam at et
                        repudiandae mollitia ipsam quasi labore enim architecto
                        non!
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
                  Ready to Get Started?
                </h3>
                <h5 className="text-body mb-8">
                  Start your project with a 14-day free trial
                </h5>
                <a href="payment-page.html" className="btn btn-lg btn-primary">
                  Get Started
                </a>
              </div>
              <div className="col-lg-6 pt-lg-12 text-center text-lg-end">
                <img
                  src="img/front-pages/landing-page/cta-dashboard.png"
                  alt="cta dashboard"
                  className="img-fluid mt-lg-4"
                />
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
