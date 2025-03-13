import { useState, useEffect, useContext } from "react";
import LayoutMenu from "../components/LayoutMenu";
import Navbar from "../components/Navbar";
import axios from "axios";
import Swal from "sweetalert2";
import { UserContext } from "../contexts/UserContext";

const ITEMS_PER_PAGE = 8;

const TeacherReservations = () => {
  const userData = useContext(UserContext);
  const [reservations, setReservations] = useState([]);
  const [filteredReservations, setFilteredReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(""); // 🔍 Arama çubuğu için state
  const [currentPage, setCurrentPage] = useState(1); // 📌 Mevcut sayfa

  if (!userData || userData.role !== "teacher") {
    return <p className="text-danger text-center mt-4">Erişim Yetkiniz Yok!</p>;
  }

  useEffect(() => {
    if (userData?.role === "teacher") {
      fetchReservations();
    }

    // 🔥 Periyodik olarak API'den güncelleme al
    const interval = setInterval(fetchReservations, 5000); // ⏳ 5 saniyede bir güncelle

    return () => clearInterval(interval); // 🔥 Component unmount olduğunda interval temizle
  }, [userData]);

  const fetchReservations = async () => {
    try {
      const response = await axios.get(
        `/api/teacher-reservations?teacher_id=${userData.id}`
      );

      // 📌 Tarih ve saat formatlarını düzenleyerek rezervasyonları ayarla
      const formattedReservations = response.data.reservations.map((res) => ({
        ...res,
        date: new Date(res.date).toLocaleDateString("tr-TR", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        }), // ✅ "YYYY-MM-DD" yerine "DD.MM.YYYY"
        time: formatTimeRange(res.time), // ✅ Saat formatını düzenle
      }));

      setReservations(formattedReservations);
      setFilteredReservations(formattedReservations);
    } catch (error) {
      console.error("Rezervasyonları çekerken hata oluştu:", error);
    } finally {
      setLoading(false);
    }
  };

  // 📌 Saat formatını düzenle: "HH:mm - HH:mm" formatına çevir
  const formatTimeRange = (time) => {
    const [hour, minute] = time.split(":").map(Number);
    const endHour = (hour + 1) % 24; // ✅ Bitiş saati +1 ekleyerek 24 saat formatında
    return `${hour.toString().padStart(2, "0")}:${minute
      .toString()
      .padStart(2, "0")} - ${endHour.toString().padStart(2, "0")}:${minute
      .toString()
      .padStart(2, "0")}`;
  };

  // 🔍 Arama İşlevi
  useEffect(() => {
    const filtered = reservations.filter((res) =>
      `${res.student_name} ${res.student_surname} ${res.status}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );
    setFilteredReservations(filtered);
    setCurrentPage(1); // ✅ Arama yapıldığında sayfayı sıfırla
  }, [searchTerm, reservations]);

  // ✅ Mevcut sayfa için slice işlemi
  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentReservations = filteredReservations.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(filteredReservations.length / ITEMS_PER_PAGE);

  const handleApprove = async (reservationId) => {
    try {
      const response = await axios.post("/api/approve-reservation", {
        reservation_id: reservationId,
        teacher_id: userData.id,
      });

      if (response.data.success) {
        Swal.fire("Başarılı!", "Rezervasyon onaylandı.", "success");
        fetchReservations();
      } else {
        Swal.fire("Hata!", response.data.error, "error");
      }
    } catch (error) {
      Swal.fire("Hata!", "Onay sırasında bir hata oluştu.", "error");
    }
  };

  const handleCancel = async (reservationId) => {
    try {
      const response = await axios.post("/api/cancel-reservation", {
        reservation_id: reservationId,
        user_id: userData.id,
      });

      if (response.data.success) {
        Swal.fire(
          "İptal Edildi",
          "Rezervasyon başarıyla iptal edildi.",
          "info"
        );
        fetchReservations();
      } else {
        Swal.fire("Hata!", response.data.error, "error");
      }
    } catch (error) {
      Swal.fire(
        "Hata!",
        error.response?.data?.error || "İptal sırasında bir hata oluştu.",
        "error"
      );
    }
  };

  return (
    <>
      <LayoutMenu />
      <div className="layout-page">
        <Navbar />
        <div className="content-wrapper">
          <div className="container-xxl flex-grow-1 container-p-y">
            <h1 className="text-3xl font-bold mb-4">Rezervasyonlarım</h1>

            {/* 🔍 Arama Kutusu */}
            <input
              type="text"
              className="form-control mb-4"
              placeholder="Öğrenci adı veya rezervasyon durumu ara..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            {loading ? (
              <p>Yükleniyor...</p>
            ) : currentReservations.length > 0 ? (
              <table className="table">
                <thead>
                  <tr>
                    <th>Öğrenci</th>
                    <th>Ders</th>
                    <th>Tarih</th>
                    <th>Saat</th>
                    <th>Durum</th>
                    <th>İşlemler</th>
                  </tr>
                </thead>
                <tbody>
                  {currentReservations.map((res) => (
                    <tr key={res.id}>
                      <td>
                        {res.student_name} {res.student_surname}
                      </td>
                      <td>{res.lesson_title}</td>
                      <td>{res.date}</td>
                      <td>{res.time}</td>
                      <td>
                        <span
                          className={`badge 
                            ${
                              res.status === "pending"
                                ? "bg-warning"
                                : res.status === "confirmed"
                                ? "bg-success"
                                : "bg-danger"
                            }`}
                        >
                          {res.status === "pending"
                            ? "Bekliyor"
                            : res.status === "confirmed"
                            ? "Onaylandı"
                            : "İptal Edildi"}
                        </span>
                      </td>
                      <td>
                        {res.status === "pending" && (
                          <>
                            <button
                              className="btn btn-success btn-sm me-2"
                              onClick={() => handleApprove(res.id)}
                            >
                              Onayla
                            </button>
                            <button
                              className="btn btn-danger btn-sm"
                              onClick={() => handleCancel(res.id)}
                            >
                              İptal Et
                            </button>
                          </>
                        )}
                        {res.status === "confirmed" && (
                          <span className="text-muted">Onaylandı</span>
                        )}
                        {res.status === "cancelled" && (
                          <span className="text-muted">İptal Edildi</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>Henüz rezervasyonunuz yok.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default TeacherReservations;
