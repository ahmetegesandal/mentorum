import LayoutMenu from "../components/LayoutMenu";
import Navbar from "../components/Navbar";
import {useTranslation} from "next-i18next";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import Datatable from "../components/Datatable";



const UsersList = () => {
    const { t } = useTranslation("common")

    return (
        <>
            <LayoutMenu/>
            <div className="layout-page">
                <Navbar/>
                <div className="content-wrapper">

                    <div className="container-xxl flex-grow-1 container-p-y">
                        <div className="row g-6 mb-6">


                            <div className="col-sm-6 col-xl-3">
                                <div className="card">
                                    <div className="card-body">
                                        <div className="d-flex align-items-start justify-content-between">
                                            <div className="content-left">
                                                <span className="text-heading">Tüm Kullanıcılar</span>
                                                <div className="d-flex align-items-center my-1">
                                                    <h4 className="mb-0 me-2">19,860</h4>
                                                    <p className="text-danger mb-0">(-14%)</p>
                                                </div>
                                                <small className="mb-0">Last week analytics</small>
                                            </div>
                                            <div className="avatar">
                                                  <span className="avatar-initial rounded bg-label-success">
                                                    <i className="ti ti-user-check ti-26px"></i>
                                                  </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>

                        <div className="card">
                            <div className="card-header border-bottom">
                                <h5 className="card-title mb-0">Filters</h5>
                                <div
                                    className="d-flex justify-content-between align-items-center row pt-4 gap-4 gap-md-0">
                                    <div className="col-md-4 user_role"></div>
                                    <div className="col-md-4 user_plan"></div>
                                    <div className="col-md-4 user_status"></div>
                                </div>
                            </div>
                            <div className="card-datatable table-responsive">
                                <Datatable />

                            </div>

                            <div
                                className="offcanvas offcanvas-end"
                                tabIndex="-1"
                                id="offcanvasAddUser"
                                aria-labelledby="offcanvasAddUserLabel">
                                <div className="offcanvas-header border-bottom">
                                    <h5 id="offcanvasAddUserLabel" className="offcanvas-title">Add User</h5>
                                    <button
                                        type="button"
                                        className="btn-close text-reset"
                                        data-bs-dismiss="offcanvas"
                                        aria-label="Close"></button>
                                </div>
                                <div className="offcanvas-body mx-0 flex-grow-0 p-6 h-100">
                                    <form className="add-new-user pt-0" id="addNewUserForm" onSubmit="return false">
                                        <div className="mb-6">
                                            <label className="form-label" htmlFor="add-user-fullname">Full Name</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="add-user-fullname"
                                                placeholder="John Doe"
                                                name="userFullname"
                                                aria-label="John Doe"/>
                                        </div>
                                        <div className="mb-6">
                                            <label className="form-label" htmlFor="add-user-email">Email</label>
                                            <input
                                                type="text"
                                                id="add-user-email"
                                                className="form-control"
                                                placeholder="john.doe@example.com"
                                                aria-label="john.doe@example.com"
                                                name="userEmail"/>
                                        </div>
                                        <div className="mb-6">
                                            <label className="form-label" htmlFor="add-user-contact">Contact</label>
                                            <input
                                                type="text"
                                                id="add-user-contact"
                                                className="form-control phone-mask"
                                                placeholder="+1 (609) 988-44-11"
                                                aria-label="john.doe@example.com"
                                                name="userContact"/>
                                        </div>
                                        <div className="mb-6">
                                            <label className="form-label" htmlFor="add-user-company">Company</label>
                                            <input
                                                type="text"
                                                id="add-user-company"
                                                className="form-control"
                                                placeholder="Web Developer"
                                                aria-label="jdoe1"
                                                name="companyName"/>
                                        </div>
                                        <div className="mb-6">
                                            <label className="form-label" htmlFor="country">Country</label>
                                            <select id="country" className="select2 form-select">
                                                <option value="">Select</option>
                                                <option value="Australia">Australia</option>
                                                <option value="Bangladesh">Bangladesh</option>
                                                <option value="Belarus">Belarus</option>
                                                <option value="Brazil">Brazil</option>
                                                <option value="Canada">Canada</option>
                                                <option value="China">China</option>
                                                <option value="France">France</option>
                                                <option value="Germany">Germany</option>
                                                <option value="India">India</option>
                                                <option value="Indonesia">Indonesia</option>
                                                <option value="Israel">Israel</option>
                                                <option value="Italy">Italy</option>
                                                <option value="Japan">Japan</option>
                                                <option value="Korea">Korea, Republic of</option>
                                                <option value="Mexico">Mexico</option>
                                                <option value="Philippines">Philippines</option>
                                                <option value="Russia">Russian Federation</option>
                                                <option value="South Africa">South Africa</option>
                                                <option value="Thailand">Thailand</option>
                                                <option value="Turkey">Turkey</option>
                                                <option value="Ukraine">Ukraine</option>
                                                <option value="United Arab Emirates">United Arab Emirates</option>
                                                <option value="United Kingdom">United Kingdom</option>
                                                <option value="United States">United States</option>
                                            </select>
                                        </div>
                                        <div className="mb-6">
                                            <label className="form-label" htmlFor="user-role">User Role</label>
                                            <select id="user-role" className="form-select">
                                                <option value="subscriber">Subscriber</option>
                                                <option value="editor">Editor</option>
                                                <option value="maintainer">Maintainer</option>
                                                <option value="author">Author</option>
                                                <option value="admin">Admin</option>
                                            </select>
                                        </div>
                                        <div className="mb-6">
                                            <label className="form-label" htmlFor="user-plan">Select Plan</label>
                                            <select id="user-plan" className="form-select">
                                                <option value="basic">Basic</option>
                                                <option value="enterprise">Enterprise</option>
                                                <option value="company">Company</option>
                                                <option value="team">Team</option>
                                            </select>
                                        </div>
                                        <button type="submit" className="btn btn-primary me-3 data-submit">Submit
                                        </button>
                                        <button type="reset" className="btn btn-label-danger"
                                                data-bs-dismiss="offcanvas">Cancel
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

        </>
    );
};

export async function getStaticProps({locale}) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ["common"])),
        },
    };
}

export default UsersList;
