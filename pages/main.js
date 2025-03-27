import LayoutMenu from "../components/LayoutMenu";
import UpcomingEvents from "../components/UpcomingEvents";
import DashboardCards from "../components/DashboardCards";
import Navbar from "../components/Navbar";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { UserContext } from "../contexts/UserContext";
import { useContext, useState, useEffect } from "react";
import { useRouter } from "next/router";

const Main = () => {
  const { t } = useTranslation("common");
  const userData = useContext(UserContext);
  const router = useRouter();
  const [upcomingItems, setUpcomingItems] = useState([]);

  useEffect(() => {
    const fetchUpcomingItems = async () => {
      if (!userData?.id || !userData?.role) return;

      try {
        const res = await fetch(
          `/api/upcomingActivities?userId=${userData?.id}&role=${userData?.role}`
        );
        const data = await res.json();
        setUpcomingItems(data.items || []);
      } catch (err) {
        console.error("Yaklaşan etkinlikler alınamadı:", err);
      }
    };

    fetchUpcomingItems();
  }, [userData]);

  return (
    <>
      <LayoutMenu />
      <div className="layout-page">
        <Navbar />
        <div className="content-wrapper">
          <div className="container-xxl flex-grow-1 container-py">
            <div className="card bg-transparent shadow-none my-6 border-0">
              <div className="card-body row p-0 pb-6 g-6">
                <div className="col-12">
                  <div className="row g-4">
                    <div className="col-lg-8">
                      <h5 className="mb-2">
                        Hoş Geldin,{" "}
                        {userData?.role === "admin" && <span>Admin</span>}
                        {userData?.role === "parent" && <span>Veli</span>}
                        {userData?.role === "student" && <span>Öğrenci</span>}
                        {userData?.role === "teacher" && (
                          <span>Öğretmen</span>
                        )}{" "}
                        <span className="h4">
                          {userData
                            ? `${userData?.name} ${userData?.surname} 👋🏻`
                            : "Guest 👋🏻"}
                        </span>
                      </h5>
                      <p>{t("homepagecomment")}</p>
                    </div>
                    <div className="col-lg-4 text-end">
                      <img
                        src="/img/odek3.png"
                        width={"150"}
                        style={{
                          objectFit: "cover",
                        }}
                      />
                    </div>
                  </div>
                  <DashboardCards userId={userData?.id} role={userData?.role} />
                </div>
                <UpcomingEvents upcomingItems={upcomingItems} />
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

export default Main;
