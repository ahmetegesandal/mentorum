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



<li>

</li>

<li></li>
<li>

</li>

<li></li>



      <section style={{ backgroundColor: "#f0f2f5", padding: "60px 0" }}>
  <div className="container">
    <div
      className="row align-items-center"
      style={{
        backgroundColor: "white",
        borderRadius: "16px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        padding: "40px 20px",
      }}
    >
      {/* Sol: Yazılar */}
      <div className="col-md-6">
        <h4 style={{ fontWeight: "bold", marginBottom: "20px" }}>
        {t(  "mentoclassinteractivelearningtitle") }
        </h4>
        <p style={{ marginBottom: "15px" }}>
        {t(  "mentoclasspersonalizedvirtualclass") }

        </p>
        <ul style={{ paddingLeft: "20px" }}>
          <li>{t(  "mentoclassremoteprivatelessons") }

          </li>
          <li> {t(  "mentoclassdigitalwhiteboardcollaboration") }


          </li>
          <li>{t(  "mentoclassinteractivetoolsforreview") }
          </li>
          <li>
          {t(  "mentoclasslearningresourcesfeatures") }

          </li>
        </ul>
      </div>

      {/* Sağ: Görsel */}
      <div className="col-md-6 text-center">
        <Image
          src="/img/backgrounds/mentoclass1.jpg"
          alt="GoClass Sanal Sınıf"
          width={500}
          height={350}
          style={{ borderRadius: "12px" }}
        />
      </div>
    </div>
  </div>



  <div className="text-center mt-5">
  <button
    className="btn btn-primary btn-lg"
    onClick={() => router.push("/kayit")}
  >

{t(  "mentoclassbooktrial") }
  </button>
</div>


</section>


<div className="container" style={{ textAlign: "center", padding: "60px 0" }}>
  <h4 style={{ fontWeight: "bold" }}>


  {t(  "mentoclassaseffectiveasinperson") }

  </h4>
 
</div>




<section style={{ backgroundColor: "#f8f9fa", padding: "60px 0" }}>
  <div className="container">
    <div
      className="row align-items-center"
      style={{
        backgroundColor: "#ffffff",
        borderRadius: "16px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        padding: "40px 20px",
      }}
    >
      {/* Sol: Görsel */}
      <div className="col-md-6 text-center mb-4 mb-md-0">
        <Image
          src="/img/backgrounds/mentoclass2.jpg"
          alt="GoClass Odaklanma"
          width={500}
          height={350}
          style={{ borderRadius: "12px" }}
        />
      </div>

      {/* Sağ: Yazı */}
      <div className="col-md-6">
        <h4 style={{ fontWeight: "bold", marginBottom: "20px" }}>

        {t(  "mentoclassmentorumfocus") }

        </h4>
        <p>
        {t(  "mentoclassmentorumlessonstyle") }


        </p>
      </div>
    </div>
  </div>
</section>




<section style={{ backgroundColor: "#f8f9fa", padding: "60px 0" }}>
  <div className="container">
    <div
      className="row align-items-center"
      style={{
        backgroundColor: "#ffffff",
        borderRadius: "16px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        padding: "40px 20px",
      }}
    >
      {/* Sol: İki Metin Kutusu */}
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
          <h5 style={{ fontWeight: "bold" }}>{t(  "mentoclassinteractivewhiteboard") }
          </h5>
          <p>

          {t(  "mentoclasscollaborativelearning") }

          </p>
        </div>

        {/* Kutucuk 2 */}
        <div
          style={{
            backgroundColor: "#f1f3f5",
            borderRadius: "12px",
            padding: "20px",
          }}
        >
          <h5 style={{ fontWeight: "bold" }}>{t(  "mentoclasssharematerials") }
          </h5>
          <p>
          {t(  "mentoclassvisualsupport") }


          </p>
          <p>

          {t(  "mentoclasshomeworkupload") }

          </p>
        </div>
      </div>

      {/* Sağ: Görsel */}
      <div className="col-md-6 text-center">
        <Image
          src="/img/backgrounds/mentoclass3.jpg"
          alt="Dijital Tahta"
          width={500}
          height={350}
          style={{ borderRadius: "12px" }}
        />
      </div>
    </div>
  </div>
</section>






