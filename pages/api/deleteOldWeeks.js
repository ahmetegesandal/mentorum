// pages/api/deleteOldWeeks.js

import { getConnection } from "../../utils/db";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res
      .status(405)
      .json({ message: "Yalnızca POST metodu desteklenir." });
  }

  try {
    const { teacherId } = req.body;

    if (!teacherId) {
      return res.status(400).json({ message: "Öğretmen ID gerekli." });
    }

    const now = new Date();
    const currentWeekStart = new Date(
      now.setDate(now.getDate() - now.getDay())
    );
    const weekStartDate = currentWeekStart.toISOString().split("T")[0]; // YYYY-MM-DD formatı

    const db = await getConnection();

    const [result] = await db.execute(
      `DELETE FROM calendar WHERE teacher_id = ? AND date < STR_TO_DATE(?, '%Y-%m-%d')`,
      [teacherId, weekStartDate]
    );

    return res
      .status(200)
      .json({ message: "Önceki haftalara ait tüm kayıtlar silindi." });
  } catch (error) {
    console.error("Silme hatası:", error);
    return res.status(500).json({ message: "Sunucu hatası oluştu." });
  }
}
