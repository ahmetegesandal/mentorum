import { useState, useContext } from "react";
import Swal from "sweetalert2";
import { UserContext } from "../contexts/UserContext";

const isDateInThePast = (dateString, timeString) => {
  const selectedDate = new Date(dateString + "T" + timeString);
  const currentDate = new Date();
  return selectedDate < currentDate;
};

const CalendarModal = ({ onUpdate }) => {
  const userData = useContext(UserContext);
  const [entries, setEntries] = useState([
    { date: "", time: "", is_available: 1 },
  ]);

  const handleChange = (index, e) => {
    const updated = [...entries];
    updated[index][e.target.name] = e.target.value;
    setEntries(updated);
  };

  const addEntry = () => {
    setEntries([...entries, { date: "", time: "", is_available: 1 }]);
  };

  const removeEntry = (index) => {
    if (entries.length === 1) return; // en az bir kayıt kalmalı
    const updated = [...entries];
    updated.splice(index, 1);
    setEntries(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userData?.id) {
      Swal.fire("Hata!", "Kullanıcı ID bulunamadı!", "error");
      return;
    }

    for (let entry of entries) {
      if (isDateInThePast(entry.date, entry.time)) {
        Swal.fire(
          "Hata!",
          "Geçmiş tarih veya saat için kayıt ekleyemezsiniz!",
          "error"
        );
        return;
      }
    }

    const dataToSend = entries.map((entry) => ({
      teacher_id: userData.id,
      date: entry.date,
      time: entry.time,
      is_available: entry.is_available,
    }));

    try {
      const res = await fetch("/api/addCalendarEntryBulk", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ entries: dataToSend }),
      });

      if (res.ok) {
        Swal.fire("Başarılı!", "Takvim kayıtları eklendi.", "success");
        document.getElementById("closeModal").click();
        setEntries([{ date: "", time: "", is_available: 1 }]);
        onUpdate();
      } else {
        Swal.fire("Hata!", "Kayıt eklenemedi.", "error");
      }
    } catch (error) {
      Swal.fire("Hata!", "Sunucu hatası oluştu.", "error");
    }
  };

  return (
    <>
      <button
        className="btn btn-success"
        data-bs-toggle="modal"
        data-bs-target="#calendarModal"
      >
        Yeni Kayıt Ekle
      </button>

      <div className="modal fade" id="calendarModal" tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content p-3">
            <div className="modal-header">
              <h4 className="modal-title">Yeni Takvim Kayıtları</h4>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>

            <div className="modal-header">
              <p>
                Dikkat yeni takvim kaydı eklerken müsait olduğunuz bir saati
                seçmelisiniz, sistem üstüne otomatik olarak +1 saat eklemekte
                buna göre kayıtlarınızı yapmanızı tavsiye ederiz.
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="modal-body">
                {entries.map((entry, index) => (
                  <div key={index} className="mb-3 border rounded p-3">
                    <div className="row g-2 align-items-end">
                      <div className="col-md-5">
                        <input
                          type="date"
                          name="date"
                          className="form-control"
                          value={entry.date}
                          onChange={(e) => handleChange(index, e)}
                          required
                        />
                      </div>
                      <div className="col-md-5">
                        <input
                          type="time"
                          name="time"
                          className="form-control"
                          value={entry.time}
                          onChange={(e) => handleChange(index, e)}
                          required
                        />
                      </div>
                      <div className="col-md-2">
                        {entries.length > 1 && (
                          <button
                            type="button"
                            className="btn btn-outline-danger w-100"
                            onClick={() => removeEntry(index)}
                          >
                            Sil
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                <button
                  type="button"
                  className="btn btn-outline-secondary w-100"
                  onClick={addEntry}
                >
                  + Yeni Satır Ekle
                </button>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                  id="closeModal"
                >
                  Kapat
                </button>
                <button type="submit" className="btn btn-primary">
                  Ekle
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default CalendarModal;
