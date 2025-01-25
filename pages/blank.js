import LayoutMenu from "../components/LayoutMenu";
import Navbar from "../components/Navbar";
import {useTranslation} from "next-i18next";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";


const Blank = () => {
    const { t } = useTranslation("common")

    return (
        <>
            <LayoutMenu/>
            <div className="layout-page">
                <Navbar/>
                <div className="content-wrapper">

                    <h1 className="text-4xl font-bold mb-6">{t("title")}</h1>

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
