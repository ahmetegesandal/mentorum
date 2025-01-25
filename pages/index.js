import Logo from "../components/Logo";

const Home = () => {


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
                                aria-label="Toggle navigation">
                                <i className="ti ti-menu-2 ti-lg align-middle text-heading fw-medium"></i>
                            </button>

                            <a href="landing-page.html" className="app-brand-link">
                                <Logo/>
                            </a>
                        </div>

                        <div className="collapse navbar-collapse landing-nav-menu" id="navbarSupportedContent">
                            <button
                                className="navbar-toggler border-0 text-heading position-absolute end-0 top-0 scaleX-n1-rtl"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#navbarSupportedContent"
                                aria-controls="navbarSupportedContent"
                                aria-expanded="false"
                                aria-label="Toggle navigation">
                                <i className="ti ti-x ti-lg"></i>
                            </button>
                            <ul className="navbar-nav me-auto">
                                <li className="nav-item">
                                    <a className="nav-link fw-medium" aria-current="page" href="landing-page.html#landingHero">Home</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link fw-medium" href="landing-page.html#landingFeatures">Features</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link fw-medium" href="landing-page.html#landingTeam">Team</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link fw-medium" href="landing-page.html#landingFAQ">FAQ</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link fw-medium" href="landing-page.html#landingContact">Contact us</a>
                                </li>

                                <li className="nav-item">
                                    <a className="nav-link fw-medium" href="/main" target="_blank">Admin</a>
                                </li>
                            </ul>
                        </div>
                        <div className="landing-menu-overlay d-lg-none"></div>

                        <ul className="navbar-nav flex-row align-items-center ms-auto">

                            <li className="nav-item dropdown-style-switcher dropdown me-2 me-xl-1">
                                <a className="nav-link dropdown-toggle hide-arrow" href="javascript:void(0);" data-bs-toggle="dropdown">
                                    <i className="ti ti-lg"></i>
                                </a>
                                <ul className="dropdown-menu dropdown-menu-end dropdown-styles">
                                    <li>
                                        <a className="dropdown-item" href="javascript:void(0);" data-theme="light">
                                            <span className="align-middle"><i className="ti ti-sun me-3"></i>Light</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a className="dropdown-item" href="javascript:void(0);" data-theme="dark">
                                            <span className="align-middle"><i className="ti ti-moon-stars me-3"></i>Dark</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a className="dropdown-item" href="javascript:void(0);" data-theme="system">
                                            <span className="align-middle"><i className="ti ti-device-desktop-analytics me-3"></i>System</span>
                                        </a>
                                    </li>
                                </ul>
                            </li>

                            <li>
                                <a href="/sign-in" className="btn btn-primary" target="_blank"
                                ><span className="tf-icons ti ti-login scaleX-n1-rtl me-md-1"></span
                                ><span className="d-none d-md-block">Login/Register</span></a
                                >
                            </li>

                        </ul>

                    </div>
                </div>
            </nav>




            <div data-bs-spy="scroll" className="scrollspy-example">

                <section id="hero-animation">
                    <div id="landingHero" className="section-py landing-hero position-relative">
                        <img
                            src="img/front-pages/backgrounds/hero-bg.png"
                            alt="hero background"
                            className="position-absolute top-0 start-50 translate-middle-x object-fit-cover w-100 h-100"
                            data-speed="1" />
                        <div className="container">
                            <div className="hero-text-box text-center position-relative">
                                <h1 className="text-primary hero-title display-6 fw-extrabold">
                                    One dashboard to manage all your businesses
                                </h1>
                                <h2 className="hero-sub-title h6 mb-6">
                                    Production-ready & easy to use Admin Template<br className="d-none d-lg-block" />
                                    for Reliability and Customizability.
                                </h2>
                                <div className="landing-hero-btn d-inline-block position-relative">
                <span className="hero-btn-item position-absolute d-none d-md-flex fw-medium"
                >Join community
                  <img
                      src="img/front-pages/icons/Join-community-arrow.png"
                      alt="Join community arrow"
                      className="scaleX-n1-rtl"
                  /></span>
                                    <a href="#landingPricing" className="btn btn-primary btn-lg">Get early access</a>
                                </div>
                            </div>
                            <div id="heroDashboardAnimation" className="hero-animation-img">
                                <a href="../vertical-menu-template/app-ecommerce-dashboard.html" target="_blank">
                                    <div id="heroAnimationImg" className="position-relative hero-dashboard-img">
                                        <img
                                            src="/img/front-pages/landing-page/hero-dashboard-light.png"
                                            alt="hero dashboard"
                                            className="animation-img"
                                            data-app-light-img="front-pages/landing-page/hero-dashboard-light.png"
                                            data-app-dark-img="front-pages/landing-page/hero-dashboard-dark.png" />
                                        <img
                                            src="img/front-pages/landing-page/hero-elements-light.png"
                                            alt="hero elements"
                                            className="position-absolute hero-elements-img animation-img top-0 start-0"
                                            data-app-light-img="front-pages/landing-page/hero-elements-light.png"
                                            data-app-dark-img="front-pages/landing-page/hero-elements-dark.png" />
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
            <span className="position-relative fw-extrabold z-1"
            >Everything you need
              <img
                  src="img/front-pages/icons/section-title-icon.png"
                  alt="laptop charging"
                  className="section-title-img position-absolute object-fit-contain bottom-0 z-n1" />
            </span>
                            to start your next project
                        </h4>
                        <p className="text-center mb-12">
                            Not just a set of tools, the package includes ready-to-deploy conceptual application.
                        </p>
                        <div className="features-icon-wrapper row gx-0 gy-6 g-sm-12">
                            <div className="col-lg-4 col-sm-6 text-center features-icon-box">
                                <div className="text-center mb-4">
                                    <img src="img/front-pages/icons/laptop.png" alt="laptop charging" />
                                </div>
                                <h5 className="mb-2">Quality Code</h5>
                                <p className="features-icon-description">
                                    Code structure that all developers will easily understand and fall in love with.
                                </p>
                            </div>
                            <div className="col-lg-4 col-sm-6 text-center features-icon-box">
                                <div className="text-center mb-4">
                                    <img src="img/front-pages/icons/rocket.png" alt="transition up" />
                                </div>
                                <h5 className="mb-2">Continuous Updates</h5>
                                <p className="features-icon-description">
                                    Free updates for the next 12 months, including new demos and features.
                                </p>
                            </div>
                            <div className="col-lg-4 col-sm-6 text-center features-icon-box">
                                <div className="text-center mb-4">
                                    <img src="img/front-pages/icons/paper.png" alt="edit" />
                                </div>
                                <h5 className="mb-2">Stater-Kit</h5>
                                <p className="features-icon-description">
                                    Start your project quickly without having to remove unnecessary features.
                                </p>
                            </div>
                            <div className="col-lg-4 col-sm-6 text-center features-icon-box">
                                <div className="text-center mb-4">
                                    <img src="img/front-pages/icons/check.png" alt="3d select solid" />
                                </div>
                                <h5 className="mb-2">API Ready</h5>
                                <p className="features-icon-description">
                                    Just change the endpoint and see your own data loaded within seconds.
                                </p>
                            </div>
                            <div className="col-lg-4 col-sm-6 text-center features-icon-box">
                                <div className="text-center mb-4">
                                    <img src="img/front-pages/icons/user.png" alt="lifebelt" />
                                </div>
                                <h5 className="mb-2">Excellent Support</h5>
                                <p className="features-icon-description">An easy-to-follow doc with lots of references and code examples.</p>
                            </div>
                            <div className="col-lg-4 col-sm-6 text-center features-icon-box">
                                <div className="text-center mb-4">
                                    <img src="img/front-pages/icons/keyboard.png" alt="google docs" />
                                </div>
                                <h5 className="mb-2">Well Documented</h5>
                                <p className="features-icon-description">An easy-to-follow doc with lots of references and code examples.</p>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="landingReviews" className="section-py bg-body landing-reviews pb-0">

                    <div className="container">
                        <div className="row align-items-center gx-0 gy-4 g-lg-5 mb-5 pb-md-5">
                            <div className="col-md-6 col-lg-5 col-xl-3">
                                <div className="mb-4">
                                    <span className="badge bg-label-primary">Real Customers Reviews</span>
                                </div>
                                <h4 className="mb-1">
                <span className="position-relative fw-extrabold z-1"
                >What people say
                  <img
                      src="img/front-pages/icons/section-title-icon.png"
                      alt="laptop charging"
                      className="section-title-img position-absolute object-fit-contain bottom-0 z-n1" />
                </span>
                                </h4>
                                <p className="mb-5 mb-md-12">
                                    See what our customers have to<br className="d-none d-xl-block" />
                                    say about their experience.
                                </p>
                                <div className="landing-reviews-btns">
                                    <button
                                        id="reviews-previous-btn"
                                        className="btn btn-label-primary reviews-btn me-4 scaleX-n1-rtl"
                                        type="button">
                                        <i className="ti ti-chevron-left ti-md"></i>
                                    </button>
                                    <button id="reviews-next-btn" className="btn btn-label-primary reviews-btn scaleX-n1-rtl" type="button">
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
                                                                src="../../assets/img/front-pages/branding/logo-1.png"
                                                                alt="client logo"
                                                                className="client-logo img-fluid" />
                                                        </div>
                                                        <p>
                                                            “Vuexy is hands down the most useful front end Bootstrap theme I've ever used. I can't wait
                                                            to use it again for my next project.”
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
                                                                <img src="img/avatars/1.png" alt="Avatar" className="rounded-circle" />
                                                            </div>
                                                            <div>
                                                                <h6 className="mb-0">Cecilia Payne</h6>
                                                                <p className="small text-muted mb-0">CEO of Airbnb</p>
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
                                                                className="client-logo img-fluid" />
                                                        </div>
                                                        <p>
                                                            “I've never used a theme as versatile and flexible as Vuexy. It's my go to for building
                                                            dashboard sites on almost any project.”
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
                                                                <img src="img/avatars/2.png" alt="Avatar" className="rounded-circle" />
                                                            </div>
                                                            <div>
                                                                <h6 className="mb-0">Eugenia Moore</h6>
                                                                <p className="small text-muted mb-0">Founder of Hubspot</p>
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
                                                                className="client-logo img-fluid" />
                                                        </div>
                                                        <p>
                                                            This template is really clean & well documented. The docs are really easy to understand and
                                                            it's always easy to find a screenshot from their website.
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
                                                                <img src="assets/img/avatars/3.png" alt="Avatar" className="rounded-circle" />
                                                            </div>
                                                            <div>
                                                                <h6 className="mb-0">Curtis Fletcher</h6>
                                                                <p className="small text-muted mb-0">Design Lead at Dribbble</p>
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
                                                                src="assets/img/front-pages/branding/logo-4.png"
                                                                alt="client logo"
                                                                className="client-logo img-fluid" />
                                                        </div>
                                                        <p>
                                                            All the requirements for developers have been taken into consideration, so I’m able to build
                                                            any interface I want.
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
                                                                <img src="assets/img/avatars/4.png" alt="Avatar" className="rounded-circle" />
                                                            </div>
                                                            <div>
                                                                <h6 className="mb-0">Sara Smith</h6>
                                                                <p className="small text-muted mb-0">Founder of Continental</p>
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
                                                                className="client-logo img-fluid" />
                                                        </div>
                                                        <p>
                                                            “I've never used a theme as versatile and flexible as Vuexy. It's my go to for building
                                                            dashboard sites on almost any project.”
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
                                                                <img src="img/avatars/5.png" alt="Avatar" className="rounded-circle" />
                                                            </div>
                                                            <div>
                                                                <h6 className="mb-0">Eugenia Moore</h6>
                                                                <p className="small text-muted mb-0">Founder of Hubspot</p>
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
                                                                className="client-logo img-fluid" />
                                                        </div>
                                                        <p>
                                                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam nemo mollitia, ad eum
                                                            officia numquam nostrum repellendus consequuntur!
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
                                                                <img src="assets/img/avatars/1.png" alt="Avatar" className="rounded-circle" />
                                                            </div>
                                                            <div>
                                                                <h6 className="mb-0">Sara Smith</h6>
                                                                <p className="small text-muted mb-0">Founder of Continental</p>
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

                    <div className="container">
                        <div className="swiper-logo-carousel py-8">
                            <div className="swiper" id="swiper-clients-logos">
                                <div className="swiper-wrapper">
                                    <div className="swiper-slide">
                                        <img
                                            src="assets/img/front-pages/branding/logo_1-light.png"
                                            alt="client logo"
                                            className="client-logo"
                                            data-app-light-img="front-pages/branding/logo_1-light.png"
                                            data-app-dark-img="front-pages/branding/logo_1-dark.png" />
                                    </div>
                                    <div className="swiper-slide">
                                        <img
                                            src="assets/img/front-pages/branding/logo_2-light.png"
                                            alt="client logo"
                                            className="client-logo"
                                            data-app-light-img="front-pages/branding/logo_2-light.png"
                                            data-app-dark-img="front-pages/branding/logo_2-dark.png" />
                                    </div>
                                    <div className="swiper-slide">
                                        <img
                                            src="assets/img/front-pages/branding/logo_3-light.png"
                                            alt="client logo"
                                            className="client-logo"
                                            data-app-light-img="front-pages/branding/logo_3-light.png"
                                            data-app-dark-img="front-pages/branding/logo_3-dark.png" />
                                    </div>
                                    <div className="swiper-slide">
                                        <img
                                            src="assets/img/front-pages/branding/logo_4-light.png"
                                            alt="client logo"
                                            className="client-logo"
                                            data-app-light-img="front-pages/branding/logo_4-light.png"
                                            data-app-dark-img="front-pages/branding/logo_4-dark.png" />
                                    </div>
                                    <div className="swiper-slide">
                                        <img
                                            src="assets/img/front-pages/branding/logo_5-light.png"
                                            alt="client logo"
                                            className="client-logo"
                                            data-app-light-img="front-pages/branding/logo_5-light.png"
                                            data-app-dark-img="front-pages/branding/logo_5-dark.png" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </section>



                <section id="landingTeam" className="section-py landing-team">
                    <div className="container">
                        <div className="text-center mb-4">
                            <span className="badge bg-label-primary">Our Great Team</span>
                        </div>
                        <h4 className="text-center mb-1">
            <span className="position-relative fw-extrabold z-1"
            >Supported
              <img
                  src="img/front-pages/icons/section-title-icon.png"
                  alt="laptop charging"
                  className="section-title-img position-absolute object-fit-contain bottom-0 z-n1" />
            </span>
                            by Real People
                        </h4>
                        <p className="text-center mb-md-11 pb-0 pb-xl-12">Who is behind these great-looking interfaces?</p>
                        <div className="row gy-12 mt-2">
                            <div className="col-lg-3 col-sm-6">
                                <div className="card mt-3 mt-lg-0 shadow-none">
                                    <div
                                        className="bg-label-primary border border-bottom-0 border-label-primary position-relative team-image-box">
                                        <img
                                            src="img/front-pages/landing-page/team-member-1.png"
                                            className="position-absolute card-img-position bottom-0 start-50 scaleX-n1-rtl"
                                            alt="human image" />
                                    </div>
                                    <div className="card-body border border-top-0 border-label-primary text-center">
                                        <h5 className="card-title mb-0">Sophie Gilbert</h5>
                                        <p className="text-muted mb-0">Project Manager</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-sm-6">
                                <div className="card mt-3 mt-lg-0 shadow-none">
                                    <div className="bg-label-info border border-bottom-0 border-label-info position-relative team-image-box">
                                        <img
                                            src="img/front-pages/landing-page/team-member-2.png"
                                            className="position-absolute card-img-position bottom-0 start-50 scaleX-n1-rtl"
                                            alt="human image" />
                                    </div>
                                    <div className="card-body border border-top-0 border-label-info text-center">
                                        <h5 className="card-title mb-0">Paul Miles</h5>
                                        <p className="text-muted mb-0">UI Designer</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-sm-6">
                                <div className="card mt-3 mt-lg-0 shadow-none">
                                    <div
                                        className="bg-label-danger border border-bottom-0 border-label-danger position-relative team-image-box">
                                        <img
                                            src="img/front-pages/landing-page/team-member-3.png"
                                            className="position-absolute card-img-position bottom-0 start-50 scaleX-n1-rtl"
                                            alt="human image" />
                                    </div>
                                    <div className="card-body border border-top-0 border-label-danger text-center">
                                        <h5 className="card-title mb-0">Nannie Ford</h5>
                                        <p className="text-muted mb-0">Development Lead</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-sm-6">
                                <div className="card mt-3 mt-lg-0 shadow-none">
                                    <div
                                        className="bg-label-success border border-bottom-0 border-label-success position-relative team-image-box">
                                        <img
                                            src="img/front-pages/landing-page/team-member-4.png"
                                            className="position-absolute card-img-position bottom-0 start-50 scaleX-n1-rtl"
                                            alt="human image" />
                                    </div>
                                    <div className="card-body border border-top-0 border-label-success text-center">
                                        <h5 className="card-title mb-0">Chris Watkins</h5>
                                        <p className="text-muted mb-0">Marketing Manager</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="landingPricing" className="section-py bg-body landing-pricing">
                    <div className="container">
                        <div className="text-center mb-4">
                            <span className="badge bg-label-primary">Pricing Plans</span>
                        </div>
                        <h4 className="text-center mb-1">
            <span className="position-relative fw-extrabold z-1"
            >Tailored pricing plans
              <img
                  src="img/front-pages/icons/section-title-icon.png"
                  alt="laptop charging"
                  className="section-title-img position-absolute object-fit-contain bottom-0 z-n1" />
            </span>
                            designed for you
                        </h4>
                        <p className="text-center pb-2 mb-7">
                            All plans include 40+ advanced tools and features to boost your product.<br />Choose the best plan to fit
                            your needs.
                        </p>
                        <div className="text-center mb-12">
                            <div className="position-relative d-inline-block pt-3 pt-md-0">
                                <label className="switch switch-sm switch-primary me-0">
                                    <span className="switch-label fs-6 text-body me-3">Pay Monthly</span>
                                    <input type="checkbox" className="switch-input price-duration-toggler" checked />
                                    <span className="switch-toggle-slider">
                  <span className="switch-on"></span>
                  <span className="switch-off"></span>
                </span>
                                    <span className="switch-label fs-6 text-body ms-3">Pay Annual</span>
                                </label>
                                <div className="pricing-plans-item position-absolute d-flex">
                                    <img
                                        src="img/front-pages/icons/pricing-plans-arrow.png"
                                        alt="pricing plans arrow"
                                        className="scaleX-n1-rtl" />
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
                                                className="mb-8 pb-2" />
                                            <h4 className="mb-0">Basic</h4>
                                            <div className="d-flex align-items-center justify-content-center">
                                                <span className="price-monthly h2 text-primary fw-extrabold mb-0">$19</span>
                                                <span className="price-yearly h2 text-primary fw-extrabold mb-0 d-none">$14</span>
                                                <sub className="h6 text-muted mb-n1 ms-1">/mo</sub>
                                            </div>
                                            <div className="position-relative pt-2">
                                                <div className="price-yearly text-muted price-yearly-toggle d-none">$ 168 / year</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-body">
                                        <ul className="list-unstyled pricing-list">
                                            <li>
                                                <h6 className="mb-3">
                        <span className="badge badge-center rounded-pill bg-label-primary p-0 me-2"
                        ><i className="ti ti-check ti-14px"></i
                        ></span>
                                                    Timeline
                                                </h6>
                                            </li>
                                            <li>
                                                <h6 className="mb-3">
                        <span className="badge badge-center rounded-pill bg-label-primary p-0 me-2"
                        ><i className="ti ti-check ti-14px"></i
                        ></span>
                                                    Basic search
                                                </h6>
                                            </li>
                                            <li>
                                                <h6 className="mb-3">
                        <span className="badge badge-center rounded-pill bg-label-primary p-0 me-2"
                        ><i className="ti ti-check ti-14px"></i
                        ></span>
                                                    Live chat widget
                                                </h6>
                                            </li>
                                            <li>
                                                <h6 className="mb-3">
                        <span className="badge badge-center rounded-pill bg-label-primary p-0 me-2"
                        ><i className="ti ti-check ti-14px"></i
                        ></span>
                                                    Email marketing
                                                </h6>
                                            </li>
                                            <li>
                                                <h6 className="mb-3">
                        <span className="badge badge-center rounded-pill bg-label-primary p-0 me-2"
                        ><i className="ti ti-check ti-14px"></i
                        ></span>
                                                    Custom Forms
                                                </h6>
                                            </li>
                                            <li>
                                                <h6 className="mb-3">
                        <span className="badge badge-center rounded-pill bg-label-primary p-0 me-2"
                        ><i className="ti ti-check ti-14px"></i
                        ></span>
                                                    Traffic analytics
                                                </h6>
                                            </li>
                                            <li>
                                                <h6 className="mb-3">
                        <span className="badge badge-center rounded-pill bg-label-primary p-0 me-2"
                        ><i className="ti ti-check ti-14px"></i
                        ></span>
                                                    Basic Support
                                                </h6>
                                            </li>
                                        </ul>
                                        <div className="d-grid mt-8">
                                            <a href="payment-page.html" className="btn btn-label-primary">Get Started</a>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-xl-4 col-lg-6">
                                <div className="card border border-primary shadow-xl">
                                    <div className="card-header">
                                        <div className="text-center">
                                            <img src="img/front-pages/icons/plane.png" alt="plane icon" className="mb-8 pb-2" />
                                            <h4 className="mb-0">Team</h4>
                                            <div className="d-flex align-items-center justify-content-center">
                                                <span className="price-monthly h2 text-primary fw-extrabold mb-0">$29</span>
                                                <span className="price-yearly h2 text-primary fw-extrabold mb-0 d-none">$22</span>
                                                <sub className="h6 text-muted mb-n1 ms-1">/mo</sub>
                                            </div>
                                            <div className="position-relative pt-2">
                                                <div className="price-yearly text-muted price-yearly-toggle d-none">$ 264 / year</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-body">
                                        <ul className="list-unstyled pricing-list">
                                            <li>
                                                <h6 className="mb-3">
                        <span className="badge badge-center rounded-pill bg-primary p-0 me-2"
                        ><i className="ti ti-check ti-14px"></i
                        ></span>
                                                    Everything in basic
                                                </h6>
                                            </li>
                                            <li>
                                                <h6 className="mb-3">
                        <span className="badge badge-center rounded-pill bg-primary p-0 me-2"
                        ><i className="ti ti-check ti-14px"></i
                        ></span>
                                                    Timeline with database
                                                </h6>
                                            </li>
                                            <li>
                                                <h6 className="mb-3">
                        <span className="badge badge-center rounded-pill bg-primary p-0 me-2"
                        ><i className="ti ti-check ti-14px"></i
                        ></span>
                                                    Advanced search
                                                </h6>
                                            </li>
                                            <li>
                                                <h6 className="mb-3">
                        <span className="badge badge-center rounded-pill bg-primary p-0 me-2"
                        ><i className="ti ti-check ti-14px"></i
                        ></span>
                                                    Marketing automation
                                                </h6>
                                            </li>
                                            <li>
                                                <h6 className="mb-3">
                        <span className="badge badge-center rounded-pill bg-primary p-0 me-2"
                        ><i className="ti ti-check ti-14px"></i
                        ></span>
                                                    Advanced chatbot
                                                </h6>
                                            </li>
                                            <li>
                                                <h6 className="mb-3">
                        <span className="badge badge-center rounded-pill bg-primary p-0 me-2"
                        ><i className="ti ti-check ti-14px"></i
                        ></span>
                                                    Campaign management
                                                </h6>
                                            </li>
                                            <li>
                                                <h6 className="mb-3">
                        <span className="badge badge-center rounded-pill bg-primary p-0 me-2"
                        ><i className="ti ti-check ti-14px"></i
                        ></span>
                                                    Collaboration tools
                                                </h6>
                                            </li>
                                        </ul>
                                        <div className="d-grid mt-8">
                                            <a href="payment-page.html" className="btn btn-primary">Get Started</a>
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
                                                className="mb-8 pb-2" />
                                            <h4 className="mb-0">Enterprise</h4>
                                            <div className="d-flex align-items-center justify-content-center">
                                                <span className="price-monthly h2 text-primary fw-extrabold mb-0">$49</span>
                                                <span className="price-yearly h2 text-primary fw-extrabold mb-0 d-none">$37</span>
                                                <sub className="h6 text-muted mb-n1 ms-1">/mo</sub>
                                            </div>
                                            <div className="position-relative pt-2">
                                                <div className="price-yearly text-muted price-yearly-toggle d-none">$ 444 / year</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-body">
                                        <ul className="list-unstyled pricing-list">
                                            <li>
                                                <h6 className="mb-3">
                        <span className="badge badge-center rounded-pill bg-label-primary p-0 me-2"
                        ><i className="ti ti-check ti-14px"></i
                        ></span>
                                                    Everything in premium
                                                </h6>
                                            </li>
                                            <li>
                                                <h6 className="mb-3">
                        <span className="badge badge-center rounded-pill bg-label-primary p-0 me-2"
                        ><i className="ti ti-check ti-14px"></i
                        ></span>
                                                    Timeline with database
                                                </h6>
                                            </li>
                                            <li>
                                                <h6 className="mb-3">
                        <span className="badge badge-center rounded-pill bg-label-primary p-0 me-2"
                        ><i className="ti ti-check ti-14px"></i
                        ></span>
                                                    Fuzzy search
                                                </h6>
                                            </li>
                                            <li>
                                                <h6 className="mb-3">
                        <span className="badge badge-center rounded-pill bg-label-primary p-0 me-2"
                        ><i className="ti ti-check ti-14px"></i
                        ></span>
                                                    A/B testing sanbox
                                                </h6>
                                            </li>
                                            <li>
                                                <h6 className="mb-3">
                        <span className="badge badge-center rounded-pill bg-label-primary p-0 me-2"
                        ><i className="ti ti-check ti-14px"></i
                        ></span>
                                                    Custom permissions
                                                </h6>
                                            </li>
                                            <li>
                                                <h6 className="mb-3">
                        <span className="badge badge-center rounded-pill bg-label-primary p-0 me-2"
                        ><i className="ti ti-check ti-14px"></i
                        ></span>
                                                    Social media automation
                                                </h6>
                                            </li>
                                            <li>
                                                <h6 className="mb-3">
                        <span className="badge badge-center rounded-pill bg-label-primary p-0 me-2"
                        ><i className="ti ti-check ti-14px"></i
                        ></span>
                                                    Sales automation tools
                                                </h6>
                                            </li>
                                        </ul>
                                        <div className="d-grid mt-8">
                                            <a href="payment-page.html" className="btn btn-label-primary">Get Started</a>
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
                                        <img src="img/front-pages/icons/laptop.png" alt="laptop" className="mb-4" />
                                        <h3 className="mb-0">7.1k+</h3>
                                        <p className="fw-medium mb-0">
                                            Support Tickets<br />
                                            Resolved
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-6 col-lg-3">
                                <div className="card border border-success shadow-none">
                                    <div className="card-body text-center">
                                        <img src="img/front-pages/icons/user-success.png" alt="laptop" className="mb-4" />
                                        <h3 className="mb-0">50k+</h3>
                                        <p className="fw-medium mb-0">
                                            Join creatives<br />
                                            community
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-6 col-lg-3">
                                <div className="card border border-info shadow-none">
                                    <div className="card-body text-center">
                                        <img src="img/front-pages/icons/diamond-info.png" alt="laptop" className="mb-4" />
                                        <h3 className="mb-0">4.8/5</h3>
                                        <p className="fw-medium mb-0">
                                            Highly Rated<br />
                                            Products
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-6 col-lg-3">
                                <div className="card border border-warning shadow-none">
                                    <div className="card-body text-center">
                                        <img src="img/front-pages/icons/check-warning.png" alt="laptop" className="mb-4" />
                                        <h3 className="mb-0">100%</h3>
                                        <p className="fw-medium mb-0">
                                            Money Back<br />
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
                            <span className="position-relative fw-extrabold z-1"
                            >questions
              <img
                  src="img/front-pages/icons/section-title-icon.png"
                  alt="laptop charging"
                  className="section-title-img position-absolute object-fit-contain bottom-0 z-n1" />
            </span>
                        </h4>
                        <p className="text-center mb-12 pb-md-4">
                            Browse through these FAQs to find answers to commonly asked questions.
                        </p>
                        <div className="row gy-12 align-items-center">
                            <div className="col-lg-5">
                                <div className="text-center">
                                    <img
                                        src="img/front-pages/landing-page/faq-boy-with-logos.png"
                                        alt="faq boy with logos"
                                        className="faq-image" />
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
                                                aria-controls="accordionOne">
                                                Do you charge for each upgrade?
                                            </button>
                                        </h2>

                                        <div id="accordionOne" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                            <div className="accordion-body">
                                                Lemon drops chocolate cake gummies carrot cake chupa chups muffin topping. Sesame snaps icing
                                                marzipan gummi bears macaroon dragée danish caramels powder. Bear claw dragée pastry topping
                                                soufflé. Wafer gummi bears marshmallow pastry pie.
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
                                                aria-controls="accordionTwo">
                                                Do I need to purchase a license for each website?
                                            </button>
                                        </h2>
                                        <div
                                            id="accordionTwo"
                                            className="accordion-collapse collapse"
                                            aria-labelledby="headingTwo"
                                            data-bs-parent="#accordionExample">
                                            <div className="accordion-body">
                                                Dessert ice cream donut oat cake jelly-o pie sugar plum cheesecake. Bear claw dragée oat cake
                                                dragée ice cream halvah tootsie roll. Danish cake oat cake pie macaroon tart donut gummies. Jelly
                                                beans candy canes carrot cake. Fruitcake chocolate chupa chups.
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
                                                aria-controls="accordionThree">
                                                What is regular license?
                                            </button>
                                        </h2>
                                        <div
                                            id="accordionThree"
                                            className="accordion-collapse collapse show"
                                            aria-labelledby="headingThree"
                                            data-bs-parent="#accordionExample">
                                            <div className="accordion-body">
                                                Regular license can be used for end products that do not charge users for access or service(access
                                                is free and there will be no monthly subscription fee). Single regular license can be used for
                                                single end product and end product can be used by you or your client. If you want to sell end
                                                product to multiple clients then you will need to purchase separate license for each client. The
                                                same rule applies if you want to use the same end product on multiple domains(unique setup). For
                                                more info on regular license you can check official description.
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
                                                aria-controls="accordionFour">
                                                What is extended license?
                                            </button>
                                        </h2>
                                        <div
                                            id="accordionFour"
                                            className="accordion-collapse collapse"
                                            aria-labelledby="headingFour"
                                            data-bs-parent="#accordionExample">
                                            <div className="accordion-body">
                                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis et aliquid quaerat possimus maxime!
                                                Mollitia reprehenderit neque repellat deleniti delectus architecto dolorum maxime, blanditiis
                                                earum ea, incidunt quam possimus cumque.
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
                                                aria-controls="accordionFive">
                                                Which license is applicable for SASS application?
                                            </button>
                                        </h2>
                                        <div
                                            id="accordionFive"
                                            className="accordion-collapse collapse"
                                            aria-labelledby="headingFive"
                                            data-bs-parent="#accordionExample">
                                            <div className="accordion-body">
                                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sequi molestias exercitationem ab cum
                                                nemo facere voluptates veritatis quia, eveniet veniam at et repudiandae mollitia ipsam quasi
                                                labore enim architecto non!
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="landingCTA" className="section-py landing-cta position-relative p-lg-0 pb-0">
                    <img
                        src="img/front-pages/backgrounds/cta-bg-light.png"
                        className="position-absolute bottom-0 end-0 scaleX-n1-rtl h-100 w-100 z-n1"
                        alt="cta image"
                        data-app-light-img="front-pages/backgrounds/cta-bg-light.png"
                        data-app-dark-img="front-pages/backgrounds/cta-bg-dark.png" />
                    <div className="container">
                        <div className="row align-items-center gy-12">
                            <div className="col-lg-6 text-start text-sm-center text-lg-start">
                                <h3 className="cta-title text-primary fw-bold mb-0">Ready to Get Started?</h3>
                                <h5 className="text-body mb-8">Start your project with a 14-day free trial</h5>
                                <a href="payment-page.html" className="btn btn-lg btn-primary">Get Started</a>
                            </div>
                            <div className="col-lg-6 pt-lg-12 text-center text-lg-end">
                                <img
                                    src="img/front-pages/landing-page/cta-dashboard.png"
                                    alt="cta dashboard"
                                    className="img-fluid mt-lg-4" />
                            </div>
                        </div>
                    </div>
                </section>

                <section id="landingContact" className="section-py bg-body landing-contact">
                    <div className="container">
                        <div className="text-center mb-4">
                            <span className="badge bg-label-primary">Contact US</span>
                        </div>
                        <h4 className="text-center mb-1">
            <span className="position-relative fw-extrabold z-1"
            >Let's work
              <img
                  src="img/front-pages/icons/section-title-icon.png"
                  alt="laptop charging"
                  className="section-title-img position-absolute object-fit-contain bottom-0 z-n1" />
            </span>
                            together
                        </h4>
                        <p className="text-center mb-12 pb-md-4">Any question or remark? just write us a message</p>
                        <div className="row g-6">
                            <div className="col-lg-5">
                                <div className="contact-img-box position-relative border p-2 h-100">
                                    <img
                                        src="img/front-pages/icons/contact-border.png"
                                        alt="contact border"
                                        className="contact-border-img position-absolute d-none d-lg-block scaleX-n1-rtl" />
                                    <img
                                        src="img/front-pages/landing-page/contact-customer-service.png"
                                        alt="contact customer service"
                                        className="contact-img w-100 scaleX-n1-rtl" />
                                    <div className="p-4 pb-2">
                                        <div className="row g-4">
                                            <div className="col-md-6 col-lg-12 col-xl-6">
                                                <div className="d-flex align-items-center">
                                                    <div className="badge bg-label-primary rounded p-1_5 me-3"><i className="ti ti-mail ti-lg"></i></div>
                                                    <div>
                                                        <p className="mb-0">Email</p>
                                                        <h6 className="mb-0">
                                                            <a href="mailto:example@gmail.com" className="text-heading">example@gmail.com</a>
                                                        </h6>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6 col-lg-12 col-xl-6">
                                                <div className="d-flex align-items-center">
                                                    <div className="badge bg-label-success rounded p-1_5 me-3">
                                                        <i className="ti ti-phone-call ti-lg"></i>
                                                    </div>
                                                    <div>
                                                        <p className="mb-0">Phone</p>
                                                        <h6 className="mb-0"><a href="tel:+1234-568-963" className="text-heading">+1234 568 963</a></h6>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-7">
                                <div className="card h-100">
                                    <div className="card-body">
                                        <h4 className="mb-2">Send a message</h4>
                                        <p className="mb-6">
                                            If you would like to discuss anything related to payment, account, licensing,<br
                                            className="d-none d-lg-block" />
                                            partnerships, or have pre-sales questions, you’re at the right place.
                                        </p>
                                        <form>
                                            <div className="row g-4">
                                                <div className="col-md-6">
                                                    <label className="form-label" form="contact-form-fullname">Full Name</label>
                                                    <input type="text" className="form-control" id="contact-form-fullname" placeholder="john" />
                                                </div>
                                                <div className="col-md-6">
                                                    <label className="form-label" form="contact-form-email">Email</label>
                                                    <input
                                                        type="text"
                                                        id="contact-form-email"
                                                        className="form-control"
                                                        placeholder="johndoe@gmail.com" />
                                                </div>
                                                <div className="col-12">
                                                    <label className="form-label" form="contact-form-message">Message</label>
                                                    <textarea
                                                        id="contact-form-message"
                                                        className="form-control"
                                                        rows="7"
                                                        placeholder="Write a message"></textarea>
                                                </div>
                                                <div className="col-12">
                                                    <button type="submit" className="btn btn-primary">Send inquiry</button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
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
                        data-app-dark-img="front-pages/backgrounds/footer-bg-dark.png" />
                    <div className="container">
                        <div className="row gx-0 gy-6 g-lg-10">
                            <div className="col-lg-5">
                                <a href="landing-page.html" className="app-brand-link mb-6">
                <span className="app-brand-logo demo">
                  <svg width="32" height="22" viewBox="0 0 32 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M0.00172773 0V6.85398C0.00172773 6.85398 -0.133178 9.01207 1.98092 10.8388L13.6912 21.9964L19.7809 21.9181L18.8042 9.88248L16.4951 7.17289L9.23799 0H0.00172773Z"
                        fill="#7367F0" />
                    <path
                        opacity="0.06"
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M7.69824 16.4364L12.5199 3.23696L16.5541 7.25596L7.69824 16.4364Z"
                        fill="#161616" />
                    <path
                        opacity="0.06"
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M8.07751 15.9175L13.9419 4.63989L16.5849 7.28475L8.07751 15.9175Z"
                        fill="#161616" />
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M7.77295 16.3566L23.6563 0H32V6.88383C32 6.88383 31.8262 9.17836 30.6591 10.4057L19.7824 22H13.6938L7.77295 16.3566Z"
                        fill="#7367F0" />
                  </svg>
                </span>
                                    <span className="app-brand-text demo footer-link fw-bold ms-2 ps-1">Vuexy</span>
                                </a>
                                <p className="footer-text footer-logo-description mb-6">
                                    Most developer friendly & highly customisable Admin Dashboard Template.
                                </p>
                                <form className="footer-form">
                                    <label form="footer-email" className="small">Subscribe to newsletter</label>
                                    <div className="d-flex mt-1">
                                        <input
                                            type="email"
                                            className="form-control rounded-0 rounded-start-bottom rounded-start-top"
                                            id="footer-email"
                                            placeholder="Your email" />
                                        <button
                                            type="submit"
                                            className="btn btn-primary shadow-none rounded-0 rounded-end-bottom rounded-end-top">
                                            Subscribe
                                        </button>
                                    </div>
                                </form>
                            </div>
                            <div className="col-lg-2 col-md-4 col-sm-6">
                                <h6 className="footer-title mb-6">Demos</h6>
                                <ul className="list-unstyled">
                                    <li className="mb-4">
                                        <a href="../vertical-menu-template/" target="_blank" className="footer-link">Vertical Layout</a>
                                    </li>
                                    <li className="mb-4">
                                        <a href="../horizontal-menu-template/" target="_blank" className="footer-link">Horizontal Layout</a>
                                    </li>
                                    <li className="mb-4">
                                        <a href="../vertical-menu-template-bordered/" target="_blank" className="footer-link">Bordered Layout</a>
                                    </li>
                                    <li className="mb-4">
                                        <a href="../vertical-menu-template-semi-dark/" target="_blank" className="footer-link"
                                        >Semi Dark Layout</a
                                        >
                                    </li>
                                    <li className="mb-4">
                                        <a href="../vertical-menu-template-dark/" target="_blank" className="footer-link">Dark Layout</a>
                                    </li>
                                </ul>
                            </div>
                            <div className="col-lg-2 col-md-4 col-sm-6">
                                <h6 className="footer-title mb-6">Pages</h6>
                                <ul className="list-unstyled">
                                    <li className="mb-4">
                                        <a href="pricing-page.html" className="footer-link">Pricing</a>
                                    </li>
                                    <li className="mb-4">
                                        <a href="payment-page.html" className="footer-link"
                                        >Payment<span className="badge bg-primary ms-2">New</span></a
                                        >
                                    </li>
                                    <li className="mb-4">
                                        <a href="checkout-page.html" className="footer-link">Checkout</a>
                                    </li>
                                    <li className="mb-4">
                                        <a href="help-center-landing.html" className="footer-link">Help Center</a>
                                    </li>
                                    <li className="mb-4">
                                        <a href="../vertical-menu-template/auth-login-cover.html" target="_blank" className="footer-link"
                                        >Login/Register</a
                                        >
                                    </li>
                                </ul>
                            </div>
                            <div className="col-lg-3 col-md-4">
                                <h6 className="footer-title mb-6">Download our app</h6>
                                <a href="javascript:void(0);" className="d-block mb-4"
                                ><img src="img/front-pages/landing-page/apple-icon.png" alt="apple icon"
                                /></a>
                                <a href="javascript:void(0);" className="d-block"
                                ><img src="img/front-pages/landing-page/google-play-icon.png" alt="google play icon"
                                /></a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="footer-bottom py-3 py-md-5">
                    <div
                        className="container d-flex flex-wrap justify-content-between flex-md-row flex-column text-center text-md-start">
                        <div className="mb-2 mb-md-0">
            <span className="footer-bottom-text"
            >©

            </span>
                            <a href="https://pixinvent.com" target="_blank" className="fw-medium text-white text-white">Pixinvent,</a>
                            <span className="footer-bottom-text"> Made with for a better web.</span>
                        </div>
                        <div>
                            <a href="https://github.com/pixinvent" className="me-3" target="_blank">
                                <img src="img/front-pages/icons/github.svg" alt="github icon" />
                            </a>
                            <a href="https://www.facebook.com/pixinvents/" className="me-3" target="_blank">
                                <img src="img/front-pages/icons/facebook.svg" alt="facebook icon" />
                            </a>
                            <a href="https://twitter.com/pixinvents" className="me-3" target="_blank">
                                <img src="img/front-pages/icons/twitter.svg" alt="twitter icon" />
                            </a>
                            <a href="https://www.instagram.com/pixinvents/" target="_blank">
                                <img src="img/front-pages/icons/instagram.svg" alt="google icon" />
                            </a>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
};



export default Home;
