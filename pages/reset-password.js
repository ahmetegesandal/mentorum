import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Swal from "sweetalert2";

export default function ResetPassword() {
  const router = useRouter();
  const { token } = router.query;

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirm)
      return Swal.fire("Hata", "Şifreler uyuşmuyor", "error");

    try {
      await axios.post("/api/reset-password", { token, password });
      Swal.fire("Başarılı", "Şifreniz değiştirildi", "success").then(() => {
        router.push("/sign-in");
      });
    } catch (err) {
      Swal.fire("Hata", "Token geçersiz veya süresi dolmuş", "error");
    }
  };

  return (
    <div className="container py-5">
      <h3>🔐 Yeni Şifre Belirle</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          className="form-control my-2"
          placeholder="Yeni Şifre"
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          className="form-control my-2"
          placeholder="Şifre Tekrar"
          required
          onChange={(e) => setConfirm(e.target.value)}
        />
        <button className="btn btn-success">Şifreyi Güncelle</button>
      </form>
    </div>
  );
}
