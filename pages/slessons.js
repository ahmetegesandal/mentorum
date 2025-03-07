import { useEffect, useState } from "react";
import LayoutMenu from "../components/LayoutMenu";
import Navbar from "../components/Navbar";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

const ITEMS_PER_PAGE = 8;

const Slessons = () => {
  const { t } = useTranslation("common");
  const [lessons, setLessons] = useState([]);

  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch lessons
  useEffect(() => {
    fetch("/api/lessons")
      .then((res) => res.json())
      .then((data) => setLessons(Array.isArray(data) ? data : [])) // Dizi olup olmadığını kontrol et
      .catch((err) => {
        console.error("Error fetching lessons:", err);
        setLessons([]); // Eğer hata olursa boş dizi set et
      });
  }, []);

  // Fetch categories dynamically
  useEffect(() => {
    fetch("/api/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.error("Error fetching categories:", err));
  }, []);

  // Filter lessons based on search term and selected category
  const filteredLessons = lessons.filter(
    (lesson) =>
      (lesson.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lesson.description.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (selectedCategory === "" ||
        lesson.category_id.toString() === selectedCategory)
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredLessons.length / ITEMS_PER_PAGE);
  const paginatedLessons = filteredLessons.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <>
      <LayoutMenu />
      <div className="layout-page">
        <Navbar />
        <div className="content-wrapper">
          <div className="container-xxl flex-grow-1 container-p-y">
            <div className="app-academy">
              {/* Top Image & Search Section */}
              <div className="card p-0 mb-6">
                <div className="card-body d-flex flex-column flex-md-row justify-content-between p-0 pt-6">
                  <div className="app-academy-md-25 card-body py-0 pt-6 ps-12">
                    <img
                      src="img/illustrations/bulb-light.png"
                      className="img-fluid app-academy-img-height scaleX-n1-rtl"
                      alt="Bulb in hand"
                      height="90"
                    />
                  </div>
                  <div className="app-academy-md-50 card-body d-flex align-items-md-center flex-column text-md-center mb-6 py-6">
                    <span className="card-title mb-4 lh-lg px-md-12 h4 text-heading">
                      Eğitim, yetenekler ve kariyer fırsatları.{" "}
                      <span className="text-primary text-nowrap">
                        Hepsi tek bir yerde
                      </span>
                      .
                    </span>
                    <p className="mb-4 px-0 px-md-2">
                      En güvenilir online kurslar ve sertifikalarla
                      yeteneklerinizi geliştirin.
                    </p>
                    <div className="d-flex align-items-center justify-content-between app-academy-md-80">
                      <input
                        type="search"
                        placeholder="Kursunuzu bulun"
                        className="form-control me-4"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                      <button
                        type="button"
                        className="btn btn-primary btn-icon"
                      >
                        <i className="ti ti-search ti-md"></i>
                      </button>
                    </div>
                  </div>
                  <div className="app-academy-md-25 d-flex align-items-end justify-content-end">
                    <img
                      src="img/illustrations/pencil-rocket.png"
                      alt="pencil rocket"
                      height="188"
                      className="scaleX-n1-rtl"
                    />
                  </div>
                </div>
              </div>

              <div className="card mb-6">
                <div className="card-header d-flex flex-wrap justify-content-between gap-4">
                  <div className="card-title mb-0 me-1">
                    <h5 className="mb-0">Dersler</h5>
                  </div>

                  {/* Dynamic Category Filter Dropdown */}
                  <div className="d-flex justify-content-md-end align-items-center column-gap-6">
                    <select
                      className="form-select"
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                      <option value="">Tüm Dersler</option>
                      {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Course List */}
                <div className="card-body">
                  <div className="row gy-6 mb-6">
                    {paginatedLessons.length > 0 ? (
                      paginatedLessons.toReversed().map((lesson) => (
                        <div className="col-sm-6 col-lg-3" key={lesson.id}>
                          <div className="card p-2 h-100 shadow-none border">
                            <div className="rounded-2 text-center mb-4">
                              <a href={`/lessons/${lesson.id}`}>
                                <img
                                  className="img-fluid"
                                  src={`${lesson.lesson_photo}`}
                                  alt={lesson.title}
                                />
                              </a>
                            </div>
                            <div className="card-body p-4 pt-2">
                              <div class="d-flex justify-content-between align-items-center mb-4">
                                <span>
                                  {lesson.teacher_name} {lesson.teacher_surname}{" "}
                                </span>
                              </div>

                              <div class="d-flex justify-content-between align-items-center mb-4">
                                <span class="badge bg-label-primary">
                                  {lesson.category_name}{" "}
                                </span>
                                <p className="d-flex align-items-center justify-content-center fw-medium gap-1 mb-0">
                                  {Number(lesson.average_rating).toFixed(1)}{" "}
                                  <span className="text-warning">
                                    <i className="ti ti-star-filled ti-lg me-1"></i>
                                  </span>
                                  <span className="fw-normal">
                                    (
                                    {lesson.review_count
                                      ? lesson.review_count
                                      : "0"}
                                    )
                                  </span>
                                </p>
                              </div>
                              <a href={`/lessons/${lesson.id}`} className="h5">
                                {lesson.title}
                              </a>
                              <p className="mt-1">
                                {lesson.description.length > 100
                                  ? lesson.description.substring(0, 100) + "..."
                                  : lesson.description}
                              </p>
                              <p>
                                <strong>Fiyat:</strong> {lesson.price}₺
                              </p>
                              <a
                                className="w-100 btn btn-label-primary d-flex align-items-center"
                                href={`/lessons/${lesson.id}`}
                              >
                                <span className="me-2">
                                  Detayları Görüntüle
                                </span>
                                <i className="ti ti-chevron-right ti-xs scaleX-n1-rtl"></i>
                              </a>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p>Ders bulunamadı.</p>
                    )}
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <nav className="d-flex align-items-center justify-content-center">
                      <ul className="pagination mb-0 pagination-rounded">
                        <li
                          className={`page-item ${
                            currentPage === 1 ? "disabled" : ""
                          }`}
                        >
                          <button
                            className="page-link"
                            onClick={() =>
                              setCurrentPage((prev) => Math.max(prev - 1, 1))
                            }
                          >
                            <i className="ti ti-chevron-left ti-md"></i>
                          </button>
                        </li>

                        {[...Array(totalPages)].map((_, index) => (
                          <li
                            key={index}
                            className={`page-item ${
                              currentPage === index + 1 ? "active" : ""
                            }`}
                          >
                            <button
                              className="page-link"
                              onClick={() => setCurrentPage(index + 1)}
                            >
                              {index + 1}
                            </button>
                          </li>
                        ))}

                        <li
                          className={`page-item ${
                            currentPage === totalPages ? "disabled" : ""
                          }`}
                        >
                          <button
                            className="page-link"
                            onClick={() =>
                              setCurrentPage((prev) =>
                                Math.min(prev + 1, totalPages)
                              )
                            }
                          >
                            <i className="ti ti-chevron-right ti-md"></i>
                          </button>
                        </li>
                      </ul>
                    </nav>
                  )}
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
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}

export default Slessons;
