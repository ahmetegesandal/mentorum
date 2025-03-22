import { useEffect, useState, useContext } from "react";
import LayoutMenu from "../../components/LayoutMenu";
import Navbar from "../../components/Navbar";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import axios from "axios";
import { useRouter } from "next/router";
import { UserContext } from "../../contexts/UserContext";
import ReservationForm from "../../components/ReservationForm";
import CommentsSection from "../../components/CommentsSection";
import UserAvatar from "../../components/UserAvatar";

const LessonDetails = ({ lesson }) => {
  const { t } = useTranslation("common");
  const router = useRouter();
  const userData = useContext(UserContext);
  const [isTeacherOnline, setIsTeacherOnline] = useState(false);

  useEffect(() => {
    if (lesson?.teacher_user_id) {
      const checkTeacherOnlineStatus = async () => {
        try {
          const response = await fetch(
            `/api/users/${lesson.teacher_user_id}/status`
          );
          if (response.ok) {
            const data = await response.json();
            setIsTeacherOnline(data.is_online === 1);
          }
        } catch (error) {
          console.error("❌ Eğitmenin online durumu alınamadı:", error);
        }
      };

      checkTeacherOnlineStatus();
      const interval = setInterval(checkTeacherOnlineStatus, 5000);

      return () => clearInterval(interval);
    }
  }, [lesson?.teacher_user_id]);

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
                          {lesson.category_name}
                        </span>
                      </div>
                    </div>

                    <div className="card academy-content shadow-none border">
                      <div className="p-2">
                        <img
                          src={`${lesson.lesson_photo}`}
                          alt={lesson.title}
                          className="rounded"
                          width={"800"}
                          height={"450"}
                          style={{ objectFit: "cover" }}
                        />
                      </div>
                      <div className="card-body pt-4">
                        <h5>Bu kurs hakkında</h5>
                        <p
                          className="mb-0"
                          dangerouslySetInnerHTML={{
                            __html: lesson.description,
                          }}
                        />
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
                              <UserAvatar
                                username={lesson?.teacher_username}
                                photo={lesson?.teacher_photo}
                                isOnline={isTeacherOnline[lesson?.teacher_id]}
                              />
                            </div>
                          </div>
                          <div className="d-flex flex-column">
                            <h6 className="mb-1">
                              {lesson.teacher_name} {lesson.teacher_surname}
                            </h6>
                            <small>
                              {lesson.teacher_role === "teacher"
                                ? "Öğretmen"
                                : ""}
                            </small>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row g-6">
                <div className="col-lg-12 col-md-12 col-12">
                  <div className="card">
                    <div className="card-body">
                      <ReservationForm lesson={lesson} />
                    </div>
                  </div>
                </div>
              </div>

              <div className="row g-6">
                <div className="col-lg-12 col-md-12 col-12">
                  <div className="card">
                    <div className="card-body">
                      <CommentsSection lessonId={lesson.id} />
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
