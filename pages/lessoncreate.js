import LayoutMenu from "../components/LayoutMenu";
import Navbar from "../components/Navbar";
import { useState, useEffect, useContext } from "react";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import axios from "axios";
import { UserContext } from "../contexts/UserContext";

const Blank = ({ categories }) => {
  const { t } = useTranslation("common");
  const userData = useContext(UserContext);

  const [teacherId, setTeacherId] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [language, setLanguage] = useState("");

  useEffect(() => {
    if (userData?.id) {
      setTeacherId(userData.id);
    }
  }, [userData]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/addlesson", {
        teacher_id: teacherId,
        category_id: categoryId,
        title,
        description,
        price,
        language,
      });
      alert("Lesson added successfully");
    } catch (error) {
      console.error(error);
      alert("Error adding lesson");
    }
  };

  return (
    <>
      <LayoutMenu />
      <div className="layout-page">
        <Navbar />
        <div className="content-wrapper">
          <div className="container mt-5">
            <h3>Add New Lesson</h3>
            <form onSubmit={handleSubmit}>
              {/* Teacher ID is now hidden but automatically set */}
              <input type="hidden" value={teacherId} />

              <div className="mb-3">
                <label htmlFor="category_id" className="form-label">
                  Category
                </label>
                <select
                  className="form-select"
                  id="category_id"
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                  required
                >
                  <option value="">Select Category</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-3">
                <label htmlFor="title" className="form-label">
                  Title
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
                  Description
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
                  Price
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
                  Language
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

              <button type="submit" className="btn btn-primary">
                Add Lesson
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

export default Blank;
