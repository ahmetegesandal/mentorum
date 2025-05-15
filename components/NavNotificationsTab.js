import { useEffect, useState, useContext, useRef } from "react";
import Link from "next/link";
import { UserContext } from "../contexts/UserContext";

const POLL_INTERVAL = 1000;

const NavNotificationsTab = () => {
  const userData = useContext(UserContext);
  const [notifications, setNotifications] = useState([]);
  const [hasUnread, setHasUnread] = useState(false);
  const audioRef = useRef(null);
  const lastIdRef = useRef(null);
  const unlockedRef = useRef(false);
  const intervalRef = useRef(null);
  const firstLoadRef = useRef(true);


  const unlockAudio = () => {
    if (unlockedRef.current || !audioRef.current) return;
    audioRef.current.play().then(() => {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      unlockedRef.current = true;
      console.log("🔓 Audio unlocked");
    }).catch(() => {});
  };

  useEffect(() => {
    if (!userData?.id) return;
  
    let firstLoad = true;
  
    const fetchAndDetect = async () => {
      const res = await fetch(`/api/noti?userId=${userData.id}&page=1&limit=4`);
      const data = await res.json();
      if (data.notifications) {
        const latestId = data.notifications[0]?.id;
        const isNew = latestId && latestId !== lastIdRef.current;
  
        setNotifications(data.notifications);
        setHasUnread(data.notifications.some((n) => n.is_read === 0));
  
        if (!firstLoad && isNew && audioRef.current) {
          audioRef.current.play().catch((e) => console.warn("🔈 Ses çalınamadı:", e));
        }
  
        lastIdRef.current = latestId;
        firstLoad = false;
      }
    };
  
    fetchAndDetect();
    const interval = setInterval(fetchAndDetect, 1000);
  
    return () => clearInterval(interval);
  }, [userData?.id]);
  

  return (
    <li className="nav-item dropdown-notifications navbar-dropdown dropdown me-3 me-xl-2">
      <audio ref={audioRef} src="/sounds/message.mp3" preload="auto" />
      <a
        className="nav-link btn btn-text-secondary btn-icon rounded-pill dropdown-toggle hide-arrow"
        href="#"
        data-bs-toggle="dropdown"
        data-bs-auto-close="outside"
        aria-expanded="false"
      >
        <span className="position-relative">
          <i className="ti ti-bell ti-md"></i>
          {hasUnread && (
            <span className="badge rounded-pill bg-danger badge-dot badge-notifications border"></span>
          )}
        </span>
      </a>
      <ul className="dropdown-menu dropdown-menu-end p-0 overflow-auto">
        <li className="dropdown-menu-header border-bottom">
          <div className="dropdown-header d-flex align-items-center py-3">
            <h6 className="mb-0 me-auto">Bildirimler</h6>
            {hasUnread && <span className="badge bg-label-primary me-2">New</span>}
          </div>
        </li>
        <li className="dropdown-notifications-list scrollable-container">
          <ul className="list-group list-group-flush">
            {notifications.length === 0 ? (
              <li className="text-muted text-center py-3 small">No notifications</li>
            ) : (
              notifications.map((n) => (
                <li
                  key={n.id}
                  className="list-group-item list-group-item-action dropdown-notifications-item"
                >
                  <div className="d-flex">
                    <div className="flex-shrink-0 me-3">
                      <div className="avatar">
                        <span className="avatar-initial rounded-circle bg-label-info">
                          <i className="ti ti-bell"></i>
                        </span>
                      </div>
                    </div>
                    <div className="flex-grow-1">
                      <h6 className="mb-1 small">{n.title}</h6>
                      <small className="d-block text-body">{n.message}</small>
                      <small className="text-muted">
                        {new Date(n.created_at).toLocaleTimeString("tr-TR", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </small>
                    </div>
                  </div>
                </li>
              ))
            )}
          </ul>
        </li>
        <li className="border-top">
          <div className="d-grid p-3">
            <Link href="/notifications" className="btn btn-primary btn-sm">
              Bildirimleri Görüntüle
            </Link>
          </div>
        </li>
      </ul>
    </li>
  );
};

export default NavNotificationsTab;
