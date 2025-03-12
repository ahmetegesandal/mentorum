import { useState, useEffect, useContext } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { UserContext } from "../contexts/UserContext";

const ReservationForm = ({ lesson }) => {
  const userData = useContext(UserContext);

  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [availableSlots, setAvailableSlots] = useState({});
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [disabledTimes, setDisabledTimes] = useState(new Set());

  useEffect(() => {
    fetchAvailableSlots();
    if (userData?.role === "parent") {
      fetchStudents();
    }
  }, []);

  useEffect(() => {
    if (selectedDate) {
      fetchReservations();
    }
  }, [selectedDate]);

  const fetchAvailableSlots = async () => {
    try {
      const response = await axios.get(
        `/api/get-available-times?teacher_id=${lesson.teacher_user_id}`
      );

      const formattedSlots = {};
      Object.keys(response.data.availableSlots).forEach((isoDate) => {
        const dateObj = new Date(isoDate);
        const formattedDate = dateObj.toLocaleDateString("tr-TR", {
          day: "2-digit",
          month: "long",
          year: "numeric",
        });

        formattedSlots[formattedDate] = response.data.availableSlots[
          isoDate
        ].map((timeRange) => {
          const times = timeRange.split(" - ");
          const startTime = times[0].slice(0, 5);
          const endTime = times[1]?.slice(0, 5) || "";
          return `${startTime} - ${endTime}`;
        });
      });

      setAvailableSlots(formattedSlots);
    } catch (error) {
      console.error("❌ Müsait günler ve saatler alınamadı:", error);
    }
  };

  const fetchStudents = async () => {
    try {
      const response = await axios.get(
        `/api/get-parent-students?parent_id=${userData.id}`
      );
      setStudents(response.data);
    } catch (error) {
      console.error("❌ Öğrenci bilgileri alınamadı:", error);
    }
  };

  const fetchReservations = async () => {
    try {
      const response = await axios.get(
        `/api/get-reservations?teacher_id=${lesson.teacher_user_id}`
      );

      const disabledTimeSet = new Set();

      response.data.forEach((reservation) => {
        const reservationDate = new Date(reservation.date);
        const localDate = reservationDate.toLocaleDateString("tr-TR"); // Yerel tarih
        const localTime = reservationDate.toLocaleTimeString("tr-TR", {
          hour: "2-digit",
          minute: "2-digit",
        });

        // API'den gelen saat formatını 'HH:00 - HH:00' formatına çevir
        const startTime = localTime;
        const endTime = `${parseInt(localTime.split(":")[0]) + 1}:00`; // 1 saat ekle
        const timeRange = `${startTime} - ${endTime}`;

        console.log(
          `📌 API'den gelen rezervasyon saati: ${localDate} ${timeRange}`
        );

        if (
          reservation.status === "pending" ||
          reservation.status === "approved"
        ) {
          // Rezervasyonun tarih ve saati, availableSlots formatı ile uyumlu olacak şekilde disabledTimeSet'e ekleyin
          disabledTimeSet.add(`${localDate}_${startTime} - ${endTime}`);
        }
      });

      setDisabledTimes(disabledTimeSet);
      console.log("📌 Disabled saatler:", disabledTimeSet);
    } catch (error) {
      console.error("❌ Rezervasyonlar alınamadı:", error);
    }
  };

  const handleReservation = async () => {
    if (!userData) {
      return Swal.fire(
        "Hata!",
        "Rezervasyon için giriş yapmalısınız!",
        "error"
      );
    }
    if (!selectedDate || !selectedTime) {
      return Swal.fire("Hata!", "Lütfen bir tarih ve saat seçin!", "error");
    }

    console.log(
      `📌 Rezervasyon yapılacak tarih: ${selectedDate}, saat: ${selectedTime}`
    );

    const formattedDate = new Date(selectedDate);
    const utcDate = new Date(
      Date.UTC(
        formattedDate.getFullYear(),
        formattedDate.getMonth(),
        formattedDate.getDate(),
        0,
        0,
        0
      )
    )
      .toISOString()
      .split("T")[0];

    const studentUserId =
      userData.role === "parent" && selectedStudent
        ? Number(selectedStudent)
        : userData.id;

    try {
      const response = await axios.post("/api/add-reservation", {
        student_id: studentUserId,
        lesson_id: lesson.id,
        teacher_id: lesson.teacher_user_id,
        date: utcDate,
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

      {userData?.role === "parent" && students.length > 0 && (
        <div className="mb-3">
          <label className="form-label">Rezervasyon Kimin Adına?</label>
          <select
            className="form-select"
            value={selectedStudent}
            onChange={(e) => setSelectedStudent(e.target.value)}
          >
            <option value="">Kendi Adıma</option>
            {students.map((student) => (
              <option key={student.user_id} value={student.user_id}>
                {student.name} {student.surname}
              </option>
            ))}
          </select>
        </div>
      )}

      <div className="mb-3">
        <label className="form-label">Müsait Günler</label>
        <select
          className="form-select"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        >
          <option value="">Gün Seçin</option>
          {Object.keys(availableSlots).map((formattedDate) => (
            <option key={formattedDate} value={formattedDate}>
              {formattedDate}
            </option>
          ))}
        </select>
      </div>

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
            availableSlots[selectedDate].map((time) => {
              const formattedDate = new Date(selectedDate)
                .toISOString()
                .split("T")[0];
              const isDisabled = disabledTimes.has(`${formattedDate}_${time}`);

              console.log(
                `📌 Kontrol edilen saat: ${formattedDate}_${time}, Disabled: ${isDisabled}`
              );

              return (
                <option key={time} value={time} disabled={isDisabled}>
                  {time} {isDisabled ? "(Dolu)" : ""}
                </option>
              );
            })
          ) : (
            <option disabled>Müsait saat yok</option>
          )}
        </select>
      </div>

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
