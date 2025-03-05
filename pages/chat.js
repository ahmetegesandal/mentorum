import { useState, useEffect, useContext, useRef } from "react";
import { UserContext } from "../contexts/UserContext";
import io from "socket.io-client";
import axios from "axios";
import LayoutMenu from "../components/LayoutMenu";
import Navbar from "../components/Navbar";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const socket = io("http://localhost:3001");

const Chat = () => {
  const userData = useContext(UserContext);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [receiverId, setReceiverId] = useState(userData.id); // Alıcıyı buraya dinamik yapabilirsiniz
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { t } = useTranslation("common");

  const filteredUsers = users.filter((user) =>
    `${user.name} ${user.surname}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const chatEndRef = useRef(null);
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Kullanıcıların listesi (Kendi kullanıcılarınızı alın)
  useEffect(() => {
    axios
      .get("/api/users")
      .then((res) => setUsers(res.data))
      .catch((err) => console.error(err));

    // Kullanıcı kaydını yap
    socket.emit("register", userData.id);

    return () => {
      socket.off("receiveMessage");
    };
  }, [userData.id]);

  // Alıcıyı seçtikten sonra chat verisini almak
  useEffect(() => {
    if (!receiverId) return;

    // Chat geçmişini alalım
    axios
      .get(`/api/messages?sender_id=${userData.id}&receiver_id=${receiverId}`)
      .then((res) => setMessages(res.data))
      .catch((err) => console.error(err));

    // Odaya katıl (sender ve receiver ile doğru room'a katıl)
    socket.emit("joinRoom", {
      sender_id: userData.id,
      receiver_id: receiverId,
    });

    // Yeni mesajları dinle (sadece doğru odadaki mesajlar gelir)
    socket.on("receiveMessage", (message) => {
      if (
        message.sender_id === receiverId ||
        message.receiver_id === receiverId
      ) {
        setMessages((prev) => {
          if (!prev.some((msg) => msg.id === message.id)) {
            return [...prev, message];
          }
          return prev;
        });
      }
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, [userData.id, receiverId]);

  // Mesaj gönderme fonksiyonu
  const sendMessage = async () => {
    if (inputMessage.trim() === "") return;

    const messageData = {
      sender_id: userData.id,
      receiver_id: receiverId,
      message: inputMessage,
    };

    try {
      const response = await axios.post("/api/messages", messageData);
      socket.emit("sendMessage", response.data); // Mesajı doğru odada yer alan kullanıcıya gönder
      setMessages((prev) => [...prev, response.data]);
      setInputMessage("");
    } catch (error) {
      console.error(
        "Error sending message:",
        error.response?.data || error.message
      );
      alert(
        "Failed to send message: " +
          (error.response?.data?.error || error.message)
      );
    }
  };

  const [selectedUser, setSelectedUser] = useState(null);

  // Kullanıcının online/offline durumunu periyodik olarak güncelle
  useEffect(() => {
    const fetchUserStatus = async () => {
      if (!receiverId) return; // Eğer kullanıcı seçili değilse API çağrısı yapma

      try {
        const response = await fetch(`/api/users/${receiverId}/status`);
        if (!response.ok) throw new Error("Kullanıcı durumu alınamadı");

        const data = await response.json();
        setSelectedUser((prev) => ({
          ...prev,
          is_online: data.is_online,
        }));
      } catch (error) {
        console.error("Online durumu alınamadı:", error);
      }
    };

    fetchUserStatus();
    const interval = setInterval(fetchUserStatus, 5000); // Her 5 saniyede bir güncelle

    return () => clearInterval(interval); // Bellek sızıntısını önlemek için temizle
  }, [receiverId]);

  useEffect(() => {
    const foundUser = users.find((user) => user.id === receiverId);
    setSelectedUser(foundUser);
  }, [receiverId, users]);

  const formatDate = (timestamp) => {
    if (!timestamp) return "Just now";

    const date = new Date(timestamp);
    return date.toLocaleTimeString("tr-TR", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false, // 24 saat formatında göster
    });
  };

  const [onlineUsers, setOnlineUsers] = useState({});

  useEffect(() => {
    const fetchOnlineStatuses = async () => {
      try {
        const response = await fetch("/api/online-users");
        if (!response.ok) throw new Error("Online kullanıcılar alınamadı");

        const data = await response.json();
        const onlineStatusMap = {};
        data.forEach((user) => {
          onlineStatusMap[user.id] = user.is_online === 1;
        });

        setOnlineUsers(onlineStatusMap);
      } catch (error) {
        console.error("Online durumları çekerken hata oluştu:", error);
      }
    };

    fetchOnlineStatuses();
    const interval = setInterval(fetchOnlineStatuses, 5000); // Her 5 saniyede bir güncelle

    return () => clearInterval(interval); // Component unmount olursa temizle
  }, []);

  return (
    <>
      <LayoutMenu />
      <div className="layout-page">
        <Navbar />
        <div className="content-wrapper">
          <div className="container-xxl flex-grow-1 container-p-y">
            <div className="app-chat card overflow-hidden">
              <div className="row g-0">
                <div
                  className="col app-chat-contacts app-sidebar flex-grow-0 overflow-hidden border-end"
                  id="app-chat-contacts"
                >
                  <div className="sidebar-header h-px-75 px-5 border-bottom d-flex align-items-center">
                    <div className="d-flex align-items-center me-6 me-lg-0">
                      <div
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
                      </div>
                      <div className="flex-grow-1 input-group input-group-merge">
                        <span
                          className="input-group-text"
                          id="basic-addon-search31"
                        >
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

                  <div className="sidebar-body">
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
                                onlineUsers[user.id]
                                  ? "avatar-online"
                                  : "avatar-offline"
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
                                </h6>
                                <small className="text-muted">
                                  {formatDate(user.lastActive)}
                                </small>
                              </div>
                              <small className="chat-contact-status text-truncate">
                                {onlineUsers[user.id]
                                  ? "Çevrimiçi"
                                  : "Çevrimdışı"}
                              </small>
                            </div>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="col app-chat-history">
                  <div className="chat-history-wrapper">
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
                              selectedUser?.is_online === 1
                                ? "avatar-online"
                                : "avatar-offline"
                            }`}
                          >
                            <img
                              src={
                                `/img/avatars/${selectedUser?.photo}` ||
                                "img/avatars/default.png"
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
                              {selectedUser?.name +
                                " " +
                                selectedUser?.surname || "Select a user"}
                            </h6>
                            <small className="user-status text-body">
                              {selectedUser?.is_online == 1
                                ? "Çevrimiçi"
                                : "Çevrimdışı"}
                            </small>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      className="chat-history-body"
                      style={{ overflowY: "auto" }}
                    >
                      <ul className="list-unstyled chat-history">
                        {messages.map((msg, index) => (
                          <li
                            key={index}
                            className={`chat-message ${
                              msg.sender_id === userData.id
                                ? "chat-message-right"
                                : ""
                            }`}
                          >
                            <div className="d-flex overflow-hidden">
                              {/* Karşı tarafın mesajları için avatar */}
                              {msg.sender_id !== userData.id && (
                                <div className="user-avatar flex-shrink-0 me-4">
                                  <div className="avatar avatar-sm">
                                    <img
                                      src={
                                        `/img/avatars/${selectedUser?.photo}` ||
                                        "img/avatars/default.png"
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
                                    msg.sender_id === userData.id
                                      ? "text-end"
                                      : ""
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
                                        `/img/avatars/${userData.photo}` ||
                                        "img/avatars/default.png"
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
                        <div ref={chatEndRef} />
                      </ul>
                    </div>

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

                <div className="app-overlay"></div>
              </div>
            </div>
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

export default Chat;
