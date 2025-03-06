import { useEffect, useState } from "react";
import LayoutMenu from "../../components/LayoutMenu";
import Navbar from "../../components/Navbar";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import axios from "axios";
import { useRouter } from "next/router";

const LessonDetails = ({ lesson }) => {
  const { t } = useTranslation("common");
  const router = useRouter();

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
                        <p className="mb-0"></p>
                      </div>
                      <div className="d-flex align-items-center">
                        <span className="badge bg-label-danger">
                          {lesson.category_id}
                        </span>
                      </div>
                    </div>
                    <div className="card academy-content shadow-none border">
                      <div className="p-2">
                        <div className="cursor-pointer">
                          <video
                            className="w-25"
                            poster="https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-HD.jpg"
                            id="plyr-video-player"
                            playsInline
                            controls
                          >
                            <source
                              src="https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-576p.mp4"
                              type="video/mp4"
                            />
                          </video>
                        </div>
                      </div>
                      <div className="card-body pt-4">
                        <h5>About this course</h5>
                        <p className="mb-0">{lesson.description}</p>
                        <hr className="my-6" />
                        <h5>Price</h5>
                        <p>{lesson.price} $</p>
                        <hr className="my-6" />
                        <h5>Language</h5>
                        <p>{lesson.language}</p>
                        <hr className="my-6" />
                        <h5>Instructor</h5>
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
                              Teacher ID: {lesson.teacher_id}
                            </h6>
                            <small>Instructor Details</small>
                          </div>
                        </div>
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
