import Link from "next/link";
import Swal from "sweetalert2"; // npm install sweetalert2 
// İconlar vs.https://sweetalert2.github.io/
import { useTranslation } from "next-i18next";
import { useContext } from "react";
import { useRouter } from "next/router";
import { UserContext } from "../contexts/UserContext";

const NavProfileTab = () => {
  const { t } = useTranslation("common");
  const userData = useContext(UserContext);
  const router = useRouter();

  const handleLogout = () => {
    Swal.fire({
      title: "Emin misiniz?",
      text: "Çıkış yapmak üzeresiniz!",
      showCancelButton: true,
      confirmButtonText: "Evet, çıkış yap!",
      cancelButtonText: "Hayır, kal",
      confirmButtonColor: "#3085d6",// SWEETALERT RENK
      cancelButtonColor: "#d33",
      icon: "warning",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("token"); // Token'i temizler
        Swal.fire("Çıkış Yapıldı!", "Başarıyla çıkış yaptınız.", "success").then(() => {
          router.push("/sign-in"); // Çıkış sonrası Giriş ekranına yönlendiriyor
        });
      }
    });
  };

  return (
    <li className="nav-item navbar-dropdown dropdown-user dropdown">
      <a
        className="nav-link dropdown-toggle hide-arrow p-0"
        href="#"
        data-bs-toggle="dropdown"
      >
        <div className="avatar avatar-online">
          <img
            src={
              userData?.photo
                ? `/img/avatars/${userData.photo}`
                : "/img/avatars/default.png"
            }
            alt="Avatar"
            className="rounded-circle"
          />
        </div>
      </a>
      <ul className="dropdown-menu dropdown-menu-end">
        <li>
          <Link href="/profile" className="dropdown-item mt-0">
            <div className="d-flex align-items-center">
              <div className="flex-shrink-0 me-2">
                <div className="avatar avatar-online">
                  <img
                    src={
                      userData?.photo
                        ? `/img/avatars/${userData.photo}`
                        : "/img/avatars/default.png"
                    }
                    alt="Avatar"
                    className="rounded-circle"
                  />
                </div>
              </div>
              <div className="flex-grow-1">
                <h6 className="mb-0">
                  {userData?.name + " " + userData?.surname || "Guest"}
                </h6>
                <small className="text-muted">{t("admin")}</small>
              </div>
            </div>
          </Link>
        </li>
        <li>
          <div className="dropdown-divider my-1 mx-n2"></div>
        </li>
        <li>
          <Link href="/profile" className="dropdown-item">
            <i className="ti ti-user me-3 ti-md"></i>
            <span className="align-middle">{t("profile")}</span>
          </Link>
        </li>
        <li>
          <div className="dropdown-divider my-1 mx-n2"></div>
        </li>
        <li>
          <Link href="/settings" className="dropdown-item">
            <i className="ti ti-settings me-3 ti-md"></i>
            <span className="align-middle">{t("settings")}</span>
          </Link>
        </li>
        <li>
          <div className="dropdown-divider my-1 mx-n2"></div>
        </li>
        <li>
          <div className="d-grid px-2 pt-2 pb-1">
            <button
              onClick={handleLogout}
              className="btn btn-sm btn-danger d-flex"
            >
              <small className="align-middle">{t("logout")}</small>
              <i className="ti ti-logout ms-2 ti-14px"></i>
            </button>
          </div>
        </li>
      </ul>
    </li>
  );
};

export default NavProfileTab;
