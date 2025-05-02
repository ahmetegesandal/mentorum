// pages/parent-live-classes.js
import { useState, useEffect, useContext } from "react";
import LayoutMenu from "../components/LayoutMenu";
import Navbar from "../components/Navbar";
import axios from "axios";
import Swal from "sweetalert2";
import { UserContext } from "../contexts/UserContext";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

const ITEMS_PER_PAGE = 10;

const ParentLiveClasses = () => {
  const userData = useContext(UserContext);
  const { t } = useTranslation("common");
  const [liveClasses, setLiveClasses] = useState([]);
  const [filteredClasses, setFilteredClasses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  if (!userData || userData.role !== "parent") {
    return <p className="text-danger text-center mt-4">Erişim Yetkiniz Yok!</p>;
  }

  useEffect(() => {
    fetchLiveClasses();

    const interval = setInterval(() => {
      fetchLiveClasses();
    }, 10000);

    return () => clearInterval(interval);
  }, [userData]);

  const fetchLiveClasses = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(`/api/parent-live-classes?parent_id=${userData.id}`);
      const classes = response.data.liveClasses || [];
      setLiveClasses(classes);
      setFilteredClasses(classes);
    } catch (error) {
      console.error("❌ Dersler yüklenemedi:", error);
      setError("Canlı dersler alınamadı.");
      Swal.fire("Hata", "Canlı dersler alınamadı", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const filtered = liveClasses.filter((cls) =>
      `${cls.student_name} ${cls.student_surname} ${cls.lesson_title} ${cls.teacher_name} ${cls.teacher_surname}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );
    setFilteredClasses(filtered);
    setCurrentPage(1);
  }, [searchTerm, liveClasses]);

  const indexOfLast = currentPage * ITEMS_PER_PAGE;
  const indexOfFirst = indexOfLast - ITEMS_PER_PAGE;
  const currentItems = filteredClasses.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredClasses.length / ITEMS_PER_PAGE);

  return (
    <>
      <LayoutMenu />
      <div className="layout-page">
        <Navbar />
        <div className="content-wrapper">
          <div className="container-xxl flex-grow-1 container-p-y">
            <h1 className="text-3xl font-bold mb-4">Canlı Derslerim</h1>

            <input
              type="text"
              className="form-control mb-3"
              placeholder="Öğrenci, öğretmen veya ders ara..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            <div className="card p-4">
              {loading ? (
                <p>🔄 Yükleniyor...</p>
              ) : error ? (
                <div className="alert alert-danger">{error}</div>
              ) : filteredClasses.length === 0 ? (
                <p>📭 Henüz canlı dersiniz yok.</p>
              ) : (
                <>
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Öğrenci</th>
                        <th>Ders</th>
                        <th>Öğretmen</th>
                        <th>Tarih</th>
                        <th>Saat</th>
                        <th>Bağlantı</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentItems.map((cls) => (
                        <tr key={cls.id}>
                          <td>{cls.student_name} {cls.student_surname}</td>
                          <td>{cls.lesson_title}</td>
                          <td>{cls.teacher_name} {cls.teacher_surname}</td>
                          <td>{new Date(cls.date).toLocaleDateString("tr-TR")}</td>
                          <td>{cls.time}</td>
                          <td>
                            {cls.meeting_link ? (
                              <a
                                href={cls.meeting_link}
                                className="btn btn-sm btn-primary"
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                Katıl
                              </a>
                            ) : (
                              <span className="text-muted">Yok</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  <div className="d-flex justify-content-between align-items-center mt-3">
                    <span>
                      Sayfa {currentPage} / {totalPages}
                    </span>
                    <div>
                      <button
                        className="btn btn-sm btn-secondary me-2"
                        onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                        disabled={currentPage === 1}
                      >
                        Önceki
                      </button>
                      <button
                        className="btn btn-sm btn-secondary"
                        onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                        disabled={currentPage === totalPages}
                      >
                        Sonraki
                      </button>
                    </div>
                  </div>
                </>
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

export default ParentLiveClasses;