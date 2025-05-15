import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Logo from "../components/Logo";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import ReCAPTCHA from "react-google-recaptcha";

const RECAPTCHA_ENABLED = true;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [recaptchaToken, setRecaptchaToken] = useState("");
  const { t } = useTranslation("common");
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const verified = sessionStorage.getItem("2fa-verified");
    if (token && verified === "true") {
      router.push("/main");
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // ✅ reCAPTCHA kontrol
      if (RECAPTCHA_ENABLED) {
        if (!recaptchaToken)
          throw new Error("Lütfen reCAPTCHA doğrulamasını yapın.");

        const verifyRes = await fetch("/api/verify-recaptcha", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token: recaptchaToken }),
        });

        const verifyData = await verifyRes.json();
        if (!verifyData.success)
          throw new Error("reCAPTCHA doğrulaması başarısız!");
      }

      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: email, password }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Giriş başarısız!");

      if (data.twoFactorRequired) {
        sessionStorage.setItem("2fa-verified", "false");
        sessionStorage.setItem("tempToken", data.tempToken);
        router.replace(`/verify-2fa`);
      } else {
        localStorage.setItem("token", data.token);
        sessionStorage.setItem("2fa-verified", "true");
        router.replace("/main");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-xxl">
      <div className="authentication-wrapper authentication-basic container-p-y">
        <div className="authentication-inner py-6">
          <div className="card">
            <div className="card-body">
              <div className="app-brand justify-content-center mb-6">
                <Link href="/" className="app-brand-link">
                  <Logo w={64} h={64} s={24} />
                </Link>
              </div>

              <h4 className="mb-1">{t("welcomemessage")}</h4>
              <p className="mb-6">{t("signinmessage")}</p>

              <form
                id="formAuthentication"
                className="mb-4"
                onSubmit={handleSubmit}
              >
                {error && <p className="text-danger">{error}</p>}

                <div className="mb-6">
                  <label htmlFor="email" className="form-label">
                    {t("emailorusername")}
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="email"
                    name="email"
                    placeholder={t("email_placeholder")}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoFocus
                  />
                </div>

                <div className="mb-6 form-password-toggle">
                  <label className="form-label" htmlFor="password">
                    {t("signpassword")}
                  </label>
                  <div className="input-group input-group-merge">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      className="form-control"
                      name="password"
                      placeholder="********"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <span
                      className="input-group-text cursor-pointer"
                      onClick={() => setShowPassword((prev) => !prev)}
                    >
                      <i
                        className={showPassword ? "ti ti-eye" : "ti ti-eye-off"}
                      ></i>
                    </span>
                  </div>
                </div>

                {RECAPTCHA_ENABLED && (
                  <div className="mb-4 d-flex justify-content-center">
                    <ReCAPTCHA
                      sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
                      onChange={(token) => setRecaptchaToken(token)}
                    />
                  </div>
                )}

                <div className="mb-6">
                  <button
                    className="btn btn-primary d-grid w-100"
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? "Giriş yapılıyor..." : t("signinbutton")}
                  </button>
                </div>
              </form>

              <p className="text-center">
                <span>{t("newusermessage")}</span>{" "}
                <Link href="/register">{t("create_account_link")}</Link>
              </p>
              <p className="text-center">
                <span>{t("forgotpasswordmessage")}</span>{" "}
                <Link href="/forgot-password">{t("forgot_password_link")}</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}

export default Login;
