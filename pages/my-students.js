import { useEffect, useState, useContext } from "react";
import LayoutMenu from "../components/LayoutMenu";
import Navbar from "../components/Navbar";
import { UserContext } from "../contexts/UserContext";
import Swal from "sweetalert2";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const MyStudents = () => {
  const { t } = useTranslation("common");
  const [students, setStudents] = useState([]);
  const userData = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [newStudent, setNewStudent] = useState({
    name: "",
    surname: "",
    username: "",
    email: "",
    password: "",
    grade: "",
    photo: null,
  });

  if (!userData || userData.role !== "parent") {
    return <p className="text-danger text-center mt-4">Erişim Yetkiniz Yok!</p>;
  }

  useEffect(() => {
    fetchStudents();
  }, [userData]);

  const fetchStudents = async () => {
    try {
      const res = await fetch(`/api/students?userId=${userData.id}`);
      const data = await res.json();
      setStudents(data);
    } catch (err) {
      console.error("Error fetching students:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    setNewStudent({ ...newStudent, photo: e.target.files[0] });
  };

  const handleAddStudent = async () => {
    if (
      !newStudent.name ||
      !newStudent.surname ||
      !newStudent.username ||
      !newStudent.email ||
      !newStudent.grade
    ) {
      return Swal.fire("Hata!", "Tüm alanları doldurun!", "error");
    }

    const formData = new FormData();
    formData.append("name", newStudent.name);
    formData.append("surname", newStudent.surname);
    formData.append("username", newStudent.username);
    formData.append("email", newStudent.email);
    formData.append("password", newStudent.password || "123456"); // Varsayılan şifre
    formData.append("grade", newStudent.grade);
    formData.append("parent_id", userData.id);

    if (newStudent.photo) {
      formData.append("photo", newStudent.photo);
    }

    try {
      const response = await fetch("/api/add-student", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      if (response.ok) {
        Swal.fire("Başarılı!", "Öğrenci başarıyla eklendi!", "success");
        setShowModal(false);
        setNewStudent({
          name: "",
          surname: "",
          username: "",
          email: "",
          password: "",
          grade: "",
          photo: null,
        });
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
        <div className="container mt-4">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h3 className="fw-bold">Öğrencilerim</h3>
            {userData?.role === "parent" && (
              <button
                className="btn btn-primary"
                onClick={() => setShowModal(true)}
              >
                + Öğrenci Ekle
              </button>
            )}
          </div>

          {loading ? (
            <p className="text-center">Yükleniyor...</p>
          ) : students.length > 0 ? (
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
              {students.map((student) => (
                <div key={student.student_id} className="col">
                  <div className="card shadow border-0">
                    <div className="card-body text-center">
                      <img
                        src={`/img/avatars/${student.photo}`}
                        alt={student.name}
                        className="rounded-circle mb-3"
                        width="80"
                        height="80"
                      />
                      <h5 className="card-title fw-bold">
                        {student.name} {student.surname}
                      </h5>
                      <p className="text-muted">@{student.username}</p>
                      <p className="text-secondary">Sınıf: {student.grade}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-muted">Öğrenci bulunamadı.</p>
          )}
        </div>
      </div>

      {/* Öğrenci Ekleme Modalı */}
      {showModal && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          style={{ background: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Yeni Öğrenci Ekle</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="Ad"
                  value={newStudent.name}
                  onChange={(e) =>
                    setNewStudent({ ...newStudent, name: e.target.value })
                  }
                />
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="Soyad"
                  value={newStudent.surname}
                  onChange={(e) =>
                    setNewStudent({ ...newStudent, surname: e.target.value })
                  }
                />
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="Kullanıcı Adı"
                  value={newStudent.username}
                  onChange={(e) =>
                    setNewStudent({ ...newStudent, username: e.target.value })
                  }
                />
                <input
                  type="email"
                  className="form-control mb-2"
                  placeholder="E-posta"
                  value={newStudent.email}
                  onChange={(e) =>
                    setNewStudent({ ...newStudent, email: e.target.value })
                  }
                />
                <input
                  type="password"
                  className="form-control mb-2"
                  placeholder="Şifre (Opsiyonel)"
                  value={newStudent.password}
                  onChange={(e) =>
                    setNewStudent({ ...newStudent, password: e.target.value })
                  }
                />
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="Sınıf"
                  value={newStudent.grade}
                  onChange={(e) =>
                    setNewStudent({ ...newStudent, grade: e.target.value })
                  }
                />
                <input
                  type="file"
                  className="form-control mb-2"
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Kapat
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleAddStudent}
                >
                  Ekle
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
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
