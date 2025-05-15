import { useState, useEffect, useContext, useRef } from "react";
import { UserContext } from "../contexts/UserContext";
import io from "socket.io-client";
import axios from "axios";
import LayoutMenu from "../components/LayoutMenu";
import Navbar from "../components/Navbar";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import SidebarContacts from "../components/SidebarContacts";
import ChatHistory from "../components/ChatHistory";

const socket = io("http://localhost:3001");

const Chat = () => {
  const userData = useContext(UserContext);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [receiverId, setReceiverId] = useState(userData.id);
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { t } = useTranslation("common");
  const [lastMessages, setLastMessages] = useState({});

  const filteredUsers = users.filter((user) =>
    `${user.name} ${user.surname}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const chatEndRef = useRef(null);
  const messageSound = useRef(new Audio("/sounds/message.mp3"));

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

  useEffect(() => {
    if (!receiverId) return;

    axios
      .get(`/api/messages?sender_id=${userData.id}&receiver_id=${receiverId}`)
      .then((res) => setMessages(res.data))
      .catch((err) => console.error(err));

    socket.emit("joinRoom", {
      sender_id: userData.id,
      receiver_id: receiverId,
    });

    socket.on("receiveMessage", (message) => {
      if (
        message.sender_id === receiverId ||
        message.receiver_id === receiverId
      ) {
        setMessages((prev) => {
          if (!prev.some((msg) => msg.id === message.id)) {
            messageSound.current.play().catch(err => {
              console.error("Ses çalarken hata oluştu:", err);
            });
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

  useEffect(() => {
    const fetchMessages = () => {
      axios
        .get(`/api/messages/all?user_id=${userData.id}`)
        .then((res) => {
          const lastMessageMap = {};
          res.data.forEach((message) => {
            const contactId =
              message.sender_id === userData.id
                ? message.receiver_id
                : message.sender_id;
            if (
              !lastMessageMap[contactId] ||
              new Date(message.created_at) > new Date(lastMessageMap[contactId])
            ) {
              lastMessageMap[contactId] = message.created_at;
            }
          });
          setLastMessages(lastMessageMap);

          // Kullanıcı listesini son mesaj zamanına göre sıralayalım
          setUsers((prevUsers) =>
            [...prevUsers].sort((a, b) => {
              const timeA = lastMessageMap[a.id]
                ? new Date(lastMessageMap[a.id])
                : new Date(0);
              const timeB = lastMessageMap[b.id]
                ? new Date(lastMessageMap[b.id])
                : new Date(0);
              return timeB - timeA; // En son mesaj atanı en üste al
            })
          );
        })
        .catch((err) => console.error("Mesajları çekerken hata oluştu:", err));
    };

    // İlk çağrıyı hemen yap
    fetchMessages();

    // Her 5 saniyede bir API'yi çağır
    const interval = setInterval(fetchMessages, 500);

    // Cleanup (Bileşen unmount olursa interval'i temizle)
    return () => clearInterval(interval);
  }, [userData.id]);

  const sendMessage = async (messageOverride) => {
    const messageToSend = messageOverride ?? inputMessage;
    console.log("🚀 sendMessage çağrıldı:", messageToSend);
  
    if (messageToSend.trim() === "") return;
  
    const messageData = {
      sender_id: userData.id,
      receiver_id: receiverId,
      sender_name: `${userData.name} ${userData.surname}`,
      message: messageToSend,
    };
  
    try {
      const response = await axios.post("/api/messages", messageData);
      console.log("✅ Mesaj veritabanına kaydedildi:", response.data);
      socket.emit("sendMessage", response.data);
      setMessages((prev) => [...prev, response.data]);
      setInputMessage("");
    } catch (error) {
      console.error("❌ sendMessage error:", error.response?.data || error.message);
    }
  };
  
  

  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const fetchUserStatus = async () => {
      if (!receiverId) return;

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
    const interval = setInterval(fetchUserStatus, 5000);

    return () => clearInterval(interval);
  }, [receiverId]);

  useEffect(() => {
    const foundUser = users.find((user) => user.id === receiverId);
    setSelectedUser(foundUser);
  }, [receiverId, users]);

  const formatDate = (timestamp) => {
    if (!timestamp) return "Just now"; // Eğer veri yoksa, varsayılan değer olarak "Just now" göster.

    const date = new Date(timestamp);
    return `${date.getHours().toString().padStart(2, "0")}:${date
      .getMinutes()
      .toString()
      .padStart(2, "0")}`;
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
    const interval = setInterval(fetchOnlineStatuses, 5000);

    return () => clearInterval(interval);
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
                <SidebarContacts
                  userData={userData}
                  users={[...users].sort((a, b) => {
                    const timeA = lastMessages[a.id]
                      ? new Date(lastMessages[a.id])
                      : new Date(0);
                    const timeB = lastMessages[b.id]
                      ? new Date(lastMessages[b.id])
                      : new Date(0);
                    return timeB - timeA; // En son mesaj atan en üstte olacak
                  })}
                  receiverId={receiverId}
                  setReceiverId={setReceiverId}
                  searchTerm={searchTerm}
                  setSearchTerm={setSearchTerm}
                  onlineUsers={onlineUsers}
                  lastMessages={lastMessages} // 🆕 Son mesaj saatlerini geçiriyoruz
                  formatDate={formatDate}
                />

                <ChatHistory
                  userData={userData}
                  messages={messages}
                  selectedUser={selectedUser}
                  formatDate={formatDate}
                  inputMessage={inputMessage}
                  setInputMessage={setInputMessage}
                  sendMessage={sendMessage}
                  chatEndRef={chatEndRef}

                />

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
