import mysql from "mysql2/promise";

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  connectTimeout: 10000,
};

const pool = mysql.createPool(dbConfig);

export async function getConnection() {
  try {
    const connection = await pool.getConnection();
    // console.log("Veritabanı bağlantısı başarılı!");

    return connection;
  } catch (error) {
    console.error("Veritabanı bağlantı hatası:", error.message);
    throw error;
  }
}

setInterval(async () => {
  try {
    const connection = await pool.getConnection();
    await connection.ping();
    connection.release();
    //console.log("Veritabanı bağlantısı aktif tutuldu (ping atıldı).");
  } catch (error) {
    console.error("Veritabanı bağlantı hatası (ping):", error.message);
  }
}, 60000);
