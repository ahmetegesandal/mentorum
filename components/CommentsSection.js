import { useEffect, useState, useContext } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { UserContext } from "../contexts/UserContext";

const CommentsSection = ({ lessonId }) => {
  const userData = useContext(UserContext);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [rating, setRating] = useState(5);

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      const response = await axios.get(
        `/api/lesson-comments?lesson_id=${lessonId}`
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
        lesson_id: lessonId,
        rating,
        comment: newComment,
      });

      setNewComment("");
      fetchComments();
      Swal.fire("Başarılı!", "Yorumunuz eklendi!", "success");
    } catch (error) {
      console.error("Yorum ekleme hatası:", error);
      Swal.fire("Hata!", "Yorum eklenirken hata oluştu.", "error");
    }
  };

  return (
    <div className="mt-5">
      <h5>Yorumlar</h5>

      {/* Yorum Ekleme Formu */}
      {userData?.role === "student" || userData?.role === "parent" ? (
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
      ) : (
        <p className="text-muted">Yorum yapabilmek için giriş yapmalısınız.</p>
      )}

      {/* Yorum Listesi */}
      <div className="list-group">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment.id} className="list-group-item p-3 mb-3">
              <div className="d-flex align-items-start">
                <img
                  src={`/img/avatars/${comment.user_photo}`}
                  alt={comment.user_name}
                  className="rounded-circle me-3"
                  width="50"
                  height="50"
                />
                <div className="w-100">
                  <h6 className="mb-1">
                    {comment.user_name} {comment.user_surname}
                    <span
                      className={`badge ms-2 ${
                        comment.role === "parent" ? "bg-info" : "bg-primary"
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
    </div>
  );
};

export default CommentsSection;
