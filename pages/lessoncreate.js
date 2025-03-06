import LayoutMenu from "../components/LayoutMenu";
import Navbar from "../components/Navbar";
import { useState, useEffect, useContext } from "react";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import axios from "axios";
import Swal from "sweetalert2";
import { UserContext } from "../contexts/UserContext";
import { useRouter } from "next/router";

const AddLesson = ({ categories }) => {
  const { t } = useTranslation("common");
  const userData = useContext(UserContext);
  const router = useRouter();

  if (!userData || userData.role !== "teacher") {
    return <p>Erişim Yetkiniz Yok!</p>;
  }

  const [teacherId, setTeacherId] = useState(userData.id);
  const [categoryId, setCategoryId] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [language, setLanguage] = useState("");
  const [lessonPhoto, setLessonPhoto] = useState(null);

  const handleFileChange = (e) => {
    setLessonPhoto(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("teacher_id", teacherId);
    formData.append("category_id", categoryId);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("language", language);
    if (lessonPhoto) {
      formData.append("lesson_photo", lessonPhoto);
    }

    try {
      const response = await axios.post("/api/addlesson", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      Swal.fire({
        title: "Başarılı!",
        text: "Ders başarıyla eklendi.",
        icon: "success",
        confirmButtonText: "Tamam",
      }).then(() => {
        router.push("/slessons"); // Yönlendirme işlemi
      });
    } catch (error) {
      console.error(error);
      Swal.fire("Hata!", "Ders eklenirken hata oluştu.", "error");
    }
  };

  return (
    <>
      <LayoutMenu />
      <div className="layout-page">
        <Navbar />
        <div className="content-wrapper">
          <div className="container mt-5">
            <h3>Ders Ekle</h3>
            <form onSubmit={handleSubmit}>
              <input type="hidden" value={teacherId} />

              <div className="mb-3">
                <label htmlFor="category_id" className="form-label">
                  Kategori
                </label>
                <select
                  className="form-select"
                  id="category_id"
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                  required
                >
                  <option value="">Kategori Seç</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-3">
                <label htmlFor="title" className="form-label">
                  Başlık
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="description" className="form-label">
                  Açıklama
                </label>
                <textarea
                  className="form-control"
                  id="description"
                  rows="3"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                ></textarea>
              </div>

              <div className="mb-3">
                <label htmlFor="price" className="form-label">
                  Fiyat
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="language" className="form-label">
                  Dil
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="language"
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="lesson_photo" className="form-label">
                  Ders Fotoğrafı
                </label>
                <input
                  type="file"
                  className="form-control"
                  id="lesson_photo"
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </div>

              <button type="submit" className="btn btn-primary">
                Ders Ekle
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export async function getStaticProps({ locale }) {
  const res = await axios.get("http://localhost:3000/api/categories");
  const categories = res.data;

  return {
    props: {
      categories,
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}

export default AddLesson;
