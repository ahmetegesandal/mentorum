import React, { useEffect, useState } from "react";

const DashboardCards = ({ userId, role }) => {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const fetchStats = async () => {
      if (!userId || !role) return;
      try {
        const res = await fetch(
          `/api/dashboardStats?userId=${userId}&role=${role}`
        );
        const data = await res.json();
        setCards(data.stats || []);
      } catch (err) {
        console.error("Dashboard kart verileri alınamadı:", err);
      }
    };
    fetchStats();
  }, [userId, role]);

  return (
    <div className="row g-4">
      {cards.map((card, index) => (
        <div key={index} className="col-lg-3 col-md-6">
          <div className="card h-100 text-center">
            <div className="card-body">
              <div className="badge rounded p-2 bg-label-primary mb-2">
                <i className={card.icon + " ti-lg"}></i>
              </div>
              <h5 className="card-title mb-1">{card.value}</h5>
              <p className="mb-0">{card.title}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardCards;
