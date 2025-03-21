import { useState } from "react";

const SidebarContacts = ({
  userData,
  users,
  receiverId,
  setReceiverId,
  searchTerm,
  setSearchTerm,
  onlineUsers,
  lastMessages,
  formatDate,
}) => {
  const filteredUsers = users.filter((user) =>
    `${user.name} ${user.surname}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <div
      className="col app-chat-contacts app-sidebar flex-grow-0 overflow-hidden border-end"
      id="app-chat-contacts"
    >
      <div className="sidebar-header h-px-75 px-5 border-bottom d-flex align-items-center">
        <div className="d-flex align-items-center me-6 me-lg-0">
          {/* gereksiz bir alan şuanlık ilerde bakılır */}
          {/*<div
            className="flex-shrink-0 avatar avatar-online me-4"
            data-bs-toggle="sidebar"
            data-overlay="app-overlay-ex"
            data-target="#app-chat-sidebar-left"
          >
            <img
              className="user-avatar rounded-circle cursor-pointer"
              src={
                userData?.photo
                  ? `/img/avatars/${userData.photo}`
                  : "/img/avatars/default.png"
              }
              alt="Avatar"
            />
          </div>*/}
          <div className="flex-grow-1 input-group input-group-merge">
            <span className="input-group-text" id="basic-addon-search31">
              <i className="ti ti-search"></i>
            </span>
            <input
              type="text"
              className="form-control chat-search-input"
              placeholder="Search..."
              aria-label="Search..."
              aria-describedby="basic-addon-search31"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* ✅ Kullanıcı Listesi */}
      <div className="sidebar-body overflow-auto">
        <ul
          className="list-unstyled chat-contact-list py-2 mb-0"
          id="chat-list"
        >
          <li className="chat-contact-list-item chat-contact-list-item-title mt-0">
            <h5 className="text-primary mb-0">Chats</h5>
          </li>
          <li className="chat-contact-list-item chat-list-item-0 d-none">
            <h6 className="text-muted mb-0">No Chats Found</h6>
          </li>
          {filteredUsers.map((user) => (
            <li
              key={user.id}
              className={`chat-contact-list-item mb-1 ${
                receiverId === user.id ? "active" : ""
              }`}
              onClick={() => setReceiverId(user.id)}
            >
              <a className="d-flex align-items-center">
                <div
                  className={`flex-shrink-0 avatar ${
                    onlineUsers[user.id] ? "avatar-online" : "avatar-offline"
                  }`}
                >
                  <img
                    src={
                      user.photo
                        ? `/img/avatars/${user.photo}`
                        : "/img/avatars/default.png"
                    }
                    alt="Avatar"
                    className="rounded-circle"
                  />
                </div>
                <div className="chat-contact-info flex-grow-1 ms-4">
                  <div className="d-flex justify-content-between align-items-center">
                    <h6 className="chat-contact-name text-truncate m-0 fw-normal">
                      {user.name} {user.surname}
                      {user.id === userData?.id && " (Kendim)"}
                    </h6>
                    <small className="text-muted">
                      {lastMessages[user.id]
                        ? formatDate(lastMessages[user.id])
                        : "Yok"}
                    </small>
                  </div>
                  <small className="chat-contact-status text-truncate">
                    {onlineUsers[user.id] ? "Çevrimiçi" : "Çevrimdışı"}
                  </small>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SidebarContacts;
