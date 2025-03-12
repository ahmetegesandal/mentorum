import { useState, useContext } from "react";
import Swal from "sweetalert2";
import { UserContext } from "../contexts/UserContext";

const CalendarModal = ({ onUpdate }) => {
  const userData = useContext(UserContext);
  const [formData, setFormData] = useState({
    date: "",
    time: "",
    is_available: 1,
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userData?.id) {
      Swal.fire("Hata!", "Kullanıcı ID bulunamadı!", "error");
      return;
    }

    const dataToSend = {
      teacher_id: userData.id, // Kullanıcı ID ekleniyor
      date: formData.date,
      time: formData.time,
      is_available: formData.is_available,
    };

    try {
      const res = await fetch("/api/addCalendarEntry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSend),
      });

      if (res.ok) {
        Swal.fire("Başarılı!", "Takvim kaydı eklendi.", "success");

        // Modalı kapat
        document.getElementById("closeModal").click();

        // Formu temizle
        setFormData({ date: "", time: "", is_available: 1 });

        // Takvim listesini güncelle
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
              <h4 className="modal-title">Yeni Takvim Kaydı</h4>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="modal-body">
                <input
                  type="date"
                  name="date"
                  className="form-control mb-2"
                  value={formData.date}
                  onChange={handleChange}
                  required
                />
                <input
                  type="time"
                  name="time"
                  className="form-control mb-2"
                  value={formData.time}
                  onChange={handleChange}
                  required
                />
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
