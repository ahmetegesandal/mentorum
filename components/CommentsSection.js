import { useEffect, useState, useContext } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { UserContext } from "../contexts/UserContext";
import { useRouter } from "next/router";

const CommentsSection = ({ lessonId }) => {
  const userData = useContext(UserContext);
  const router = useRouter();
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [rating, setRating] = useState(5);
  const [isOnline, setIsOnline] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState({});
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      const response = await axios.get(
        `/api/lesson-comments?lesson_id=${lessonId}`
      );
      setComments(response.data);
      checkOnlineStatuses(response.data);
    } catch (error) {
      console.error("Yorumları çekerken hata oluştu:", error);
    }
  };

  const checkOnlineStatuses = async (comments) => {
    if (!comments.length) return;

    const onlineStatusMap = {};
    await Promise.all(
      comments.map(async (comment) => {
        if (comment.user_id) {
          try {
            const response = await fetch(
              `/api/users/${comment.user_id}/status`
            );
            if (response.ok) {
              const data = await response.json();
              onlineStatusMap[comment.user_id] = data.is_online === 1;
            }
          } catch (error) {
            console.error(
              `❌ Kullanıcı ID: ${comment.user_id} online durumu alınamadı:`,
              error
            );
            onlineStatusMap[comment.user_id] = false;
          }
        }
      })
    );

    setOnlineUsers(onlineStatusMap);
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    if (!newComment.trim()) {
      return Swal.fire("Hata!", "Yorum alanı boş bırakılamaz!", "error");
    }

    try {
      await axios.post("/api/add-comment", {
        student_id: userData.id,
        lesson_id: lessonId,
        rating,
        comment: newComment,
      });

      setNewComment("");
      fetchComments();
      setShowModal(false); // Close modal after comment is submitted
      Swal.fire("Başarılı!", "Yorumunuz eklendi!", "success");
    } catch (error) {
      console.error("Yorum ekleme hatası:", error);
      Swal.fire("Hata!", "Yorum eklenirken hata oluştu.", "error");
    }
  };

  const handleProfile = (username) => {
    if (!username) {
      console.error("Hata: username değeri tanımsız!");
      return;
    }
    router.push(`/profile/${username}`);
  };

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  return (
    <>
      <div className="d-flex justify-content-between">
        <h5>Yorumlar</h5>

        {/* Yorum Yap Butonu */}
        {userData?.role === "student" ||
        userData?.role === "parent" ||
        userData?.role === "admin" ? (
          <div className="mb-4">
            <button
              className="btn btn-success"
              onClick={() => setShowModal(true)}
            >
              Yorum Yap
            </button>
          </div>
        ) : (
          <p className="text-muted">Yorum yapamıyorsunuz.</p>
        )}
      </div>

      {/* Yorum Listesi */}
      <div className="list-group">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment.id} className="list-group-item p-3 mb-3">
              <div className="d-flex align-items-start gap-3">
                <a
                  target="__blank"
                  onClick={() => handleProfile(comment.user_username)}
                  className="cursor-pointer"
                >
                  <div
                    className={`avatar ${
                      onlineUsers[comment.user_id]
                        ? "avatar-online"
                        : "avatar-offline"
                    }`}
                  >
                    <img
                      src={`/img/avatars/${comment.user_photo}`}
                      alt="Avatar"
                      className="rounded-circle"
                    />
                  </div>
                </a>

                <div className="w-100">
                  <h6 className="mb-1">
                    {comment.user_name} {comment.user_surname}
                    <span
                      className={`badge ms-2 ${
                        comment.role === "parent"
                          ? "bg-label-info"
                          : "bg-label-primary"
                      }`}
                    >
                      {comment.role === "parent" ? "Veli" : "Öğrenci"}
                    </span>
                  </h6>
                  <div className="text-warning mb-1">
                    {"★".repeat(comment.rating)}
                    {"☆".repeat(5 - comment.rating)}
                  </div>
                  <p className="mb-1">{comment.comment}</p>
                  <small className="text-muted">
                    {new Date(comment.created_at).toLocaleDateString()}
                  </small>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-muted">Henüz yorum yapılmamış.</p>
        )}
      </div>

      {/* Modal for Commenting */}
      {showModal && (
        <div
          className="modal fade show d-block"
          id="commentModal"
          tabIndex="-1"
          style={{ background: "rgba(0,0,0,0.5)" }}
          aria-labelledby="commentModalLabel"
          aria-hidden={!showModal}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="commentModalLabel">
                  Yorum Yap
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={handleCloseModal}
                ></button>
              </div>
              <div className="modal-body">
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
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CommentsSection;
