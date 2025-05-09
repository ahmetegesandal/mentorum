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
     <li>   
     </li>



      <div data-bs-spy="scroll" className="scrollspy-example">
        {/* Nasıl Çalışır Bölümü */}
        <section
          id="howItWorks"
          className="section-py"
          style={{ backgroundColor: "grey", padding: "80px 0", marginTop: "80px" }}
        >
          <div className="container">
            <div className="row align-items-center">
              {/* Sol taraf: Yazı */}
              <div className="col-md-6">
                
                
                  


            
                <ul style={{ paddingLeft: "1.2rem", marginTop: "1.5rem", lineHeight: "1.8" }}>
                <li>
                  
                  <h3>{t("hottoworkStudentTitle") } </h3>  </li>
               <h5> <li>{t("hottoworkMatchmsg") }</li>
                <li>{t("hottoworkpersonalized") } </li>
                <li>{t("hottoworkflexible") } </li>
                <li>{t(  "hottoworkinteractiveclass") }</li>   </h5>
  </ul>



  <button
    className="btn btn-primary mt-4"
    onClick={() => router.push("/kayit")} // yönlendirme yapacak sayfa
  >
  {t("hottoworkbooktrial") }
  </button>




              </div>

              {/* Sağ taraf: Görsel */}
              <div className="col-md-6 text-center">
              <Image
  src="/img/backgrounds/nasılcalısır1.jpg"
  alt="nasılcalısır1.jpg"
  width={500}
  height={300}
  style={{ borderRadius: "12px" }}
/>
              </div>
            </div>
          </div>
        </section>

        <div className="container" style={{ textAlign: "center", padding: "60px 0" }}>
  <h4 style={{ fontWeight: "bold" }}>
  {t(  "hottoworkeasystart") }
  </h4>
  <h5>
  {t(  "hottoworkawardwinning") }
  </h5>
</div>

  <section
  style={{
    backgroundColor: "#ffffff",
    padding: "40px 0",
  }}
>
  <div className="container">
    <div className="row text-center">
      {/* 1. Adım */}
      <div className="col-md-4 mb-4">
        <div
          style={{
            padding: "30px",
            borderRadius: "12px",
            backgroundColor: "#f9f9f9",
            boxShadow: "0 0 10px rgba(0,0,0,0.05)",
            height: "100%",
          }}
        >
          <h4>{t(  "hottoworkstep1") }
          </h4>
          <p>
          {t(  "hottoworkshareneeds") }

          </p>
        </div>
      </div>

      {/* 2. Adım */}
      <div className="col-md-4 mb-4">
        <div
          style={{
            padding: "30px",
            borderRadius: "12px",
            backgroundColor: "#f9f9f9",
            boxShadow: "0 0 10px rgba(0,0,0,0.05)",
            height: "100%",
          }}
        >
          <h4>{t(  "hottoworkstep2") }
          </h4>
          <p>
          {t(  "hottoworktrialexperience") }
          <br />
          {t(  "hottoworknocommitment") }
          </p>
        </div>
      </div>

      {/* 3. Adım */}
      <div className="col-md-4 mb-4">
        <div
          style={{
            padding: "30px",
            borderRadius: "12px",
            backgroundColor: "#f9f9f9",
            boxShadow: "0 0 10px rgba(0,0,0,0.05)",
            height: "100%",
          }}
        >
          <h4>{t(  "hottoworkstep3") }
          </h4>
          <p>
          {t(  "hottoworkbookpackage") }

          </p>



        </div>
      </div>
    </div>
  </div>





</section>




<div className="text-center mt-5">
  <button
    className="btn btn-primary btn-lg"
    onClick={() => router.push("/kayit")}
  >
{t(  "hottoworkbooktrial") }

  </button>
</div>





<div className="container" style={{ textAlign: "center", padding: "60px 0" }}>
  <h4 style={{ fontWeight: "bold" }}>
  {t(  "hottoworksuccessmethods") }

  </h4>
  <h5>
  {t(  "hottoworkfocuscustomization") }

  </h5>
</div>








<section style={{ padding: "80px 0", backgroundColor: "#ffffff" }}>
  <div className="container">
    <div className="row align-items-center">
      
      {/* Sol: Metin */}
      <div className="col-md-6">
        <h3 style={{ fontWeight: "bold", marginBottom: "20px" }}>
        {t(  "hottoworkselectionrate") }

        </h3>
        <p>

        </p>
        <p>


        {t(  "hottoworkexpertteachers") }
        </p>
        <p>
        {t(  "hottoworkproveneffectiveness") }
        </p>
      </div>

      {/* Sağ: Görsel */}
      <div className="col-md-6 text-center">
      <Image
  src="/img/backgrounds/nasılcalısır2.jpg"
  alt="nasılcalısır2.jpg"
  width={500}
  height={300}
  style={{ borderRadius: "12px" }}
