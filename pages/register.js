
import {useTranslation} from "next-i18next";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import Logo from "../components/Logo";


const Register = () => {
    const { t } = useTranslation("common")

    return (
        <>
            <div className="container-xxl">
                <div className="authentication-wrapper authentication-basic container-p-y">
                    <div className="authentication-inner py-6">

                        <div className="card">
                            <div className="card-body">

                                <div className="app-brand justify-content-center mb-6">
                                    <a href="index.html" className="app-brand-link">
                                        <Logo/>
                                    </a>
                                </div>

                                <h4 className="mb-1">Adventure starts here 🚀</h4>
                                <p className="mb-6">Make your app management easy and fun!</p>

                                <form id="formAuthentication" className="mb-6" action="index.html" method="GET">
                                    <div className="mb-6">
                                        <label htmlFor="username" className="form-label">Username</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="username"
                                            name="username"
                                            placeholder="Enter your username"
                                            autoFocus/>
                                    </div>
                                    <div className="mb-6">
                                        <label htmlFor="email" className="form-label">Email</label>
                                        <input type="text" className="form-control" id="email" name="email"
                                               placeholder="Enter your email"/>
                                    </div>
                                    <div className="mb-6 form-password-toggle">
                                        <label className="form-label" htmlFor="password">Password</label>
                                        <div className="input-group input-group-merge">
                                            <input
                                                type="password"
                                                id="password"
                                                className="form-control"
                                                name="password"
                                                placeholder="&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;"
                                                aria-describedby="password"/>
                                            <span className="input-group-text cursor-pointer"><i
                                                className="ti ti-eye-off"></i></span>
                                        </div>
                                    </div>

                                    <div className="my-8">
                                        <div className="form-check mb-0 ms-2">
                                            <input className="form-check-input" type="checkbox" id="terms-conditions"
                                                   name="terms"/>
                                            <label className="form-check-label" htmlFor="terms-conditions">
                                                I agree to
                                                <a href="javascript:void(0);">privacy policy & terms</a>
                                            </label>
                                        </div>
                                    </div>
                                    <button className="btn btn-primary d-grid w-100">Sign up</button>
                                </form>

                                <p className="text-center">
                                    <span>Already have an account?</span>
                                    <a href="auth-login-basic.html">
                                        <span>Sign in instead</span>
                                    </a>
                                </p>

                                <div className="divider my-6">
                                    <div className="divider-text">or</div>
                                </div>

                                <div className="d-flex justify-content-center">
                                    <a href="javascript:;"
                                       className="btn btn-sm btn-icon rounded-pill btn-text-facebook me-1_5">
                                        <i className="tf-icons ti ti-brand-facebook-filled"></i>
                                    </a>

                                    <a href="javascript:;"
                                       className="btn btn-sm btn-icon rounded-pill btn-text-twitter me-1_5">
                                        <i className="tf-icons ti ti-brand-twitter-filled"></i>
                                    </a>

                                    <a href="javascript:;"
                                       className="btn btn-sm btn-icon rounded-pill btn-text-github me-1_5">
                                        <i className="tf-icons ti ti-brand-github-filled"></i>
                                    </a>

                                    <a href="javascript:;"
                                       className="btn btn-sm btn-icon rounded-pill btn-text-google-plus">
                                        <i className="tf-icons ti ti-brand-google-filled"></i>
                                    </a>
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

export default Register;
