// /pages/tickets.js
import { useState, useEffect, useContext } from "react";
import LayoutMenu from "../components/LayoutMenu";
import Navbar from "../components/Navbar";
import { UserContext } from "../contexts/UserContext";
import axios from "axios";

const TicketsList = () => {
  const userData = useContext(UserContext);
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    if (!userData?.id) return;

    const fetchTickets = async () => {
      try {
        const response = await axios.get("/api/tickets", {
          params: { user_id: userData.id },
        });
        setTickets(response.data);
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

  return (
    <>
      <LayoutMenu />
      <div className="layout-page">
        <Navbar />
        <div className="container py-4">
          <h3 className="mb-4">Destek Taleplerim</h3>
          {tickets.length > 0 ? (
            <div className="row g-3">
              {tickets.map((ticket) => (
                <div key={ticket.id} className="col-12 col-md-6 col-lg-4">
                  <div className="card h-100">
                    <div className="card-body">
                      <h5 className="card-title">{ticket.subject}</h5>
                      <p className="card-text">{ticket.description}</p>
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
        </div>
      </div>
    </>
  );
};

export default TicketsList;
