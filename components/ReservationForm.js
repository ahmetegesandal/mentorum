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
  const [disabledTimes, setDisabledTimes] = useState(new Set()); // ✅ Eklenen kod

  useEffect(() => {
    fetchAvailableSlots();
    if (userData?.role === "parent") {
      fetchStudents();
    }
  }, []);

  // 📌 Öğretmenin uygun saatlerini al
  const fetchAvailableSlots = async () => {
    try {
      const response = await axios.get(
        `/api/get-available-times?teacher_id=${lesson.teacher_user_id}`
      );

      const formattedSlots = {};
      const disabledTimeSet = new Set(); // ✅ Geçici olarak Set oluşturduk

      // 📌 Onaylanmış veya bekleyen rezervasyonları çek
      const reservationsResponse = await axios.get(
        `/api/get-reservations?teacher_id=${lesson.teacher_user_id}`
      );

      console.log(
        "📌 API'den dönen rezervasyonlar:",
        reservationsResponse.data
      ); // ✅ Rezervasyonlar geliyor mu?

      reservationsResponse.data.forEach((res) => {
        const formattedDate = new Date(res.date).toISOString().split("T")[0]; // 🔥 API tarih formatını düzeltiyoruz!
        console.log(`🛑 Disabled Time Ekleniyor: ${formattedDate}_${res.time}`);
        if (res.status === "pending" || res.status === "approved") {
          disabledTimeSet.add(`${formattedDate}_${res.time}`);
        }
      });

      console.log("📌 İşlenen disabledTimeSet:", disabledTimeSet); // ✅ Disabled saatler burada olmalı

      Object.keys(response.data.availableSlots).forEach((isoDate) => {
        const dateObj = new Date(isoDate);
        const formattedDate = dateObj.toLocaleDateString("tr-TR", {
          day: "2-digit",
          month: "long",
          year: "numeric",
        });

        formattedSlots[formattedDate] = response.data.availableSlots[isoDate]
          .map((timeRange) => {
            const times = timeRange.split(" - ");
            const startTime = times[0].slice(0, 5);
            const endTime = times[1]?.slice(0, 5) || "";
            return `${startTime} - ${endTime}`;
          })
          .filter((time) => !disabledTimeSet.has(`${isoDate}_${time}`)); // ✅ Disabled saatleri filtreledik
      });

      console.log("📌 Final Available Slots:", formattedSlots); // ✅ Güncellenen saatler doğru geliyor mu?

      setDisabledTimes(disabledTimeSet); // ✅ State'e atandı
      setAvailableSlots(formattedSlots);
    } catch (error) {
      console.error("❌ Müsait günler ve saatler alınamadı:", error);
    }
  };

  // 📌 Veliye bağlı öğrencileri getir
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

  // 📌 Rezervasyon işlemi
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

    // 📌 Seçilen tarihi formatla
    const originalDate = Object.keys(availableSlots).find(
      (isoDate) => availableSlots[isoDate] === availableSlots[selectedDate]
    );
    const formattedDate = new Date(originalDate).toISOString().split("T")[0];

    // 📌 Eğer veli ise ve öğrenci seçildiyse, öğrencinin `user_id` kullanılmalı
    const studentUserId =
      userData.role === "parent" && selectedStudent
        ? Number(selectedStudent) // ✅ Seçilen öğrencinin `user_id`si kullanılmalı
        : userData.id; // ✅ Veli kendi adına işlem yapıyorsa kendi `user_id`si

    console.log("📌 Gönderilen Veri:", {
      student_id: studentUserId, // ✅ Artık doğru `user_id` gidiyor
      lesson_id: lesson.id,
      teacher_id: lesson.teacher_user_id,
      date: formattedDate,
      time: selectedTime,
    });

    try {
      const response = await axios.post("/api/add-reservation", {
        student_id: studentUserId, // ✅ `user_id` kullanılıyor
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

      {/* 📌 Veli için öğrenci seçimi */}
      {userData?.role === "parent" && students.length > 0 && (
        <div className="mb-3">
          <label className="form-label">Rezervasyon Kimin Adına?</label>
          <select
            className="form-select"
            value={selectedStudent}
            onChange={(e) => setSelectedStudent(e.target.value)}
          >
            <option value="">Kendi Adıma</option>{" "}
            {/* ✅ Veli kendi adına işlem yapabilir */}
            {students.map((student) => (
              <option key={student.user_id} value={student.user_id}>
                {student.name} {student.surname}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* 📅 Tarih Seçimi */}
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
            availableSlots[selectedDate].map((time) => {
              const formattedDate = new Date(selectedDate)
                .toISOString()
                .split("T")[0]; // ✅ Tarihi `disabledTimes` ile aynı formata getiriyoruz.
              const isDisabled = disabledTimes.has(`${formattedDate}_${time}`);

              console.log(
                `🔍 Kontrol: ${formattedDate}_${time}, Disabled: ${isDisabled}`
              ); // ✅ Test için ekleme

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
