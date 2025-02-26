import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useState } from "react";
import Logo from "../components/Logo";
// denemedir

const Register = () => {
  const { t } = useTranslation("common");
  const [role, setRole] = useState("student");

  return (
    <>
      <div className="container-xxl">
        <div className="authentication-wrapper authentication-basic container-p-y">
          <div className="authentication-inner py-6">
            <div className="card">
              <div className="card-body">
                <div className="app-brand justify-content-center mb-6">
                  <a href="index.html" className="app-brand-link">
                    <Logo />
                  </a>
                </div>

                <h4 className="mb-1">Adventure starts here 🚀</h4>
                <p className="mb-6">Make your app management easy and fun!</p>

                <form
                  id="formAuthentication"
                  className="mb-6"
                  action="index.html"
                  method="GET"
                >
                  <div className="mb-6">
                    <label htmlFor="role" className="form-label">
                      Select Role
                    </label>
                    <select
                      className="form-control"
                      id="role"
                      name="role"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                    >
                      <option value="student">Student</option>
                      <option value="parent">Parent</option>
                      <option value="teacher">Teacher</option>
                    </select>
                  </div>

                  <div className="mb-6">
                    <label htmlFor="username" className="form-label">
                      Username
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="username"
                      name="username"
                      placeholder="Enter your username"
                      autoFocus
                    />
                  </div>

                  <div className="mb-6">
                    <label htmlFor="email" className="form-label">
                      Email
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="email"
                      name="email"
                      placeholder="Enter your email"
                    />
                  </div>

                  <div className="mb-6 form-password-toggle">
                    <label className="form-label" htmlFor="password">
                      Password
                    </label>
                    <div className="input-group input-group-merge">
                      <input
                        type="password"
                        id="password"
                        className="form-control"
                        name="password"
                        placeholder="••••••••"
                        aria-describedby="password"
                      />
                      <span className="input-group-text cursor-pointer">
                        <i className="ti ti-eye-off"></i>
                      </span>
                    </div>
                  </div>

                  {role === "teacher" && (
                    <div className="mb-6">
                      <label htmlFor="expertise" className="form-label">
                        Expertise Area
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="expertise"
                        name="expertise"
                        placeholder="Enter your expertise area"
                      />
                    </div>
                  )}

                  <div className="my-8">
                    <div className="form-check mb-0 ms-2">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="terms-conditions"
                        name="terms"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="terms-conditions"
                      >
                        I agree to{" "}
                        <a href="javascript:void(0);">privacy policy & terms</a>
                      </label>
                    </div>
                  </div>

                  <button className="btn btn-primary d-grid w-100">
                    Sign up
                  </button>
                </form>

                <p className="text-center">
                  <span>Already have an account?</span>
                  <a href="auth-login-basic.html">
                    <span>Sign in instead</span>
                  </a>
                </p>
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

export default Register;