/>
        
      </div>      
    </div>
  </div>
</section>








<section style={{ padding: "80px 0", backgroundColor: "#f8f9fa" }}>
  <div className="container">
    <div className="row align-items-center">
      
      {/* Sol: Görsel */}
      <div className="col-md-6 text-center">
      <Image
  src="/img/backgrounds/nasılcalısır3.jpg"
  alt="nasılcalısır3.jpg"
  width={500}
  height={300}
  style={{ borderRadius: "12px" }}
/>
</div>

      {/* Sağ: Metin */}
      <div className="col-md-6">
        <h3 style={{ fontWeight: "bold", marginBottom: "20px" }}>
        {t(  "hottoworkgoclassheading") }
        </h3>
        <p>
        {t(  "hottoworkgoclassdescription") }
        </p>
        <p>
        {t(  "hottoworkgoclassfeatures") }
        </p>
        <p>
        {t(  "hottoworkequationeditor") }
        </p>
      </div>
      
    </div>
  </div>
</section>





<section style={{ padding: "80px 0", backgroundColor: "#ffffff" }}>
  <div className="container">
    <div className="row align-items-center">
      
      {/* Sol: Metin */}
      <div className="col-md-6">
        <h3 style={{ fontWeight: "bold", marginBottom: "20px" }}>
        {t(  "hottoworklessonsummarytitle") }
        </h3>
        <p>
        {t(  "hottoworklessonsummarydesc") }
        </p>
        <p>
        {t(  "hottoworkautosummaryfeedback") }
        </p>
      </div>

      {/* Sağ: Görsel */}
      <div className="col-md-6 text-center">
      <Image
  src="/img/backgrounds/nasılcalısır4.jpg"
  alt="nasılcalısır4.jpg"
  width={500}
  height={300}
  style={{ borderRadius: "12px" }}
/>
      </div>

    </div>
  </div>
</section>







<div className="text-center mt-5">
  <button
    className="btn btn-primary btn-lg"
    onClick={() => router.push("/kayit")}
  >
{t(  "hottoworkbooktrial") }
</button>
</div>






<div className="container" style={{ textAlign: "center", padding: "60px 0" }}>
  <h4 style={{ fontWeight: "bold" }}>
  {t(  "hottoworkmentorumbynumberstitle") }
  </h4>
</div>









<section style={{ backgroundColor: "#f0f4f8", padding: "60px 0" }}>
  <div className="container">
    <div
      className="d-flex justify-content-between flex-wrap p-4 rounded"
      style={{
        backgroundColor: "#fff",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        textAlign: "center",
      }}
    >
      {/* Kart 1 */}
      <div className="flex-fill m-2">
        <h3 style={{ fontWeight: "bold", fontSize: "2rem", color: "#007bff" }}>
          10 Milyon
        </h3>
        <p style={{ margin: 0 }}>{t(  "hottoworksupportingfamilies") }
        </p>
      </div>

      {/* Kart 2 */}
      <div className="flex-fill m-2">
        <h3 style={{ fontWeight: "bold", fontSize: "2rem", color: "#007bff" }}>
          30+
        </h3>
        <p style={{ margin: 0 }}>{t(  "hottoworklessonsubjectstitle") }
        </p>
      </div>

      {/* Kart 3 */}
      <div className="flex-fill m-2">
        <h3 style={{ fontWeight: "bold", fontSize: "2rem", color: "#007bff" }}>
          %96
        </h3>
        <p style={{ margin: 0 }}>{t(  "hottoworkstarreviews") }
        </p>
      </div>

      {/* Kart 4 */}
      <div className="flex-fill m-2">
        <h3 style={{ fontWeight: "bold", fontSize: "2rem", color: "#007bff" }}>
          %96
        </h3>
        <p style={{ margin: 0 }}>{t(  "hottoworksuccessrate") }
        </p>
      </div>
    </div>
  </div>
</section>






<div className="container" style={{ textAlign: "center", padding: "60px 0" }}>
  <h4 style={{ fontWeight: "bold" }}>
  {t(  "hottoworkgoalhighgrades") }
  </h4>
</div>





