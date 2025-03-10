import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import LayoutMenu from "../../components/LayoutMenu";
import Navbar from "../../components/Navbar";

const EditUser = () => {
  const router = useRouter();
  const { id } = router.query;

  const [user, setUser] = useState({
    username: "",
    name: "",
    surname: "",
    email: "",
    photo: "",
    credit: "",
  });

  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    if (id) {
      fetch(`/api/getUser?id=${id}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            Swal.fire("Hata!", "Kullanıcı bulunamadı!", "error");
            router.push("/users-list");
          } else {
            setUser(data);
          }
        })
        .catch(() => {
          Swal.fire(
            "Hata!",
            "Kullanıcı verisi alınırken hata oluştu!",
            "error"
          );
        });
    }
  }, [id, router]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("id", id);
    formData.append("username", user.username);
    formData.append("name", user.name);
    formData.append("surname", user.surname);
    formData.append("email", user.email);
    if (selectedFile) {
      formData.append("photo", selectedFile);
    }
    formData.append("credit", user.credit);

    try {
      const response = await fetch("/api/updateUser", {
        method: "PUT",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        Swal.fire("Hata!", data.error || "Güncelleme başarısız!", "error");
      } else {
        Swal.fire("Başarılı!", "Kullanıcı başarıyla güncellendi!", "success");
        router.push("/users-list");
      }
    } catch (error) {
      Swal.fire("Hata!", "Güncelleme sırasında hata oluştu!", "error");
    }
  };

  return (
    <>
      <LayoutMenu />
      <div className="layout-page">
        <Navbar />
        <div className="content-wrapper container">
          <div className="card mt-4">
            <div className="card-header">
              <button
                className="btn btn-primary"
                onClick={() => router.push("/users-list")}
              >
                Geri Dön
              </button>
              <h5 className="mt-3">Kullanıcı Düzenle</h5>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Kullanıcı Adı</label>
                  <input
                    type="text"
                    className="form-control"
                    name="username"
                    value={user.username}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Ad</label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    value={user.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Soyad</label>
                  <input
                    type="text"
                    className="form-control"
                    name="surname"
                    value={user.surname}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    value={user.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Kredi</label>
                  <input
                    type="number"
                    className="form-control"
                    name="credit"
                    value={user.credit}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Profil Fotoğrafı</label>
                  <input
                    type="file"
                    className="form-control"
                    onChange={handleFileChange}
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  Güncelle
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditUser;
