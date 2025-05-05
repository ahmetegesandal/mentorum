import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import MainNavbar from "../components/MainNavbar";
import Footer from "../components/Footer";
import Image from "next/image";
import { useEffect, useState } from "react";
import Link from 'next/link';
import 'bootstrap/dist/css/bootstrap.min.css';


const Home = () => {
  const { t } = useTranslation("common");
  const router = useRouter();

  const [teachers, setTeachers] = useState([]);
  const [expandedBio, setExpandedBio] = useState({});
  const [selectedGrade, setSelectedGrade] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  
  useEffect(() => {
    fetch("/api/teachers")
      .then((res) => res.json())
      .then((data) => {
        console.log("Gelen öğretmenler:", data);
        setTeachers(data);
      });
  }, []);

  const toggleBio = (id) => {
    setExpandedBio((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  
  const handleSearch = () => {
    const params = new URLSearchParams();
    if (selectedGrade) params.append("grade", selectedGrade);
    if (selectedCategory) params.append("category", selectedCategory);
  
    fetch(`/api/teacher?${params.toString()}`)
      .then((res) => res.json())
      .then((data) => setTeachers(data));
  };
  
  
  
  
  return (
    <>
      <MainNavbar />
      <section className="bg-light py-5 text-center" style={{ marginTop: "150px" }}> 
    <div className="container">
    <h1 className="display-5 fw-bold">1'e 1 online dersler için ideal öğretmeni bulun</h1>
    <p className="lead mt-3">
      Dilediğiniz zaman istediğiniz yerden ulaşabileceğiniz her ders alanına, seviyeye ve öğrenim tarzına uygun, kişiye uyarlı online dersleri keşfedin.
    </p>

    <div className="row justify-content-center mt-4">
  <div className="col-md-3 mb-2">
    <select className="form-select" onChange={(e) => setSelectedGrade(e.target.value)}>
      <option value="">Tüm Düzeyler</option>
      <option value="Beginner">Başlangıç</option>
      <option value="Intermediate">Orta</option>
      <option value="Advanced">İleri</option>
    </select>
  </div>
  <div className="col-md-3 mb-2">
  <select className="form-select" onChange={(e) => setSelectedCategory(e.target.value)}>
  <option value="">Ders Seçin</option>
  <option value="1">Matematik</option>
  <option value="2">İngilizce</option>
  <option value="3">Fizik</option>
</select>
  </div>
  <div className="col-md-2 mb-2">
    <button className="btn btn-primary w-100" onClick={handleSearch}>
      Ara
    </button>
  </div>
</div>

  </div>
</section>

      <div data-bs-spy="scroll" className="scrollspy-example">
        <section id="landingFeatures" className="section-py landing-features">
          <div className="container ">
            <h2>Öğretmenler</h2>
            <div className="row">
  {teachers.length === 0 ? (
    <div className="text-center">
      <p className="text-muted">Sonuç bulunamadı.</p>
    </div>
  ) : (
    teachers.map((teacher) => {
      const isExpanded = expandedBio[teacher.teacher_id];

      return (
        <div className="col-md-4 col-sm-6 mb-4" key={teacher.teacher_id}>
          <div className="card h-100 shadow">
            <img
              src={`/img/avatars/${teacher.photo}` || "/default.jpg"}
              alt={teacher.teacher_name}
              className="profile-photo mt-3 card-img-top"
              style={{ objectFit: "cover", height: "200px" }}
            />
            <div className="card-body d-flex flex-column">
              <h5 className="card-title fw-bold d-flex align-items-center gap-2">
                {teacher.teacher_name}
                <img
                  src="/img/backgrounds/mavi_tik.svg"
                  alt="Onaylı Öğretmen"
                  width={30}
                  height={23}
                  style={{ borderRadius: "50%" }}
                />
              </h5>
              <p className="card-text">{teacher.expertise}</p>
              <p className="card-text">
                {isExpanded || !teacher.bio || teacher.bio.length <= 100
                  ? teacher.bio
                  : `${teacher.bio.slice(0, 100)}...`}
                {teacher.bio && teacher.bio.length > 100 && (
                  <button
                    onClick={() => toggleBio(teacher.teacher_id)}
                    className="btn btn-link btn-sm p-0 ms-1"
                  >
                    {isExpanded ? "Gizle" : "Devamını oku"}
                  </button>
                )}
              </p>

              <div className="teacher-info-group">
                <div className="teacher-info-box lesson-count">
                  <strong>Ders Sayısı:</strong> {teacher.total_lessons}
                </div>

                <div className="teacher-info-box rating">
                  <strong>Puan:</strong>{" "}
                  {teacher.average_rating
                    ? parseFloat(teacher.average_rating).toFixed(1)
                    : "Henüz yok"}{" "}
                  ⭐
                </div>

                <div className="teacher-info-box price">
                  <strong>Fiyat:</strong>{" "}
                  {teacher.min_price === teacher.max_price
                    ? `₺${teacher.min_price}`
                    : `₺${teacher.min_price} - ₺${teacher.max_price}`}
                </div>
              </div>

              <div className="mt-auto">
              <Link href={`/teacher/${teacher.teacher_id}`} legacyBehavior>
  <a className="btn btn-primary">Deneme Dersi Ayırt</a>
</Link>
              </div>
            </div>
          </div>
        </div>
      );
    })
  )}
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
