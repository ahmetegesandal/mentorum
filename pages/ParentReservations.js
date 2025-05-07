// pages/parent-reservations.js
import { useContext, useState, useEffect } from "react";
import LayoutMenu from "../components/LayoutMenu";
import Navbar from "../components/Navbar";
import axios from "axios";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { UserContext } from "../contexts/UserContext";

const ITEMS_PER_PAGE = 8;

const ParentReservations = () => {
  const userData = useContext(UserContext);
  const { t } = useTranslation("common");
  const [reservations, setReservations] = useState([]);
  const [filteredReservations, setFilteredReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);


  if (!userData || userData.role !== "parent") {
    return <p className="text-danger text-center mt-4">Erişim Yetkiniz Yok!</p>;
  }

  useEffect(() => {
    fetchReservations();
    const interval = setInterval(fetchReservations, 5000);
    return () => clearInterval(interval);
  }, [userData]);

  const fetchReservations = async () => {
    try {
      const response = await axios.get(`/api/parent-reservations?parent_id=${userData?.id}`);

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
      console.error("Rezervasyonlar çekilirken hata oluştu:", error);
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
      `${res.student_name} ${res.teacher_name} ${res.status}`
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

  return (
    <>
      <LayoutMenu />
      <div className="layout-page">
        <Navbar />
        <div className="content-wrapper">
          <div className="container-xxl flex-grow-1 container-p-y">
            <h1 className="text-3xl font-bold mb-4">Öğrenci Rezervasyonları</h1>

            <input
              type="text"
              className="form-control mb-4"
              placeholder="Öğrenci, öğretmen veya durum ara..."
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
                    <th>Öğretmen</th>
                    <th>Ders</th>
                    <th>Tarih</th>
                    <th>Saat</th>
                    <th>Durum</th>
                  </tr>
                </thead>
                <tbody>
                  {currentReservations.map((res) => (
                    <tr key={res.id}>
                      <td>{res.student_name}</td>
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
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>Rezervasyon bulunamadı.</p>
            )}
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

export default ParentReservations;
