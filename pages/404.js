import Link from "next/link";
import Image from "next/image";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {useTranslation} from "next-i18next";

const ErrorPage = () => {
    const { t } = useTranslation("common");
    return (
        <>
            <div className="container-xxl container-p-y">
                <div className="misc-wrapper">
                    <h1
                        className="mb-2 mx-2"
                        style={{ lineHeight: "6rem", fontSize: "6rem" }}
                    >
                        404
                    </h1>
                    <h4 className="mb-2 mx-2">{t("pagenotfound")} ⚠</h4>
                    <p className="mb-6 mx-2">
                        {t("pagenotfoundtwo")}
                    </p>
                    {/* Link kullanımı düzeltilmiştir */}
                    <Link href="/main" className="btn btn-primary mb-10">
                        {t("backtohome")}
                    </Link>
                    <div className="mt-4">
                        <Image
                            src="/img/illustrations/page-misc-error.png"
                            alt="Page not found illustration"
                            width={225}
                            height={225}
                            className="img-fluid"
                        />
                    </div>
                </div>
            </div>
            <div className="container-fluid misc-bg-wrapper">
                <Image
                    src="/img/illustrations/bg-shape-image-light.png"
                    height={355}
                    width={600}
                    alt="Background shape"
                    data-app-light-img="illustrations/bg-shape-image-light.png"
                    data-app-dark-img="illustrations/bg-shape-image-dark.png"
                />
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

export default ErrorPage;
