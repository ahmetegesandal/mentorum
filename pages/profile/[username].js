import { useState, useEffect } from "react";
import LayoutMenu from "../../components/LayoutMenu";
import Navbar from "../../components/Navbar";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import { getAllUsers, getUserByUsername } from "../../utils/api";

const Profile = ({ userData }) => {
  const { t } = useTranslation("common");
  const [badges, setBadges] = useState([]);
  const [activeTab, setActiveTab] = useState("profile");

  useEffect(() => {
    if (userData?.id) {
      fetch(`/api/users/${userData?.id}/badges`)
        .then((res) => res.json())
        .then(setBadges)
        .catch(console.error);
    }
  }, [userData]);

  const formatDate = (isoDate) => {
    if (!isoDate) return "Tarih bilgisi yok";
    const date = new Date(isoDate);
    return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()} tarihinde katıldı`;
  };



  return (
    <>
      <LayoutMenu />
      <div className="layout-page">
        <Navbar />
        <div className="content-wrapper">
          <div className="container-xxl flex-grow-1 container-p-y">

            {/* Kullanıcı Kartı */}
            <div className="row">
              <div className="col-12">
                <div className="card mb-6">
                  <div className="user-profile-header d-flex flex-column flex-lg-row text-sm-start text-center mb-5 p-4 align-items-center">
                    <div className="flex-shrink-0 mx-sm-0 mx-auto">
                      <Image
                        src={
                          userData?.photo
                            ? `/img/avatars/${userData.photo}`
                            : "/img/avatars/default.png"
                        }
                        alt="User Image"
                        className="d-block rounded user-profile-img"
                        width={120}
                        height={120}
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                    <div className="flex-grow-1 mt-3 mt-lg-0 ms-lg-4">
                      <h4 className="mb-2">
                        {userData?.name + " " + userData?.surname || "Misafir"}
                      </h4>
                      <ul className="list-inline mb-0 d-flex align-items-center flex-wrap justify-content-sm-start justify-content-center gap-3 mt-2">
                        <li className="list-inline-item d-flex gap-2 align-items-center">
                          <span className="fw-medium">
                            {userData?.role === "admin" && (
                              <span className="badge bg-label-danger">Admin</span>
                            )}
                            {userData?.role === "parent" && "Veli"}
                            {userData?.role === "student" && "Öğrenci"}
                            {userData?.role === "teacher" && "Öğretmen"}
                          </span>
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

            {/* Sekmeler */}
            <div className="row">
              <div className="col-md-12">
                <div className="nav-align-top">
                  <ul className="nav nav-pills flex-column flex-sm-row mb-6 gap-2 gap-lg-0">
                    <li className="nav-item">
                      <button
                        className={`nav-link ${activeTab === "profile" ? "active" : ""}`}
                        onClick={() => setActiveTab("profile")}
                      >
                        <i className="ti-sm ti ti-user-check me-1_5"></i> Profil
                      </button>
                    </li>
                    <li className="nav-item">
                      <button
                        className={`nav-link ${activeTab === "badges" ? "active" : ""}`}
                        onClick={() => setActiveTab("badges")}
                      >
                        <i className="ti-sm ti ti-award me-1_5"></i> Rozetler
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Profil Sekmesi */}
            {activeTab === "profile" && (
              <div className="row">
                <div className="col-xl-12 col-lg-12 col-md-12">
                  <div className="card mb-6">
                    <div className="card-body">
                      <h5>Hakkında</h5>
                      {userData?.role === "teacher" && (
                        <p>{userData.teacher_info?.bio}</p>
                      )}
                      {userData?.role === "student" && (
                        <p>Sınıf: {userData.student_info?.grade}</p>
                      )}
                      <ul className="list-unstyled my-3 py-1">
                        <li className="d-flex align-items-center mb-4">
                          <i className="ti ti-user ti-lg"></i>
                          <span className="fw-medium mx-2">Tam Ad:</span>
                          <span>{userData?.name} {userData?.surname}</span>
                        </li>
                        <li className="d-flex align-items-center mb-4">
                          <i className="ti ti-crown ti-lg"></i>
                          <span className="fw-medium mx-2">Mail:</span>
                          <span>{userData?.email}</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Rozetler Sekmesi */}
            {activeTab === "badges" && badges.length > 0 && (
              <div className="row">
                <div className="col-xl-12 col-lg-12 col-md-12">
                  <div className="card mb-6">
                    <div className="card-body">
                      <h5>Rozetler</h5>
                      <div className="d-flex flex-wrap gap-3">
                        {badges.map((badge) => (
                          <div key={badge.id} className="text-center">
                            <Image
                              src={`/img/badges/${badge.icon_path}`}
                              alt={badge.name}
                              width={100}
                              height={100}
                            />
                            <div className="small mt-2">{badge.name}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </>
  );
};

export async function getStaticPaths() {
  const users = await getAllUsers();
  const paths = users.map((user) => ({
    params: { username: user.username },
  }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params, locale }) {
  const userData = await getUserByUsername(params.username);
  if (userData?.created_at) {
    userData.created_at = new Date(userData.created_at).toISOString();
  }

  return {
    props: {
      userData,
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}

export default Profile;
