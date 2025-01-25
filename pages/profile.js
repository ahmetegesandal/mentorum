import LayoutMenu from "../components/LayoutMenu";
import Navbar from "../components/Navbar";


const Profile = () => {


    return (
        <>
            <LayoutMenu/>
            <div className="layout-page">
                <Navbar/>
                <div className="content-wrapper">

                    <div className="container-xxl flex-grow-1 container-p-y">

                        <div className="row">
                            <div className="col-12">
                                <div className="card mb-6">
                                    <div className="user-profile-header-banner">
                                        <img src="img/pages/profile-banner.png"
                                             className="rounded-top"/>
                                    </div>
                                    <div
                                        className="user-profile-header d-flex flex-column flex-lg-row text-sm-start text-center mb-5">
                                        <div className="flex-shrink-0 mt-n2 mx-sm-0 mx-auto">
                                            <img
                                                src="img/avatars/1.png"
                                                alt="user image"
                                                className="d-block h-auto ms-0 ms-sm-6 rounded user-profile-img"/>
                                        </div>
                                        <div className="flex-grow-1 mt-3 mt-lg-5">
                                            <div
                                                className="d-flex align-items-md-end align-items-sm-start align-items-center justify-content-md-between justify-content-start mx-5 flex-md-row flex-column gap-4">
                                                <div className="user-profile-info">
                                                    <h4 className="mb-2 mt-lg-6">John Doe</h4>
                                                    <ul
                                                        className="list-inline mb-0 d-flex align-items-center flex-wrap justify-content-sm-start justify-content-center gap-4 my-2">
                                                        <li className="list-inline-item d-flex gap-2 align-items-center">
                                                            <i className="ti ti-palette ti-lg"></i><span
                                                            className="fw-medium">UX Designer</span>
                                                        </li>
                                                        <li className="list-inline-item d-flex gap-2 align-items-center">
                                                            <i className="ti ti-map-pin ti-lg"></i><span
                                                            className="fw-medium">Vatican City</span>
                                                        </li>
                                                        <li className="list-inline-item d-flex gap-2 align-items-center">
                                                            <i className="ti ti-calendar ti-lg"></i><span
                                                            className="fw-medium"> Joined April 2021</span>
                                                        </li>
                                                    </ul>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>



                        <div className="row">
                            <div className="col-md-12">
                                <div className="nav-align-top">
                                    <ul className="nav nav-pills flex-column flex-sm-row mb-6 gap-2 gap-lg-0">
                                        <li className="nav-item">
                                            <a className="nav-link active" href="javascript:void(0);"
                                            ><i className="ti-sm ti ti-user-check me-1_5"></i> Profile</a
                                            >
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="pages-profile-teams.html"
                                            ><i className="ti-sm ti ti-users me-1_5"></i> Teams</a
                                            >
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="pages-profile-projects.html"
                                            ><i className="ti-sm ti ti-layout-grid me-1_5"></i> Projects</a
                                            >
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="pages-profile-connections.html"
                                            ><i className="ti-sm ti ti-link me-1_5"></i> Connections</a
                                            >
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>



                        <div className="row">
                            <div className="col-xl-4 col-lg-5 col-md-5">

                                <div className="card mb-6">
                                    <div className="card-body">
                                        <small className="card-text text-uppercase text-muted small">About</small>
                                        <ul className="list-unstyled my-3 py-1">
                                            <li className="d-flex align-items-center mb-4">
                                                <i className="ti ti-user ti-lg"></i><span className="fw-medium mx-2">Full Name:</span>
                                                <span>John Doe</span>
                                            </li>
                                            <li className="d-flex align-items-center mb-4">
                                                <i className="ti ti-check ti-lg"></i><span
                                                className="fw-medium mx-2">Status:</span>
                                                <span>Active</span>
                                            </li>
                                            <li className="d-flex align-items-center mb-4">
                                                <i className="ti ti-crown ti-lg"></i><span
                                                className="fw-medium mx-2">Role:</span>
                                                <span>Developer</span>
                                            </li>
                                            <li className="d-flex align-items-center mb-4">
                                                <i className="ti ti-flag ti-lg"></i><span
                                                className="fw-medium mx-2">Country:</span> <span>USA</span>
                                            </li>
                                            <li className="d-flex align-items-center mb-2">
                                                <i className="ti ti-language ti-lg"></i><span
                                                className="fw-medium mx-2">Languages:</span>
                                                <span>English</span>
                                            </li>
                                        </ul>
                                        <small className="card-text text-uppercase text-muted small">Contacts</small>
                                        <ul className="list-unstyled my-3 py-1">
                                            <li className="d-flex align-items-center mb-4">
                                                <i className="ti ti-phone-call ti-lg"></i><span
                                                className="fw-medium mx-2">Contact:</span>
                                                <span>(123) 456-7890</span>
                                            </li>
                                            <li className="d-flex align-items-center mb-4">
                                                <i className="ti ti-messages ti-lg"></i><span
                                                className="fw-medium mx-2">Skype:</span>
                                                <span>john.doe</span>
                                            </li>
                                            <li className="d-flex align-items-center mb-4">
                                                <i className="ti ti-mail ti-lg"></i><span
                                                className="fw-medium mx-2">Email:</span>
                                                <span>john.doe@example.com</span>
                                            </li>
                                        </ul>
                                        <small className="card-text text-uppercase text-muted small">Teams</small>
                                        <ul className="list-unstyled mb-0 mt-3 pt-1">
                                            <li className="d-flex flex-wrap mb-4">
                                                <span className="fw-medium me-2">Backend Developer</span><span>(126 Members)</span>
                                            </li>
                                            <li className="d-flex flex-wrap">
                                                <span className="fw-medium me-2">React Developer</span><span>(98 Members)</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>

                                <div className="card mb-6">
                                    <div className="card-body">
                                        <small className="card-text text-uppercase text-muted small">Overview</small>
                                        <ul className="list-unstyled mb-0 mt-3 pt-1">
                                            <li className="d-flex align-items-end mb-4">
                                                <i className="ti ti-check ti-lg"></i><span className="fw-medium mx-2">Task Compiled:</span>
                                                <span>13.5k</span>
                                            </li>
                                            <li className="d-flex align-items-end mb-4">
                                                <i className="ti ti-layout-grid ti-lg"></i><span
                                                className="fw-medium mx-2">Projects Compiled:</span>
                                                <span>146</span>
                                            </li>
                                            <li className="d-flex align-items-end">
                                                <i className="ti ti-users ti-lg"></i><span
                                                className="fw-medium mx-2">Connections:</span>
                                                <span>897</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>

                            </div>
                            <div className="col-xl-8 col-lg-7 col-md-7">

                                <div className="card card-action mb-6">
                                    <div className="card-header align-items-center">
                                        <h5 className="card-action-title mb-0">
                                            <i className="ti ti-chart-bar ti-lg text-body me-4"></i>Activity Timeline
                                        </h5>
                                    </div>
                                    <div className="card-body pt-3">
                                        <ul className="timeline mb-0">
                                            <li className="timeline-item timeline-item-transparent">
                                                <span className="timeline-point timeline-point-primary"></span>
                                                <div className="timeline-event">
                                                    <div className="timeline-header mb-3">
                                                        <h6 className="mb-0">12 Invoices have been paid</h6>
                                                        <small className="text-muted">12 min ago</small>
                                                    </div>
                                                    <p className="mb-2">Invoices have been paid to the company</p>
                                                    <div className="d-flex align-items-center mb-2">
                                                        <div
                                                            className="badge bg-lighter rounded d-flex align-items-center">
                                                            <img src="../../assets//img/icons/misc/pdf.png" alt="img"
                                                                 width="15" className="me-2"/>
                                                            <span className="h6 mb-0 text-body">invoices.pdf</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                            <li className="timeline-item timeline-item-transparent">
                                                <span className="timeline-point timeline-point-success"></span>
                                                <div className="timeline-event">
                                                    <div className="timeline-header mb-3">
                                                        <h6 className="mb-0">Client Meeting</h6>
                                                        <small className="text-muted">45 min ago</small>
                                                    </div>
                                                    <p className="mb-2">Project meeting with john @10:15am</p>
                                                    <div
                                                        className="d-flex justify-content-between flex-wrap gap-2 mb-2">
                                                        <div className="d-flex flex-wrap align-items-center mb-50">
                                                            <div className="avatar avatar-sm me-3">
                                                                <img src="img/avatars/1.png" alt="Avatar"
                                                                     className="rounded-circle"/>
                                                            </div>
                                                            <div>
                                                                <p className="mb-0 small fw-medium">Lester McCarthy
                                                                    (Client)</p>
                                                                <small>CEO of Pixinvent</small>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                            <li className="timeline-item timeline-item-transparent">
                                                <span className="timeline-point timeline-point-info"></span>
                                                <div className="timeline-event">
                                                    <div className="timeline-header mb-3">
                                                        <h6 className="mb-0">Create a new project for client</h6>
                                                        <small className="text-muted">2 Day Ago</small>
                                                    </div>
                                                    <p className="mb-2">6 team members in a project</p>
                                                    <ul className="list-group list-group-flush">
                                                        <li
                                                            className="list-group-item d-flex justify-content-between align-items-center flex-wrap border-top-0 p-0">
                                                            <div className="d-flex flex-wrap align-items-center">
                                                                <ul className="list-unstyled users-list d-flex align-items-center avatar-group m-0 me-2">
                                                                    <li
                                                                        data-bs-toggle="tooltip"
                                                                        data-popup="tooltip-custom"
                                                                        data-bs-placement="top"
                                                                        title="Vinnie Mostowy"
                                                                        className="avatar pull-up">
                                                                        <img className="rounded-circle"
                                                                             src="img/avatars/1.png"
                                                                             alt="Avatar"/>
                                                                    </li>
                                                                    <li
                                                                        data-bs-toggle="tooltip"
                                                                        data-popup="tooltip-custom"
                                                                        data-bs-placement="top"
                                                                        title="Allen Rieske"
                                                                        className="avatar pull-up">
                                                                        <img className="rounded-circle"
                                                                             src="img/avatars/4.png"
                                                                             alt="Avatar"/>
                                                                    </li>
                                                                    <li
                                                                        data-bs-toggle="tooltip"
                                                                        data-popup="tooltip-custom"
                                                                        data-bs-placement="top"
                                                                        title="Julee Rossignol"
                                                                        className="avatar pull-up">
                                                                        <img className="rounded-circle"
                                                                             src="img/avatars/2.png"
                                                                             alt="Avatar"/>
                                                                    </li>
                                                                    <li className="avatar">
                                      <span
                                          className="avatar-initial rounded-circle pull-up text-heading"
                                          data-bs-toggle="tooltip"
                                          data-bs-placement="bottom"
                                          title="3 more"
                                      >+3</span
                                      >
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>





                            </div>
                        </div>

                    </div>


                </div>
            </div>

        </>
    );
};

export default Profile;
