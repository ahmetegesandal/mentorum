import { useEffect, useState, useContext } from "react";
import LayoutMenu from "../../components/LayoutMenu";
import Navbar from "../../components/Navbar";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import axios from "axios";
import { useRouter } from "next/router";
import { UserContext } from "../../contexts/UserContext";
import Swal from "sweetalert2";

const LessonDetails = ({ lesson }) => {
  const { t } = useTranslation("common");
  const router = useRouter();
  const userData = useContext(UserContext);

  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [rating, setRating] = useState(5); // Varsayılan olarak 5 yıldız

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      const response = await axios.get(
        `/api/lesson-comments?lesson_id=${lesson.id}`
      );
      setComments(response.data);
    } catch (error) {
      console.error("Yorumları çekerken hata oluştu:", error);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    if (!newComment.trim()) {
      return Swal.fire("Hata!", "Yorum alanı boş bırakılamaz!", "error");
    }

    try {
      await axios.post("/api/add-comment", {
        student_id: userData.id,
        lesson_id: lesson.id,
        rating,
        comment: newComment,
      });

      setNewComment(""); // Yorumu temizle
      fetchComments(); // Yorumları tekrar getir
      Swal.fire("Başarılı!", "Yorumunuz eklendi!", "success");
    } catch (error) {
      console.error("Yorum ekleme hatası:", error);
      Swal.fire("Hata!", "Yorum eklenirken hata oluştu.", "error");
    }
  };

  return (
    <>
      <LayoutMenu />
      <div className="layout-page">
        <Navbar />
        <div className="content-wrapper">
          <div className="container-xxl flex-grow-1 container-p-y">
            <div className="row g-6">
              <div className="col-lg-12">
                <div className="card">
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center flex-wrap mb-6 gap-2">
                      <div className="me-1">
                        <button
                          className="btn btn-primary"
                          onClick={() => router.push("/slessons")}
                        >
                          Geri Dön
                        </button>
                        <h5 className="mb-0 mt-3">{lesson.title}</h5>
                      </div>
                      <div className="d-flex align-items-center">
                        <span className="badge bg-label-danger">
                          {lesson.category_id}
                        </span>
                      </div>
                    </div>
                    <div className="card academy-content shadow-none border">
                      <div className="p-2">
                        <img
                          src={lesson.lesson_photo}
                          alt="Ders Fotoğrafı"
                          className="w-full h-auto rounded-lg"
                        />
                      </div>
                      <div className="card-body pt-4">
                        <h5>Bu kurs hakkında</h5>
                        <p className="mb-0">{lesson.description}</p>
                        <hr className="my-6" />
                        <h5>Fiyat</h5>
                        <p>{lesson.price} $</p>
                        <hr className="my-6" />

                        <h5>Dil</h5>
                        <p>{lesson.language}</p>
                        <hr className="my-6" />
                        <h5>Eğitmen</h5>
                        <div className="d-flex justify-content-start align-items-center user-name">
                          <div className="avatar-wrapper">
                            <div className="avatar me-4">
                              <img
                                src={`/img/avatars/${lesson.teacher_photo}`}
                                alt="Avatar"
                                className="rounded-circle"
                              />
                            </div>
                          </div>
                          <div className="d-flex flex-column">
                            <h6 className="mb-1">
                              {lesson.teacher_name} {lesson.teacher_surname}
                            </h6>
                            <small>...</small>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Yorum Bölümü */}
                    <div className="mt-5">
                      <h5>Yorumlar</h5>

                      {/* Yorum Ekleme Formu */}
                      {userData?.role === "student" && (
                        <div className="card p-3 mb-4">
                          <h6>Yorum Yap</h6>
                          <form onSubmit={handleCommentSubmit}>
                            <div className="mb-3">
                              <textarea
                                className="form-control"
                                rows="3"
                                placeholder="Yorumunuzu yazın..."
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                                required
                              ></textarea>
                            </div>
                            <div className="mb-3">
                              <label className="form-label">Puanınız</label>
                              <select
                                className="form-select"
                                value={rating}
                                onChange={(e) => setRating(e.target.value)}
                              >
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <option key={star} value={star}>
                                    {star} Yıldız
                                  </option>
                                ))}
                              </select>
                            </div>
                            <button type="submit" className="btn btn-primary">
                              Gönder
                            </button>
                          </form>
                        </div>
                      )}

                      {/* Yorum Listesi */}
                      <div className="list-group">
                        {comments.length > 0 ? (
                          comments.map((comment) => (
                            <div
                              key={comment.id}
                              className="list-group-item p-3 mb-3"
                            >
                              <div className="d-flex align-items-start">
                                <img
                                  src={`/img/avatars/${comment.student_photo}`}
                                  alt={comment.student_name}
                                  className="rounded-circle me-3"
                                  width="50"
                                  height="50"
                                />
                                <div className="w-100">
                                  <h6 className="mb-1">
                                    {comment.student_name}{" "}
                                    {comment.student_surname}{" "}
                                  </h6>
                                  <div className="text-warning mb-1">
                                    {"★".repeat(comment.rating)}
                                    {"☆".repeat(5 - comment.rating)}
                                  </div>
                                  <p className="mb-1">{comment.comment}</p>
                                  <small className="text-muted">
                                    {new Date(
                                      comment.created_at
                                    ).toLocaleDateString()}
                                  </small>
                                </div>
                              </div>
                            </div>
                          ))
                        ) : (
                          <p className="text-muted">Henüz yorum yapılmamış.</p>
                        )}
                      </div>
                    </div>
                    {/* Yorum Bölümü Sonu */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export async function getServerSideProps({ params, locale }) {
  try {
    const response = await axios.get(
      `http://localhost:3000/api/lesson/${params.id}`
    );

    return {
      props: {
        lesson: response.data,
        ...(await serverSideTranslations(locale, ["common"])),
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
}

export default LessonDetails;
