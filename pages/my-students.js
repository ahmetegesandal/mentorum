import { useEffect, useState, useContext } from "react";
import Swal from "sweetalert2"; // npm install sweetalert2
import LayoutMenu from "../components/LayoutMenu";
import Navbar from "../components/Navbar";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { UserContext } from "../contexts/UserContext";

const MyStudents = () => {
  const { t } = useTranslation("common");
  const [students, setStudents] = useState([]);
  const userData = useContext(UserContext);

  if (!userData || userData.role !== "parent") {
    return <p>Erişim Yetkiniz Yok!</p>;
  }

  useEffect(() => {
    fetchStudents();
  }, [userData]);

  const fetchStudents = () => {
    if (!userData?.id) return;

    fetch(`/api/students?userId=${userData.id}`)
      .then((res) => res.json())
      .then((data) => setStudents(data))
      .catch((err) => console.error("Error fetching students:", err));
  };

  const handleAddStudent = async () => {
    const { value: formValues } = await Swal.fire({
      title: "Yeni Öğrenci Ekle",
      html: `
        <input id="swal-name" class="swal2-input" placeholder="Ad">
        <input id="swal-surname" class="swal2-input" placeholder="Soyad">
        <input id="swal-username" class="swal2-input" placeholder="Kullanıcı Adı">
        <input id="swal-grade" class="swal2-input" placeholder="Sınıf">
        <input id="swal-photo" class="swal2-input" placeholder="Fotoğraf (Opsiyonel)">
      `,
      focusConfirm: false,
      preConfirm: () => ({
        name: document.getElementById("swal-name").value,
        surname: document.getElementById("swal-surname").value,
        username: document.getElementById("swal-username").value,
        grade: document.getElementById("swal-grade").value,
        photo: document.getElementById("swal-photo").value || "default.png",
      }),
      showCancelButton: true,
      confirmButtonText: "Ekle",
      cancelButtonText: "İptal",
    });

    if (
      !formValues ||
      !formValues.name ||
      !formValues.surname ||
      !formValues.username ||
      !formValues.grade
    ) {
      return Swal.fire("Hata!", "Tüm alanları doldurun.", "error");
    }

    try {
      const response = await fetch("/api/add-student", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formValues, parent_id: userData.id }),
      });

      const result = await response.json();
      if (response.ok) {
        Swal.fire("Başarılı!", "Öğrenci başarıyla eklendi!", "success");
        fetchStudents();
      } else {
        Swal.fire("Hata!", result.error, "error");
      }
    } catch (error) {
      console.error("Öğrenci ekleme hatası:", error);
      Swal.fire("Hata!", "Öğrenci eklenirken bir hata oluştu.", "error");
    }
  };

  return (
    <>
      <LayoutMenu />
      <div className="layout-page">
        <Navbar />
        <div className="content-wrapper container mt-4">
          <div className="d-flex justify-content-between mb-3">
            <h3>{t("students")}</h3>
            {userData?.role === "parent" && (
              <button className="btn btn-primary" onClick={handleAddStudent}>
                + Öğrenci Ekle
              </button>
            )}
          </div>
          <div className="row g-4">
            {students.length > 0 ? (
              students.map((student) => (
                <div key={student.student_id} className="col-md-6 col-lg-4">
                  <div className="card shadow-sm p-3">
                    <div className="text-center">
                      <img
                        src={`/img/avatars/${student.photo}`}
                        alt={student.name}
                        className="rounded-circle mb-3"
                        width="80"
                        height="80"
                      />
                    </div>
                    <div className="card-body text-center">
                      <h5 className="card-title fw-bold">
                        {student.name} {student.surname}
                      </h5>
                      <p className="text-muted">@{student.username}</p>
                      <p className="text-secondary">Sınıf: {student.grade}</p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-muted">Öğrenci bulunamadı.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}

export default MyStudents;
