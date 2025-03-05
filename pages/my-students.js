import { useEffect, useState, useContext } from "react";
import LayoutMenu from "../components/LayoutMenu";
import Navbar from "../components/Navbar";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { UserContext } from "../contexts/UserContext";

const Blank = () => {
  const { t } = useTranslation("common");
  const [students, setStudents] = useState([]);
  const userData = useContext(UserContext); // Get logged-in user data

  useEffect(() => {
    if (!userData?.id) return; // Ensure user ID is available

    fetch(`/api/students?userId=${userData.id}`)
      .then((res) => res.json())
      .then((data) => setStudents(data))
      .catch((err) => console.error("Error fetching students:", err));
  }, [userData]);

  return (
    <>
      <LayoutMenu />
      <div className="layout-page">
        <Navbar />
        <div className="content-wrapper container mt-4">
          <div className="row g-4">
            {students.length > 0 ? (
              students.map((student) => (
                <div key={student.student_id} className="col-md-6 col-lg-4">
                  <div className="card shadow-sm p-3">
                    <div className="text-center">
                      <img
                        src={
                          `/img/avatars/${student.photo}` ||
                          "/default-profile.png"
                        }
                        alt={student.name}
                        className="rounded-circle mb-3"
                        width="80"
                        height="80"
                      />
                    </div>
                    <div className="card-body text-center">
                      <h5 className="card-title fw-bold">
                        {student.name} {student.surname}
                      </h5>
                      <p className="text-muted">@{student.username}</p>
                      <p className="text-secondary">Sınıf: {student.grade}</p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-muted">Öğrenci bulunamadı.</p>
            )}
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

export default Blank;
