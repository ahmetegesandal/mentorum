// components/ChatbotWidget.js
import { useEffect, useState } from 'react';
import Image from 'next/image';
import styles from './ChatbotWidget.module.css';

export default function ChatbotWidget() {
  const [visible, setVisible] = useState(false);
  const [step, setStep] = useState('start');
  const [chatData, setChatData] = useState(null);
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    setTyping(true);
    fetch('/api/chatbot', {
      method: 'POST',
      body: JSON.stringify({ step }),
      headers: { 'Content-Type': 'application/json' },
    })
      .then(res => res.json())
      .then(data => {
        setTimeout(() => {
          setChatData(data);
          setTyping(false);
        }, 500); // yazma efekti gecikmesi
      });
  }, [step]);

  const handleOptionClick = (next) => {
    if (chatData.action) {
      if (chatData.action.startsWith('mailto:')) {
        window.location.href = chatData.action;
      } else {
        window.location.href = chatData.action;
      }
    } else {
      setStep(next);
    }
  };

  return (
    <div className={styles.container}>
      <button className={styles.toggleBtn} onClick={() => setVisible(!visible)}>
        <Image
          src="/img/chatbot.png"
          alt="Chatbot"
          width={96}
          height={96}
        />
      </button>
      {visible && chatData && (
        <div className={styles.chatBox}>
          <button
            onClick={() => setVisible(false)}
            className={styles.closeBtn}
            aria-label="Kapat"
          >
            ×
          </button>
          <div className={styles.chatBoxContent}>
            <div className={styles.chatBubble}>
              {typing ? <span className={styles.typing}>Yazıyor...</span> : <p className={styles.chatMessage}>{chatData.message}</p>}
            </div>
            <div className={styles.buttonGroup}>
              {chatData.options?.map((opt, idx) => (
                <button key={idx} className={styles.optionButton} onClick={() => handleOptionClick(opt.next)}>
                  {opt.text}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}