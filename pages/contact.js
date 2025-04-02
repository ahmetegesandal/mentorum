import Logo from "../components/Logo";
import LanguageSwitcher from "../components/LanguageSwitcher";
import ThemeSwitcher from "../components/ThemeSwitcher";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import MainNavbar from "../components/MainNavbar";
import Footer from "../components/Footer";
import Image from "next/image";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Home = () => {
  const { t } = useTranslation("common");
  const router = useRouter();
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <>
      <MainNavbar />

      <div data-bs-spy="scroll" className="scrollspy-example">
        <section id="landingFeatures" className="section-py landing-features">
          <div className="container">
            <div className="text-center mb-4">
              <span className="badge bg-label-primary">Useful Features</span>
            </div>
            <h4 className="text-center mb-1">
              <span className="position-relative fw-extrabold z-1">
                Bizimle iletişime geçin
                <img
                  src="img/front-pages/icons/section-title-icon.png"
                  alt="laptop charging"
                  className="section-title-img position-absolute object-fit-contain bottom-0 z-n1"
                />
              </span>
            </h4>
            <p className="text-center mb-12">
              Sorularınızın yanıtları ve devam eden sorunlarla ilgili yardım için canlı sohbetimize erişin veya bizi arayın
            </p>
            
            <div className="container mt-5">
              <div className="row shadow-lg rounded">
                {/* Sol Taraf - Metin */}
                <div className="col-md-6 d-flex flex-column justify-content-center">
                  <h2>Bizimle İletişime Geçin</h2>
                  <p>
                    Sorularınızı yanıtlamak ve size yardımcı olmak için buradayız.
                    Bizimle iletişime geçmekten çekinmeyin!
                  </p>
                  <button className="btn btn-primary">Bize Ulaşın</button>
                </div>

                {/* Sağ Taraf - Resim */}
                <div className="col-md-6 text-center">
                  <Image
                    src="/img/backgrounds/iletisimegec.jpg"
                    alt="İletişim"
                    width={400}
                    height={300}
                    className="img-fluid rounded"
                  />
                </div>
              </div>
            </div>

            {/* İletişim Formu */}
            <div className="container mt-12">
              <div className="row shadow-lg rounded">
                <div className="card-body">
                  <div style={{ maxWidth: "2000px", width: "100%" }}>
                    <h2 className="mb-2 text-center">Bizimle İletişime Geçin</h2>
                    {submitted && <div className="alert alert-success">Mesajınız başarıyla gönderildi!</div>}
                    <form onSubmit={handleSubmit} className="px-4"> {/* Formun tamamına sağ-sol padding ekledik */}
  <div className="mb-4 px-4"> {/* Her giriş alanına ekstra padding ekledik */}
    <label className="form-label">Adınız</label>
    <input type="text" name="name" className="form-control" value={formData.name} onChange={handleChange} required />
  </div>
  <div className="mb-4 px-4">
    <label className="form-label">E-posta</label>
    <input type="email" name="email" className="form-control" value={formData.email} onChange={handleChange} required />
  </div>
  <div className="mb-4 px-4">
    <label className="form-label">Mesajınız</label>
    <textarea name="message" className="form-control" rows="4" value={formData.message} onChange={handleChange} required></textarea>
  </div>
  <button type="submit" className="btn btn-primary w-100">Gönder</button>
</form>

                  
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

      </div>
      

      <Footer />
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

export default Home;
