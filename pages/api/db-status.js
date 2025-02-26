import { getConnection } from "../../utils/db";

export default async function handler(req, res) {
  try {
    const connection = await getConnection();
    connection.release();
    res.status(200).json({ status: "ok" });
  } catch (error) {
    res
      .status(503)
      .json({ status: "error", message: "Veritabanı bağlantısı başarısız!" });
  }
}
