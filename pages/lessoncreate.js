import LayoutMenu from "../components/LayoutMenu";
import Navbar from "../components/Navbar";
import { useState, useContext } from "react";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import axios from "axios";
import Swal from "sweetalert2";
import { UserContext } from "../contexts/UserContext";
import { useRouter } from "next/router";
import RichTextEditor from "../components/RichTextEditor";

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
  const [grade, setGrade] = useState("");

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
    formData.append("grade", grade);

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
        router.push("/slessons");
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
          <div className="container-xxl flex-grow-1 container-p-y">
            <div className="row g-6">
              <div className="col-lg-12">
                <div className="card">
                  <div className="card-body">
                    <h3 className="mb-4">Ders Ekle</h3>
                    <form onSubmit={handleSubmit}>
                      <input type="hidden" value={teacherId} />

                      <div className="row">
                        {/* Kategori Seçimi */}
                        <div className="col-md-6">
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
                        </div>

                        {/* Başlık */}
                        <div className="col-md-6">
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
                        </div>
                      </div>

                      {/* Açıklama */}
                      <div className="mb-3">
                        <label className="form-label">Açıklama</label>
                        <RichTextEditor
                          value={description}
                          onChange={setDescription}
                        />
                      </div>

                      <div className="row">
                        {/* Fiyat */}
                        <div className="col-md-6 col-lg-3">
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
                        </div>

                        {/* Dil */}
                        <div className="col-md-6 col-lg-3">
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
                        </div>
                        <div className="col-md-6 col-lg-3">
                          <div className="mb-3">
                            <label htmlFor="grade" className="form-label">
                              Düzey
                            </label>
                            <select
                              className="form-select"
                              id="grade"
                              value={grade}
                              onChange={(e) => setGrade(e.target.value)}
                              required
                            >
                              <option value="">Düzey Seç</option>
                              <option value="beginner">Başlangıç</option>
                              <option value="intermediate">Orta</option>
                              <option value="advanced">İleri</option>
                            </select>
                          </div>
                        </div>

                        {/* Ders Fotoğrafı */}
                        <div className="col-md-12 col-lg-3">
                          <div className="mb-3">
                            <label
                              htmlFor="lesson_photo"
                              className="form-label"
                            >
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
                        </div>
                      </div>

                      {/* Buton - Sağda hizalı */}
                      <div className="d-flex justify-content-end">
                        <button type="submit" className="btn btn-primary">
                          Ders Ekle
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
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
