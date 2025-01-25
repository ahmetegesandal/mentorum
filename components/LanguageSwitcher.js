import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";

const LanguageSwitcher = () => {
    const { t } = useTranslation("common");
    const router = useRouter();

    // Dil değiştirme fonksiyonu
    const changeLanguage = (lang) => {
        router.push(router.asPath, router.asPath, { locale: lang });
    };

    return (
        <>
            <li>
                <a
                    className={`dropdown-item ${
                        router.locale === "tr" ? "active" : ""
                    }`}
                    onClick={() => changeLanguage("tr")}
                >
                    <span>{t("turkish")}</span>
                </a>
            </li>
            <li>
                <a
                    className={`dropdown-item ${
                        router.locale === "en" ? "active" : ""
                    }`}
                    onClick={() => changeLanguage("en")}
                >
                    <span>{t("english")}</span>
                </a>
            </li>
            <li>
                <a
                    className={`dropdown-item ${
                        router.locale === "fr" ? "active" : ""
                    }`}
                    onClick={() => changeLanguage("fr")}
                >
                    <span>{t("french")}</span>
                </a>
            </li>
            <li>
                <a
                    className={`dropdown-item ${
                        router.locale === "de" ? "active" : ""
                    }`}
                    onClick={() => changeLanguage("de")}
                >
                    <span>{t("german")}</span>
                </a>
            </li>
            <li>
                <a
                    className={`dropdown-item ${
                        router.locale === "es" ? "active" : ""
                    }`}
                    onClick={() => changeLanguage("es")}
                >
                    <span>{t("spanish")}</span>
                </a>
            </li>
        </>
    );
};

export default LanguageSwitcher;
