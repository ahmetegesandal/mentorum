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
                        </div>
                        <div className="d-flex align-items-center">
                          <div className="avatar me-3 avatar-sm">
                            <img
                              src="/img/avatars/aslihanKaratas.jpg"
                              alt="Avatar"
                              className="rounded-circle"
                            />
                          </div>
                          <div>
                            <h6 className="mb-0">Aslıhan Karataş</h6>
                            <p className="small text-muted mb-0">
                              Öğretim Görevlisi
                            </p>
                          </div>
                        </div>
                        <br></br>
                        <p>“Dersler interaktif ve öğrenci odaklı. Katılımı teşvik eden harika bir ortam sağlanıyor.”</p>
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
                        </div>
                        <div className="d-flex align-items-center">
                          <div className="avatar me-3 avatar-sm">
                            <img
                              src="/img/avatars/SibelCaliskan.jpg"
                              alt="Avatar"
                              className="rounded-circle"
                            />
                          </div>
                          <div>
                            <h6 className="mb-0">Sibel Birtane Akar</h6>
                            <p className="small text-muted mb-0">
                            Öğretim Görevlisi
                            </p>
                          </div>
                        </div>
                        <br></br>
                        <p>“Dersler çok etkili. Teknolojinin sunduğu olanaklarla daha verimli eğitim sunuyoruz.”</p>
                        <div className="text-warning mb-4">
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
                        </div>
                        <div className="d-flex align-items-center">
                          <div className="avatar me-3 avatar-sm">
                            <img
                              src="/img/avatars/murat.jpg"
                              alt="Avatar"
                              className="rounded-circle"
                            />
                          </div>
                          <div>
                            <h6 className="mb-0">Murat Yıldız</h6>
                            <p className="small text-muted mb-0">
                            Öğretim Görevlisi
                            </p>
                          </div>
                        </div>
                        <br></br>
                        <p>“Dersler genellikle çok iyi, öğrencilerle etkileşim harika.”</p>
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
                        </div>
                        <div className="d-flex align-items-center">
                          <div className="avatar me-3 avatar-sm">
                            <img
                              src="/img/avatars/burcinCelik.jpg"
                              alt="Avatar"
                              className="rounded-circle"
                            />
                          </div>
                          <div>
                            <h6 className="mb-0">Burçin Çelik</h6>
                            <p className="small text-muted mb-0">
                             Öğretim Görevlisi
                            </p>
                          </div>
                        </div>
                        <br></br>
                        <p>“Sistem çok kullanıcı dostu. Öğrencilerle daha yakın ilişkiler kurarak daha iyi ilerleyebiliyoruz.”</p>
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
                              src="/img/avatars/ebrudman.jpg"
                              alt="Avatar"
                              className="rounded-circle"
                            />
                          </div>
                          <div>
                            <h6 className="mb-0">Ebru İdman</h6>
                            <p className="small text-muted mb-0">
                               Öğretim Görevlisi
                            </p>
                          </div>
                        </div>
                        <br></br>
                        <p>“Dersler verimli, ama daha fazla etkileşim olabilirdi.”</p>
                        <div className="text-warning mb-4">
                          <i className="ti ti-star-filled"></i>
                          <i className="ti ti-star-filled"></i>
                          <i className="ti ti-star-filled"></i>
                          <i className="ti ti-star-filled"></i>
                        </div>
                      </div>
                    </div>
                  </div>

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
