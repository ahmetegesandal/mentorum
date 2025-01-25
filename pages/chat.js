import LayoutMenu from "../components/LayoutMenu";
import Navbar from "../components/Navbar";


const Chat = () => {


    return (
        <>
            <LayoutMenu/>
            <div className="layout-page">
                <Navbar/>
                <div className="content-wrapper">

                    <div className="container-xxl flex-grow-1 container-p-y">
                        <div className="app-chat card overflow-hidden">
                            <div className="row g-0">

                                <div className="col app-chat-sidebar-left app-sidebar overflow-hidden"
                                     id="app-chat-sidebar-left">
                                    <div
                                        className="chat-sidebar-left-user sidebar-header d-flex flex-column justify-content-center align-items-center flex-wrap px-6 pt-12">
                                        <div className="avatar avatar-xl avatar-online chat-sidebar-avatar">
                                            <img src="img/avatars/1.png" alt="Avatar"
                                                 className="rounded-circle"/>
                                        </div>
                                        <h5 className="mt-4 mb-0">John Doe</h5>
                                        <span>Admin</span>
                                        <i
                                            className="ti ti-x ti-lg cursor-pointer close-sidebar"
                                            data-bs-toggle="sidebar"
                                            data-overlay
                                            data-target="#app-chat-sidebar-left"></i>
                                    </div>
                                    <div className="sidebar-body px-6 pb-6">
                                        <div className="my-6">
                                            <label htmlFor="chat-sidebar-left-user-about"
                                                   className="text-uppercase text-muted mb-1">About</label>
                                            <textarea
                                                id="chat-sidebar-left-user-about"
                                                className="form-control chat-sidebar-left-user-about"
                                                rows="3"
                                                maxLength="120">
Hey there, we’re just writing to let you know that you’ve been subscribed to a repository on GitHub.</textarea
                                            >
                                        </div>
                                        <div className="my-6">
                                            <p className="text-uppercase text-muted mb-1">Status</p>
                                            <div className="d-grid gap-2 pt-2 text-heading ms-2">
                                                <div className="form-check form-check-success">
                                                    <input
                                                        name="chat-user-status"
                                                        className="form-check-input"
                                                        type="radio"
                                                        value="active"
                                                        id="user-active"
                                                        checked/>
                                                    <label className="form-check-label"
                                                           htmlFor="user-active">Online</label>
                                                </div>
                                                <div className="form-check form-check-warning">
                                                    <input
                                                        name="chat-user-status"
                                                        className="form-check-input"
                                                        type="radio"
                                                        value="away"
                                                        id="user-away"/>
                                                    <label className="form-check-label" htmlFor="user-away">Away</label>
                                                </div>
                                                <div className="form-check form-check-danger">
                                                    <input
                                                        name="chat-user-status"
                                                        className="form-check-input"
                                                        type="radio"
                                                        value="busy"
                                                        id="user-busy"/>
                                                    <label className="form-check-label" htmlFor="user-busy">Do not
                                                        Disturb</label>
                                                </div>
                                                <div className="form-check form-check-secondary">
                                                    <input
                                                        name="chat-user-status"
                                                        className="form-check-input"
                                                        type="radio"
                                                        value="offline"
                                                        id="user-offline"/>
                                                    <label className="form-check-label"
                                                           htmlFor="user-offline">Offline</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="my-6">
                                            <p className="text-uppercase text-muted mb-1">Settings</p>
                                            <ul className="list-unstyled d-grid gap-4 ms-2 pt-2 text-heading">
                                                <li className="d-flex justify-content-between align-items-center">
                                                    <div>
                                                        <i className="ti ti-lock ti-md me-1"></i>
                                                        <span className="align-middle">Two-step Verification</span>
                                                    </div>
                                                    <div className="form-check form-switch mb-0 me-1">
                                                        <input type="checkbox" className="form-check-input" checked/>
                                                    </div>
                                                </li>
                                                <li className="d-flex justify-content-between align-items-center">
                                                    <div>
                                                        <i className="ti ti-bell ti-md me-1"></i>
                                                        <span className="align-middle">Notification</span>
                                                    </div>
                                                    <div className="form-check form-switch mb-0 me-1">
                                                        <input type="checkbox" className="form-check-input"/>
                                                    </div>
                                                </li>
                                                <li>
                                                    <i className="ti ti-user-plus ti-md me-1"></i>
                                                    <span className="align-middle">Invite Friends</span>
                                                </li>
                                                <li>
                                                    <i className="ti ti-trash ti-md me-1"></i>
                                                    <span className="align-middle">Delete Account</span>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="d-flex mt-6">
                                            <button
                                                className="btn btn-primary w-100"
                                                data-bs-toggle="sidebar"
                                                data-overlay
                                                data-target="#app-chat-sidebar-left">
                                                Logout<i className="ti ti-logout ti-16px ms-2"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>



                                <div
                                    className="col app-chat-contacts app-sidebar flex-grow-0 overflow-hidden border-end"
                                    id="app-chat-contacts">
                                    <div
                                        className="sidebar-header h-px-75 px-5 border-bottom d-flex align-items-center">
                                        <div className="d-flex align-items-center me-6 me-lg-0">
                                            <div
                                                className="flex-shrink-0 avatar avatar-online me-4"
                                                data-bs-toggle="sidebar"
                                                data-overlay="app-overlay-ex"
                                                data-target="#app-chat-sidebar-left">
                                                <img
                                                    className="user-avatar rounded-circle cursor-pointer"
                                                    src="img/avatars/1.png"
                                                    alt="Avatar"/>
                                            </div>
                                            <div className="flex-grow-1 input-group input-group-merge">
                                                <span className="input-group-text" id="basic-addon-search31"><i
                                                    className="ti ti-search"></i></span>
                                                <input
                                                    type="text"
                                                    className="form-control chat-search-input"
                                                    placeholder="Search..."
                                                    aria-label="Search..."
                                                    aria-describedby="basic-addon-search31"/>
                                            </div>
                                        </div>
                                        <i
                                            className="ti ti-x ti-lg cursor-pointer position-absolute top-50 end-0 translate-middle d-lg-none d-block"
                                            data-overlay
                                            data-bs-toggle="sidebar"
                                            data-target="#app-chat-contacts"></i>
                                    </div>
                                    <div className="sidebar-body">

                                        <ul className="list-unstyled chat-contact-list py-2 mb-0" id="chat-list">
                                            <li className="chat-contact-list-item chat-contact-list-item-title mt-0">
                                                <h5 className="text-primary mb-0">Chats</h5>
                                            </li>
                                            <li className="chat-contact-list-item chat-list-item-0 d-none">
                                                <h6 className="text-muted mb-0">No Chats Found</h6>
                                            </li>
                                            <li className="chat-contact-list-item mb-1">
                                                <a className="d-flex align-items-center">
                                                    <div className="flex-shrink-0 avatar avatar-online">
                                                        <img src="img/avatars/13.png" alt="Avatar"
                                                             className="rounded-circle"/>
                                                    </div>
                                                    <div className="chat-contact-info flex-grow-1 ms-4">
                                                        <div
                                                            className="d-flex justify-content-between align-items-center">
                                                            <h6 className="chat-contact-name text-truncate m-0 fw-normal">Waldemar
                                                                Mannering</h6>
                                                            <small className="text-muted">5 Minutes</small>
                                                        </div>
                                                        <small className="chat-contact-status text-truncate">Refer
                                                            friends. Get rewards.</small>
                                                    </div>
                                                </a>
                                            </li>
                                            <li className="chat-contact-list-item active mb-1">
                                                <a className="d-flex align-items-center">
                                                    <div className="flex-shrink-0 avatar avatar-offline">
                                                        <img src="img/avatars/4.png" alt="Avatar"
                                                             className="rounded-circle"/>
                                                    </div>
                                                    <div className="chat-contact-info flex-grow-1 ms-4">
                                                        <div
                                                            className="d-flex justify-content-between align-items-center">
                                                            <h6 className="chat-contact-name text-truncate fw-normal m-0">Felecia
                                                                Rower</h6>
                                                            <small className="text-muted">30 Minutes</small>
                                                        </div>
                                                        <small className="chat-contact-status text-truncate">I will
                                                            purchase it for sure. 👍</small>
                                                    </div>
                                                </a>
                                            </li>
                                            <li className="chat-contact-list-item mb-0">
                                                <a className="d-flex align-items-center">
                                                    <div className="flex-shrink-0 avatar avatar-busy">
                                                        <span
                                                            className="avatar-initial rounded-circle bg-label-success">CM</span>
                                                    </div>
                                                    <div className="chat-contact-info flex-grow-1 ms-4">
                                                        <div
                                                            className="d-flex justify-content-between align-items-center">
                                                            <h6 className="chat-contact-name text-truncate fw-normal m-0">Calvin
                                                                Moore</h6>
                                                            <small className="text-muted">1 Day</small>
                                                        </div>
                                                        <small className="chat-contact-status text-truncate"
                                                        >If it takes long you can mail inbox user</small
                                                        >
                                                    </div>
                                                </a>
                                            </li>
                                        </ul>

                                        <ul className="list-unstyled chat-contact-list mb-0 py-2" id="contact-list">
                                            <li className="chat-contact-list-item chat-contact-list-item-title mt-0">
                                                <h5 className="text-primary mb-0">Contacts</h5>
                                            </li>
                                            <li className="chat-contact-list-item contact-list-item-0 d-none">
                                                <h6 className="text-muted mb-0">No Contacts Found</h6>
                                            </li>





                                            <li className="chat-contact-list-item">
                                                <a className="d-flex align-items-center">
                                                    <div className="flex-shrink-0 avatar">
                                                        <img src="img/avatars/4.png" alt="Avatar"
                                                             className="rounded-circle"/>
                                                    </div>
                                                    <div className="chat-contact-info flex-grow-1 ms-4">
                                                        <h6 className="chat-contact-name text-truncate m-0 fw-normal">Felecia
                                                            Rower</h6>
                                                        <small className="chat-contact-status text-truncate">Cloud
                                                            Engineer</small>
                                                    </div>
                                                </a>
                                            </li>
                                            <li className="chat-contact-list-item mb-0">
                                                <a className="d-flex align-items-center">
                                                    <div className="flex-shrink-0 avatar">
                                                        <img src="img/avatars/11.png" alt="Avatar"
                                                             className="rounded-circle"/>
                                                    </div>
                                                    <div className="chat-contact-info flex-grow-1 ms-4">
                                                        <h6 className="chat-contact-name text-truncate m-0 fw-normal">William
                                                            Stephens</h6>
                                                        <small className="chat-contact-status text-truncate">Backend
                                                            Developer</small>
                                                    </div>
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>



                                <div className="col app-chat-history">
                                    <div className="chat-history-wrapper">
                                        <div className="chat-history-header border-bottom">
                                            <div className="d-flex justify-content-between align-items-center">
                                                <div className="d-flex overflow-hidden align-items-center">
                                                    <i
                                                        className="ti ti-menu-2 ti-lg cursor-pointer d-lg-none d-block me-4"
                                                        data-bs-toggle="sidebar"
                                                        data-overlay
                                                        data-target="#app-chat-contacts"></i>
                                                    <div className="flex-shrink-0 avatar avatar-online">
                                                        <img
                                                            src="img/avatars/4.png"
                                                            alt="Avatar"
                                                            className="rounded-circle"
                                                            data-bs-toggle="sidebar"
                                                            data-overlay
                                                            data-target="#app-chat-sidebar-right"/>
                                                    </div>
                                                    <div className="chat-contact-info flex-grow-1 ms-4">
                                                        <h6 className="m-0 fw-normal">Felecia Rower</h6>
                                                        <small className="user-status text-body">NextJS
                                                            developer</small>
                                                    </div>
                                                </div>
                                                <div className="d-flex align-items-center">


                                                    <i
                                                        className="ti ti-search ti-md cursor-pointer d-sm-inline-flex d-none me-1 btn btn-sm btn-text-secondary text-secondary btn-icon rounded-pill"></i>
                                                    <div className="dropdown">
                                                        <button
                                                            className="btn btn-sm btn-icon btn-text-secondary text-secondary rounded-pill dropdown-toggle hide-arrow"
                                                            data-bs-toggle="dropdown"
                                                            aria-expanded="true"
                                                            id="chat-header-actions">
                                                            <i className="ti ti-dots-vertical ti-md"></i>
                                                        </button>
                                                        <div className="dropdown-menu dropdown-menu-end"
                                                             aria-labelledby="chat-header-actions">
                                                            <a className="dropdown-item" href="javascript:void(0);">View
                                                                Contact</a>
                                                            <a className="dropdown-item" href="javascript:void(0);">Mute
                                                                Notifications</a>
                                                            <a className="dropdown-item" href="javascript:void(0);">Block
                                                                Contact</a>
                                                            <a className="dropdown-item" href="javascript:void(0);">Clear
                                                                Chat</a>
                                                            <a className="dropdown-item"
                                                               href="javascript:void(0);">Report</a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="chat-history-body">
                                            <ul className="list-unstyled chat-history">
                                                <li className="chat-message chat-message-right">
                                                    <div className="d-flex overflow-hidden">
                                                        <div className="chat-message-wrapper flex-grow-1">
                                                            <div className="chat-message-text">
                                                                <p className="mb-0">How can we help? We're here for you!
                                                                    😄</p>
                                                            </div>
                                                            <div className="text-end text-muted mt-1">
                                                                <i className="ti ti-checks ti-16px text-success me-1"></i>
                                                                <small>10:00 AM</small>
                                                            </div>
                                                        </div>
                                                        <div className="user-avatar flex-shrink-0 ms-4">
                                                            <div className="avatar avatar-sm">
                                                                <img src="img/avatars/1.png" alt="Avatar"
                                                                     className="rounded-circle"/>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li className="chat-message">
                                                    <div className="d-flex overflow-hidden">
                                                        <div className="user-avatar flex-shrink-0 me-4">
                                                            <div className="avatar avatar-sm">
                                                                <img src="img/avatars/4.png" alt="Avatar"
                                                                     className="rounded-circle"/>
                                                            </div>
                                                        </div>
                                                        <div className="chat-message-wrapper flex-grow-1">
                                                            <div className="chat-message-text">
                                                                <p className="mb-0">Hey John, I am looking for the best
                                                                    admin template.</p>
                                                                <p className="mb-0">Could you please help me to find it
                                                                    out? 🤔</p>
                                                            </div>
                                                            <div className="chat-message-text mt-2">
                                                                <p className="mb-0">It should be Bootstrap 5
                                                                    compatible.</p>
                                                            </div>
                                                            <div className="text-muted mt-1">
                                                                <small>10:02 AM</small>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li className="chat-message chat-message-right">
                                                    <div className="d-flex overflow-hidden">
                                                        <div className="chat-message-wrapper flex-grow-1">
                                                            <div className="chat-message-text">
                                                                <p className="mb-0">Vuexy has all the components you'll
                                                                    ever need in a app.</p>
                                                            </div>
                                                            <div className="text-end text-muted mt-1">
                                                                <i className="ti ti-checks ti-16px text-success me-1"></i>
                                                                <small>10:03 AM</small>
                                                            </div>
                                                        </div>
                                                        <div className="user-avatar flex-shrink-0 ms-4">
                                                            <div className="avatar avatar-sm">
                                                                <img src="img/avatars/1.png" alt="Avatar"
                                                                     className="rounded-circle"/>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li className="chat-message">
                                                    <div className="d-flex overflow-hidden">
                                                        <div className="user-avatar flex-shrink-0 me-4">
                                                            <div className="avatar avatar-sm">
                                                                <img src="img/avatars/4.png" alt="Avatar"
                                                                     className="rounded-circle"/>
                                                            </div>
                                                        </div>
                                                        <div className="chat-message-wrapper flex-grow-1">
                                                            <div className="chat-message-text">
                                                                <p className="mb-0">Looks clean and fresh UI. 😃</p>
                                                            </div>
                                                            <div className="chat-message-text mt-2">
                                                                <p className="mb-0">It's perfect for my next
                                                                    project.</p>
                                                            </div>
                                                            <div className="chat-message-text mt-2">
                                                                <p className="mb-0">How can I purchase it?</p>
                                                            </div>
                                                            <div className="text-muted mt-1">
                                                                <small>10:05 AM</small>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li className="chat-message chat-message-right">
                                                    <div className="d-flex overflow-hidden">
                                                        <div className="chat-message-wrapper flex-grow-1">
                                                            <div className="chat-message-text">
                                                                <p className="mb-0">Thanks, you can purchase it.</p>
                                                            </div>
                                                            <div className="text-end text-muted mt-1">
                                                                <i className="ti ti-checks ti-16px text-success me-1"></i>
                                                                <small>10:06 AM</small>
                                                            </div>
                                                        </div>
                                                        <div className="user-avatar flex-shrink-0 ms-4">
                                                            <div className="avatar avatar-sm">
                                                                <img src="img/avatars/1.png" alt="Avatar"
                                                                     className="rounded-circle"/>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li className="chat-message">
                                                    <div className="d-flex overflow-hidden">
                                                        <div className="user-avatar flex-shrink-0 me-4">
                                                            <div className="avatar avatar-sm">
                                                                <img src="img/avatars/4.png" alt="Avatar"
                                                                     className="rounded-circle"/>
                                                            </div>
                                                        </div>
                                                        <div className="chat-message-wrapper flex-grow-1">
                                                            <div className="chat-message-text">
                                                                <p className="mb-0">I will purchase it for sure. 👍</p>
                                                            </div>
                                                            <div className="chat-message-text mt-2">
                                                                <p className="mb-0">Thanks.</p>
                                                            </div>
                                                            <div className="text-muted mt-1">
                                                                <small>10:08 AM</small>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li className="chat-message chat-message-right">
                                                    <div className="d-flex overflow-hidden">
                                                        <div className="chat-message-wrapper flex-grow-1">
                                                            <div className="chat-message-text">
                                                                <p className="mb-0">Great, Feel free to get in
                                                                    touch.</p>
                                                            </div>
                                                            <div className="text-end text-muted mt-1">
                                                                <i className="ti ti-checks ti-16px text-success me-1"></i>
                                                                <small>10:10 AM</small>
                                                            </div>
                                                        </div>
                                                        <div className="user-avatar flex-shrink-0 ms-4">
                                                            <div className="avatar avatar-sm">
                                                                <img src="img/avatars/1.png" alt="Avatar"
                                                                     className="rounded-circle"/>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li className="chat-message">
                                                    <div className="d-flex overflow-hidden">
                                                        <div className="user-avatar flex-shrink-0 me-4">
                                                            <div className="avatar avatar-sm">
                                                                <img src="img/avatars/4.png" alt="Avatar"
                                                                     className="rounded-circle"/>
                                                            </div>
                                                        </div>
                                                        <div className="chat-message-wrapper flex-grow-1">
                                                            <div className="chat-message-text">
                                                                <p className="mb-0">Do you have design files for
                                                                    Vuexy?</p>
                                                            </div>
                                                            <div className="text-muted mt-1">
                                                                <small>10:15 AM</small>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li className="chat-message chat-message-right">
                                                    <div className="d-flex overflow-hidden">
                                                        <div className="chat-message-wrapper flex-grow-1 w-50">
                                                            <div className="chat-message-text">
                                                                <p className="mb-0">
                                                                    Yes that's correct documentation file, Design files
                                                                    are included with the template.
                                                                </p>
                                                            </div>
                                                            <div className="text-end text-muted mt-1">
                                                                <i className="ti ti-checks ti-16px me-1"></i>
                                                                <small>10:15 AM</small>
                                                            </div>
                                                        </div>
                                                        <div className="user-avatar flex-shrink-0 ms-4">
                                                            <div className="avatar avatar-sm">
                                                                <img src="img/avatars/1.png" alt="Avatar"
                                                                     className="rounded-circle"/>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>

                                        <div className="chat-history-footer shadow-xs">
                                            <form
                                                className="form-send-message d-flex justify-content-between align-items-center">
                                                <input
                                                    className="form-control message-input border-0 me-4 shadow-none"
                                                    placeholder="Type your message here..."/>
                                                <div className="message-actions d-flex align-items-center">

                                                    <label htmlFor="attach-doc" className="form-label mb-0">
                                                        <i
                                                            className="ti ti-paperclip ti-md cursor-pointer btn btn-sm btn-text-secondary btn-icon rounded-pill mx-1 text-heading"></i>
                                                        <input type="file" id="attach-doc" hidden/>
                                                    </label>
                                                    <button className="btn btn-primary d-flex send-msg-btn">
                                                        <span
                                                            className="align-middle d-md-inline-block d-none">Send</span>
                                                        <i className="ti ti-send ti-16px ms-md-2 ms-0"></i>
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>



                                <div className="col app-chat-sidebar-right app-sidebar overflow-hidden"
                                     id="app-chat-sidebar-right">
                                    <div
                                        className="sidebar-header d-flex flex-column justify-content-center align-items-center flex-wrap px-6 pt-12">
                                        <div className="avatar avatar-xl avatar-online chat-sidebar-avatar">
                                            <img src="img/avatars/4.png" alt="Avatar"
                                                 className="rounded-circle"/>
                                        </div>
                                        <h5 className="mt-4 mb-0">Felecia Rower</h5>
                                        <span>NextJS Developer</span>
                                        <i
                                            className="ti ti-x ti-lg cursor-pointer close-sidebar d-block"
                                            data-bs-toggle="sidebar"
                                            data-overlay
                                            data-target="#app-chat-sidebar-right"></i>
                                    </div>
                                    <div className="sidebar-body p-6 pt-0">
                                        <div className="my-6">
                                            <p className="text-uppercase mb-1 text-muted">About</p>
                                            <p className="mb-0">
                                                It is a long established fact that a reader will be distracted by the
                                                readable content .
                                            </p>
                                        </div>
                                        <div className="my-6">
                                            <p className="text-uppercase mb-1 text-muted">Personal Information</p>
                                            <ul className="list-unstyled d-grid gap-4 mb-0 ms-2 py-2 text-heading">
                                                <li className="d-flex align-items-center">
                                                    <i className="ti ti-mail ti-md"></i>
                                                    <span className="align-middle ms-2">josephGreen@email.com</span>
                                                </li>
                                                <li className="d-flex align-items-center">
                                                    <i className="ti ti-phone-call ti-md"></i>
                                                    <span className="align-middle ms-2">+1(123) 456 - 7890</span>
                                                </li>
                                                <li className="d-flex align-items-center">
                                                    <i className="ti ti-clock ti-md"></i>
                                                    <span className="align-middle ms-2">Mon - Fri 10AM - 8PM</span>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="my-6">
                                            <p className="text-uppercase text-muted mb-1">Options</p>
                                            <ul className="list-unstyled d-grid gap-4 ms-2 py-2 text-heading">
                                                <li className="cursor-pointer d-flex align-items-center">
                                                    <i className="ti ti-badge ti-md"></i>
                                                    <span className="align-middle ms-2">Add Tag</span>
                                                </li>
                                                <li className="cursor-pointer d-flex align-items-center">
                                                    <i className="ti ti-star ti-md"></i>
                                                    <span className="align-middle ms-2">Important Contact</span>
                                                </li>
                                                <li className="cursor-pointer d-flex align-items-center">
                                                    <i className="ti ti-photo ti-md"></i>
                                                    <span className="align-middle ms-2">Shared Media</span>
                                                </li>
                                                <li className="cursor-pointer d-flex align-items-center">
                                                    <i className="ti ti-trash ti-md"></i>
                                                    <span className="align-middle ms-2">Delete Contact</span>
                                                </li>
                                                <li className="cursor-pointer d-flex align-items-center">
                                                    <i className="ti ti-ban ti-md"></i>
                                                    <span className="align-middle ms-2">Block Contact</span>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="d-flex mt-6">
                                            <button
                                                className="btn btn-danger w-100"
                                                data-bs-toggle="sidebar"
                                                data-overlay
                                                data-target="#app-chat-sidebar-right">
                                                Delete Contact<i className="ti ti-trash ti-16px ms-2"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>


                                <div className="app-overlay"></div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

        </>
    );
};

export default Chat;
