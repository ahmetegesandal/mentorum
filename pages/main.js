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
  return (
    <>
      <Head>
        <title>Main Page - Dashboard</title>
        <meta name="description" content="Main page of the dashboard." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <LayoutMenu />

      <div className="layout-page">
        <Navbar />
        <div className="content-wrapper">
          <div className="container-xxl flex-grow-1 container-p-y">
            <div className="card bg-transparent shadow-none my-6 border-0">
              <div className="card-body row p-0 pb-6 g-6">
                <div className="col-12 col-lg-8 card-separator">
                  <h5 className="mb-2">
                    Welcome back,{" "}
                    <span className="h4">
                      {userData
                        ? `${userData.name} ${userData.surname} 👋🏻`
                        : "Guest 👋🏻"}
                    </span>
                  </h5>
                  <div className="col-12 col-lg-5">
                    <p>{t("homepagecomment")}</p>
                  </div>
                  <div className="d-flex justify-content-between flex-wrap gap-4 me-12">
                    {[
                      {
                        title: "Hours Spent",
                        value: "34h",
                        color: "primary",
                        icon: "/svg/icons/laptop.svg",
                      },
                      {
                        title: "Test Results",
                        value: "82%",
                        color: "info",
                        icon: "/svg/icons/lightbulb.svg",
                      },
                      {
                        title: "Course Completed",
                        value: "14",
                        color: "warning",
                        icon: "/svg/icons/check.svg",
                      },
                    ].map(({ title, value, color, icon }, index) => (
                      <div
                        className="d-flex align-items-center gap-4"
                        key={index}
                      >
                        <div className="avatar avatar-lg">
                          <div
                            className={`avatar-initial bg-label-${color} rounded`}
                          >
                            <Image
                              src={icon}
                              alt={title}
                              className="img-fluid"
                              width={40}
                              height={40}
                            />
                          </div>
                        </div>
                        <div className="content-right">
                          <p className="mb-0 fw-medium">{title}</p>
                          <h4 className={`text-${color} mb-0`}>{value}</h4>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="col-12 col-lg-4 ps-md-4 ps-lg-6">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <h5 className="mb-1">Time Spendings</h5>
                      <p className="mb-9">Weekly report</p>
                      <div className="time-spending-chart">
                        <h4 className="mb-2">
                          231<span className="text-body">h</span> 14
                          <span className="text-body">m</span>
                        </h4>
                        <span className="badge bg-label-success">+18.4%</span>
                      </div>
                    </div>
                    <div id="leadsReportChart"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Other content sections remain unchanged */}
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
