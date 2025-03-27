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
  const [isManagedByParent, setIsManagedByParent] = useState(false);

  useEffect(() => {
    checkParentManagement();
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

  const checkParentManagement = async () => {
    try {
      const response = await axios.get(
        `/api/check-parent-management?user_id=${userData?.id}`
      );
      setIsManagedByParent(response.data.isManagedByParent);
    } catch (error) {
      console.error("❌ Veli yönetim kontrolü hatası:", error);
    }
  };

  const fetchAvailableSlots = async () => {
    try {
      const response = await axios.get(
        `/api/get-available-times?teacher_id=${lesson?.teacher_user_id}`
      );

      const formattedSlots = {};
      Object.keys(response.data.availableSlots).forEach((isoDate) => {
        const dateObj = new Date(isoDate); // ISO formatındaki tarihi Date objesine dönüştür
        const formattedDate = dateObj.toLocaleDateString("tr-TR", {
          day: "2-digit",
          month: "long",
          year: "numeric",
        });

        formattedSlots[formattedDate] = response.data.availableSlots[isoDate];
      });

      setAvailableSlots(formattedSlots);
    } catch (error) {
      console.error("❌ Müsait günler ve saatler alınamadı:", error);
    }
  };

  const fetchStudents = async () => {
    try {
      const response = await axios.get(
        `/api/get-parent-students?parent_id=${userData?.id}`
      );
      setStudents(response.data);
    } catch (error) {
      console.error("❌ Öğrenci bilgileri alınamadı:", error);
    }
  };

  const fetchReservations = async () => {
    try {
      console.log("📌 Rezervasyonlar alınıyor...");
      const response = await axios.get(
        `/api/get-reservations?teacher_id=${lesson?.teacher_user_id}`
      );

      const disabledTimeSet = new Set();
      console.log("📌 API yanıtı:", response.data);

      response.data.forEach((reservation) => {
        const reservationDate = new Date(reservation.date);
        const localDate = reservationDate.toLocaleDateString("tr-TR", {
          day: "2-digit",
          month: "long",
          year: "numeric",
        });
        const localTime = formatTime(reservation.time); // Zamanı formatla
        const endTime = calculateEndTime(localTime); // End time'ı hesapla

        console.log(
          `📌 API'den gelen rezervasyon: ${localDate} ${localTime} - ${endTime}`
        );

        // Burada fullTimeRange'i oluştururken tarih ve saatlerin formatlarının uyumlu olduğuna dikkat edin
        const fullTimeRange = `${localDate}_${localTime} - ${endTime}`;
        if (
          reservation.status === "pending" ||
          reservation.status === "approved"
        ) {
          console.log(`📌 Engellenen zaman aralığı: ${fullTimeRange}`);
          disabledTimeSet.add(fullTimeRange);
        }
      });

      setDisabledTimes(disabledTimeSet);
      console.log("📌 Engellenmiş saatler:", disabledTimeSet);
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

    const parsedDate = parseDateString(selectedDate);
    if (!parsedDate) {
      return Swal.fire("Hata!", "Geçersiz tarih formatı!", "error");
    }

    // ✅ Fix: Save the date correctly (No UTC conversion)
    const localDate = `${parsedDate.getFullYear()}-${String(
      parsedDate.getMonth() + 1
    ).padStart(2, "0")}-${String(parsedDate.getDate()).padStart(2, "0")}`;

    const studentUserId =
      userData.role === "parent" && selectedStudent
        ? Number(selectedStudent)
        : userData.id;

    try {
      const response = await axios.post("/api/add-reservation", {
        student_id: studentUserId,
        lesson_id: lesson.id,
        teacher_id: lesson.teacher_user_id,
        date: localDate, // ✅ Fix: Save correct local date
        time: selectedTime,
      });

      if (response.data.success) {
        Swal.fire("Başarılı!", "Rezervasyonunuz oluşturuldu!", "success");
        setSelectedDate("");
        setSelectedTime("");
        setSelectedStudent(null);
      } else {
        Swal.fire("Hata!", response.data.error, "error");
      }
    } catch (error) {
      console.error("❌ Rezervasyon hatası:", error.response?.data || error);
      Swal.fire("Hata!", "Rezervasyon sırasında bir hata oluştu.", "error");
    }
  };

  return (
    <>
      <h5>Ders Rezervasyonu</h5>
      {isManagedByParent ? (
        <div className="alert alert-warning">
          📢 Rezervasyon işlemleri veliniz tarafından yönetilmektedir.
        </div>
      ) : userData?.role === "teacher" ? (
        <div className="alert alert-danger">
          ❌ Öğretmen olarak rezervasyon yapamazsınız.
        </div>
      ) : (
        <>
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
                  const formattedTime = formatTime(time);
                  const endTime = calculateEndTime(formattedTime); // ✅ Fix: Show `endTime`
                  const fullTimeRange = `${selectedDate}_${formattedTime} - ${endTime}`;

                  console.log(
                    `📌 Seçilen zaman dilimi: ${formattedTime} - ${endTime}`
                  );
                  console.log(
                    `📌 Engellenmiş saatler seti: ${[...disabledTimes]}`
                  );

                  const isDisabled = disabledTimes.has(fullTimeRange);
                  console.log(
                    `📌 Zaman dilimi ${fullTimeRange} ${
                      isDisabled ? "dolu" : "boş"
                    }`
                  );

                  return (
                    <option
                      key={time}
                      value={formattedTime}
                      disabled={isDisabled}
                    >
                      {formattedTime} - {endTime} {isDisabled ? "(Dolu)" : ""}
                    </option>
                  );
                })
              ) : (
                <option disabled>Müsait saat yok</option>
              )}
            </select>
          </div>

          <button
            className="btn btn-success w-100"
            onClick={handleReservation}
            disabled={!selectedTime}
          >
            📅 Rezervasyon Yap
          </button>
        </>
      )}
    </>
  );
};

// 📌 Helper Function: Parse Turkish date format
const parseDateString = (dateStr) => {
  const parts = dateStr.split(" ");
  if (parts.length !== 3) return null;

  const [day, monthName, year] = parts;
  const months = [
    "Ocak",
    "Şubat",
    "Mart",
    "Nisan",
    "Mayıs",
    "Haziran",
    "Temmuz",
    "Ağustos",
    "Eylül",
    "Ekim",
    "Kasım",
    "Aralık",
  ];

  const month = months.indexOf(monthName);
  if (month === -1) return null;

  return new Date(year, month, day);
};

// 📌 Helper Function: Format time (remove seconds)
// 📌 Helper Function: Format time (remove seconds)
const formatTime = (time) => time.split(":").slice(0, 2).join(":");

// 📌 Helper Function: Add +1 hour to time
const calculateEndTime = (time) => {
  const [hours, minutes] = time.split(":").map(Number);
  return `${String((hours + 1) % 24).padStart(2, "0")}:${String(
    minutes
  ).padStart(2, "0")}`;
};

export default ReservationForm;
