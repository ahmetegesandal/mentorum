import React, { useEffect, useState } from 'react';
import { getNotifications } from '../utils/notificationsService';

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    async function fetchNotifications() {
      const data = await getNotifications();
      setNotifications(data);
    }

    fetchNotifications();
  }, []);

  const markAsRead = async (id) => {
    await fetch(`/api/notifications/${id}/read`, { method: 'PUT' });
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, is_read: true } : n)));
  };

  return (
    <div className="container">
      <h1>Notifications</h1>
      <ul className="list-group">
        {notifications.map((notification) => (
          <li key={notification.id} className="list-group-item">
            <div className="d-flex justify-content-between">
              <div>
                <h6>{notification.title}</h6>
                <p>{notification.message}</p>
                <small className="text-muted">{notification.date}</small>
              </div>
              <div>
                <button
                  className="btn btn-sm btn-primary"
                  onClick={() => markAsRead(notification.id)}
                  disabled={notification.is_read}
                >
                  {notification.is_read ? 'Read' : 'Mark as read'}
                </button>
                <button className="btn btn-sm btn-danger">Delete</button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NotificationsPage;