import { useState, useEffect, useContext } from "react";
import LayoutMenu from "../components/LayoutMenu";
import Navbar from "../components/Navbar";
import axios from "axios";
import Swal from "sweetalert2";
import { UserContext } from "../contexts/UserContext";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

const StudentLiveClasses = () => {
  const userData = useContext(UserContext);
  const { t } = useTranslation("common");
  const [liveClasses, setLiveClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  if (!userData || userData.role !== "student") {
    return <p className="text-danger text-center mt-4">Erişim Yetkiniz Yok!</p>;
  }

  useEffect(() => {
    if (userData?.role === "student") {
      fetchLiveClasses();
    }
  }, [userData]);

  const fetchLiveClasses = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log("📡 Dersler çekiliyor...");

      const response = await axios.get(
        `/api/live-classes-student?student_id=${userData.id}`
      );

      console.log("✅ API'den gelen veri:", response.data);
      if (
        response.data.liveClasses &&
        Array.isArray(response.data.liveClasses)
      ) {
        setLiveClasses(response.data.liveClasses);
      } else {
        throw new Error("Beklenmeyen API yanıtı formatı!");
      }
    } catch (error) {
      console.error("❌ Dersleri çekerken hata oluştu:", error);
      setError(
        error.response?.data?.error ||
          "Bilinmeyen bir hata oluştu. Lütfen tekrar deneyin."
      );
      Swal.fire({
        title: "Hata!",
        text:
          error.response?.data?.error ||
          "Canlı dersler yüklenirken bir hata oluştu.",
        icon: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <LayoutMenu />
      <div className="layout-page">
        <Navbar />
        <div className="content-wrapper">
          <div className="container-xxl flex-grow-1 container-p-y">
            <h1 className="text-3xl font-bold mb-6">Canlı Derslerim</h1>

            <div className="card p-4 mt-4">
              <h5>Canlı Dersler</h5>

              {error && <div className="alert alert-danger">❌ {error}</div>}

              {loading ? (
                <p>🔄 Yükleniyor...</p>
              ) : liveClasses.length > 0 ? (
                <table className="table">
                  <thead>
                    <tr>
                      <th>Ders</th>
                      <th>Öğretmen</th>
                      <th>Tarih</th>
                      <th>Başlangıç</th>
                      <th>Toplantı Linki</th>
                    </tr>
                  </thead>
                  <tbody>
                    {liveClasses.map((cls) => (
                      <tr key={cls.id}>
                        <td>{cls.lesson_title || "Bilinmeyen Ders"}</td>
                        <td>
                          {cls.teacher_name || "Bilinmeyen"}{" "}
                          {cls.teacher_surname || "Öğretmen"}
                        </td>
                        <td>
                          {new Date(cls.date).toLocaleDateString("tr-TR")}
                        </td>
                        <td>{cls.time}</td>
                        <td>
                          {cls.meeting_link ? (
                            <a
                              href={cls.meeting_link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="btn btn-primary btn-sm"
                            >
                              Derse Katıl
                            </a>
                          ) : (
                            <span className="text-muted">
                              Henüz Bağlantı Yok
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p>📭 Henüz canlı dersiniz bulunmamaktadır.</p>
              )}
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

export default StudentLiveClasses;
