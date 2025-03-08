import { useContext, useEffect, useState } from "react";
import LayoutMenu from "../components/LayoutMenu";
import Navbar from "../components/Navbar";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import { UserContext } from "../contexts/UserContext";

const Profile = () => {
  const { t } = useTranslation("common");
  const userData = useContext(UserContext);
  const [isOnline, setIsOnline] = useState(false);

  useEffect(() => {
    if (userData?.id) {
      const checkOnlineStatus = async () => {
        try {
          const response = await fetch(`/api/users/${userData.id}/status`);
          if (response.ok) {
            const data = await response.json();
            setIsOnline(data.is_online === 1);
          }
        } catch (error) {
          console.error("Online durumu alınamadı:", error);
        }
      };

      checkOnlineStatus();
      const interval = setInterval(checkOnlineStatus, 5000);

      return () => clearInterval(interval);
    }
  }, [userData]);

  const formatDate = (isoDate) => {
    if (!isoDate) return "Tarih bilgisi yok";
    const date = new Date(isoDate);
    return `${date.getDate()}.${
      date.getMonth() + 1
    }.${date.getFullYear()} tarihinde katıldı`;
  };

  return (
    <>
      <LayoutMenu />
      <div className="layout-page">
        <Navbar />
        <div className="content-wrapper">
          <div className="container-xxl flex-grow-1 container-p-y">
            <div className="row">
              <div className="col-12">
                <div className="card mb-6">
                  <div className="user-profile-header-banner"></div>
                  <div className="user-profile-header d-flex flex-column flex-lg-row text-sm-start text-center mb-5">
                    <div className="flex-shrink-0 mt-5 mx-sm-0 mx-auto">
                      <Image
                        src={
                          userData?.photo
                            ? `/img/avatars/${userData.photo}`
                            : "/img/avatars/default.png"
                        }
                        alt="User Image"
                        className="d-block h-auto ms-0 ms-sm-6 rounded user-profile-img"
                        width={120}
                        height={120}
                      />
                    </div>
                    <div className="flex-grow-1 mt-3 mt-lg-5">
                      <div className="d-flex align-items-md-end align-items-sm-start align-items-center justify-content-md-between justify-content-start mx-5 flex-md-row flex-column gap-4">
                        <div className="user-profile-info">
                          <h4 className="mb-2 mt-lg-6">
                            {userData?.name + " " + userData?.surname ||
                              "Misafir"}
                          </h4>
                          <ul className="list-inline mb-0 d-flex align-items-center flex-wrap justify-content-sm-start justify-content-center gap-4 my-2">
                            <li className="list-inline-item d-flex gap-2 align-items-center">
                              <i className="ti ti-palette ti-lg"></i>
                              <span className="fw-medium">{userData.role}</span>
                            </li>
                            <li className="list-inline-item d-flex gap-2 align-items-center">
                              <i className="ti ti-calendar ti-lg"></i>
                              <span className="fw-medium">
                                {formatDate(userData?.created_at)}
                              </span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-12">
                <div className="nav-align-top">
                  <ul className="nav nav-pills flex-column flex-sm-row mb-6 gap-2 gap-lg-0">
                    <li className="nav-item">
                      <a className="nav-link active" href="">
                        <i className="ti-sm ti ti-user-check me-1_5"></i> Profil
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="">
                        <i className="ti-sm ti ti-users me-1_5"></i> Ders
                        İlanları
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="">
                        <i className="ti-sm ti ti-layout-grid me-1_5"></i>{" "}
                        Projects
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="">
                        <i className="ti-sm ti ti-link me-1_5"></i> Connections
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-xl-12 col-lg-12 col-md-12">
                <div className="card mb-6">
                  <div className="card-body">
                    <small className="card-text text-uppercase text-muted small">
                      Hakkında
                    </small>
                    {userData.role === "teacher" && (
                      <div>
                        <p>{userData.teacher_info?.bio}</p>
                      </div>
                    )}
                    {userData.role === "student" && (
                      <div>
                        <p>Sınıf: {userData.student_info?.grade}</p>
                      </div>
                    )}
                    <ul className="list-unstyled my-3 py-1">
                      <li className="d-flex align-items-center mb-4">
                        <i className="ti ti-user ti-lg"></i>
                        <span className="fw-medium mx-2">Username:</span>
                        <span>{userData.username}</span>
                      </li>
                      <li className="d-flex align-items-center mb-4">
                        <i className="ti ti-user ti-lg"></i>
                        <span className="fw-medium mx-2">Full Name:</span>
                        <span>
                          {userData.name} {userData.surname}
                        </span>
                      </li>

                      <li className="d-flex align-items-center mb-4">
                        <i className="ti ti-crown ti-lg"></i>
                        <span className="fw-medium mx-2">Role:</span>
                        <span>{userData.role}</span>
                      </li>

                      <li className="d-flex align-items-center mb-4">
                        <i className="ti ti-crown ti-lg"></i>
                        <span className="fw-medium mx-2">Mail:</span>
                        <span>{userData.email}</span>
                      </li>

                      <li className="d-flex align-items-center mb-2">
                        <i className="ti ti-language ti-lg"></i>
                        <span className="fw-medium mx-2">Languages:</span>
                        <span>English</span>
                      </li>
                    </ul>
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

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}

export default Profile;
