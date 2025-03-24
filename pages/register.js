import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useState } from "react";
import Logo from "../components/Logo";
import Link from "next/link";

const Register = () => {
  const { t } = useTranslation("common");
  const [role, setRole] = useState("student");
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    name: "",
    surname: "",
    expertise: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const { username, email, password, name, surname, expertise } = formData;

    if (!username || !name || !surname || !email || !password) {
      setError("All fields are required!");
      return;
    }

    const response = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username,
        email,
        password,
        name,
        surname,
        role,
        expertise: role === "teacher" ? expertise : null,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      setError(data.error || "An error occurred");
    } else {
      setSuccess("Registration successful! Redirecting...");
      setTimeout(() => {
        window.location.href = "/sign-in";
      }, 2000);
    }
  };

  return (
    <>
      <div className="container-xxl">
        <div className="authentication-wrapper authentication-basic container-p-y">
          <div className="authentication-inner py-6">
            <div className="card">
              <div className="card-body">
                <div className="app-brand justify-content-center mb-3">
                  <Link href="/" className="app-brand-link">
                    <Logo />
                  </Link>
                </div>

                <h4 className="mb-1"> {t("registerStartMessage")}</h4>
                <p className="mb-3">{ t("registerManagementMessg")} 
                </p>

                {error && <p className="alert alert-danger">{error}</p>}
                {success && <p className="alert alert-success">{success}</p>}

                <form
                  id="formAuthentication"
                  className="mb-3"
                  onSubmit={handleSubmit}
                >
                  <div className="mb-3">
                    <label htmlFor="role" className="form-label">
                    { t("registerSelectRol") } 
                    </label>
                    <select
                      className="form-control"
                      id="role"
                      name="role"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                    >
                      <option value="student">{t("registerRoleStudent")}</option>
                      <option value="parent">{t("registerRolepParent")} </option>
                      <option value="teacher">{t("registerRoleTeacher")}</option>
                    </select>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="username" className="form-label">
                    {t("registerUserName")  } 
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="username"
                      name="username"
                      placeholder= {t("registeruserMessage")} 
                      autoFocus
                      required
                      onChange={handleChange}
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                    {t("registerName")  } 
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      name="name"
                      placeholder= {t("registerNameMessage")} 
                      required
                      onChange={handleChange}
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="surname" className="form-label">
                    {t("registerSurname")}
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="surname"
                      name="surname"
                      placeholder= {t("registerSurnameMessg")} 
                      required
                      onChange={handleChange}
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                    {t("registerEmail")}
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      placeholder={t("registerEmailMessg")} 
                      required
                      onChange={handleChange}
                    />
                  </div>

                  <div className="mb-3 form-password-toggle">
                    <label className="form-label" htmlFor="password">
                    {t("registerPassword")} 
                    </label>
                    <div className="input-group input-group-merge">
                      <input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        className="form-control"
                        name="password"
                        placeholder="*******"
                        required
                        onChange={handleChange}
                      />
                      <span
                        className="input-group-text cursor-pointer"
                        onClick={() => setShowPassword((prev) => !prev)}
                      >
                        <i
                          className={
                            showPassword ? "ti ti-eye" : "ti ti-eye-off"
                          }
                        ></i>
                      </span>
                    </div>
                  </div>

                  {role === "teacher" && (
                    <div className="mb-3">
                      <label htmlFor="expertise" className="form-label">
                      {t("registerExpertiseArea")} 
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="expertise"
                        name="expertise"
                        placeholder={t("registerExpertMessg") } 
                        onChange={handleChange}
                      />
                    </div>
                  )}

                  <button
                    type="submit"
                    className="btn btn-primary d-grid w-100"
                  >
                    {t("registerSignMessg")}
                  </button>
                </form>

                <p className="text-center">
                  <span>{t("registerAccountMessg") } </span>
                  <a href="/sign-in">
                    <span> {t("registerAccountSignMessg") } 
                    </span>
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
  return { props: { ...(await serverSideTranslations(locale, ["common"])) } };
}

export default Register;
