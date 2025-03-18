import { useState, useEffect } from "react";

const ChatHistory = ({
  userData,
  messages,
  selectedUser,
  formatDate,
  inputMessage,
  setInputMessage,
  sendMessage,
}) => {
  const [isAtBottom, setIsAtBottom] = useState(true);

  useEffect(() => {
    if (isAtBottom) {
      // Scroll to bottom when new messages are added
      const chatHistory = document.getElementById("chat-history-body");
      chatHistory.scrollTop = chatHistory.scrollHeight;
    }
  }, [messages, isAtBottom]);

  const handleScroll = () => {
    const chatHistory = document.getElementById("chat-history-body");
    setIsAtBottom(
      chatHistory.scrollHeight ===
        chatHistory.scrollTop + chatHistory.clientHeight
    );
  };

  return (
    <div className="col app-chat-history">
      <div className="chat-history-wrapper">
        {/* Header */}
        <div className="chat-history-header border-bottom">
          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex overflow-hidden align-items-center">
              <i
                className="ti ti-menu-2 ti-lg cursor-pointer d-lg-none d-block me-4"
                data-bs-toggle="sidebar"
                data-overlay
                data-target="#app-chat-contacts"
              ></i>
              <div
                className={`flex-shrink-0 avatar ${
                  selectedUser?.is_online ? "avatar-online" : "avatar-offline"
                }`}
              >
                <img
                  src={
                    selectedUser?.photo
                      ? `/img/avatars/${selectedUser.photo}`
                      : "/img/avatars/default.png"
                  }
                  alt="Avatar"
                  className="rounded-circle"
                  data-bs-toggle="sidebar"
                  data-overlay
                  data-target="#app-chat-sidebar-right"
                />
              </div>
              <div className="chat-contact-info flex-grow-1 ms-4">
                <h6 className="m-0 fw-normal">
                  {selectedUser?.name || "Select a user"}{" "}
                  {selectedUser?.surname || "Select a user"}
                </h6>
                <small className="user-status text-body">
                  {selectedUser?.is_online ? "Çevrimiçi" : "Çevrimdışı"}
                </small>
              </div>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div
          className="chat-history-body"
          style={{ overflowY: "auto" }}
          id="chat-history-body"
          onScroll={handleScroll}
        >
          <ul className="list-unstyled chat-history">
            {messages.map((msg, index) => (
              <li
                key={index}
                className={`chat-message ${
                  msg.sender_id === userData.id ? "chat-message-right" : ""
                }`}
              >
                <div className="d-flex overflow-hidden">
                  {/* Karşı tarafın mesajları için avatar */}
                  {msg.sender_id !== userData.id && (
                    <div className="user-avatar flex-shrink-0 me-4">
                      <div className="avatar avatar-sm">
                        <img
                          src={
                            selectedUser?.photo
                              ? `/img/avatars/${selectedUser.photo}`
                              : "/img/avatars/default.png"
                          }
                          alt="Avatar"
                          className="rounded-circle"
                        />
                      </div>
                    </div>
                  )}

                  <div className="chat-message-wrapper flex-grow-1">
                    <div className="chat-message-text">
                      <p className="mb-0">{msg.message}</p>
                    </div>
                    <div
                      className={`text-muted mt-1 ${
                        msg.sender_id === userData.id ? "text-end" : ""
                      }`}
                    >
                      {msg.sender_id === userData.id && (
                        <i className="ti ti-checks ti-16px text-success me-1"></i>
                      )}
                      <small>{formatDate(msg.created_at)}</small>
                    </div>
                  </div>

                  {/* Kullanıcının kendi mesajları için avatar sağ tarafta */}
                  {msg.sender_id === userData.id && (
                    <div className="user-avatar flex-shrink-0 ms-4">
                      <div className="avatar avatar-sm">
                        <img
                          src={
                            userData.photo
                              ? `/img/avatars/${userData.photo}`
                              : "/img/avatars/default.png"
                          }
                          alt="Avatar"
                          className="rounded-circle"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Footer - Mesaj Gönderme Alanı */}
        <div className="chat-history-footer shadow-xs">
          <form
            className="form-send-message d-flex justify-content-between align-items-center"
            onSubmit={(e) => {
              e.preventDefault();
              sendMessage();
            }}
          >
            <input
              type="text"
              className="form-control message-input border-0 me-4 shadow-none"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Type a message..."
            />
            <div className="message-actions d-flex align-items-center">
              <button
                type="submit"
                className="btn btn-primary d-flex send-msg-btn"
              >
                <span className="align-middle d-md-inline-block d-none">
                  Send
                </span>
                <i className="ti ti-send ti-16px ms-md-2 ms-0"></i>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatHistory;
