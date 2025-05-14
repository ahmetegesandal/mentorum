import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import MainNavbar from "../components/MainNavbar";
import Footer from "../components/Footer";
import Image from "next/image";
import { useState } from "react";

const Home = () => {
  const { t } = useTranslation("common");
  const router = useRouter();

  return (
    <>
      <MainNavbar />



<li></li>
<li></li>
<li></li>



      <section style={{ padding: "60px 0", backgroundColor: "#f8f9fa" }}>
  <div
    className="container"
    style={{
      backgroundColor: "#ffffff",
      borderRadius: "16px",
      padding: "40px",
      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    }}
  >
    <div className="row align-items-center">
      
      {/* Sol: Yazı */}
      <div className="col-md-6">
        <h4 style={{ fontWeight: "bold", marginBottom: "20px" }}>
          Ders Özetleri ile ilerlemeyi takip edin
        </h4>
        <ul style={{ fontSize: "16px", paddingLeft: "20px", marginBottom: "30px" }}>
          <li>Derslerin nasıl geçtiğini kolayca görün</li>
          <li>İlerlemeyi takip edin ve başarıları kutlayın</li>
          <li>Ödevlerinizi yapmayı unutmayın</li>
          <li>Dersleri tekrar dinleyerek hafızanızı tazeleyin</li>
        </ul>
        <button
          className="btn btn-dark"
          style={{
            padding: "12px 24px",
            fontSize: "16px",
            borderRadius: "8px",
          }}
          onClick={() => window.location.href = "/trial"} // yönlendirilecek sayfa
        >
          Ücretsiz deneme dersi ayırt
        </button>
      </div>

      {/* Sağ: Görsel */}
      <div className="col-md-6 text-center mt-4 mt-md-0">
        <img
          src="/img/backgrounds/dersozetlerı1.png"
          alt="Ders Özetleri Görseli"
          style={{ maxWidth: "100%", borderRadius: "12px" }}
        />
      </div>
    </div>
  </div>
</section>







<div className="container" style={{ textAlign: "center", padding: "60px 0" }}>
  <h4 style={{ fontWeight: "bold" }}>

  Hedeflerinize odaklanın ve hiçbir ödevi kaçırmayın

  </h4>
  
</div>







<section style={{ padding: "60px 0", backgroundColor: "#f8f9fa" }}>
  <div
    className="container"
    style={{
      backgroundColor: "#ffffff",
      borderRadius: "16px",
      padding: "40px",
      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    }}
  >
    <div className="row align-items-center">
      
      {/* Sol: Görsel */}
      <div className="col-md-6 text-center mb-4 mb-md-0">
        <img
          src="/img/backgrounds/dersozetlerı2.jpg"
          alt="Ders Özeti Görseli"
          style={{ maxWidth: "100%", borderRadius: "12px" }}
        />
      </div>

      {/* Sağ: Yazı */}
      <div className="col-md-6">
        <h4 style={{ fontWeight: "bold", marginBottom: "20px" }}>
          Güncel kalmak için Ders Özetlerini kullanın
        </h4>
        <p style={{ fontSize: "16px", marginBottom: "15px" }}>
          50 dakikalık kişiselleştirilmiş bir özel derste çok şey öğrenebilirsiniz! Ders Özetleri öğrencileri, 
          ebeveynleri ve öğretmenleri olaylardan güncel tutar.
        </p>
        <p style={{ fontSize: "16px" }}>
          Otomatik olarak oluşturulan özetler, işlenen önemli konuları özetleyerek, ders ilerlemesini izleyerek 
          ve öğrencilere sonraki adımlarını hatırlatarak anında geri bildirim sağlar.
        </p>
      </div>
    </div>
  </div>
</section>












<section style={{ padding: "60px 0", backgroundColor: "#f8f9fa" }}>
  <div
    className="container"
    style={{
      backgroundColor: "#ffffff",
      borderRadius: "16px",
      padding: "40px",
      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    }}
  >
    <div className="row align-items-center">
      
      {/* Sol: 2 ayrı kutucuk yazılar */}
      <div className="col-md-6">
        <div
          style={{
            backgroundColor: "#f1f3f5",
            borderRadius: "12px",
            padding: "20px",
            marginBottom: "20px",
          }}
        >
          <h5 style={{ fontWeight: "bold", marginBottom: "10px" }}>
            Dersleri kolayca gözden geçirin
          </h5>
          <p style={{ margin: 0 }}>
            Dersin amacını ve işlenen ana konuların yanı sıra ders geri bildirimini,
            bir sonucu ve sonraki adımları görün.
          </p>
        </div>

        <div
          style={{
            backgroundColor: "#f1f3f5",
            borderRadius: "12px",
            padding: "20px",
          }}
        >
          <h5 style={{ fontWeight: "bold", marginBottom: "10px" }}>
            Hedeflere yönelik ilerlemeyi ölçün
          </h5>
          <p style={{ margin: 0 }}>
            Öğrenme zaman içinde pekişir. Hedefler ve ilerleme takibi, her dersin olumlu
            etkisinin açıkça görülmesini sağlar.
          </p>
        </div>
      </div>

      {/* Sağ: Görsel */}
      <div className="col-md-6 text-center mt-4 mt-md-0">
        <img
          src="/img/backgrounds/dersozetlerı3.jpg"
          alt="Ders Kontrol Görseli"
          style={{ maxWidth: "100%", borderRadius: "12px" }}
        />
      </div>
    </div>
  </div>
</section>










<section style={{ padding: "60px 0", backgroundColor: "#f8f9fa" }}>
  <div
    className="container"
    style={{
      backgroundColor: "#ffffff",
      borderRadius: "16px",
      padding: "40px",
      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    }}
  >
    <div className="row align-items-center">
      
      {/* Sol: Görsel */}
      <div className="col-md-6 text-center mb-4 mb-md-0">
        <img
          src="/img/backgrounds/dersozetlerı4.jpg"
          alt="Kaynak Takip Görseli"
          style={{ maxWidth: "100%", borderRadius: "12px" }}
        />
      </div>

      {/* Sağ: 2 kutucuk + buton */}
      <div className="col-md-6">
        {/* Kutucuk 1 */}
        <div
          style={{
            backgroundColor: "#f1f3f5",
            borderRadius: "12px",
            padding: "20px",
            marginBottom: "20px",
          }}
        >
          <h5 style={{ fontWeight: "bold", marginBottom: "10px" }}>
            Kaynakları ve görevleri takip edin
          </h5>
          <p style={{ margin: 0 }}>
            Tüm ders kaynakları ve alıştırmaların yanı sıra ödevler ve dosyalar da mevcuttur.
          </p>
        </div>

        {/* Kutucuk 2 */}
        <div
          style={{
            backgroundColor: "#f1f3f5",
            borderRadius: "12px",
            padding: "20px",
            marginBottom: "20px",
          }}
        >
          <h5 style={{ fontWeight: "bold", marginBottom: "10px" }}>
            Hatırlatma ister misiniz? Tekrar dinleyin
          </h5>
          <p style={{ margin: 0 }}>
            Zor bir matematik problemini nasıl çözeceğinizi ya da tekerlemeyi nasıl telaffuz
            edeceğinizi hatırlayamıyor musunuz? Ders Sesi ile Öğretmeninizin ne dediğini tekrar dinleyin.
          </p>
        </div>

        {/* Buton */}
        <button
          style={{
            backgroundColor: "#000",
            color: "#fff",
            padding: "12px 24px",
            border: "none",
            borderRadius: "8px",
            fontWeight: "bold",
          }}
        >
          Ücretsiz deneme dersi ayır
        </button>
      </div>
    </div>
  </div>
</section>













<section style={{ padding: "60px 0", backgroundColor: "#f8f9fa" }}>
  <div
    className="container"
    style={{
      backgroundColor: "#ffffff",
      borderRadius: "16px",
      padding: "40px 20px",
      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    }}
  >
    <div className="row text-center">
      {/* Başlık */}
      <div className="col-12 mb-4">
        <h4 style={{ fontWeight: "bold" }}>
          Öğrenciler özetlerini sıklıkla birden fazla kez kontrol eder
        </h4>
      </div>

      {/* İstatistik 1 */}
      <div className="col-md-4 mb-3">
        <div
          style={{
            backgroundColor: "#f1f3f5",
            borderRadius: "12px",
            padding: "24px",
            height: "100%",
          }}
        >
          <h2 style={{ fontWeight: "bold", color: "#000" }}>%87'si</h2>
          <p>ders kayıtlarını dinliyor</p>
        </div>
      </div>

      {/* İstatistik 2 */}
      <div className="col-md-4 mb-3">
        <div
          style={{
            backgroundColor: "#f1f3f5",
            borderRadius: "12px",
            padding: "24px",
            height: "100%",
          }}
        >
          <h2 style={{ fontWeight: "bold", color: "#000" }}>
            Öğrencilerin %82'si
          </h2>
          <p>ödevleri takip ediyor</p>
        </div>
      </div>

      {/* İstatistik 3 */}
      <div className="col-md-4 mb-3">
        <div
          style={{
            backgroundColor: "#f1f3f5",
            borderRadius: "12px",
            padding: "24px",
            height: "100%",
          }}
        >
          <h2 style={{ fontWeight: "bold", color: "#000" }}>
            Öğrencilerin %87'si
          </h2>
          <p>hedefleri ve ilerlemeyi göz önünde bulunduruyor</p>
        </div>
      </div>
    </div>
  </div>
</section>








<section className="py-5">
  <div className="container">
    <h4 className="text-center mb-4" style={{ fontWeight: "bold" }}>
      Sıkça Sorulan Sorular
    </h4>

    <div className="accordion" id="faqAccordion">
      {/* Soru 1 */}
      <div className="accordion-item mb-3">
        <h2 className="accordion-header" id="headingOne">
          <button
            className="accordion-button"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseOne"
            aria-expanded="true"
            aria-controls="collapseOne"
          >
         Ders Özetleri nasıl çalışır?
          </button>
        </h2>
        <div
          id="collapseOne"
          className="accordion-collapse collapse show"
          aria-labelledby="headingOne"
          data-bs-parent="#faqAccordion"
        >
          <div className="accordion-body">
          Öğretmenler, öğrenciler ve ebeveynler her dersten sonra derste işlenen konuları özetleyen bir ders özeti alabilirler. 
          Bu, katılımcıların hatırlatmaya ihtiyaç duymaları halinde tartışılan konuları tekrar dinlemelerine,
           nelerin ele alındığını gözden geçirmelerine, kullanılan kaynaklara erişmelerine,
            hedefleri ve ilerlemeyi takip etmelerine ve ödev dosyalarına erişmelerine olanak tanıyacaktır.


          </div>
        </div>
      </div>

      {/* Soru 2 */}
      <div className="accordion-item">
        <h2 className="accordion-header" id="headingTwo">
          <button
            className="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseTwo"
            aria-expanded="false"
            aria-controls="collapseTwo"
          >
Herkes Ders Özeti alır mı?

          </button>
        </h2>
        <div
          id="collapseTwo"
          className="accordion-collapse collapse"
          aria-labelledby="headingTwo"
          data-bs-parent="#faqAccordion"
        >
          <div className="accordion-body">

          Veliler ve öğrenciler, Ders Özetlerini almak istemedikleri takdirde, bu özetlerin dışında kalmaya karar verebilirler. 
          Ancak, kullanıcılarımızın çoğu bu özetleri çok faydalı bulmaktadır. Öğrencilerin ve ebeveynlerin çoğunluğu, 
          derste işlenenleri takip etmenin etkili bir yolu olduğu için içeriği birden çok kez kontrol ettiklerini söylüyor!

          </div>
        </div>
      </div>
    </div>
  </div>
</section>





<section className="py-5 bg-light">
  <div
    className="container p-5 rounded shadow"
    style={{ backgroundColor: "#f8f9fa", textAlign: "center" }}
  >
    <h3 className="mb-3" style={{ fontWeight: "bold" }}>
      Hemen bire bir dersleri deneyin
    </h3>
    <p className="mb-4">
      Güvenilir öğretmen topluluğumuz, çocuğunuzun öğrenme yolculuğunu en iyi şekilde
      desteklemek için özenle seçilmiştir. Hemen ücretsiz deneme dersinizi ayırtın.
    </p>
    <button className="btn btn-dark px-4 py-2">
      Ücretsiz deneme dersinizi ayırtın
    </button>
  </div>
</section>







      <div data-bs-spy="scroll" className="scrollspy-example">
        <section id="landingFeatures" className="section-py landing-features">
          <div className="container">dosandıuasd</div>
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
