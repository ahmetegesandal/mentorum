import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useState } from "react";
import Logo from "../components/Logo";
import Link from "next/link";

const Register = () => {
  const { t } = useTranslation("common");
  const [role, setRole] = useState("student");
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

                <h4 className="mb-1">Adventure starts here 🚀</h4>
                <p className="mb-3">Make your app management easy and fun!</p>

                {error && <p className="alert alert-danger">{error}</p>}
                {success && <p className="alert alert-success">{success}</p>}

                <form
                  id="formAuthentication"
                  className="mb-3"
                  onSubmit={handleSubmit}
                >
                  <div className="mb-3">
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
                      <option value="student">Öğrenci</option>
                      <option value="parent">Veli</option>
                      <option value="teacher">Öğretmen</option>
                    </select>
                  </div>

                  <div className="mb-3">
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
                      required
                      onChange={handleChange}
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                      Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      name="name"
                      placeholder="Enter your name"
                      required
                      onChange={handleChange}
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="surname" className="form-label">
                      Surname
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="surname"
                      name="surname"
                      placeholder="Enter your surname"
                      required
                      onChange={handleChange}
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Email
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      placeholder="Enter your email"
                      required
                      onChange={handleChange}
                    />
                  </div>

                  <div className="mb-3 form-password-toggle">
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
                        required
                        onChange={handleChange}
                      />
                      <span className="input-group-text cursor-pointer">
                        <i className="ti ti-eye-off"></i>
                      </span>
                    </div>
                  </div>

                  {role === "teacher" && (
                    <div className="mb-3">
                      <label htmlFor="expertise" className="form-label">
                        Expertise Area
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="expertise"
                        name="expertise"
                        placeholder="Enter your expertise area"
                        onChange={handleChange}
                      />
                    </div>
                  )}

                  <button
                    type="submit"
                    className="btn btn-primary d-grid w-100"
                  >
                    Sign up
                  </button>
                </form>

                <p className="text-center">
                  <span>Already have an account?</span>
                  <a href="/sign-in">
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
  return { props: { ...(await serverSideTranslations(locale, ["common"])) } };
}

export default Register;
