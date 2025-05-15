import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import LayoutMenu from "../components/LayoutMenu";
import Navbar from "../components/Navbar";
import axios from "axios";
import { UserContext } from "../contexts/UserContext";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const TicketsList = () => {
  const userData = useContext(UserContext);
  const router = useRouter();
  const [tickets, setTickets] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const ticketsPerPage = 9;
  const { t } = useTranslation("common");

  useEffect(() => {
    // Eğer kullanıcı bilgisi yüklenmemişse bekle
    if (!userData) return;

    // Eğer kullanıcı admin değilse anasayfaya yönlendir
    if (userData.role !== "admin") {
      router.push("/");
      return;
    }

    // Tüm destek taleplerini çek
    const fetchTickets = async () => {
      try {
        const response = await axios.get("/api/tickets-admin");
        setTickets(
          response.data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
        );
      } catch (error) {
        console.error("Talepler alınamadı:", error.response?.data || error.message);
      }
    };

    fetchTickets();
  }, [userData]);

  const handleRedirect = (ticketId) => {
    window.location.href = `/tickets/${ticketId}`;
  };

  const filteredTickets = tickets.filter(ticket =>
    ticket.subject.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredTickets.length / ticketsPerPage);
  const startIndex = (currentPage - 1) * ticketsPerPage;
  const currentTickets = filteredTickets.slice(startIndex, startIndex + ticketsPerPage);

  const truncateText = (text, maxLength = 30) => {
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
  };

  // Kullanıcı yetkisizse yükleme ekranı göster
  if (!userData || userData.role !== "admin") {
    return <p>Yetkisiz Erişim...</p>;
  }

  return (
    <>
      <LayoutMenu />
      <div className="layout-page">
        <Navbar />
        <div className="container py-4">
          <h3 className="mb-4">Destek Taleplerim</h3>
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Talepler arasında arayın..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          
          {currentTickets.length > 0 ? (
            <div className="row g-3">
              {currentTickets.map((ticket) => (
                <div key={ticket.id} className="col-12 col-md-6 col-lg-4">
                  <div className="card h-100">
                    <div className="card-body">
                      <h5 className="card-title">{truncateText(ticket.subject)}</h5>
                      <p className="card-text">{truncateText(ticket.description)}</p>
                      <p className="Gönderen">Gönderen Kişi:{ticket.username}</p>
                      <p className="GönderenID">Gönderen ID:{ticket.user_id}</p>
                      <button
                        onClick={() => handleRedirect(ticket.id)}
                        className="btn btn-primary"
                      >
                        Detayları Gör
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted">
              Şu anda herhangi bir destek talebiniz bulunmamaktadır.
            </p>
          )}

          {totalPages > 1 && (
            <div className="d-flex justify-content-center mt-4">
              <button
                className="btn btn-outline-primary me-2"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
              >
                ← Önceki
              </button>

              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index}
                  className={`btn btn-outline-secondary mx-1 ${currentPage === index + 1 ? "active" : ""}`}
                  onClick={() => setCurrentPage(index + 1)}
                >
                  {index + 1}
                </button>
              ))}

              <button
                className="btn btn-outline-primary ms-2"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(currentPage + 1)}
              >
                Sonraki →
              </button>
            </div>
          )}
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

export default TicketsList;
