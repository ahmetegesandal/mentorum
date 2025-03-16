import { useEffect } from "react";
import { useTranslation } from "next-i18next";

const SwiperComponent = () => {
  const { t } = useTranslation();
  
  useEffect(() => {
    const swiper = new Swiper("#swiper-reviews", {
      loop: true,
      slidesPerView: "1",
      spaceBetween: 10,

      navigation: {
        nextEl: "#reviews-next-btn",
        prevEl: "#reviews-previous-btn",
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
    });

    return () => {
      if (swiper && typeof swiper.destroy === 'function') {
        swiper.destroy(true, true); 
      }
    };
  }, []);

  return (
    <section
      id="landingReviews"
      className="section-py bg-body landing-reviews pb-0"
    >
      <div className="container">
        <div className="row align-items-center gx-0 gy-4 g-lg-5 mb-5 pb-md-5">
          <div className="col-md-6 col-lg-5 col-xl-3">
            <div className="mb-4">
              <span className="badge bg-label-primary">
              {t("custReviews")}  
              </span>
            </div>
            <h4 className="mb-1">
              <span className="position-relative fw-extrabold z-1">
              {t("peopleSay")}
                <img
                  src="img/front-pages/icons/section-title-icon.png"
                  alt="laptop charging"
                  className="section-title-img position-absolute object-fit-contain bottom-0 z-n1"
                />
              </span>
            </h4>
            <p className="mb-5 mb-md-12" 
            dangerouslySetInnerHTML={{ __html: t("peopleSay2") }} />

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
                  {/* Swiper Slide 1 */}
                  <div className="swiper-slide">
                    <div className="card h-100">
                      <div className="card-body text-body d-flex flex-column justify-content-between h-100">
                        <div className="mb-4">
                          {/* Swiper Slide 1 
                          <img
                            src="img/front-pages/branding/logo-1.png"
                            alt="client logo"
                            className="client-logo img-fluid"
                          />*/}
                        </div>
                        <div className="d-flex align-items-center">
                          <div className="avatar me-3 avatar-sm">
                            <img
                              src="/img/avatars/ege1.jpg"
                              alt="Avatar"
                              className="rounded-circle"
                            />
                          </div>
                          <div>
                            <h6 className="mb-0">Ege</h6>
                            <p className="small text-muted mb-0">
                              Developer
                            </p>
                          </div>
                        </div>
                        <br></br>
                        <p>“çalışın boş oturmayın!!”</p>
                        <div className="text-warning mb-4">
                          <i className="ti ti-star-filled"></i>
                          <i className="ti ti-star-filled"></i>
                          <i className="ti ti-star-filled"></i>
                          <i className="ti ti-star-filled"></i>
                          <i className="ti ti-star-filled"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="swiper-slide">
                    <div className="card h-100">
                      <div className="card-body text-body d-flex flex-column justify-content-between h-100">
                        <div className="mb-4">
                     {/* Swiper Slide 1 
                          <img
                            src="img/front-pages/branding/logo-1.png"
                            alt="client logo"
                            className="client-logo img-fluid"
                          />*/}
                        </div>
                        <div className="d-flex align-items-center">
                          <div className="avatar me-3 avatar-sm">
                            <img
                              src="/img/avatars/ufuk.jpeg"
                              alt="Avatar"
                              className="rounded-circle"
                            />
                          </div>
                          <div>
                            <h6 className="mb-0">Ufuk</h6>
                            <p className="small text-muted mb-0">
                              Developer
                            </p>
                          </div>
                        </div>
                        <br></br>
                        <p>“bu hocalar süpermiş”</p>
                        <div className="text-warning mb-4">
                          <i className="ti ti-star-filled"></i>
                          <i className="ti ti-star-filled"></i>
                          <i className="ti ti-star-filled"></i>
                          <i className="ti ti-star-filled"></i>
                          <i className="ti ti-star-filled"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="swiper-slide">
                    <div className="card h-100">
                      <div className="card-body text-body d-flex flex-column justify-content-between h-100">
                        <div className="mb-4">
                        {/* Swiper Slide 1 
                          <img
                            src="img/front-pages/branding/logo-1.png"
                            alt="client logo"
                            className="client-logo img-fluid"
                          />*/}
                        </div>
                        <div className="d-flex align-items-center">
                          <div className="avatar me-3 avatar-sm">
                            <img
                              src="/img/avatars/senak.jpeg"
                              alt="Avatar"
                              className="rounded-circle"
                            />
                          </div>
                          <div>
                            <h6 className="mb-0">sena</h6>
                            <p className="small text-muted mb-0">
                              Developer
                            </p>
                          </div>
                        </div>
                        <br></br>
                        <p>“very very good!!”</p>
                        <div className="text-warning mb-4">
                          <i className="ti ti-star-filled"></i>
                          <i className="ti ti-star-filled"></i>
                          <i className="ti ti-star-filled"></i>
                          <i className="ti ti-star-filled"></i>
                          <i className="ti ti-star-filled"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="swiper-slide">
                    <div className="card h-100">
                      <div className="card-body text-body d-flex flex-column justify-content-between h-100">
                        <div className="mb-4">
                          {/* Swiper Slide 1 
                          <img
                            src="img/front-pages/branding/logo-1.png"
                            alt="client logo"
                            className="client-logo img-fluid"
                          />*/}
                        </div>
                        <div className="d-flex align-items-center">
                          <div className="avatar me-3 avatar-sm">
                            <img
                              src="/img/avatars/hatçe.jpeg"
                              alt="Avatar"
                              className="rounded-circle"
                            />
                          </div>
                          <div>
                            <h6 className="mb-0">Hatice</h6>
                            <p className="small text-muted mb-0">
                             Developer
                            </p>
                          </div>
                        </div>
                        <br></br>
                        <p>“keyiflii”</p>
                        <div className="text-warning mb-4">
                          <i className="ti ti-star-filled"></i>
                          <i className="ti ti-star-filled"></i>
                          <i className="ti ti-star-filled"></i>
                          <i className="ti ti-star-filled"></i>
                          <i className="ti ti-star-filled"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="swiper-slide">
                    <div className="card h-100">
                      <div className="card-body text-body d-flex flex-column justify-content-between h-100">
                        <div className="mb-4">
                        {/* Swiper Slide 1 
                          <img
                            src="img/front-pages/branding/logo-1.png"
                            alt="client logo"
                            className="client-logo img-fluid"
                          />*/}
                        </div>
                        <div className="d-flex align-items-center">
                          <div className="avatar me-3 avatar-sm">
                            <img
                              src="/img/avatars/emr.jpeg"
                              alt="Avatar"
                              className="rounded-circle"
                            />
                          </div>
                          <div>
                            <h6 className="mb-0">Emir</h6>
                            <p className="small text-muted mb-0">
                               Developer
                            </p>
                          </div>
                        </div>
                        <br></br>
                        <p>“çalışın ..”</p>
                        <div className="text-warning mb-4">
                          <i className="ti ti-star-filled"></i>
                          <i className="ti ti-star-filled"></i>
                          <i className="ti ti-star-filled"></i>
                          <i className="ti ti-star-filled"></i>
                          <i className="ti ti-star-filled"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Diğer swiper slide'ları burada... */}
                </div>

                {/* Pagination ve Navigation */}
                <div className="swiper-pagination"></div>
                <div className="swiper-button-next"></div>
                <div className="swiper-button-prev"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr className="m-0 mt-6 mt-md-12" />
    </section>
  );
};


export default SwiperComponent;
