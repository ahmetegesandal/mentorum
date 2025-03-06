import { getConnection } from "../../utils/db";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { sender_id, receiver_id, message } = req.body;

    // Validate input
    if (!sender_id || !receiver_id || !message) {
      return res
        .status(400)
        .json({ error: "Missing fields: sender_id, receiver_id, message" });
    }

    let connection;
    try {
      connection = await getConnection(); // Ensure proper database connection handling

      // Insert the message into the database
      const [result] = await connection.execute(
        "INSERT INTO messages (sender_id, receiver_id, message) VALUES (?, ?, ?)",
        [sender_id, receiver_id, message]
      );

      // Send the response after successful insertion
      return res.status(201).json({
        id: result.insertId,
        sender_id,
        receiver_id,
        message,
        created_at: new Date(),
      });
    } catch (error) {
      console.error("Database error:", error.message);
      return res
        .status(500)
        .json({ error: "Database error: " + error.message });
    } finally {
      if (connection) {
        connection.release(); // Ensure that connection is released
      }
    }
  }

  if (req.method === "GET") {
    const { sender_id, receiver_id } = req.query;

    // Validate input query parameters
    if (!sender_id || !receiver_id) {
      return res
        .status(400)
        .json({ error: "Missing sender_id or receiver_id" });
    }

    let connection;
    try {
      connection = await getConnection(); // Ensure proper database connection handling

      // Retrieve messages between the sender and receiver
      const [messages] = await connection.execute(
        "SELECT * FROM messages WHERE (sender_id = ? AND receiver_id = ?) OR (sender_id = ? AND receiver_id = ?) ORDER BY created_at ASC",
        [sender_id, receiver_id, receiver_id, sender_id]
      );

      // Return the retrieved messages
      return res.status(200).json(messages);
    } catch (error) {
      console.error("Database error:", error.message);
      return res
        .status(500)
        .json({ error: "Database error: " + error.message });
    } finally {
      if (connection) {
        connection.release(); // Ensure that connection is released
      }
    }
  }

  // Handle unsupported HTTP methods
  res.setHeader("Allow", ["GET", "POST"]);
  return res.status(405).end(`Method ${req.method} Not Allowed`);
}
