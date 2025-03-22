import { getConnection } from "../../../utils/db";

export default async function handler(req, res) {
  if (req.method !== "PUT") {
    console.log("❌ Invalid method:", req.method);
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { room } = req.body;

  if (!room) {
    console.log("❌ No room provided");
    return res.status(400).json({ message: "Missing room identifier" });
  }

  try {
    console.log("🔍 Updating live class with meeting_link:", room);
    const connection = await getConnection();

    const [result] = await connection.execute(
      `UPDATE live_classes SET status = ? WHERE meeting_link = ?`,
      ["completed", room]
    );

    console.log("📊 Rows affected:", result.affectedRows);

    if (result.affectedRows === 0) {
      console.log("❗ No live class matched the given meeting_link.");
      return res.status(404).json({ message: "Live class not found" });
    }

    res.status(200).json({ message: "Class marked as completed" });
  } catch (error) {
    console.error("💥 DB Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
