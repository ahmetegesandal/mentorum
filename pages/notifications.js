import LayoutMenu from "../components/LayoutMenu";
import Navbar from "../components/Navbar";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { UserContext } from "../contexts/UserContext";
import { useTranslation } from "next-i18next";
import { useContext } from "react";

const Blank = () => {
  const { t } = useTranslation("common");
  const userData = useContext(UserContext);

  return (
    <>
      <LayoutMenu />
      <div className="layout-page">
        <Navbar />
        <div className="content-wrapper">
          <h1 className="text-4xl font-bold mb-6">sa</h1>
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
