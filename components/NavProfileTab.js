import Link from "next/link";
import Swal from "sweetalert2";
import { useTranslation } from "next-i18next";
import { useContext, useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import { UserContext } from "../contexts/UserContext";

const NavProfileTab = () => {
  const { t } = useTranslation("common");
  const userData = useContext(UserContext);
  const router = useRouter();
  const [isOnline, setIsOnline] = useState(false);

  useEffect(() => {
    if (userData?.id) {
      const checkOnlineStatus = async () => {
        try {
          const response = await fetch(`/api/users/${userData?.id}/status`);
          if (response.ok) {
            const data = await response.json();
            setIsOnline(data?.is_online === 1);
          }
        } catch (error) {
          console.error("Online durumu alınamadı:", error);
        }
      };

      checkOnlineStatus();
      const interval = setInterval(checkOnlineStatus, 5000);

      return () => clearInterval(interval);
    }
  }, [userData]);

  const socketRef = useRef(null);

  const handleLogout = async () => {
    Swal.fire({
      title: "Emin misiniz?",
      text: "Çıkış yapmak üzeresiniz!",
      showCancelButton: true,
      confirmButtonText: "Evet, çıkış yap!",
      cancelButtonText: "Hayır, kal",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      icon: "warning",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch("/api/logout", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId: userData?.id }),
          });

          if (!response.ok) {
            throw new Error("Çıkış işlemi sırasında bir hata oluştu.");
          }

          // Token & session temizliği
          localStorage.removeItem("token");
          localStorage.removeItem("userId");
          sessionStorage.removeItem("2fa-verified");

          // WebSocket kapat
          if (socketRef.current) {
            console.log("🔌 WebSocket bağlantısı kapatılıyor...");
            socketRef.current.disconnect();
          }

          // Giriş sayfasına yönlendir
          router.push("/sign-in");
        } catch (error) {
          console.error("Logout error:", error);
          Swal.fire(
            "Hata!",
            "Çıkış yaparken bir sorun oluştu. Lütfen tekrar deneyin.",
            "error"
          );
        }
      }
    });
  };

  const getRandomColorClass = () => {
    const colors = ["bg-label-info"];
    return colors;
  };

  const [avatarColor, setAvatarColor] = useState("");

  useEffect(() => {
    setAvatarColor(getRandomColorClass());
  }, []);

  return (
    <li className="nav-item navbar-dropdown dropdown-user dropdown">
      <a
        className="nav-link dropdown-toggle hide-arrow p-0"
        href="#"
        data-bs-toggle="dropdown"
      >
        <div
          className={`avatar ${isOnline ? "avatar-online" : "avatar-offline"}`}
        >
          {userData?.photo ? (
            <img
              src={`/img/avatars/${userData?.photo}`}
              alt="Avatar"
              className="rounded-circle"
            />
          ) : (
            <span className={`avatar-initial rounded-circle ${avatarColor}`}>
              {userData?.name?.[0].toLowerCase()}
              {userData?.surname?.[0].toLowerCase()}
            </span>
          )}
        </div>
      </a>
      <ul className="dropdown-menu dropdown-menu-end">
        <li>
          <Link href="/profile" className="dropdown-item mt-0">
            <div className="d-flex align-items-center">
              <div className="flex-shrink-0 me-2">
                <div
                  className={`avatar ${
                    isOnline ? "avatar-online" : "avatar-offline"
                  }`}
                >
                  {userData?.photo ? (
                    <img
                      src={`/img/avatars/${userData?.photo}`}
                      alt="Avatar"
                      className="rounded-circle"
                    />
                  ) : (
                    <span
                      className={`avatar-initial rounded-circle ${avatarColor}`}
                    >
                      {userData?.name?.[0].toLowerCase()}
                      {userData?.surname?.[0].toLowerCase()}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex-grow-1">
                <h6 className="mb-0">
                  {userData?.name + " " + userData?.surname || "Guest"}
                </h6>
                <small className="text-muted">
                  {userData?.role ? (
                    <>
                      {userData?.role === "admin" && <>{"Admin"}</>}
                      {userData?.role === "parent" && <>{"Veli"}</>}
                      {userData?.role === "student" && <>{"Öğrenci"}</>}
                      {userData?.role === "teacher" && <>{"Öğretmen"}</>}
                      {!["admin", "parent", "student", "teacher"].includes(
                        userData?.role
                      ) && (
                        <span className="text-warning">
                          Bilinmeyen Rol: {userData?.role}
                        </span>
                      )}
                    </>
                  ) : (
                    <span className="text-danger">
                      ⚠ Rol Bilgisi Yüklenemedi!
                    </span>
                  )}
                </small>
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
