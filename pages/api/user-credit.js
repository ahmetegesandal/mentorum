import { getConnection } from "../../utils/db";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { user_id } = req.query;

  if (!user_id) {
    return res.status(400).json({ error: "User ID eksik!" });
  }

  let db;
  try {
    db = await getConnection();
    const [user] = await db.execute("SELECT credit FROM users WHERE id = ?", [
      user_id,
    ]);

    if (!user.length) {
      return res
        .status(404)
        .json({ error: "Kullanıcı bulunamadı.", credit: 0 });
    }

    res.status(200).json({ credit: user[0].credit });
  } catch (error) {
    console.error("❌ API Hatası:", error);
    res
      .status(500)
      .json({ error: "Kredi bilgisi çekilirken hata oluştu.", credit: 0 });
  } finally {
    if (db) db.release();
  }
}
