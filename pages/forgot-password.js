import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Logo from "../components/Logo";
import Swal from "sweetalert2";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import axios from "axios";

const COOLDOWN_KEY = "forgot-password-cooldown";
const COOLDOWN_DURATION = 60;

const ForgotPassword = () => {
  const { t } = useTranslation("common");
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [cooldown, setCooldown] = useState(0);

  useEffect(() => {
    const cooldownUntil = localStorage.getItem(COOLDOWN_KEY);
    if (cooldownUntil) {
      const remaining = Math.ceil(
        (new Date(cooldownUntil).getTime() - Date.now()) / 1000
      );
      if (remaining > 0) {
        setCooldown(remaining);
      } else {
        localStorage.removeItem(COOLDOWN_KEY);
      }
    }
  }, []);

  useEffect(() => {
    let timer;
    if (cooldown > 0) {
      timer = setInterval(() => {
        setCooldown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            localStorage.removeItem(COOLDOWN_KEY);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [cooldown]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/request-password-reset", { email });
      Swal.fire("Başarılı", "E-posta gönderildi (eğer kayıtlıysa)", "success");

      const until = new Date(Date.now() + COOLDOWN_DURATION * 1000);
      localStorage.setItem(COOLDOWN_KEY, until.toISOString());
      setCooldown(COOLDOWN_DURATION);
    } catch (error) {
      console.error("🚨 API hata:", error.response?.data || error.message);
      Swal.fire(
        "Hata",
        "Bir hata oluştu: " + (error.response?.data?.error || error.message),
        "error"
      );
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

              <h4 className="mb-1">Forgot Password? 🔒</h4>
              <p className="mb-6">
                Enter your email and we'll send you instructions to reset your
                password
              </p>
              <form
                id="formAuthentication"
                className="mb-6"
                onSubmit={handleSubmit}
              >
                <div className="mb-6">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    required
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <button
                  className="btn btn-primary d-grid w-100"
                  type="submit"
                  disabled={cooldown > 0}
                >
                  {cooldown > 0
                    ? `Tekrar gönder (${cooldown}s)`
                    : "Send Reset Link"}
                </button>
              </form>
              <div className="text-center">
                <Link href="/sign-in" className="d-flex justify-content-center">
                  <i className="ti ti-chevron-left scaleX-n1-rtl me-1_5"></i>
                  Back to login
                </Link>
              </div>
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

export default ForgotPassword;