<section style={{ backgroundColor: "#f8f9fa", padding: "60px 0" }}>
  <div className="container text-center">
    <h4 style={{ marginBottom: "40px", fontWeight: "bold" }}>
    {t(  "hottoworkparentssay") }

    </h4>

    <div id="veliCarousel" className="carousel slide" data-bs-ride="carousel">
      <div className="carousel-inner">

        {/* Yorum 1 */}
        <div className="carousel-item active">
          <div className="card p-4 mx-auto" style={{ maxWidth: "700px" }}>
            <p style={{ fontSize: "1.1rem" }}>
            {t(  "hottoworktestimonial1") }

            </p>
            <strong>- Ayşe K., İstanbul</strong>
          </div>
        </div>

        {/* Yorum 2 */}
        <div className="carousel-item">
          <div className="card p-4 mx-auto" style={{ maxWidth: "700px" }}>
            <p style={{ fontSize: "1.1rem" }}>
            {t(  "hottoworktestimonialmentorum") }

            </p>
            <strong>- Mehmet D., Ankara</strong>
          </div>
        </div>

        {/* Yorum 3 */}
        <div className="carousel-item">
          <div className="card p-4 mx-auto" style={{ maxWidth: "700px" }}>
            <p style={{ fontSize: "1.1rem" }}>
            {t(  "hottoworktestimonialmentorumquality") }

            </p>
            <strong>- Zeynep T., İzmir</strong>
          </div>
        </div>

      </div>

      {/* Butonlar */}
      <button className="carousel-control-prev" type="button" data-bs-target="#veliCarousel" data-bs-slide="prev">

      <span
        className="carousel-control-prev-icon"
    aria-hidden="true"
    style={{
      filter: "invert(100%) brightness(0%)", // Bu siyah yapar
    }}
  ></span>


        <span className="visually-hidden">Önceki</span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#veliCarousel" data-bs-slide="next">

        <span
    className="carousel-control-next-icon"
    aria-hidden="true"
    style={{
      filter: "invert(100%) brightness(0%)", // Bu da siyah yapar
    }}
  ></span>
        
        <span className="visually-hidden">Sonraki</span>
      </button>
    </div>
  </div>
</section>






<div className="container" style={{ textAlign: "center", padding: "60px 0" }}>
  <h4 style={{ fontWeight: "bold" }}>

  {t(  "hottoworkflexiblelearning") }

  </h4>
  <h5>
  {t(  "hottoworkflexiblepackages") }


  </h5>
</div>










<section style={{ padding: "60px 0", backgroundColor: "#ffffff" }}>
  <div className="container">
    <div className="row align-items-center">
      
      {/* Sol: Fotoğraf */}
      <div className="col-md-6 text-center">
      <Image
  src="/img/backgrounds/nasılcalısır5.jpg"
  alt="nasılcalısır5.jpg"
  width={500}
  height={300}
  style={{ borderRadius: "12px" }}
