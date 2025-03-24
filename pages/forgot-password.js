import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Logo from "../components/Logo";
import Swal from "sweetalert2";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import axios from "axios";

const ForgotPassword = () => {
  const { t } = useTranslation("common");
  const router = useRouter();

  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/request-password-reset", { email });
      Swal.fire("Başarılı", "E-posta gönderildi (eğer kayıtlıysa)", "success");
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
    <>
      <div class="container-xxl">
        <div class="authentication-wrapper authentication-basic container-p-y">
          <div class="authentication-inner py-6">
            <div class="card">
              <div class="card-body">
                <div class="app-brand justify-content-center mb-6">
                  <Link href="/" className="app-brand-link">
                    <Logo w={64} h={64} s={24} />
                  </Link>
                </div>

                <h4 class="mb-1">Forgot Password? 🔒</h4>
                <p class="mb-6">
                  Enter your email and we'll send you instructions to reset your
                  password
                </p>
                <form
                  id="formAuthentication"
                  class="mb-6"
                  onSubmit={handleSubmit}
                >
                  <div class="mb-6">
                    <label for="email" class="form-label">
                      Email
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      required
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <button class="btn btn-primary d-grid w-100" type="submit">
                    Send Reset Link
                  </button>
                </form>
                <div class="text-center">
                  <Link href="/sign-in" class="d-flex justify-content-center">
                    <i class="ti ti-chevron-left scaleX-n1-rtl me-1_5"></i>
                    Back to login
                  </Link>
                </div>
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

export default ForgotPassword;
