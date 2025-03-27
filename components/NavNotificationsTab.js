import React, { useState, useEffect } from 'react';
import { getNotifications } from '../utils/notificationsService';

const NavNotificationsTab = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      const res = await fetch("/api/notifications");
      const data = await res.json();
      setNotifications(data);
    };

    fetchNotifications();
    const interval = setInterval(fetchNotifications, 10000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:5000");

    socket.onmessage = (event) => {
      const newNotification = JSON.parse(event.data);
      setNotifications((prev) => [newNotification, ...prev]);
    };

    return () => socket.close();
  }, []);

  return (
    <li className="nav-item dropdown-notifications navbar-dropdown dropdown me-3 me-xl-2">
      <a
        className="nav-link btn btn-text-secondary btn-icon rounded-pill dropdown-toggle hide-arrow"
        href="#"
        data-bs-toggle="dropdown"
        data-bs-auto-close="outside"
        aria-expanded="false"
      >
        <span className="position-relative">
          <i className="ti ti-bell ti-md"></i>
          <span className="badge rounded-pill bg-danger badge-dot badge-notifications border"></span>
        </span>
      </a>
      <ul className="dropdown-menu dropdown-menu-end p-0 overflow-auto">
        <li className="dropdown-menu-header border-bottom">
          <div className="dropdown-header d-flex align-items-center py-3">
            <h6 className="mb-0 me-auto">Notification</h6>
            <div className="d-flex align-items-center h6 mb-0">
              <span className="badge bg-label-primary me-2">{notifications.length} New</span>
              <a
                href="#"
                className="btn btn-text-secondary rounded-pill btn-icon dropdown-notifications-all"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                title="Mark all as read"
              >
                <i className="ti ti-mail-opened text-heading"></i>
              </a>
            </div>
          </div>
        </li>
        <li className="dropdown-notifications-list scrollable-container">
          <ul className="list-group list-group-flush">
            {notifications.map((notification) => (
              <li key={notification.id} className="list-group-item list-group-item-action dropdown-notifications-item">
                <div className="d-flex">
                  <div className="flex-shrink-0 me-3">
                    <div className="avatar">
                      <span className="avatar-initial rounded-circle bg-label-danger">
                        <i className="ti ti-settings"></i>
                      </span>
                    </div>
                  </div>
                  <div className="flex-grow-1">
                    <h6 className="mb-1 small">{notification.title}</h6>
                    <small className="mb-1 d-block text-body">{notification.message}</small>
                    <small className="text-muted">{notification.date}</small>
                  </div>
                  <div className="flex-shrink-0 dropdown-notifications-actions">
                    <a href="#" className="dropdown-notifications-read">
                      <span className="badge badge-dot"></span>
                    </a>
                    <a href="#" className="dropdown-notifications-archive">
                      <span className="ti ti-x"></span>
                    </a>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </li>
        <li className="border-top">
          <div className="d-grid p-4">
            <a className="btn btn-primary btn-sm d-flex" href="/notifications">
              <small className="align-middle">View all notifications</small>
            </a>
          </div>
        </li>
      </ul>
    </li>
  );
};

export default NavNotificationsTab;