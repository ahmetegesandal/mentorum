// pages/notifications.js
import LayoutMenu from "../components/LayoutMenu";
import Navbar from "../components/Navbar";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { UserContext } from "../contexts/UserContext";
import { useTranslation } from "next-i18next";
import { useContext, useEffect, useState, useRef } from "react";
import Head from "next/head";
import io from "socket.io-client";

let socket;

export async function getServerSideProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}

export default function NotificationsPage() {
  const { t } = useTranslation("common");
  const userData = useContext(UserContext);

  const [notifications, setNotifications] = useState([]);
  const [selected, setSelected] = useState(new Set());
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState(null);
  const pollingRef = useRef(null);

  const fetchNotifications = async () => {
    if (!userData?.id) return;
    try {
      const res = await fetch(`/api/noti?userId=${userData.id}&page=${page}&limit=${limit}`);
      const data = await res.json();

      if (!data || !Array.isArray(data.notifications)) {
        throw new Error("Invalid response format");
      }

      const notifsWithTitle = data.notifications.map((n) => ({
        ...n,
        title: n.title || t("Notification"),
      }));

      setNotifications(notifsWithTitle);
      setTotalPages(Math.ceil(data.totalCount / limit));
      setError(null);
    } catch (err) {
      console.error("❌ Notification fetch error:", err);
      setError(t("An error occurred while fetching notifications."));
    }
  };

  useEffect(() => {
    fetchNotifications();
    if (pollingRef.current) clearInterval(pollingRef.current);

    pollingRef.current = setInterval(() => {
      fetchNotifications();
    }, 1000);

    return () => clearInterval(pollingRef.current);
  }, [userData?.id, page]);

  const markAsRead = async (id) => {
    try {
      const res = await fetch(`/api/noti/read?id=${id}`, { method: "PATCH" });
      if (!res.ok) throw new Error("API failed");
      setNotifications((prev) =>
        prev.map((notif) =>
          notif.id === id ? { ...notif, is_read: 1 } : notif
        )
      );
    } catch (err) {
      console.error("❌ Failed to mark as read:", err);
      setError(t("Failed to mark notification as read."));
    }
  };

  const markSelectedAsRead = async () => {
    for (const id of selected) {
      await markAsRead(id);
    }
    setSelected(new Set());
  };

  const markAllAsRead = async () => {
    for (const notif of notifications.filter(n => !n.is_read)) {
      await markAsRead(notif.id);
    }
  };

  const toggleSelect = (id) => {
    const newSet = new Set(selected);
    if (newSet.has(id)) {
      newSet.delete(id);
    } else {
      newSet.add(id);
    }
    setSelected(newSet);
  };

  const handlePrevPage = () => setPage((p) => Math.max(p - 1, 1));
  const handleNextPage = () => setPage((p) => Math.min(p + 1, totalPages));

  return (
    <>
      <Head>
        <title>{t("Notifications")}</title>
      </Head>
      <LayoutMenu />
      <div className="layout-page">
        <Navbar />
        <div className="container py-4">
          <div className="card shadow-sm border-0">
            <div className="card-header bg-transparent border-bottom d-flex justify-content-between align-items-center">
              <h4 className="mb-0">{t("Your Notifications")}</h4>
              <div>
                <button className="btn btn-sm btn-outline-primary me-2" onClick={markSelectedAsRead} disabled={selected.size === 0}>
                  {t("Mark Selected as Read")}
                </button>
                <button className="btn btn-sm btn-outline-success" onClick={markAllAsRead}>
                  {t("Mark All as Read")}
                </button>
              </div>
            </div>
            <div className="card-body">
              {error && <div className="alert alert-danger">{error}</div>}

              <div className="table-responsive">
                <table className="table table-hover align-middle mb-0">
                  <thead className="table-light">
                    <tr>
                      <th></th>
                      <th>#</th>
                      <th>{t("Title")}</th>
                      <th>{t("Message")}</th>
                      <th>{t("Status")}</th>
                      <th>{t("Date")}</th>
                      <th className="text-end">{t("Action")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {notifications.length === 0 ? (
                      <tr>
                        <td colSpan="7" className="text-center text-muted py-4">
                          {t("No notifications available.")}
                        </td>
                      </tr>
                    ) : (
                      notifications.map((notif, index) => (
                        <tr
                          key={notif.id}
                          className={notif.is_read ? "" : "table-info fw-semibold"}
                        >
                          <td>
                            <input
                              type="checkbox"
                              checked={selected.has(notif.id)}
                              onChange={() => toggleSelect(notif.id)}
                            />
                          </td>
                          <td>{(page - 1) * limit + index + 1}</td>
                          <td>{notif.title}</td>
                          <td className="text-muted small">{notif.message}</td>
                          <td>
                            {notif.is_read ? (
                              <span className="badge bg-secondary">{t("Read")}</span>
                            ) : (
                              <span className="badge bg-primary">{t("Unread")}</span>
                            )}
                          </td>
                          <td>
                            <small className="text-muted">
                              {new Date(notif.created_at).toLocaleString("tr-TR", {
                                day: "2-digit",
                                month: "2-digit",
                                year: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </small>
                          </td>
                          <td className="text-end">
                            <button
                              className="btn btn-sm btn-outline-success"
                              onClick={() => markAsRead(notif.id)}
                              disabled={notif.is_read}
                            >
                              {t("Mark as Read")}
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              <div className="d-flex justify-content-between align-items-center mt-4">
                <button
                  onClick={handlePrevPage}
                  disabled={page === 1}
                  className="btn btn-outline-secondary btn-sm"
                >
                  {t("Previous")}
                </button>
                <span className="text-muted small">
                  {t("Page")} {page} / {totalPages}
                </span>
                <button
                  onClick={handleNextPage}
                  disabled={page === totalPages}
                  className="btn btn-outline-secondary btn-sm"
                >
                  {t("Next")}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}