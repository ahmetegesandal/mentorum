import { useEffect, useState, useContext } from "react";
import LayoutMenu from "../../components/LayoutMenu";
import Navbar from "../../components/Navbar";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import axios from "axios";
import { useRouter } from "next/router";
import { UserContext } from "../../contexts/UserContext";
import Swal from "sweetalert2";
import ReservationForm from "../../components/ReservationForm";
import CommentsSection from "../../components/CommentsSection";

const LessonDetails = ({ lesson }) => {
  const { t } = useTranslation("common");
  const router = useRouter();
  const userData = useContext(UserContext);

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
                          {lesson.category_name}
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
                        <ReservationForm lesson={lesson} />

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

                    <CommentsSection lessonId={lesson.id} />
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
