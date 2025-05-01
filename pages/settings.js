import LayoutMenu from "../components/LayoutMenu";
import Navbar from "../components/Navbar";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useState } from "react";
import Security from "../components/Security";
import Notifications from "../components/Notifications";
import Account from "../components/Account";
import { UserContext } from "../contexts/UserContext";
import { useContext } from "react";


const Settings = () => {
  const { t } = useTranslation("common");
  const [activeTab, setActiveTab] = useState("account");
  const userData = useContext(UserContext);
  const [imagePreview, setImagePreview] = useState("/img/avatars/1.png");
  const [file, setFile] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted in Settings.js");
  };

  return (
    <>
      <LayoutMenu />
      <div className="layout-page">
        <Navbar />
        <div className="content-wrapper">
          <div className="container-xxl flex-grow-1 container-p-y">
            <div className="row">
              <div className="col-md-12">
                <div className="nav-align-top">
                  <ul className="nav nav-tabs" role="tablist">
                    <li className="nav-item" onClick={() => setActiveTab("account")}>
                      <a className={`nav-link ${activeTab === "account" ? "active" : ""}`} href="#">
                        <i className="fas fa-users me-1.5"></i> Account
                      </a>
                    </li>
                    <li className="nav-item" onClick={() => setActiveTab("security")}>
                      <a className={`nav-link ${activeTab === "security" ? "active" : ""}`} href="#">
                        <i className="fas fa-lock me-1.5"></i> Security
                      </a>
                    </li>
                    <li className="nav-item" onClick={() => setActiveTab("notifications")}>
                      <a className={`nav-link ${activeTab === "notifications" ? "active" : ""}`} href="#">
                        <i className="fas fa-bell me-1.5"></i> Notifications
                      </a>
                    </li>
                  </ul>

                  <div className="tab-content mt-4">
                    {activeTab === "account" && (
                      <div className="tab-pane fade show active" id="account">
                        <div className="card shadow-none mb-6">
                          <div className="card-body">
                          <Account
                            userData={userData}
                            imagePreview={imagePreview}
                            setImagePreview={setImagePreview}
                            file={file}
                            setFile={setFile}
                          />

                          </div>
                        </div>
                      </div>
                    )}
                    {activeTab === "security" && <Security />}
                    {activeTab === "notifications" && <Notifications />}
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

export async function getServerSideProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}

export default Settings;
