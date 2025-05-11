import { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import axios from "axios";

const Picker = dynamic(() => import("emoji-picker-react"), { ssr: false });

const ChatHistory = ({
  userData,
  messages,
  selectedUser,
  formatDate,
  inputMessage,
  setInputMessage,
  sendMessage,
  chatEndRef
}) => {
  useEffect(() => {
    chatEndRef?.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  const [isAtBottom, setIsAtBottom] = useState(true);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const fileInputRef = useRef();
  const chatHistoryBodyRef = useRef(null);

  

  useEffect(() => {
    if (chatHistoryBodyRef.current) {
      chatHistoryBodyRef.current.scrollTop = chatHistoryBodyRef.current.scrollHeight;
    }
  }, [messages]);

  
const handleScroll = () => {
  const chatHistory = chatHistoryBodyRef.current;
  setIsAtBottom(
    chatHistory.scrollHeight === chatHistory.scrollTop + chatHistory.clientHeight
  );
};

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
  
    const formData = new FormData();
    formData.append("file", file);
  
    try {
      const res = await axios.post("/api/messages/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
  
      console.log("🟢 Upload response:", res.data);
  
      const { url, name, previewType } = res.data;
  
      const messageContent =
        previewType === "image"
          ? `<img src="${url}" alt="${name}" style="max-width: 200px" />`
          : previewType === "video"
          ? `<video controls style="max-width: 200px"><source src="${url}" /></video>`
          : previewType === "audio"
          ? `<audio controls src="${url}"></audio>`
          : `<a href="${url}" target="_blank">${name}</a>`;
  
      console.log("📤 Sending messageContent:", messageContent);
      sendMessage(messageContent);
    } catch (err) {
      console.error("🔴 Dosya gönderim hatası:", err);
    }
  };
  

  const onEmojiClick = (emojiData) => {
    setInputMessage((prev) => prev + emojiData.emoji);
  };

  return (
    <div className="col app-chat-history">
      <div className="chat-history-wrapper">
        <div className="chat-history-header border-bottom">
          <div className="d-flex align-items-center">
            <div className={`avatar ${selectedUser?.is_online ? "avatar-online" : "avatar-offline"}`}>
              <img
                src={selectedUser?.photo ? `/img/avatars/${selectedUser.photo}` : "/img/avatars/default.png"}
                alt="Avatar"
                className="rounded-circle"
              />
            </div>
            <div className="ms-3">
              <h6 className="m-0">{selectedUser?.name} {selectedUser?.surname} {selectedUser?.id === userData.id && "(Kendim)"}</h6>
              <small>{selectedUser?.is_online ? "Çevrimiçi" : "Çevrimdışı"}</small>
            </div>
          </div>
        </div>

        <div className="chat-history-body" id="chat-history-body" ref={chatHistoryBodyRef} onScroll={handleScroll}   style={{ overflowY: 'auto' }} // scroll'u aktif etmek için ekleyin
>
          <ul className="list-unstyled chat-history">
            {messages.map((msg, index) => (
              <li
                key={index}
                className={`chat-message ${msg.sender_id === userData.id ? "chat-message-right" : ""}`}
              >
                <div className="d-flex">
                  {msg.sender_id !== userData.id && (
                    <div className="avatar me-3">
                      <img
                        src={selectedUser?.photo ? `/img/avatars/${selectedUser.photo}` : "/img/avatars/default.png"}
                        alt="Avatar"
                        className="rounded-circle"
                      />
                    </div>
                  )}
                  <div className="chat-message-wrapper flex-grow-1">
                    <div className="chat-message-text">
                      <p
                        className="mb-0"
                        dangerouslySetInnerHTML={{ __html: msg.message }}
                      />
                      {console.log("🧾 Mesaj içeriği:", msg.message)}
                    </div>
                    <div className={`text-muted mt-1 ${msg.sender_id === userData.id ? "text-end" : ""}`}>
                      {msg.sender_id === userData.id && (
                        <i className="ti ti-checks ti-16px text-success me-1"></i>
                      )}
                      <small>{formatDate(msg.created_at)}</small>
                    </div>
                  </div>
                  {msg.sender_id === userData.id && (
                    <div className="avatar ms-3">
                      <img
                        src={userData.photo ? `/img/avatars/${userData.photo}` : "/img/avatars/default.png"}
                        alt="Avatar"
                        className="rounded-circle"
                      />
                    </div>
                  )}
                </div>
              </li>
              
            ))}
            <div ref={chatEndRef} />
          </ul>
        </div>

        <div className="chat-history-footer shadow-xs position-relative">
        <form
            className="form-send-message d-flex align-items-center gap-2 position-relative p-2"
            onSubmit={(e) => {
              e.preventDefault();
              sendMessage();
            }}
          >
            {/* Dosya Input - Gizli */}
            <input
              type="file"
              ref={fileInputRef}
              className="d-none"
              onChange={handleFileUpload}
            />

            {/* Kısayol: Dosya simgesi */}
            <button
              type="button"
              className="btn btn-icon btn-outline-secondary rounded-circle"
              onClick={() => fileInputRef.current.click()}
              aria-label="Dosya Ekle"
            >
              <i className="ti ti-paperclip"></i>
            </button>

            {/* Kısayol: Emoji */}
            <button
              type="button"
              className="btn btn-icon btn-outline-secondary rounded-circle"
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              aria-label="Emoji Seç"
            >
              <i className="ti ti-mood-smile"></i>
            </button>

            {/* Emoji seçici */}
            {showEmojiPicker && (
              <div
                style={{
                  position: "absolute",
                  bottom: "60px",
                  right: "70px",
                  zIndex: 1000,
                }}
              >
                <Picker
                  onEmojiClick={onEmojiClick}
                  lazyLoadEmojis={true}
                  height={300}
                  width={250}
                />
              </div>
            )}

            {/* Mesaj alanı */}
            <input
              type="text"
              className="form-control shadow-none"
              placeholder="Mesaj yaz..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
            />

            {/* Gönder Butonu */}
            <button
              type="submit"
              className="btn btn-primary d-flex align-items-center gap-1"
              aria-label="Mesaj Gönder"
            >
              <i className="ti ti-send ti-16px"></i>
              <span className="d-none d-md-inline">Gönder</span>
            </button>
          </form>

        </div>
      </div>
    </div>
  );
};

export default ChatHistory;
