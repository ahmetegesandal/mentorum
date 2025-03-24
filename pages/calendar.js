import { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import LayoutMenu from "../components/LayoutMenu";
import Navbar from "../components/Navbar";
import { UserContext } from "../contexts/UserContext";
import { useTranslation } from "next-i18next";
import CalendarModal from "../components/CalendarModal";

const Calendar = () => {
  const { t } = useTranslation("common");
  const userData = useContext(UserContext);
  const [calendarEntries, setCalendarEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedEntries, setSelectedEntries] = useState([]);

  const itemsPerPage = 10;

  if (!userData || userData?.role !== "teacher") {
    return <p className="text-danger text-center mt-4">Erişim Yetkiniz Yok!</p>;
  }

  const toggleSelection = (id) => {
    setSelectedEntries((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  useEffect(() => {
    if (userData?.id) {
      fetchCalendar();
      const interval = setInterval(fetchCalendar, 30000);
      return () => clearInterval(interval);
    }
  }, [userData]);

  const fetchCalendar = async () => {
    try {
      const response = await fetch(
        `/api/getUserCalendar?userId=${userData?.id}`
      );
      let data = await response.json();
      data.sort((a, b) => new Date(b.date) - new Date(a.date));
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
            fetchCalendar();
          } else {
            Swal.fire("Hata!", data.message, "error");
          }
        } catch (error) {
          Swal.fire("Hata!", "Sunucu hatası oluştu.", "error");
        }
      }
    });
  };

  const handleBulkDelete = async () => {
    if (selectedEntries.length === 0) return;
    Swal.fire({
      title: "Seçilen kayıtlar silinsin mi?",
      text: "Bu işlem geri alınamaz!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Evet, sil!",
      cancelButtonText: "İptal",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await fetch("/api/deleteCalendarEntries", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ids: selectedEntries }),
          });
          const data = await res.json();
          if (res.ok) {
            Swal.fire("Silindi!", data.message, "success");
            setSelectedEntries([]);
            fetchCalendar();
          } else {
            Swal.fire("Hata!", data.message, "error");
          }
        } catch (error) {
          Swal.fire("Hata!", "Sunucu hatası oluştu.", "error");
        }
      }
    });
  };

  const formatDate = (dateString) => {
    const dateObj = new Date(dateString);
    return new Intl.DateTimeFormat("tr-TR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(dateObj);
  };

  const formatTime = (timeString) => {
    const [hours, minutes] = timeString.split(":").map(Number);
    const nextHour = hours + 1;
    return (
      `${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}` +
      ` - ${nextHour.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}`
    );
  };

  const filteredEntries = calendarEntries.filter((entry) => {
    const formattedDate = formatDate(entry.date);
    return formattedDate.includes(searchTerm);
  });

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

          <div className="d-flex justify-content-between mb-3 align-items-center">
            <input
              type="text"
              className="form-control w-50"
              placeholder="Tarih ara (DD.MM.YYYY)..."
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="d-flex gap-2">
              {selectedEntries.length > 0 && (
                <button className="btn btn-danger" onClick={handleBulkDelete}>
                  Seçilenleri Sil ({selectedEntries.length})
                </button>
              )}
              <CalendarModal onUpdate={fetchCalendar} />
            </div>
          </div>

          {loading ? (
            <p className="text-center">Yükleniyor...</p>
          ) : calendarEntries.length === 0 ? (
            <p className="alert alert-warning text-center">
              Henüz takvim kaydınız yok!
            </p>
          ) : (
            <div className="table-responsive">
              <table className="table table-bordered">
                <thead className="table-light">
                  <tr>
                    <th style={{ width: "40px" }}>
                      <input
                        className="form-check-input"
                        type="checkbox"
                        checked={
                          selectedEntries.length === currentEntries.length &&
                          currentEntries.length > 0
                        }
                        onChange={(e) =>
                          setSelectedEntries(
                            e.target.checked
                              ? currentEntries.map((entry) => entry.id)
                              : []
                          )
                        }
                      />
                    </th>
                    <th>Tarih</th>
                    <th>Saat</th>
                    <th>İşlem</th>
                  </tr>
                </thead>
                <tbody>
                  {currentEntries.map((entry) => (
                    <tr key={entry.id}>
                      <td>
                        <input
                          type="checkbox"
                          checked={selectedEntries.includes(entry.id)}
                          onChange={() => toggleSelection(entry.id)}
                          className="form-check-input"
                        />
                      </td>
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
            </div>
          )}

          <nav>
            <ul className="pagination justify-content-center">
              {[...Array(Math.ceil(filteredEntries.length / itemsPerPage))].map(
                (_, i) => (
                  <li
                    key={i}
                    className={`page-item ${
                      currentPage === i + 1 ? "active" : ""
                    }`}
                  >
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

export default Calendar;
