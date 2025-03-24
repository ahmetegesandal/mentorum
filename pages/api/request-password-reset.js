import { v4 as uuidv4 } from "uuid";
import { getConnection } from "../../utils/db";
import sendMail from "../../lib/sendMail";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { email } = req.body;
  console.log("📩 API çağrısı: Şifre sıfırlama isteği geldi", email);

  try {
    const db = await getConnection();
    console.log("✅ DB bağlantısı başarılı");

    const [user] = await db.query(
      "SELECT id FROM users WHERE email = ? LIMIT 1",
      [email]
    );

    if (!user.length) {
      console.log("ℹ️ Kullanıcı e-posta bulunamadı, ama yine de 200 döndü");
      return res.status(200).json({ success: true });
    }

    const token = uuidv4();
    const expiresAt = new Date(Date.now() + 30 * 60 * 1000);

    await db.query(
      "INSERT INTO password_reset_tokens (user_id, token, expires_at, created_at) VALUES (?, ?, ?, NOW())",
      [user[0].id, token, expiresAt]
    );
    console.log("🔐 Token veritabanına kaydedildi:", token);

    const resetLink = `http://localhost:3000/reset-password?token=${token}`;
    console.log("🔗 Sıfırlama linki:", resetLink);

    await sendMail({
      to: email,
      subject: "Şifre Sıfırlama",
      html: `<p>Şifrenizi değiştirmek için <a href="${resetLink}">şu bağlantıya</a> tıklayın.</p>`,
    });

    console.log("📤 E-posta gönderimi başarılı:", email);
    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("❌ Şifre sıfırlama isteği hatası:", err.message);
    console.error("📜 Stack:", err.stack);
    return res.status(500).json({ error: "Sunucu hatası" });
  }
}
