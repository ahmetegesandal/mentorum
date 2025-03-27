import React from "react";

const UpcomingEvents = ({ upcomingItems }) => {
  return (
    <div className="col-12">
      <div className="card mt-4">
        <div className="card-header">
          <h5 className="mb-0">Yaklaşan Etkinlikler</h5>
        </div>
        <div className="card-body">
          <div className="row g-4">
            {upcomingItems.length === 0 ? (
              <p className="text-muted text-center">Yaklaşan etkinlik yok.</p>
            ) : (
              upcomingItems.map((item, i) => (
                <div className="col-md-4" key={i}>
                  <div className="card h-100 border shadow-sm">
                    <div className="card-body">
                      <h6 className="fw-bold mb-1">{item.title}</h6>
                      <p className="mb-1">
                        📅 {item.date} <br /> 🕓 {item.time}
                      </p>
                      <span className="badge bg-label-info">{item.type}</span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpcomingEvents;
