// pages/api/verify-recaptcha.js

const RECAPTCHA_ENABLED = true; // ⬅️ Burayı kolayca aç/kapat

export default async function handler(req, res) {
  const { token } = req.body;

  if (!RECAPTCHA_ENABLED) {
    return res.status(200).json({ success: true }); // Testte bypass
  }

  const secretKey = process.env.RECAPTCHA_SECRET_KEY;

  try {
    const response = await fetch(
      "https://www.google.com/recaptcha/api/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `secret=${secretKey}&response=${token}`,
      }
    );

    const data = await response.json();

    if (!data.success) {
      return res.status(400).json({
        success: false,
        message: "reCAPTCHA doğrulaması başarısız.",
      });
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("reCAPTCHA doğrulama hatası:", err);
    return res.status(500).json({ success: false, message: "Sunucu hatası" });
  }
}
