// pages/api/chatbot.js
export default function handler(req, res) {
  const flow = {
    start: {
      message: "Hoş geldiniz! Size nasıl yardımcı olabiliriz?",
      options: [
        { text: "Hesap Sorunu", next: "accountIssue" },
        { text: "Teknik Destek", next: "techSupport" },
        { text: "Canlı Destek", next: "contactAdmin" },
        { text: "Bilet Sayfası", next: "ticketPage" }
      ]
    },
    accountIssue: {
      message: "Hesapla ilgili hangi konuda yardıma ihtiyacınız var?",
      options: [
        { text: "Şifre sıfırlama işlemi", next: "ticketPage" },
        { text: "Hesap askıya alındı", next: "emailSupport" },
        { text: "Geri dön", next: "start" }
      ]
    },
    techSupport: {
      message: "Teknik sorunla ilgili hangi konuyu yaşıyorsunuz?",
      options: [
        { text: "Uygulama açılmıyor", next: "ticketPage" },
        { text: "Hata mesajı alıyorum", next: "ticketPage" },
        { text: "Geri dön", next: "start" }
      ]
    },
    contactAdmin: {
      message: "Destek ekibiyle iletişime yönlendiriliyorsunuz...",
      action: "mailto:destek@ornek.com"
    },
    ticketPage: {
      message: "Bilet sayfasına yönlendiriliyorsunuz...",
      action: "/tickets"
    },
    emailSupport: {
      message: "Lütfen destek maili atın: destek@ornek.com"
    }
  };

  const { step } = req.body;
  res.status(200).json(flow[step] || { message: "Tanımlanmamış adım" });
}