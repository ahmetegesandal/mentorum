import { useState, useEffect, useContext } from "react";
import LayoutMenu from "../components/LayoutMenu";
import Navbar from "../components/Navbar";
import axios from "axios";
import Swal from "sweetalert2";
import { UserContext } from "../contexts/UserContext";

const ITEMS_PER_PAGE = 8;

const StudentReservations = () => {
  const userData = useContext(UserContext);
  const [reservations, setReservations] = useState([]);
  const [filteredReservations, setFilteredReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isManagedByParent, setIsManagedByParent] = useState(false);

  if (!userData || userData.role !== "student") {
    return <p className="text-danger text-center mt-4">Erişim Yetkiniz Yok!</p>;
  }

  useEffect(() => {
    if (userData?.role === "student") {
      checkParentManagement();
      fetchReservations();
    }

    const interval = setInterval(fetchReservations, 5000);

    return () => clearInterval(interval);
  }, [userData]);

  const checkParentManagement = async () => {
    try {
      const response = await axios.get(
        `/api/check-parent-management?user_id=${userData.id}`
      );
      setIsManagedByParent(response.data.isManagedByParent);
    } catch (error) {
      console.error("Veli yönetimi kontrol edilirken hata oluştu:", error);
    }
  };

  const fetchReservations = async () => {
    try {
      const response = await axios.get(
        `/api/student-reservations?student_id=${userData.id}`
      );

      const formattedReservations = response.data.reservations.map((res) => ({
        ...res,
        date: new Date(res.date).toLocaleDateString("tr-TR", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        }),
        time: formatTimeRange(res.time),
      }));

      setReservations(formattedReservations);
      setFilteredReservations(formattedReservations);
    } catch (error) {
      console.error("Rezervasyonları çekerken hata oluştu:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatTimeRange = (time) => {
    const [hour, minute] = time.split(":").map(Number);
    const endHour = (hour + 1) % 24;
    return `${hour.toString().padStart(2, "0")}:${minute
      .toString()
      .padStart(2, "0")} - ${endHour.toString().padStart(2, "0")}:${minute
      .toString()
      .padStart(2, "0")}`;
  };

  useEffect(() => {
    const filtered = reservations.filter((res) =>
      `${res.teacher_name} ${res.teacher_surname} ${res.status}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );
    setFilteredReservations(filtered);
    setCurrentPage(1);
  }, [searchTerm, reservations]);

  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentReservations = filteredReservations.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(filteredReservations.length / ITEMS_PER_PAGE);

  const handleCancel = async (reservationId) => {
    try {
      const response = await axios.post("/api/cancel-reservation-student", {
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

            {isManagedByParent && (
              <div className="alert alert-warning">
                📢 Veliniz tarafından rezervasyon işlemleri yönetilmektedir.
              </div>
            )}

            <input
              type="text"
              className="form-control mb-4"
              placeholder="Öğretmen adı veya rezervasyon durumu ara..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              disabled={isManagedByParent}
            />

            {loading ? (
              <p>Yükleniyor...</p>
            ) : currentReservations.length > 0 ? (
              <table className="table">
                <thead>
                  <tr>
                    <th>Öğretmen</th>
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
                        {res.teacher_name} {res.teacher_surname}
                      </td>
                      <td>{res.lesson_title}</td>
                      <td>{res.date}</td>
                      <td>{res.time}</td>
                      <td>
                        <span
                          className={`badge ${
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
                        {!isManagedByParent && res.status === "pending" && (
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => handleCancel(res.id)}
                          >
                            İptal Et
                          </button>
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

export default StudentReservations;
