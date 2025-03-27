import React from "react";

const formatDateTR = (isoDateString) => {
  try {
    const dateObj = new Date(isoDateString);
    return new Intl.DateTimeFormat("tr-TR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      timeZone: "Europe/Istanbul",
    }).format(dateObj);
  } catch (e) {
    return isoDateString;
  }
};

const formatTimeRange = (timeString) => {
  try {
    const [h, m] = timeString.split(":").map(Number);
    const start = `${h.toString().padStart(2, "0")}:${m
      .toString()
      .padStart(2, "0")}`;
    const endHour = ((h + 1) % 24).toString().padStart(2, "0");
    const end = `${endHour}:${m.toString().padStart(2, "0")}`;
    return `${start} - ${end}`;
  } catch {
    return timeString;
  }
};

const badgeColor = (type) => {
  switch (type) {
    case "Canlı Ders":
      return "bg-label-success";
    case "Rezervasyon":
      return "bg-label-warning";
    case "Sınav":
      return "bg-label-danger";
    default:
      return "bg-label-info";
  }
};

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
                        📅 {formatDateTR(item.date)} <br /> 🕓{" "}
                        {formatTimeRange(item.time)}
                      </p>
                      <span className={`badge ${badgeColor(item.type)}`}>
                        {item.type}
                      </span>
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
