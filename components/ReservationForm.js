import { useState, useEffect, useContext } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { UserContext } from "../contexts/UserContext";

const ReservationForm = ({ lesson }) => {
  const userData = useContext(UserContext);

  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [availableSlots, setAvailableSlots] = useState({}); // { "2024-03-10": ["10:00", "14:00"], "2024-03-11": ["09:00", "13:00"] }

  useEffect(() => {
    fetchAvailableSlots();
  }, []);

  // 📌 Öğretmenin tüm uygun gün ve saatlerini tek seferde al
  const fetchAvailableSlots = async () => {
    try {
      const response = await axios.get(
        `/api/get-available-times?teacher_id=${lesson.teacher_user_id}`
      );
      setAvailableSlots(response.data.availableSlots);
    } catch (error) {
      console.error("❌ Müsait günler ve saatler alınamadı:", error);
    }
  };

  // 📌 Rezervasyon işlemi
  const handleReservation = async () => {
    if (!userData) {
      return Swal.fire(
        "Hata!",
        "Rezervasyon yapmak için giriş yapmalısınız!",
        "error"
      );
    }
    if (!selectedDate || !selectedTime) {
      return Swal.fire("Hata!", "Lütfen bir tarih ve saat seçin!", "error");
    }

    // 📌 Tarihi düzgün formatla (YYYY-MM-DD)
    const formattedDate = new Date(selectedDate).toISOString().split("T")[0];

    console.log("📌 Gönderilen Veri:", {
      student_id: userData.id,
      lesson_id: lesson.id,
      teacher_id: lesson.teacher_user_id,
      date: formattedDate,
      time: selectedTime,
    });

    try {
      const response = await axios.post("/api/add-reservation", {
        student_id: userData.id,
        lesson_id: lesson.id,
        teacher_id: lesson.teacher_user_id,
        date: formattedDate,
        time: selectedTime,
      });

      if (response.data.success) {
        Swal.fire("Başarılı!", "Rezervasyonunuz oluşturuldu!", "success");
      } else {
        Swal.fire("Hata!", response.data.error, "error");
      }
    } catch (error) {
      console.error("❌ Rezervasyon hatası:", error.response?.data || error);
      Swal.fire("Hata!", "Rezervasyon sırasında bir hata oluştu.", "error");
    }
  };

  return (
    <div className="card p-4 mt-4">
      <h5>Ders Rezervasyonu</h5>

      {/* 📅 Tarih Seçimi */}
      <div className="mb-3">
        <label className="form-label">Müsait Günler</label>
        <select
          className="form-select"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        >
          <option value="">Gün Seçin</option>
          {Object.keys(availableSlots).map((date) => (
            <option key={date} value={date}>
              {date}
            </option>
          ))}
        </select>
      </div>

      {/* ⏰ Saat Seçimi */}
      <div className="mb-3">
        <label className="form-label">Saat Seçin</label>
        <select
          className="form-select"
          value={selectedTime}
          onChange={(e) => setSelectedTime(e.target.value)}
          disabled={!selectedDate}
        >
          <option value="">Saat Seçin</option>
          {selectedDate && availableSlots[selectedDate]?.length > 0 ? (
            availableSlots[selectedDate].map((time) => (
              <option key={time} value={time}>
                {time}
              </option>
            ))
          ) : (
            <option disabled>Müsait saat yok</option>
          )}
        </select>
      </div>

      {/* 📌 Rezervasyon Butonu */}
      {userData?.role === "student" || userData?.role === "parent" ? (
        <button
          className="btn btn-success w-100"
          onClick={handleReservation}
          disabled={!selectedTime}
        >
          📅 Rezervasyon Yap
        </button>
      ) : (
        <p className="text-muted">
          Sadece öğrenciler ve veliler rezervasyon yapabilir.
        </p>
      )}
    </div>
  );
};

export default ReservationForm;
