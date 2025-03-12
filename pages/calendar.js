import { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import LayoutMenu from "../components/LayoutMenu";
import Navbar from "../components/Navbar";
import { UserContext } from "../contexts/UserContext";
import { useTranslation } from "next-i18next";
import CalendarModal from "../components/CalendarModal";

const Blank = () => {
  const { t } = useTranslation("common");
  const userData = useContext(UserContext);
  const [calendarEntries, setCalendarEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    if (userData?.id) {
      fetchCalendar();

      // API'yi her 30 saniyede bir güncelle
      const interval = setInterval(fetchCalendar, 30000);
      return () => clearInterval(interval);
    }
  }, [userData]);

  const fetchCalendar = async () => {
    try {
      const response = await fetch(
        `/api/getUserCalendar?userId=${userData.id}`
      );
      const data = await response.json();
      setCalendarEntries(data);
    } catch (error) {
      console.error("Takvim verisi alınırken hata oluştu:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Silmek istediğine emin misin?",
      text: "Bu işlem geri alınamaz!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Evet, sil!",
      cancelButtonText: "İptal",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await fetch("/api/deleteCalendarEntry", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id }),
          });

          const data = await res.json();

          if (res.ok) {
            Swal.fire("Silindi!", data.message, "success");
            fetchCalendar(); // Listeyi güncelle
          } else {
            Swal.fire("Hata!", data.message, "error");
          }
        } catch (error) {
          Swal.fire("Hata!", "Sunucu hatası oluştu.", "error");
        }
      }
    });
  };

  // Tarih formatını (YYYY-MM-DD → DD.MM.YYYY) çevirme
  const formatDate = (dateString) => {
    const dateObj = new Date(dateString);
    return new Intl.DateTimeFormat("tr-TR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(dateObj);
  };

  // Saat formatını (HH:mm → HH:mm - HH+1:mm) çevirme
  const formatTime = (timeString) => {
    const [hours, minutes] = timeString.split(":").map(Number);
    const nextHour = (hours + 1) % 24; // 24 saat formatında döngü
    return `${timeString} - ${nextHour.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}`;
  };

  // Arama ve sayfalama için filtreleme
  const filteredEntries = calendarEntries.filter((entry) =>
    entry.date.includes(searchTerm)
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentEntries = filteredEntries.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  return (
    <>
      <LayoutMenu />
      <div className="layout-page">
        <Navbar />
        <div className="container mt-5">
          <h2 className="text-center mb-4">{t("Takvim Kayıtlarım")}</h2>

          <div className="d-flex justify-content-between mb-3">
            <input
              type="text"
              className="form-control w-50"
              placeholder="Tarih ara (DD.MM.YYYY)..."
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <CalendarModal onUpdate={fetchCalendar} />
          </div>

          {loading ? (
            <p className="text-center">Yükleniyor...</p>
          ) : calendarEntries.length === 0 ? (
            <p className="alert alert-warning text-center">
              Henüz takvim kaydınız yok!
            </p>
          ) : (
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Tarih</th>
                  <th>Saat</th>
                  <th>İşlem</th>
                </tr>
              </thead>
              <tbody>
                {currentEntries.map((entry) => (
                  <tr key={entry.id}>
                    <td>{formatDate(entry.date)}</td>
                    <td>{formatTime(entry.time)}</td>
                    <td>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(entry.id)}
                      >
                        Sil
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          <nav>
            <ul className="pagination">
              {[...Array(Math.ceil(filteredEntries.length / itemsPerPage))].map(
                (_, i) => (
                  <li key={i} className="page-item">
                    <button
                      className="page-link"
                      onClick={() => setCurrentPage(i + 1)}
                    >
                      {i + 1}
                    </button>
                  </li>
                )
              )}
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Blank;
