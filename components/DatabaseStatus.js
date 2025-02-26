import { useEffect, useState } from "react";

const DatabaseStatus = () => {
  const [dbStatus, setDbStatus] = useState(true);

  useEffect(() => {
    const checkDB = async () => {
      try {
        const response = await fetch("/api/db-status");
        if (!response.ok) throw new Error("DB Down");
        setDbStatus(true);
      } catch (error) {
        setDbStatus(false);
      }
    };

    checkDB();
  }, []);

  if (!dbStatus) {
    return (
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          backgroundColor: "black",
          color: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "20px",
          fontWeight: "bold",
          zIndex: "9999",
        }}
      >
        ❌ Veritabanı bağlantısı başarısız! Lütfen XAMPP üzerinden MySQL’i
        başlatın.
      </div>
    );
  }

  return null;
};

export default DatabaseStatus;
