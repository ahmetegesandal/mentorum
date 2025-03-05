import { getConnection } from "../../utils/db";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const { userId } = req.body;

  if (!userId) {
    return res.status(400).json({ message: "Kullanıcı ID gerekli." });
  }

  const connection = await getConnection();

  try {
    // Kullanıcıyı offline yap
    await connection.execute("UPDATE users SET is_online = 0 WHERE id = ?", [
      userId,
    ]);
    res.status(200).json({ message: "Çıkış başarılı!" });
  } catch (error) {
    console.error("Çıkış hatası:", error);
    res.status(500).json({ message: "Bir hata oluştu." });
  } finally {
    await connection.end();
  }
}
