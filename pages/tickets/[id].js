import { useEffect, useState, useContext } from "react";
import LayoutMenu from "../../components/LayoutMenu";
import Navbar from "../../components/Navbar";
import { useTranslation } from "next-i18next";
import Swal from "sweetalert2";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import axios from "axios";
import { useRouter } from "next/router";
import { UserContext } from "../../contexts/UserContext";
import RichTextEditor from "../../components/RichTextEditor";

const LessonDetails = ({ tickets }) => {
  const { t } = useTranslation("common");
  const router = useRouter();
  const userData = useContext(UserContext);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  


  


  const handleBack = () => {
    router.push("/tickets");
  };

  const handleCommentSubmit = async () => {
  if (!comment.trim()) {
    Swal.fire({
      icon: "warning",
      title: "Uyarı",
      text: "Yorum alanı boş olamaz!",
    });
    return;
  }

  setLoading(true);
  try {
    await axios.post(`/api/tickets/${tickets.ticket.id}/comments`, {
      user_id: userData.id,
      comment,
    });

    Swal.fire({
      icon: "success",
      title: "Başarılı!",
      text: "Yorumunuz başarıyla eklendi.",
      confirmButtonText: "Tamam",
    }).then(() => {
      router.reload(); // Sayfayı yenile
    });
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Hata!",
      text: "Yorum eklenirken bir hata oluştu.",
    });
    console.error("Yorum eklenirken hata oluştu:", error);
  } finally {
    setLoading(false);
  }
};

return (
  <>
    <LayoutMenu />
    <div className="layout-page">
      <Navbar />
      <div className="content-wrapper">
        <div className="container-xxl flex-grow-1 container-p-y">
          <div className="row justify-content-center">
            <div className="col-lg-12 col-md-12">
              <div className="card shadow-lg border-0 rounded-4">
                <div className="card-body p-4">
                  
                  {/* Ticket Detayları */}
                  <h3 className="text-center fw-bold mb-3">🎫 Ticket Detayları</h3>
                  <div className="mb-3 p-3 bg-light rounded-3">
                    <h5 className="fw-bold">📌 Konu: {tickets.ticket.subject}</h5>
                    <p className="mb-1">📍 <strong>Durum:</strong> {tickets.ticket.status}</p>
                    <p className="mb-1">⚡ <strong>Öncelik:</strong> {tickets.ticket.priority}</p>
                    <p className="mb-0">📝 <strong>Açıklama:</strong> {tickets.ticket.description}</p>
                  </div>

                  {/* Yorumlar Bölümü */}
                  <h4 className="fw-bold mt-4">💬 Yorumlar</h4>
                  <div className="comments-section mt-3">

                    {tickets.comments && tickets.comments.length > 0 ? (
                      tickets.comments.map((comment) => (
                        <div key={comment.id} className="p-3 mb-2 bg-white shadow-sm rounded-3">
                          <p className="fw-bold mb-1">
        👤 {comment.user_name} {comment.user_surname} {/* Kullanıcı adı ve soyadı */}
      </p>
                          <p className="mb-1"
                          dangerouslySetInnerHTML={{
                            __html: comment.comment,
                          }}
                          />
                          <small className="text-muted">
                            🕒 {new Date(comment.created_at).toLocaleString()}
                          </small>
                        </div>
                      ))
                    ) : (
                      <p className="text-muted text-center">🚫 Henüz yorum eklenmemiş.</p>
                    )}
                  </div>

                  {/* Yorum Ekleme Bölümü */}
                  <div className="mt-4">
                    <h5 className="fw-bold">📝 Yorum Ekle:</h5>
                    <div className="mb-3">
                      <label className="form-label">Açıklama</label>
                      <div className="p-2 border rounded-3 bg-light">
                        <RichTextEditor value={comment} onChange={setComment} />
                      </div>
                    </div>
                    <div className="d-flex gap-2">
                      <button
                        onClick={handleCommentSubmit}
                        className="btn btn-primary w-100 rounded-pill"
                        disabled={loading}
                      >
                        {loading ? "⏳ Gönderiliyor..." : "📩 Yorum Gönder"}
                      </button>
                      <button onClick={handleBack} className="btn btn-secondary rounded-pill">
                        ⬅️ Geri Dön
                      </button>
                    </div>
                  </div>

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
      `http://localhost:3000/api/tickets/${params.id}`
    );

    return {
      props: {
        tickets: response.data,
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