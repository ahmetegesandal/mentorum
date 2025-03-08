import { useState, useEffect, useContext } from "react";
import LayoutMenu from "../components/LayoutMenu";
import Navbar from "../components/Navbar";
import axios from "axios";
import Swal from "sweetalert2";
import { UserContext } from "../contexts/UserContext";

const TeacherLiveClasses = () => {
  const userData = useContext(UserContext);
  const [liveClasses, setLiveClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // 📌 Yeni: Hata mesajlarını saklamak için state eklendi.

  useEffect(() => {
    if (userData?.role === "teacher") {
      fetchLiveClasses();
    }
  }, [userData]);

  const fetchLiveClasses = async () => {
    try {
      setLoading(true);
      setError(null); // Önceki hataları temizle
      console.log("📡 Dersler çekiliyor...");

      const response = await axios.get(
        `/api/live-classes?teacher_id=${userData.id}`
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

  const handleStartClass = async (classId) => {
    try {
      console.log(`📢 Ders başlatılıyor: classId=${classId}`);

      // 1️⃣ API'ye istek atarak toplantı linkini al
      const response = await axios.post("/api/create-meeting", {
        lessonId: classId,
        teacherId: userData.id,
      });

      if (response.data.meetingUrl) {
        const meetingUrl = response.data.meetingUrl;

        // 2️⃣ Başlatılan dersin linkini veritabanına kaydet
        await axios.post("/api/start-live-class", {
          class_id: classId,
          teacher_id: userData.id,
          meeting_link: meetingUrl, // 🔥 Artık Jitsi değil, bizim sayfamızdaki link kaydedilecek
        });

        // 3️⃣ Kullanıcıyı kendi uygulamamızın içindeki derse yönlendir
        Swal.fire({
          title: "Canlı Ders Başlatıldı!",
          text: "Derse yönlendiriliyorsunuz...",
          icon: "success",
          confirmButtonText: "Derse Git",
        }).then(() => {
          window.location.href = meetingUrl; // 🔥 Artık meet.jit.si yerine kendi uygulamamızdaki sayfaya yönlendiriyoruz!
        });

        fetchLiveClasses();
      } else {
        throw new Error("Ders bağlantısı oluşturulamadı.");
      }
    } catch (error) {
      console.error("❌ Ders başlatma hatası:", error);
      Swal.fire("Hata!", error.message || "Ders başlatılamadı.", "error");
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

              {/* Hata Mesajı Gösterme */}
              {error && <div className="alert alert-danger">❌ {error}</div>}

              {/* Yükleme Durumu */}
              {loading ? (
                <p>🔄 Yükleniyor...</p>
              ) : liveClasses.length > 0 ? (
                <table className="table">
                  <thead>
                    <tr>
                      <th>Ders</th>
                      <th>Öğrenci</th>
                      <th>Başlangıç</th>
                      <th>Bitiş</th>
                      <th>Durum</th>
                      <th>İşlem</th>
                    </tr>
                  </thead>
                  <tbody>
                    {liveClasses.map((cls) => (
                      <tr key={cls.id}>
                        <td>{cls.lesson_title || "Bilinmeyen Ders"}</td>
                        <td>
                          {cls.student_name || "Bilinmeyen"}{" "}
                          {cls.student_surname || "Öğrenci"}
                        </td>
                        <td>
                          {cls.start_time
                            ? new Date(cls.start_time).toLocaleString()
                            : "Bilinmiyor"}
                        </td>
                        <td>
                          {cls.end_time
                            ? new Date(cls.end_time).toLocaleString()
                            : "-"}
                        </td>
                        <td>
                          <span
                            className={`badge ${
                              cls.status === "scheduled"
                                ? "bg-warning"
                                : cls.status === "ongoing"
                                ? "bg-primary"
                                : cls.status === "completed"
                                ? "bg-success"
                                : "bg-danger"
                            }`}
                          >
                            {cls.status || "Bilinmiyor"}
                          </span>
                        </td>
                        <td>
                          {cls.status === "scheduled" && (
                            <button
                              className="btn btn-success btn-sm"
                              onClick={() => handleStartClass(cls.id)}
                            >
                              Başlat
                            </button>
                          )}
                          {cls.status === "ongoing" && cls.meeting_link && (
                            <a
                              href={cls.meeting_link}
                              target="_blank"
                              className="btn btn-primary btn-sm"
                              rel="noopener noreferrer"
                            >
                              Derse Git
                            </a>
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

export default TeacherLiveClasses;
