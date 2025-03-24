import { useState, useEffect, useContext } from "react";
import LayoutMenu from "../components/LayoutMenu";
import Navbar from "../components/Navbar";
import { UserContext } from "../contexts/UserContext";
import RichTextEditor from "../components/RichTextEditor";
import axios from "axios";

const TicketsList = () => {
  const userData = useContext(UserContext);
  const [tickets, setTickets] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const ticketsPerPage = 9; // Maksimum gösterilecek talep sayısı

  useEffect(() => {
    if (!userData?.id) return;

    const fetchTickets = async () => {
      try {
        const response = await axios.get("/api/tickets", {
          params: { user_id: userData.id },
        });
        setTickets(
          response.data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
        );
      } catch (error) {
        console.error(
          "Talepler alınamadı:",
          error.response?.data || error.message
        );
      }
    };

    fetchTickets();
  }, [userData?.id]);

  const handleRedirect = (ticketId) => {
    window.location.href = `/tickets/${ticketId}`;
  };

  // Arama sorgusuna göre filtreleme
  const filteredTickets = tickets.filter(ticket =>
    ticket.subject.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Sayfalandırma için hesaplamalar
  const totalPages = Math.ceil(filteredTickets.length / ticketsPerPage);
  const startIndex = (currentPage - 1) * ticketsPerPage;
  const currentTickets = filteredTickets.slice(startIndex, startIndex + ticketsPerPage);
  const truncateText = (text, maxLength = 30) => {
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
  };

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

          {/* Sayfalandırma Butonları */}
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

export default TicketsList;
