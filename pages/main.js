import LayoutMenu from "../components/LayoutMenu";
import Navbar from "../components/Navbar";
import {useTranslation} from "next-i18next";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";


const Main = () => {
  const { t } = useTranslation("common");

  return (
    <>
      <LayoutMenu />


      <div className="layout-page">
        <Navbar/>
        <div className="content-wrapper">
          <div className="container-xxl flex-grow-1 container-p-y">
            <div className="card bg-transparent shadow-none my-6 border-0">
              <div className="card-body row p-0 pb-6 g-6">
                <div className="col-12 col-lg-8 card-separator">
                  <h5 className="mb-2">
                    Welcome back,<span className="h4"> Felecia 👋🏻</span>
                  </h5>
                  <div className="col-12 col-lg-5">
                    <p>
                      Your progress this week is Awesome. let's keep it up and
                      get a lot of points reward !
                    </p>
                  </div>
                  <div className="d-flex justify-content-between flex-wrap gap-4 me-12">
                    <div className="d-flex align-items-center gap-4 me-6 me-sm-0">
                      <div className="avatar avatar-lg">
                        <div className="avatar-initial bg-label-primary rounded">
                          <div>
                            <img
                                src="/svg/icons/laptop.svg"
                                alt="paypal"
                                className="img-fluid"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="content-right">
                        <p className="mb-0 fw-medium">Hours Spent</p>
                        <h4 className="text-primary mb-0">34h</h4>
                      </div>
                    </div>
                    <div className="d-flex align-items-center gap-4">
                      <div className="avatar avatar-lg">
                        <div className="avatar-initial bg-label-info rounded">
                          <div>
                            <img
                                src="/svg/icons/lightbulb.svg"
                                alt="Lightbulb"
                                className="img-fluid"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="content-right">
                        <p className="mb-0 fw-medium">Test Results</p>
                        <h4 className="text-info mb-0">82%</h4>
                      </div>
                    </div>
                    <div className="d-flex align-items-center gap-4">
                      <div className="avatar avatar-lg">
                        <div className="avatar-initial bg-label-warning rounded">
                          <div>
                            <img
                                src="/svg/icons/check.svg"
                                alt="Check"
                                className="img-fluid"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="content-right">
                        <p className="mb-0 fw-medium">Course Completed</p>
                        <h4 className="text-warning mb-0">14</h4>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-lg-4 ps-md-4 ps-lg-6">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <div>
                        <h5 className="mb-1">Time Spendings</h5>
                        <p className="mb-9">Weekly report</p>
                      </div>
                      <div className="time-spending-chart">
                        <h4 className="mb-2">
                          231<span className="text-body">h</span> 14
                          <span className="text-body">m</span>
                        </h4>
                        <span className="badge bg-label-success">+18.4%</span>
                      </div>
                    </div>
                    <div id="leadsReportChart"></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="row mb-6 g-6">
              <div className="col-xxl-8">
                <div className="card h-100">
                  <div className="card-header d-flex align-items-center justify-content-between">
                    <h5 className="card-title m-0 me-2">
                      Topic you are interested in
                    </h5>
                    <div className="dropdown">
                      <button
                          className="btn btn-text-secondary rounded-pill text-muted border-0 p-2 me-n1"
                          type="button"
                          id="topic"
                          data-bs-toggle="dropdown"
                          aria-haspopup="true"
                          aria-expanded="false"
                      >
                        <i className="ti ti-dots-vertical ti-md text-muted"></i>
                      </button>
                      <div
                          className="dropdown-menu dropdown-menu-end"
                          aria-labelledby="topic"
                      >
                        <a className="dropdown-item" href="javascript:void(0);">
                          Highest Views
                        </a>
                        <a className="dropdown-item" href="javascript:void(0);">
                          See All
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="card-body row g-6">
                    <div className="col-xxl-7 col-md-8">
                      <div id="horizontalBarChart"></div>
                    </div>
                    <div className="col-1 d-none d-xxl-block"></div>
                    <div className="col-md-4 d-flex justify-content-around align-items-center">
                      <div>
                        <div className="d-flex align-items-baseline">
                          <span className="text-primary me-2">
                            <i className="ti ti-circle-filled ti-12px"></i>
                          </span>
                          <div>
                            <p className="mb-0">UI Design</p>
                            <h5>35%</h5>
                          </div>
                        </div>
                        <div className="d-flex align-items-baseline my-12">
                          <span className="text-success me-2">
                            <i className="ti ti-circle-filled ti-12px"></i>
                          </span>
                          <div>
                            <p className="mb-0">Music</p>
                            <h5>14%</h5>
                          </div>
                        </div>
                        <div className="d-flex align-items-baseline">
                          <span className="text-danger me-2">
                            <i className="ti ti-circle-filled ti-12px"></i>
                          </span>
                          <div>
                            <p className="mb-0">React</p>
                            <h5>10%</h5>
                          </div>
                        </div>
                      </div>

                      <div>
                        <div className="d-flex align-items-baseline">
                          <span className="text-info me-2">
                            <i className="ti ti-circle-filled ti-12px"></i>
                          </span>
                          <div>
                            <p className="mb-0">UX Design</p>
                            <h5>20%</h5>
                          </div>
                        </div>
                        <div className="d-flex align-items-baseline my-12">
                          <span className="text-secondary me-2">
                            <i className="ti ti-circle-filled ti-12px"></i>
                          </span>
                          <div>
                            <p className="mb-0">Animation</p>
                            <h5>12%</h5>
                          </div>
                        </div>
                        <div className="d-flex align-items-baseline">
                          <span className="text-warning me-2">
                            <i className="ti ti-circle-filled ti-12px"></i>
                          </span>
                          <div>
                            <p className="mb-0">SEO</p>
                            <h5>9%</h5>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-xxl-4 col-lg-6">
                <div className="card h-100">
                  <div className="card-header d-flex align-items-center justify-content-between">
                    <div className="card-title mb-0">
                      <h5 className="m-0 me-2">Popular Instructors</h5>
                    </div>
                    <div className="dropdown">
                      <button
                          className="btn btn-text-secondary rounded-pill text-muted border-0 p-2 me-n1"
                          type="button"
                          id="popularInstructors"
                          data-bs-toggle="dropdown"
                          aria-haspopup="true"
                          aria-expanded="false"
                      >
                        <i className="ti ti-dots-vertical ti-md text-muted"></i>
                      </button>
                      <div
                          className="dropdown-menu dropdown-menu-end"
                          aria-labelledby="popularInstructors"
                      >
                        <a className="dropdown-item" href="javascript:void(0);">
                          Select All
                        </a>
                        <a className="dropdown-item" href="javascript:void(0);">
                          Refresh
                        </a>
                        <a className="dropdown-item" href="javascript:void(0);">
                          Share
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="px-5 py-4 border border-start-0 border-end-0">
                    <div className="d-flex justify-content-between align-items-center">
                      <p className="mb-0 text-uppercase">Instructors</p>
                      <p className="mb-0 text-uppercase">courses</p>
                    </div>
                  </div>
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center mb-6">
                      <div className="d-flex align-items-center">
                        <div className="avatar avatar me-4">
                          <img
                              src="/img/avatars/1.png"
                              alt="Avatar"
                              className="rounded-circle"
                          />
                        </div>
                        <div>
                          <div>
                            <h6 className="mb-0 text-truncate">
                              Maven Analytics
                            </h6>
                            <small className="text-truncate text-body">
                              Business Intelligence
                            </small>
                          </div>
                        </div>
                      </div>
                      <div className="text-end">
                        <h6 className="mb-0">33</h6>
                      </div>
                    </div>
                    <div className="d-flex justify-content-between align-items-center mb-6">
                      <div className="d-flex align-items-center">
                        <div className="avatar avatar me-4">
                          <img
                              src="/img/avatars/2.png"
                              alt="Avatar"
                              className="rounded-circle"
                          />
                        </div>
                        <div>
                          <div>
                            <h6 className="mb-0 text-truncate">
                              Bentlee Emblin
                            </h6>
                            <small className="text-truncate text-body">
                              Digital Marketing
                            </small>
                          </div>
                        </div>
                      </div>
                      <div className="text-end">
                        <h6 className="mb-0">52</h6>
                      </div>
                    </div>
                    <div className="d-flex justify-content-between align-items-center mb-6">
                      <div className="d-flex align-items-center">
                        <div className="avatar avatar me-4">
                          <img
                              src="/img/avatars/3.png"
                              alt="Avatar"
                              className="rounded-circle"
                          />
                        </div>
                        <div>
                          <div>
                            <h6 className="mb-0 text-truncate">
                              Benedetto Rossiter
                            </h6>
                            <small className="text-truncate text-body">
                              UI/UX Design
                            </small>
                          </div>
                        </div>
                      </div>
                      <div className="text-end">
                        <h6 className="mb-0">12</h6>
                      </div>
                    </div>
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="d-flex align-items-center">
                        <div className="avatar avatar me-4">
                          <img
                              src="/img/avatars/4.png"
                              alt="Avatar"
                              className="rounded-circle"
                          />
                        </div>
                        <div>
                          <div>
                            <h6 className="mb-0 text-truncate">
                              Alma Gonzalez
                            </h6>
                            <small className="text-truncate text-body">
                              Java Developer
                            </small>
                          </div>
                        </div>
                      </div>
                      <div className="text-end">
                        <h6 className="mb-0">8</h6>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-xxl-4 col-lg-6">
                <div className="card h-100">
                  <div className="card-header d-flex align-items-center justify-content-between">
                    <h5 className="card-title m-0 me-2">Top Courses</h5>
                    <div className="dropdown">
                      <button
                          className="btn btn-text-secondary rounded-pill text-muted border-0 p-2 me-n1"
                          type="button"
                          id="topCourses"
                          data-bs-toggle="dropdown"
                          aria-haspopup="true"
                          aria-expanded="false"
                      >
                        <i className="ti ti-dots-vertical ti-md text-muted"></i>
                      </button>
                      <div
                          className="dropdown-menu dropdown-menu-end"
                          aria-labelledby="topCourses"
                      >
                        <a className="dropdown-item" href="javascript:void(0);">
                          Refresh
                        </a>
                        <a className="dropdown-item" href="javascript:void(0);">
                          Download
                        </a>
                        <a className="dropdown-item" href="javascript:void(0);">
                          View All
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="card-body">
                    <ul className="list-unstyled mb-0">
                      <li className="d-flex mb-6 align-items-center">
                        <div className="avatar flex-shrink-0 me-4">
                          <span className="avatar-initial rounded bg-label-primary">
                            <i className="ti ti-video ti-lg"></i>
                          </span>
                        </div>
                        <div className="row w-100 align-items-center">
                          <div className="col-sm-8 mb-1 mb-sm-0 mb-lg-1 mb-xxl-0">
                            <h6 className="mb-0">
                              Videography Basic Design Course
                            </h6>
                          </div>
                          <div className="col-sm-4 d-flex justify-content-sm-end">
                            <div className="badge bg-label-secondary">
                              1.2k Views
                            </div>
                          </div>
                        </div>
                      </li>
                      <li className="d-flex mb-6 align-items-center">
                        <div className="avatar flex-shrink-0 me-4">
                          <span className="avatar-initial rounded bg-label-info">
                            <i className="ti ti-code ti-lg"></i>
                          </span>
                        </div>
                        <div className="row w-100 align-items-center">
                          <div className="col-sm-8 mb-1 mb-sm-0 mb-lg-1 mb-xxl-0">
                            <h6 className="mb-0">
                              Basic Front-end Development Course
                            </h6>
                          </div>
                          <div className="col-sm-4 d-flex justify-content-sm-end">
                            <div className="badge bg-label-secondary">
                              834 Views
                            </div>
                          </div>
                        </div>
                      </li>
                      <li className="d-flex mb-6 align-items-center">
                        <div className="avatar flex-shrink-0 me-4">
                          <span className="avatar-initial rounded bg-label-success">
                            <i className="ti ti-camera ti-lg"></i>
                          </span>
                        </div>
                        <div className="row w-100 align-items-center">
                          <div className="col-sm-8 mb-1 mb-sm-0 mb-lg-1 mb-xxl-0">
                            <h6 className="mb-0">
                              Basic Fundamentals of Photography
                            </h6>
                          </div>
                          <div className="col-sm-4 d-flex justify-content-sm-end">
                            <div className="badge bg-label-secondary">
                              3.7k Views
                            </div>
                          </div>
                        </div>
                      </li>
                      <li className="d-flex mb-6 align-items-center">
                        <div className="avatar flex-shrink-0 me-4">
                          <span className="avatar-initial rounded bg-label-warning">
                            <i className="ti ti-brand-dribbble ti-lg"></i>
                          </span>
                        </div>
                        <div className="row w-100 align-items-center">
                          <div className="col-sm-8 mb-1 mb-sm-0 mb-lg-1 mb-xxl-0">
                            <h6 className="mb-0">
                              Advance Dribble Base Visual Design
                            </h6>
                          </div>
                          <div className="col-sm-4 d-flex justify-content-sm-end">
                            <div className="badge bg-label-secondary">
                              2.5k Views
                            </div>
                          </div>
                        </div>
                      </li>
                      <li className="d-flex align-items-center">
                        <div className="avatar flex-shrink-0 me-4">
                          <span className="avatar-initial rounded bg-label-danger">
                            <i className="ti ti-microphone-2 ti-lg"></i>
                          </span>
                        </div>
                        <div className="row w-100 align-items-center">
                          <div className="col-sm-8 mb-1 mb-sm-0 mb-lg-1 mb-xxl-0">
                            <h6 className="mb-0">Your First Singing Lesson</h6>
                          </div>
                          <div className="col-sm-4 d-flex justify-content-sm-end">
                            <div className="badge bg-label-secondary">
                              948 Views
                            </div>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="col-xxl-4 col-md-6">
                <div className="card h-100">
                  <div className="card-body">
                    <div className="bg-label-primary rounded text-center mb-4 pt-4">
                      <img
                          className="img-fluid"
                          src="/img/illustrations/girl-with-laptop-light.png"
                          alt="Card girl image"
                          width="140"
                      />
                    </div>
                    <h5 className="mb-2">Upcoming Webinar</h5>
                    <p className="small">
                      Next Generation Frontend Architecture Using Layout Engine
                      And React Native Web.
                    </p>
                    <div className="row mb-4 g-3">
                      <div className="col-6">
                        <div className="d-flex">
                          <div className="avatar flex-shrink-0 me-3">
                            <span className="avatar-initial rounded bg-label-primary">
                              <i className="ti ti-calendar-event ti-28px"></i>
                            </span>
                          </div>
                          <div>
                            <h6 className="mb-0 text-nowrap">17 Nov 23</h6>
                            <small>Date</small>
                          </div>
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="d-flex">
                          <div className="avatar flex-shrink-0 me-3">
                            <span className="avatar-initial rounded bg-label-primary">
                              <i className="ti ti-clock ti-28px"></i>
                            </span>
                          </div>
                          <div>
                            <h6 className="mb-0 text-nowrap">32 minutes</h6>
                            <small>Duration</small>
                          </div>
                        </div>
                      </div>
                    </div>
                    <a
                        href="javascript:void(0);"
                        className="btn btn-primary w-100"
                    >
                      Join the event
                    </a>
                  </div>
                </div>
              </div>

              <div className="col-xxl-4 col-md-6">
                <div className="card h-100">
                  <div className="card-header d-flex align-items-center justify-content-between">
                    <h5 className="card-title m-0 me-2">Assignment Progress</h5>
                    <div className="dropdown">
                      <button
                          className="btn btn-text-secondary rounded-pill text-muted border-0 p-2 me-n1"
                          type="button"
                          id="assignmentProgress"
                          data-bs-toggle="dropdown"
                          aria-haspopup="true"
                          aria-expanded="false"
                      >
                        <i className="ti ti-dots-vertical ti-md text-muted"></i>
                      </button>
                      <div
                          className="dropdown-menu dropdown-menu-end"
                          aria-labelledby="assignmentProgress"
                      >
                        <a className="dropdown-item" href="javascript:void(0);">
                          Refresh
                        </a>
                        <a className="dropdown-item" href="javascript:void(0);">
                          Download
                        </a>
                        <a className="dropdown-item" href="javascript:void(0);">
                          View All
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="card-body">
                    <ul className="p-0 m-0">
                      <li className="d-flex mb-6">
                        <div
                            className="chart-progress me-4"
                            data-color="primary"
                            data-series="72"
                            data-progress_variant="true"
                        ></div>
                        <div className="row w-100 align-items-center">
                          <div className="col-9">
                            <div className="me-2">
                              <h6 className="mb-2">User experience Design</h6>
                              <small>120 Tasks</small>
                            </div>
                          </div>
                          <div className="col-3 text-end">
                            <button
                                type="button"
                                className="btn btn-sm btn-icon btn-label-secondary"
                            >
                              <i className="ti ti-chevron-right scaleX-n1-rtl"></i>
                            </button>
                          </div>
                        </div>
                      </li>
                      <li className="d-flex mb-6">
                        <div
                            className="chart-progress me-4"
                            data-color="success"
                            data-series="48"
                            data-progress_variant="true"
                        ></div>
                        <div className="row w-100 align-items-center">
                          <div className="col-9">
                            <div className="me-2">
                              <h6 className="mb-2">Basic fundamentals</h6>
                              <small>32 Tasks</small>
                            </div>
                          </div>
                          <div className="col-3 text-end">
                            <button
                                type="button"
                                className="btn btn-sm btn-icon btn-label-secondary"
                            >
                              <i className="ti ti-chevron-right scaleX-n1-rtl"></i>
                            </button>
                          </div>
                        </div>
                      </li>
                      <li className="d-flex mb-6">
                        <div
                            className="chart-progress me-4"
                            data-color="danger"
                            data-series="15"
                            data-progress_variant="true"
                        ></div>
                        <div className="row w-100 align-items-center">
                          <div className="col-9">
                            <div className="me-2">
                              <h6 className="mb-2">React native components</h6>
                              <small>182 Tasks</small>
                            </div>
                          </div>
                          <div className="col-3 text-end">
                            <button
                                type="button"
                                className="btn btn-sm btn-icon btn-label-secondary"
                            >
                              <i className="ti ti-chevron-right scaleX-n1-rtl"></i>
                            </button>
                          </div>
                        </div>
                      </li>
                      <li className="d-flex">
                        <div
                            className="chart-progress me-4"
                            data-color="info"
                            data-series="24"
                            data-progress_variant="true"
                        ></div>
                        <div className="row w-100 align-items-center">
                          <div className="col-9">
                            <div className="me-2">
                              <h6 className="mb-2">Basic of music theory</h6>
                              <small>56 Tasks</small>
                            </div>
                          </div>
                          <div className="col-3 text-end">
                            <button
                                type="button"
                                className="btn btn-sm btn-icon btn-label-secondary"
                            >
                              <i className="ti ti-chevron-right scaleX-n1-rtl"></i>
                            </button>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="table-responsive mb-4">
                <table className="table table-sm datatables-academy-course">
                  <thead className="border-top">
                  <tr>
                    <th></th>
                    <th></th>
                    <th>Course Name</th>
                    <th>Time</th>
                    <th className="w-25">Progress</th>
                    <th className="w-25">Status</th>
                  </tr>
                  </thead>
                </table>
              </div>
            </div>
          </div>

          <footer className="content-footer footer bg-footer-theme">
            <div className="container-xxl">
              <div
                  className="footer-container d-flex align-items-center justify-content-between py-4 flex-md-row flex-column">
                <div className="d-none d-lg-inline-block">
                  <a
                      href="https://themeforest.net/licenses/standard"
                      className="footer-link me-4"
                      target="_blank"
                  >
                    License
                  </a>
                  <a
                      href="https://1.envato.market/pixinvent_portfolio"
                      target="_blank"
                      className="footer-link me-4"
                  >
                    More Themes
                  </a>

                  <a
                      href="https://demos.pixinvent.com/vuexy-html-admin-template/documentation/"
                      target="_blank"
                      className="footer-link me-4"
                  >
                    Documentation
                  </a>

                  <a
                      href="https://pixinvent.ticksy.com/"
                      target="_blank"
                      className="footer-link d-none d-sm-inline-block"
                  >
                    Support
                  </a>
                </div>
              </div>
            </div>
          </footer>

          <div className="content-backdrop fade"></div>
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

export default Main;
