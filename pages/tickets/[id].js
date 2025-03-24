import { useEffect, useState, useContext } from "react";
import LayoutMenu from "../../components/LayoutMenu";
import Navbar from "../../components/Navbar";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import axios from "axios";
import { useRouter } from "next/router";
import { UserContext } from "../../contexts/UserContext";

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
    if (!comment.trim()) return;
    setLoading(true);
    try {
      await axios.post(`/api/tickets/${tickets.ticket.id}/comments`, {
        user_id: userData.id,
        comment,
      });
      router.reload();
    } catch (error) {
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
            <div className="row g-6">
              <div className="col-lg-12 col-md-12 col-12">
                <div className="card">
                  <div className="card-body">
                    {/* Display ticket details */}
                    <h4>Ticket Subject: {tickets.ticket.subject}</h4>
                    <p>Status: {tickets.ticket.status}</p>
                    <p>Priority: {tickets.ticket.priority}</p>
                    <p>Description: {tickets.ticket.description}</p>

                    {/* Display Comments */}
                    <h5>Comments:</h5>
                    {tickets.comments && tickets.comments.length > 0 ? (
                      tickets.comments.map((comment) => (
                        <div key={comment.id} className="comment">
                          <p>{comment.comment}</p>
                          <small>
                            Posted on {" "}
                            {new Date(comment.created_at).toLocaleString()}
                          </small>
                        </div>
                      ))
                    ) : (
                      <p>No comments available.</p>
                    )}

                    {/* Add Comment Section */}
                    <div className="mt-4">
                      <h5>Yorum Ekle:</h5>
                      <textarea
                        className="form-control"
                        rows="4"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                      />
                      <button
                        onClick={handleCommentSubmit}
                        className="btn btn-primary mt-3"
                        disabled={loading}
                      >
                        {loading ? "Gönderiliyor..." : "Yorum Gönder"}
                      </button>
                    </div>

                    {/* Back Button */}
                    <button onClick={handleBack} className="btn btn-secondary mt-3">
                      Geri Dön
                    </button>
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