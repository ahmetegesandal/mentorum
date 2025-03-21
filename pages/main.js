import Head from "next/head";
import Image from "next/image";
import LayoutMenu from "../components/LayoutMenu";
import Navbar from "../components/Navbar";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { UserContext } from "../contexts/UserContext";
import { useContext } from "react";
import { useRouter } from "next/router";

const Main = () => {
  const { t } = useTranslation("common");
  const userData = useContext(UserContext);
  const router = useRouter();

  const roleBasedCards = {
    student: [
      { title: "Derslerim", icon: "ti ti-book", value: "12" },
      { title: "Rezervasyonlarım", icon: "ti ti-calendar", value: "5" },
      { title: "Eğitim Süresi", icon: "ti ti-clock", value: "48 Saat" },
      { title: "Bildirimler", icon: "ti ti-bell", value: "2" },
    ],
    teacher: [
      { title: "Öğrencilerim", icon: "ti ti-users", value: "30" },
      { title: "Planlanan Dersler", icon: "ti ti-calendar", value: "8" },
      { title: "Kazanç", icon: "ti ti-currency-dollar", value: "$1,200" },
      { title: "Bildirimler", icon: "ti ti-bell", value: "3" },
    ],
    admin: [
      { title: "Toplam Kullanıcı", icon: "ti ti-users", value: "2.5k" },
      { title: "Toplam Dersler", icon: "ti ti-book", value: "350" },
      { title: "Toplam Kazanç", icon: "ti ti-currency-dollar", value: "$25k" },
      { title: "Sistem Bildirimleri", icon: "ti ti-bell", value: "5" },
    ],
    parent: [
      { title: "Çocuklarım", icon: "ti ti-user", value: "2" },
      { title: "Eğitim Süresi", icon: "ti ti-clock", value: "70 Saat" },
      { title: "Öğretmenler", icon: "ti ti-user-check", value: "4" },
      { title: "Bildirimler", icon: "ti ti-bell", value: "1" },
    ],
  };

  // **Kullanıcının rolüne göre kartları belirle**
  const userRole = userData?.role || "student";
  const cardsToRender = roleBasedCards[userRole] || [];

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
                  <h5 className="mb-2">
                    Hoş Geldin,{" "}
                    {userData?.role === "admin" && <span>Admin</span>}
                    {userData?.role === "parent" && <span>Veli</span>}
                    {userData?.role === "student" && <span>Öğrenci</span>}
                    {userData?.role === "teacher" && <span>Öğretmen</span>}{" "}
                    <span className="h4">
                      {userData
                        ? `${userData?.name} ${userData?.surname} 👋🏻`
                        : "Guest 👋🏻"}
                    </span>
                  </h5>
                  <div className="col-lg-5">
                    <p>{t("homepagecomment")}</p>
                  </div>
                  <div className="row g-4">
                    {cardsToRender.map((card, index) => (
                      <div key={index} className="col-lg-3 col-md-6">
                        <div className="card h-100 text-center">
                          <div className="card-body">
                            <div className="badge rounded p-2 bg-label-primary mb-2">
                              <i className={card.icon + " ti-lg"}></i>
                            </div>
                            <h5 className="card-title mb-1">{card.value}</h5>
                            <p className="mb-0">{card.title}</p>
                          </div>
                        </div>
                      </div>
                    ))}
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

export default Main;