<section style={{ backgroundColor: "#f8f9fa", padding: "60px 0" }}>
  <div className="container">
    <div
      className="row align-items-center"
      style={{
        backgroundColor: "#ffffff",
        borderRadius: "16px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        padding: "40px 20px",
      }}
    >
      {/* Sol: Görsel */}
      <div className="col-md-6 text-center mb-4 mb-md-0">
        <Image
          src="/img/backgrounds/mentoclass4.jpg"
          alt="Etkileşimli Tahta"
          width={500}
          height={350}
          style={{ borderRadius: "12px" }}
        />
      </div>

      {/* Sağ: 2 Metin Kutusu */}
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
          <h5 style={{ fontWeight: "bold" }}> {t(  "mentoclassnoteglossary") }

          </h5>
          <p>
          {t(  "mentoclassnotesglossaryfeature") }


          </p>
        </div>

        {/* Kutucuk 2 */}
        <div
          style={{
            backgroundColor: "#f1f3f5",
            borderRadius: "12px",
            padding: "20px",
          }}
        >
          <h5 style={{ fontWeight: "bold" }}>{t(  "mentoclassprogresssummary") }

          </h5>
          <p>
          {t(  "mentoclasslessonsummarytracking") }

          </p>
          <p>

          {t(  "mentoclassfocusinsight") }


          </p>
        </div>
      </div>
    </div>
  </div>







  <div className="text-center mt-5">
  <button
    className="btn btn-primary btn-lg"
    onClick={() => router.push("/kayit")}
  >

{t(  "mentoclassbooktrial") }
  </button>
</div>

</section>

<section style={{ padding: "60px 0", backgroundColor: "#f8f9fa" }}>
  <div className="container">
    <h3 className="text-center mb-5">{t(  "mentoclassfaqsectiontitle") }

    </h3>
    <div className="accordion" id="faqAccordion">
      {/* Soru 1 */}
      <div className="accordion-item">
        <h2 className="accordion-header" id="headingOne">
          <button
            className="accordion-button"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseOne"
            aria-expanded="true"
            aria-controls="collapseOne"
          >

{t(  "mentoclassfaqaccessmentorum") }

          </button>
        </h2>
        <div
          id="collapseOne"
          className="accordion-collapse collapse show"
          aria-labelledby="headingOne"
          data-bs-parent="#faqAccordion"
        >
          <div className="accordion-body">

          {t(  "mentoclassfaqaccessmentorumanswer") }



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
{t(  "mentoclassfaqneedmiccam") }

          </button>
        </h2>
        <div
          id="collapseTwo"
          className="accordion-collapse collapse"
          aria-labelledby="headingTwo"
          data-bs-parent="#faqAccordion"
        >
          <div className="accordion-body">


          {t(  "mentoclassfaqmiccamrequired") }

          </div>
        </div>
      </div>










      {/* Soru 3 */}
      <div className="accordion-item">
        <h2 className="accordion-header" id="headingThree">
          <button
            className="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseThree"
            aria-expanded="false"
            aria-controls="collapseThree"
          >
{t(  "mentoclassfaqfocusstrategy") }


          </button>
        </h2>
        <div
          id="collapseThree"
          className="accordion-collapse collapse"
          aria-labelledby="headingThree"
          data-bs-parent="#faqAccordion"
        >
          <div className="accordion-body">


          {t(  "mentoclassfaqteacherfocusstrategyanswer") }


          </div>
        </div>
      </div>
    </div>
  </div>
</section>

















<section style={{ backgroundColor: "#yellow", padding: "60px 0" }}>
  <div
    className="container"
    style={{
      backgroundColor: "#yellow",
      borderRadius: "16px",
      padding: "40px 30px",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
      textAlign: "center",
    }}
  >
    <h3 style={{ fontWeight: "bold", marginBottom: "20px" }}>

    {t(  "mentoclasstry1on1now") }



    </h3>
    <p style={{ fontSize: "18px", marginBottom: "30px" }}>


    {t(  "mentoclasstrustedteachers") }


    </p>
    
    {/* Buton */}
    <button
      className="btn btn-dark"
      style={{
        padding: "14px 28px",
        fontSize: "16px",
        borderRadius: "8px",
      }}
      onClick={() => window.location.href = "/trial"} // buraya istediğin sayfa linkini yaz
    >


{t(  "mentoclassbookfreetrial") }


    </button>
  </div>
</section>




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
