import { getConnection } from "./db";

export async function getAllUsers() {
  const connection = await getConnection();
  try {
    const [rows] = await connection.query("SELECT username FROM users");
    return rows;
  } finally {
    connection.release();
  }
}

export async function getUserByUsername(username) {
  const connection = await getConnection();
  try {
    const [rows] = await connection.query("SELECT * FROM users WHERE username = ?", [username]);
    return rows[0];
  } finally {
    connection.release();
  }
}