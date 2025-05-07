// components/ChatbotWidget.js
import { useEffect, useState } from 'react';
import styles from './ChatbotWidget.module.css';

export default function ChatbotWidget() {
  const [visible, setVisible] = useState(false);
  const [step, setStep] = useState('start');
  const [chatData, setChatData] = useState(null);

  useEffect(() => {
    fetch('/api/chatbot', {
      method: 'POST',
      body: JSON.stringify({ step }),
      headers: { 'Content-Type': 'application/json' },
    })
      .then(res => res.json())
      .then(data => setChatData(data));
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
      <button className={styles.toggleBtn} onClick={() => setVisible(!visible)}>💬</button>
      {visible && chatData && (
        <div className={styles.chatBox}>
          <p>{chatData.message}</p>
          {chatData.options?.map((opt, idx) => (
            <button key={idx} onClick={() => handleOptionClick(opt.next)}>{opt.text}</button>
          ))}
        </div>
      )}
    </div>
  );
}
