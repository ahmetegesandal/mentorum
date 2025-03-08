import { nanoid } from "nanoid";

export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { lessonId, teacherId } = req.body;

  if (!lessonId || !teacherId) {
    return res.status(400).json({ error: "Eksik parametreler!" });
  }

  // 🚀 Her ders için benzersiz bir oda ismi oluştur
  const roomName = `Lesson-${lessonId}-${teacherId}-${nanoid(8)}`;

  // 🔥 Jitsi toplantısını bizim Next.js uygulamamızda açacak URL
  const meetingUrl = `/meeting/${roomName}`;

  return res.status(200).json({ roomName, meetingUrl });
}
