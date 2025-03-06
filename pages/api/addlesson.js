import { getConnection } from "../../utils/db";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { teacher_id, category_id, title, description, price, language } =
    req.body;

  if (
    !teacher_id ||
    !category_id ||
    !title ||
    !description ||
    !price ||
    !language
  ) {
    return res.status(400).json({ error: "Tüm alanlar zorunludur." });
  }

  try {
    const db = await getConnection();
    const query = `
      INSERT INTO lessons (teacher_id, category_id, title, description, price, language)
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    await db.execute(query, [
      teacher_id,
      category_id,
      title,
      description,
      price,
      language,
    ]);
    res.status(200).json({ message: "Ders başarıyla eklendi" });
  } catch (error) {
    console.error("Veritabanı hatası:", error);
    res
      .status(500)
      .json({ error: "Ders eklenirken hata oluştu: " + error.message });
  }
}
