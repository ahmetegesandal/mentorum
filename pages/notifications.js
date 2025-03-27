import LayoutMenu from "../components/LayoutMenu";
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

  useEffect(() => {
    const fetchUpcomingItems = async () => {
      if (!userData?.id || !userData?.role) return;

      try {
        const res = await fetch(
          `/api/upcomingActivities?userId=${userData.id}&role=${userData.role}`
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
          {/* Content removed */}
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