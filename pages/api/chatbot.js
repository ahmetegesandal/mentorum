// pages/api/chatbot.js
export default function handler(req, res) {
    const flow = {
      start: {
        message: "Lütfen bir seçenek seçin:",
        options: [
          { text: "Hesap sorunu", next: "accountIssue" },
          { text: "Teknik destek", next: "techSupport" },
          { text: "Canlı destek", next: "contactAdmin" }
        ]
      },
      accountIssue: {
        message: "Hesapla ilgili sorun nedir?",
        options: [
          { text: "Şifre sıfırlama", next: "ticketPage" },
          { text: "Hesap askıya alındı", next: "emailSupport" }
        ]
      },
      techSupport: {
        message: "Teknik destek seçenekleri:",
        options: [
          { text: "Uygulama açılmıyor", next: "ticketPage" },
          { text: "Hata alıyorum", next: "ticketPage" }
        ]
      },
      contactAdmin: {
        message: "Yetkiliye yönlendiriliyorsunuz...",
        action: "mailto:destek@ornek.com"
      },
      ticketPage: {
        message: "Bilet sayfasına yönlendiriliyorsunuz...",
        action: "/tickets"
      },
      emailSupport: {
        message: "Mail atabilirsiniz: destek@ornek.com"
      }
    };
  
    const { step } = req.body;
    res.status(200).json(flow[step] || { message: "Bilinmeyen adım" });
  }
  