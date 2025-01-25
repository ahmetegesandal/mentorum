import LayoutMenu from "../components/LayoutMenu";
import Navbar from "../components/Navbar";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {useTranslation} from "next-i18next";


const Slessons = () => {
    const { t } = useTranslation("common");

    return (
        <>
            <LayoutMenu/>
            <div className="layout-page">
                <Navbar/>
                <div className="content-wrapper">

                    <div className="container-xxl flex-grow-1 container-p-y">
                        <div className="app-academy">
                            <div className="card p-0 mb-6">
                                <div
                                    className="card-body d-flex flex-column flex-md-row justify-content-between p-0 pt-6">
                                    <div className="app-academy-md-25 card-body py-0 pt-6 ps-12">
                                        <img
                                            src="img/illustrations/bulb-light.png"
                                            className="img-fluid app-academy-img-height scaleX-n1-rtl"
                                            alt="Bulb in hand"
                                            data-app-light-img="illustrations/bulb-light.png"
                                            data-app-dark-img="illustrations/bulb-dark.png"
                                            height="90"/>
                                    </div>
                                    <div
                                        className="app-academy-md-50 card-body d-flex align-items-md-center flex-column text-md-center mb-6 py-6">
                                        <span className="card-title mb-4 lh-lg px-md-12 h4 text-heading">
                                            Eğitim, yetenekler ve kariyer<br/>
                                            fırsatları. <span className="text-primary text-nowrap">Hepsi tek bir yerde</span>.
                                        </span>
                                        <p className="mb-4 px-0 px-md-2">
                                            Pazarlama, bilişim teknolojileri, programlama ve veri bilimi
                                            alanlarında<br/>
                                            en güvenilir online kurslar ve sertifikalarla yeteneklerinizi geliştirin.
                                        </p>
                                        <div
                                            className="d-flex align-items-center justify-content-between app-academy-md-80">
                                            <input type="search" placeholder="Kursunuzu bulun"
                                                   className="form-control me-4"/>
                                            <button type="submit" className="btn btn-primary btn-icon">
                                                <i className="ti ti-search ti-md"></i>
                                            </button>
                                        </div>
                                    </div>

                                    <div className="app-academy-md-25 d-flex align-items-end justify-content-end">
                                        <img
                                            src="img/illustrations/pencil-rocket.png"
                                            alt="pencil rocket"
                                            height="188"
                                            className="scaleX-n1-rtl"/>
                                    </div>
                                </div>
                            </div>

                            <div className="card mb-6">
                                <div className="card-header d-flex flex-wrap justify-content-between gap-4">
                                    <div className="card-title mb-0 me-1">
                                        <h5 className="mb-0">Dersler</h5>
                                        <p className="mb-0">...</p>
                                    </div>
                                    <div className="d-flex justify-content-md-end align-items-center column-gap-6">
                                        <select className="form-select">
                                            <option value="">Tüm Dersler</option>
                                            <option value="ui/ux">Matematik</option>
                                            <option value="seo">Yabancı Dil</option>
                                            <option value="web">Fizik</option>
                                            <option value="music">Kimya</option>
                                            <option value="painting">Biyoloji</option>
                                            <option value="painting">Tarih</option>
                                            <option value="painting">Edebiyat</option>
                                            <option value="painting">Coğrafya</option>
                                            <option value="painting">Felsefe</option>
                                            <option value="painting">Bilgisayar Bilimleri</option>
                                        </select>


                                    </div>
                                </div>
                                <div className="card-body">
                                    <div className="row gy-6 mb-6">
                                        <div className="col-sm-6 col-lg-3">
                                            <div className="card p-2 h-100 shadow-none border">
                                                <div className="rounded-2 text-center mb-4">
                                                    <a href="app-academy-course-details.html"
                                                    ><img
                                                        className="img-fluid"
                                                        src="img/pages/app-academy-tutor-1.png"
                                                        alt="tutor image 1"
                                                    /></a>
                                                </div>
                                                <div className="card-body p-4 pt-2">
                                                    <div
                                                        className="d-flex justify-content-between align-items-center mb-4">
                                                        <span className="badge bg-label-primary">Matematik</span>
                                                        <p className="d-flex align-items-center justify-content-center fw-medium gap-1 mb-0">
                                                            4.4 <span className="text-warning"><i
                                                            className="ti ti-star-filled ti-lg me-1"></i></span
                                                        ><span className="fw-normal">(1.23k)</span>
                                                        </p>
                                                    </div>
                                                    <a href="app-academy-course-details.html" className="h5">Ben,
                                                        Trigonometri dersi verebilirim.</a>
                                                    <p className="mt-1">Introductory course for Angular and framework
                                                        basics in web development.</p>


                                                    <div
                                                        className="d-flex flex-column flex-md-row gap-4 text-nowrap flex-wrap flex-md-nowrap flex-lg-wrap flex-xxl-nowrap">

                                                        <a
                                                            className="w-100 btn btn-label-primary d-flex align-items-center"
                                                            href="app-academy-course-details.html">
                                                            <span className="me-2">Detayları Görüntüle</span>
                                                            <i className="ti ti-chevron-right ti-xs scaleX-n1-rtl"></i>
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-sm-6 col-lg-3">
                                            <div className="card p-2 h-100 shadow-none border">
                                                <div className="rounded-2 text-center mb-4">
                                                    <a href="app-academy-course-details.html"
                                                    ><img
                                                        className="img-fluid"
                                                        src="img/pages/app-academy-tutor-1.png"
                                                        alt="tutor image 1"
                                                    /></a>
                                                </div>
                                                <div className="card-body p-4 pt-2">
                                                    <div
                                                        className="d-flex justify-content-between align-items-center mb-4">
                                                        <span className="badge bg-label-primary">Matematik</span>
                                                        <p className="d-flex align-items-center justify-content-center fw-medium gap-1 mb-0">
                                                            4.4 <span className="text-warning"><i
                                                            className="ti ti-star-filled ti-lg me-1"></i></span
                                                        ><span className="fw-normal">(1.23k)</span>
                                                        </p>
                                                    </div>
                                                    <a href="app-academy-course-details.html" className="h5">Ben,
                                                        Trigonometri dersi verebilirim.</a>
                                                    <p className="mt-1">Introductory course for Angular and framework
                                                        basics in web development.</p>


                                                    <div
                                                        className="d-flex flex-column flex-md-row gap-4 text-nowrap flex-wrap flex-md-nowrap flex-lg-wrap flex-xxl-nowrap">

                                                        <a
                                                            className="w-100 btn btn-label-primary d-flex align-items-center"
                                                            href="app-academy-course-details.html">
                                                            <span className="me-2">Detayları Görüntüle</span>
                                                            <i className="ti ti-chevron-right ti-xs scaleX-n1-rtl"></i>
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-sm-6 col-lg-3">
                                            <div className="card p-2 h-100 shadow-none border">
                                                <div className="rounded-2 text-center mb-4">
                                                    <a href="app-academy-course-details.html"
                                                    ><img
                                                        className="img-fluid"
                                                        src="img/pages/app-academy-tutor-1.png"
                                                        alt="tutor image 1"
                                                    /></a>
                                                </div>
                                                <div className="card-body p-4 pt-2">
                                                    <div
                                                        className="d-flex justify-content-between align-items-center mb-4">
                                                        <span className="badge bg-label-primary">Matematik</span>
                                                        <p className="d-flex align-items-center justify-content-center fw-medium gap-1 mb-0">
                                                            4.4 <span className="text-warning"><i
                                                            className="ti ti-star-filled ti-lg me-1"></i></span
                                                        ><span className="fw-normal">(1.23k)</span>
                                                        </p>
                                                    </div>
                                                    <a href="app-academy-course-details.html" className="h5">Ben,
                                                        Trigonometri dersi verebilirim.</a>
                                                    <p className="mt-1">Introductory course for Angular and framework
                                                        basics in web development.</p>


                                                    <div
                                                        className="d-flex flex-column flex-md-row gap-4 text-nowrap flex-wrap flex-md-nowrap flex-lg-wrap flex-xxl-nowrap">

                                                        <a
                                                            className="w-100 btn btn-label-primary d-flex align-items-center"
                                                            href="app-academy-course-details.html">
                                                            <span className="me-2">Detayları Görüntüle</span>
                                                            <i className="ti ti-chevron-right ti-xs scaleX-n1-rtl"></i>
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-sm-6 col-lg-3">
                                            <div className="card p-2 h-100 shadow-none border">
                                                <div className="rounded-2 text-center mb-4">
                                                    <a href="app-academy-course-details.html"
                                                    ><img
                                                        className="img-fluid"
                                                        src="img/pages/app-academy-tutor-1.png"
                                                        alt="tutor image 1"
                                                    /></a>
                                                </div>
                                                <div className="card-body p-4 pt-2">
                                                    <div
                                                        className="d-flex justify-content-between align-items-center mb-4">
                                                        <span className="badge bg-label-primary">Matematik</span>
                                                        <p className="d-flex align-items-center justify-content-center fw-medium gap-1 mb-0">
                                                            4.4 <span className="text-warning"><i
                                                            className="ti ti-star-filled ti-lg me-1"></i></span
                                                        ><span className="fw-normal">(1.23k)</span>
                                                        </p>
                                                    </div>
                                                    <a href="app-academy-course-details.html" className="h5">Ben,
                                                        Trigonometri dersi verebilirim.</a>
                                                    <p className="mt-1">Introductory course for Angular and framework
                                                        basics in web development.</p>


                                                    <div
                                                        className="d-flex flex-column flex-md-row gap-4 text-nowrap flex-wrap flex-md-nowrap flex-lg-wrap flex-xxl-nowrap">

                                                        <a
                                                            className="w-100 btn btn-label-primary d-flex align-items-center"
                                                            href="app-academy-course-details.html">
                                                            <span className="me-2">Detayları Görüntüle</span>
                                                            <i className="ti ti-chevron-right ti-xs scaleX-n1-rtl"></i>
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <nav aria-label="Page navigation"
                                         className="d-flex align-items-center justify-content-center">
                                        <ul className="pagination mb-0 pagination-rounded">
                                            <li className="page-item first">
                                                <a className="page-link" href="javascript:void(0);"
                                                ><i className="ti ti-chevrons-left ti-md scaleX-n1-rtl"></i
                                                ></a>
                                            </li>
                                            <li className="page-item prev">
                                                <a className="page-link" href="javascript:void(0);"
                                                ><i className="ti ti-chevron-left ti-md scaleX-n1-rtl"></i
                                                ></a>
                                            </li>
                                            <li className="page-item">
                                                <a className="page-link" href="javascript:void(0);">1</a>
                                            </li>
                                            <li className="page-item">
                                                <a className="page-link" href="javascript:void(0);">2</a>
                                            </li>
                                            <li className="page-item active">
                                                <a className="page-link" href="javascript:void(0);">3</a>
                                            </li>
                                            <li className="page-item">
                                                <a className="page-link" href="javascript:void(0);">4</a>
                                            </li>
                                            <li className="page-item">
                                                <a className="page-link" href="javascript:void(0);">5</a>
                                            </li>
                                            <li className="page-item">
                                                <a className="page-link" href="javascript:void(0);">6</a>
                                            </li>
                                            <li className="page-item next">
                                                <a className="page-link" href="javascript:void(0);"
                                                ><i className="ti ti-chevron-right ti-md scaleX-n1-rtl"></i
                                                ></a>
                                            </li>
                                            <li className="page-item last">
                                                <a className="page-link" href="javascript:void(0);"
                                                ><i className="ti ti-chevrons-right ti-md scaleX-n1-rtl"></i
                                                ></a>
                                            </li>
                                        </ul>
                                    </nav>
                                </div>
                            </div>


                        </div>
                    </div>

                </div>
            </div>

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

export default Slessons;
