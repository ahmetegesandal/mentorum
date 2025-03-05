import bcrypt from "bcrypt";
import { getConnection } from "../../utils/db";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const db = await getConnection();

  try {
    const { username, email, password, role, expertise } = req.body;

    if (!username || !email || !password || !role) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Check if the user already exists
    const [existingUser] = await db.execute(
      "SELECT id FROM users WHERE username = ? OR email = ?",
      [username, email]
    );

    if (existingUser.length > 0) {
      return res.status(400).json({ error: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user into the users table
    const [userResult] = await db.execute(
      "INSERT INTO users (username, email, password, role, created_at) VALUES (?, ?, ?, ?, NOW())",
      [username, email, hashedPassword, role]
    );

    const userId = userResult.insertId; // Get newly inserted user ID

    // Insert role-specific data
    if (role === "teacher") {
      await db.execute(
        "INSERT INTO teachers (user_id, expertise) VALUES (?, ?)",
        [userId, expertise || null]
      );
    } else if (role === "student") {
      await db.execute("INSERT INTO students (user_id, grade) VALUES (?, ?)", [
        userId,
        "",
      ]); // Default grade can be set
    } else if (role === "parent") {
      await db.execute("INSERT INTO parents (parent_id) VALUES (?)", [userId]);
    }

    res.status(201).json({ message: "User registered successfully", userId });
  } catch (error) {
    console.error("Registration Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    db.end();
  }
}
