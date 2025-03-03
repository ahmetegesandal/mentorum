import mysql from "mysql2/promise";

// Veritabanı yapılandırması
const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true, // Havuzda boş bağlantı varsa bekle
  connectionLimit: 10, // Maksimum 10 bağlantı
  queueLimit: 0, // Kuyruk sınırı yok
  connectTimeout: 10000, // 10 saniyede bağlanmazsa zaman aşımına uğra
};

// Havuz oluştur
const pool = mysql.createPool(dbConfig);

// Bağlantıyı al ve yönet
export async function getConnection() {
  let connection;
  try {
    connection = await pool.getConnection();
    console.log("Veritabanı bağlantısı başarılı!");

    // Bağlantıyı açık tut (Keep Alive)
    connection.ping();

    return connection;
  } catch (error) {
    console.error("Veritabanı bağlantı hatası:", error.message);
    throw error;
  } finally {
    if (connection) connection.release(); // Bağlantıyı geri bırak
  }
}

// Bağlantıyı kopmaları önlemek için her 1 dakikada bir ping at
setInterval(async () => {
  try {
    const connection = await pool.getConnection();
    await connection.ping();
    connection.release();
    console.log("Veritabanı bağlantısı aktif tutuldu (ping atıldı).");
  } catch (error) {
    console.error("Veritabanı bağlantı hatası (ping):", error.message);
  }
}, 60000); // 60 saniyede bir çalıştır
