import React, { useState, useEffect, useContext } from "react";
import LayoutMenu from "../components/LayoutMenu";
import Navbar from "../components/Navbar";
import { UserContext } from "../contexts/UserContext";
import Swal from "sweetalert2";
import { useRouter } from "next/router";

const ITEMS_PER_PAGE = 5; // Sayfa başına gösterilecek ders sayısı

const ManageLessons = () => {
  const userData = useContext(UserContext);
  const router = useRouter();

  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (!userData || userData.role !== "teacher") return;
    fetch(`/api/teacher-lessons?teacherId=${userData.id}`)
      .then((res) => res.json())
      .then((data) => {
        setLessons(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Dersleri çekerken hata oluştu:", error);
        setLoading(false);
      });
  }, [userData]);

  const handleDelete = async (lessonId) => {
    Swal.fire({
      title: "Emin misiniz?",
      text: "Bu dersi silmek istediğinize emin misiniz?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Evet, sil!",
      cancelButtonText: "İptal",
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch(`/api/delete-lesson?id=${lessonId}`, {
            method: "DELETE",
          });

          if (response.ok) {
            setLessons(lessons.filter((lesson) => lesson.id !== lessonId));
            Swal.fire("Silindi!", "Ders başarıyla silindi.", "success");
          } else {
            Swal.fire("Hata!", "Ders silme işlemi başarısız oldu.", "error");
          }
        } catch (error) {
          Swal.fire("Hata!", "Ders silinirken bir sorun oluştu.", "error");
        }
      }
    });
  };

  // **Arama işlemi**
  const filteredLessons = lessons.filter(
    (lesson) =>
      lesson.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lesson.category_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // **Sayfalama işlemi**
  const totalPages = Math.ceil(filteredLessons.length / ITEMS_PER_PAGE);
  const paginatedLessons = filteredLessons.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <>
      <LayoutMenu />
      <div className="layout-page">
        <Navbar />
        <div className="content-wrapper">
          <div className="container mt-5">
            <h3>Ders Yönetimi</h3>

            {/* **Arama Kutusu** */}
            <input
              type="text"
              className="form-control mb-3"
              placeholder="Ders ara..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />

            {loading ? (
              <p>Yükleniyor...</p>
            ) : paginatedLessons.length > 0 ? (
              <>
                <table className="table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Ders Fotoğrafı</th>
                      <th>Başlık</th>
                      <th>Kategori</th>
                      <th>Fiyat</th>
                      <th>İşlemler</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedLessons.map((lesson) => (
                      <tr key={lesson.id}>
                        <td>{lesson.id}</td>
                        <td>
                          <img
                            src={`${lesson.lesson_photo}`}
                            alt={lesson.title}
                            className="rounded"
                            width="60"
                            height="40"
                          />
                        </td>
                        <td>{lesson.title}</td>
                        <td>{lesson.category_name}</td>
                        <td>{lesson.price}₺</td>
                        <td>
                          <button
                            className="btn btn-warning btn-sm me-2"
                            onClick={() =>
                              router.push(`/edit-lesson/${lesson.id}`)
                            }
                          >
                            Düzenle
                          </button>
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => handleDelete(lesson.id)}
                          >
                            Sil
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* **Sayfalama Butonları** */}
                <nav className="d-flex justify-content-center">
                  <ul className="pagination">
                    <li
                      className={`page-item ${
                        currentPage === 1 ? "disabled" : ""
                      }`}
                    >
                      <button
                        className="page-link"
                        onClick={() => setCurrentPage(currentPage - 1)}
                      >
                        Önceki
                      </button>
                    </li>
                    {[...Array(totalPages)].map((_, index) => (
                      <li
                        key={index}
                        className={`page-item ${
                          currentPage === index + 1 ? "active" : ""
                        }`}
                      >
                        <button
                          className="page-link"
                          onClick={() => setCurrentPage(index + 1)}
                        >
                          {index + 1}
                        </button>
                      </li>
                    ))}
                    <li
                      className={`page-item ${
                        currentPage === totalPages ? "disabled" : ""
                      }`}
                    >
                      <button
                        className="page-link"
                        onClick={() => setCurrentPage(currentPage + 1)}
                      >
                        Sonraki
                      </button>
                    </li>
                  </ul>
                </nav>
              </>
            ) : (
              <p>Ders bulunamadı.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ManageLessons;
