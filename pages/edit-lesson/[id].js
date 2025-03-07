import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import LayoutMenu from "../../components/LayoutMenu";
import Navbar from "../../components/Navbar";
import { UserContext } from "../../contexts/UserContext";
import axios from "axios";
import Swal from "sweetalert2";

const EditLesson = () => {
  const router = useRouter();
  const { id } = router.query;
  const userData = useContext(UserContext);

  const [lesson, setLesson] = useState(null);
  const [categories, setCategories] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [lessonPhoto, setLessonPhoto] = useState(null);
  const [existingPhoto, setExistingPhoto] = useState("");

  useEffect(() => {
    if (!id || !userData) return;

    // **Mevcut ders bilgilerini getir**
    axios
      .get(`/api/get-lesson?id=${id}`)
      .then((res) => {
        setLesson(res.data);
        setTitle(res.data.title);
        setDescription(res.data.description);
        setPrice(res.data.price);
        setCategoryId(res.data.category_id);
        setExistingPhoto(res.data.lesson_photo);
      })
      .catch((err) => console.error("Ders bilgisi alınamadı:", err));

    // **Kategorileri getir**
    axios
      .get("/api/categories")
      .then((res) => setCategories(res.data))
      .catch((err) => console.error("Kategoriler alınamadı:", err));
  }, [id, userData]);

  const handleFileChange = (e) => {
    setLessonPhoto(e.target.files[0]);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("id", id);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("category_id", categoryId);
    if (lessonPhoto) {
      formData.append("lesson_photo", lessonPhoto);
    }

    try {
      await axios.post("/api/update-lesson", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      Swal.fire("Başarılı!", "Ders başarıyla güncellendi.", "success").then(
        () => router.push("/manage-lessons")
      );
    } catch (error) {
      console.error(error);
      Swal.fire("Hata!", "Ders güncellenirken hata oluştu.", "error");
    }
  };

  if (!lesson) {
    return <p>Yükleniyor...</p>;
  }

  return (
    <>
      <LayoutMenu />
      <div className="layout-page">
        <Navbar />
        <div className="content-wrapper">
          <div className="container mt-5">
            <button
              className="btn btn-primary"
              onClick={() => router.push("/manage-lessons")}
            >
              Geri Dön
            </button>
            <h3 className="mt-3">Dersi Düzenle</h3>
            <form onSubmit={handleUpdate}>
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
                <label className="form-label">Mevcut Fotoğraf</label>
                <div>
                  <img
                    src={`${existingPhoto}`}
                    alt="Mevcut Fotoğraf"
                    className="rounded"
                    width="100"
                  />
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="lesson_photo" className="form-label">
                  Yeni Ders Fotoğrafı (Opsiyonel)
                </label>
                <input
                  type="file"
                  className="form-control"
                  id="lesson_photo"
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </div>

              <button type="submit" className="btn btn-success">
                Güncelle
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditLesson;