/>
      </div>

      {/* Sağ: 2 Kutucuk */}
      <div className="col-md-6">
        
        {/* İlk Kutucuk */}
        <div className="card mb-4" style={{ borderRadius: "12px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
          <div className="card-body">
            <h5 className="card-title" style={{ fontWeight: "bold" }}>
            {t(  "hottoworkfamilyflexibility") }
            </h5>
            <p>
            {t(  "hottoworklessonsharing") }
            </p>
          </div>
        </div>

        {/* İkinci Kutucuk */}
        <div className="card" style={{ borderRadius: "12px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
          <div className="card-body">
            <h5 className="card-title" style={{ fontWeight: "bold" }}>
            {t(  "hottoworkaffordablecustomlessons") }

            </h5>
            <p>
            {t(  "hottoworkcustompackage") }
            </p>
          </div>
        </div>
        
      </div>
    </div>
  </div>
</section>





<div className="text-center mt-5">
  <button
    className="btn btn-primary btn-lg"
    onClick={() => router.push("/kayit")}
  >


{t(  "hottoworkexplorepricing") }

  </button>
</div>







<div className="container" style={{ textAlign: "center", padding: "60px 0" }}>
  <h4 style={{ fontWeight: "bold" }}>

  {t(  "hottoworksecureonlineeducation") }

  </h4>
  <h5>

  {t(  "hottoworksafetycommitment") }

  </h5>
</div>







<section style={{ padding: "60px 0", backgroundColor: "#f8f9fa" }}>
  <div className="container">
    <div className="row text-center">

      {/* Kutucuk 1 */}
      <div className="col-md-3 mb-4">
        <div className="card p-4" style={{ borderRadius: "12px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
          <h5 className="card-title" style={{ fontWeight: "bold", color: "#007bff" }}>
          {t(  "hottoworksecurepayment") }
          </h5>
          <p>{t(  "hottoworknoextrafees") }
          </p>
        </div>
      </div>

      {/* Kutucuk 2 */}
      <div className="col-md-3 mb-4">
        <div className="card p-4" style={{ borderRadius: "12px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
          <h5 className="card-title" style={{ fontWeight: "bold", color: "#007bff" }}>
          {t(  "hottoworkafterapproval") }
          </h5>
          <p>{t(  "hottoworkcarefullyselectedteachers") }
          </p>
        </div>
      </div>

      {/* Kutucuk 3 */}
      <div className="col-md-3 mb-4">
        <div className="card p-4" style={{ borderRadius: "12px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
          <h5 className="card-title" style={{ fontWeight: "bold", color: "#007bff" }}>
          {t(  "hottoworksafeonline") }
          </h5>
          <p>{t(  "hottoworklearningplatform") }
          </p>
        </div>
      </div>

      {/* Kutucuk 4 */}
      <div className="col-md-3 mb-4">
        <div className="card p-4" style={{ borderRadius: "12px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
          <h5 className="card-title" style={{ fontWeight: "bold", color: "#007bff" }}>
          {t(  "hottoworknoextrafees") }
          </h5>
          <p>{t(  "hottoworknohiddenfees") }
          </p>
        </div>
      </div>

    </div>
  </div>
</section>








<div className="container" style={{ textAlign: "center", padding: "60px 0" }}>
  <h4 style={{ fontWeight: "bold" }}>

  {t(  "hottoworkfaqsectiontitle") }

  </h4>
  <h5>

  {t(  "hottoworkmembershipguide") }

  </h5>
</div>









<section style={{ padding: "60px 0", backgroundColor: "#f8f9fa" }}>
  <div className="container">
    <h4 className="text-center" style={{ fontWeight: "bold", marginBottom: "40px" }}>
    {t(  "hottoworkfaqsectiontitle") }
    </h4>








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
            {t(  "hottoworkwhatismentorumtitle") }

          </button>
        </h2>
        <div
          id="collapseOne"
          className="accordion-collapse collapse show"
          aria-labelledby="headingOne"
          data-bs-parent="#faqAccordion"
        >
          <div className="accordion-body">
          {t(  "hottoworkaboutmentorum") }

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

{t(  "hottoworkwhoisthisofferfortitle") }

          </button>
        </h2>
        <div
          id="collapseTwo"
          className="accordion-collapse collapse"
          aria-labelledby="headingTwo"
          data-bs-parent="#faqAccordion"
        >
          <div className="accordion-body">

          {t(  "hottoworkofferapplicability") }


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
{t(  "hottoworkeducationalsupportservicestitle") }
</button>
        </h2>
        <div
          id="collapseThree"
          className="accordion-collapse collapse"
          aria-labelledby="headingThree"
          data-bs-parent="#faqAccordion"
        >
          <div className="accordion-body">

          {t(  "hottoworkeducationalsupportdescription") }

          </div>
        </div>
      </div>

      {/* Soru 4 */}
      <div className="accordion-item">
        <h2 className="accordion-header" id="headingFour">
          <button
            className="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseFour"
            aria-expanded="false"
            aria-controls="collapseFour"
          >
{t(  "hottoworkonlinelessonadvantagestitle") }
</button>
        </h2>
        <div
          id="collapseFour"
          className="accordion-collapse collapse"
          aria-labelledby="headingFour"
          data-bs-parent="#faqAccordion"
        >
          <div className="accordion-body">
          {t(  "hottoworkonlinelessonadvantages") }
          </div>

        </div>
      </div>

      {/* Soru 5 */}
      <div className="accordion-item">
        <h2 className="accordion-header" id="headingFive">
          <button
            className="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseFive"
            aria-expanded="false"
            aria-controls="collapseFive"
          >
{t(  "hottoworkhowtobookteachertitle") }

</button>
        </h2>
        <div
          id="collapseFive"
          className="accordion-collapse collapse"
          aria-labelledby="headingFive"
          data-bs-parent="#faqAccordion"
        >
          <div className="accordion-body">
          {t(  "hottoworkhowtobookteacher") }

          </div>
        </div>
      </div>

    </div>
  </div>
</section>







<section style={{ padding: "60px 0", backgroundColor: "#f8f9fa" }}>
  <div className="container">
    <div className="row justify-content-center">
      <div className="col-md-8">
        <div className="card p-5" style={{ borderRadius: "12px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
          <h4 className="text-center" style={{ fontWeight: "bold", marginBottom: "30px" }}>
          {t(  "hottoworkregisterasteacher") }
            
          </h4>
          <p className="text-center" style={{ marginBottom: "30px" }}>
           
          {t(  "hottoworkteachersignupbenefits") }

          </p>

          <div className="text-center">
            <button className="btn btn-dark" style={{ padding: "10px 30px", fontWeight: "bold", fontSize: "16px" }}>
            {t(  "hottoworkregisterasteacher1") }



            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>












        {/* Örnek başka bölüm */}
        <section id="landingFeatures" className="section-py landing-features">
          <div className="container"></div>
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
