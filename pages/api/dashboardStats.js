// pages/api/dashboardStats.js

import { getConnection } from "../../utils/db";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Sadece GET metodu desteklenir." });
  }

  const { userId, role } = req.query;

  if (!userId || !role) {
    return res.status(400).json({ message: "userId ve role zorunludur." });
  }

  try {
    const db = await getConnection();
    let stats = [];

    const safeValue = (row, key, suffix = "") => {
      const val = row?.[key];
      return val !== null && val !== undefined
        ? `${val}${suffix}`
        : `0${suffix}`;
    };

    if (role === "student") {
      const [[dersler]] = await db.execute(
        "SELECT COUNT(*) as total FROM lessons WHERE student_id = ?",
        [userId]
      );
      const [[rezervasyon]] = await db.execute(
        "SELECT COUNT(*) as total FROM reservations WHERE student_id = ?",
        [userId]
      );
      const [[sure]] = await db.execute(
        "SELECT SUM(duration) as total FROM lessons WHERE student_id = ?",
        [userId]
      );
      const [[bildirim]] = await db.execute(
        "SELECT COUNT(*) as total FROM notifications WHERE user_id = ?",
        [userId]
      );

      stats = [
        {
          title: "Derslerim",
          icon: "ti ti-book",
          value: safeValue(dersler, "total"),
        },
        {
          title: "Rezervasyonlarım",
          icon: "ti ti-calendar",
          value: safeValue(rezervasyon, "total"),
        },
        {
          title: "Eğitim Süresi",
          icon: "ti ti-clock",
          value: safeValue(sure, "total", " Saat"),
        },
        {
          title: "Bildirimler",
          icon: "ti ti-bell",
          value: safeValue(bildirim, "total"),
        },
      ];
    } else if (role === "teacher") {
      const [[ogrenci]] = await db.execute(
        "SELECT COUNT(DISTINCT student_id) as total FROM lessons WHERE teacher_id = ?",
        [userId]
      );
      const [[ders]] = await db.execute(
        "SELECT COUNT(*) as total FROM lessons WHERE teacher_id = ?",
        [userId]
      );
      const [[kazanc]] = await db.execute(
        "SELECT SUM(payment) as total FROM lessons WHERE teacher_id = ?",
        [userId]
      );
      const [[bildirim]] = await db.execute(
        "SELECT COUNT(*) as total FROM notifications WHERE user_id = ?",
        [userId]
      );

      stats = [
        {
          title: "Öğrencilerim",
          icon: "ti ti-users",
          value: safeValue(ogrenci, "total"),
        },
        {
          title: "Planlanan Dersler",
          icon: "ti ti-calendar",
          value: safeValue(ders, "total"),
        },
        {
          title: "Kazanç",
          icon: "ti ti-currency-dollar",
          value: `$${safeValue(kazanc, "total")}`,
        },
        {
          title: "Bildirimler",
          icon: "ti ti-bell",
          value: safeValue(bildirim, "total"),
        },
      ];
    } else if (role === "admin") {
      const [[kullanici]] = await db.execute(
        "SELECT COUNT(*) as total FROM users"
      );
      const [[dersler]] = await db.execute(
        "SELECT COUNT(*) as total FROM lessons"
      );
      const [[kazanc]] = await db.execute(
        "SELECT SUM(price) as total FROM lessons"
      );
      const [[bildirim]] = await db.execute(
        "SELECT COUNT(*) as total FROM notifications"
      );

      stats = [
        {
          title: "Toplam Kullanıcı",
          icon: "ti ti-users",
          value: safeValue(kullanici, "total"),
        },
        {
          title: "Toplam Dersler",
          icon: "ti ti-book",
          value: safeValue(dersler, "total"),
        },
        {
          title: "Toplam Kazanç",
          icon: "ti ti-currency-dollar",
          value: `$${safeValue(kazanc, "total")}`,
        },
        {
          title: "Sistem Bildirimleri",
          icon: "ti ti-bell",
          value: safeValue(bildirim, "total"),
        },
      ];
    } else if (role === "parent") {
      const [[cocuklar]] = await db.execute(
        "SELECT COUNT(*) as total FROM users WHERE parent_id = ?",
        [userId]
      );
      const [[sure]] = await db.execute(
        "SELECT SUM(duration) as total FROM lessons WHERE parent_id = ?",
        [userId]
      );
      const [[ogretmen]] = await db.execute(
        "SELECT COUNT(DISTINCT teacher_id) as total FROM lessons WHERE parent_id = ?",
        [userId]
      );
      const [[bildirim]] = await db.execute(
        "SELECT COUNT(*) as total FROM notifications WHERE user_id = ?",
        [userId]
      );

      stats = [
        {
          title: "Çocuklarım",
          icon: "ti ti-user",
          value: safeValue(cocuklar, "total"),
        },
        {
          title: "Eğitim Süresi",
          icon: "ti ti-clock",
          value: safeValue(sure, "total", " Saat"),
        },
        {
          title: "Öğretmenler",
          icon: "ti ti-user-check",
          value: safeValue(ogretmen, "total"),
        },
        {
          title: "Bildirimler",
          icon: "ti ti-bell",
          value: safeValue(bildirim, "total"),
        },
      ];
    }

    db.release();
    res.status(200).json({ stats });
  } catch (error) {
    console.error("dashboardStats API hatası:", error.message);
    res.status(500).json({ message: "Sunucu hatası.", error: error.message });
  }
}
