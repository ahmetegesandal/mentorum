import { useEffect, useState } from "react";
import LayoutMenu from "../components/LayoutMenu";
import Navbar from "../components/Navbar";

import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";

import SearchHeader from "../components/slessons/SearchHeader";
import LessonFilters from "../components/slessons/LessonFilters";
import LessonGrid from "../components/slessons/LessonGrid";
import Pagination from "../components/slessons/Pagination";

const ITEMS_PER_PAGE = 16;

const Slessons = () => {
  const { t } = useTranslation("common");
  const [lessons, setLessons] = useState([]);
  const router = useRouter();

  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [onlineTeachers, setOnlineTeachers] = useState({});
  const [selectedGrade, setSelectedGrade] = useState("");
  const [selectedRating, setSelectedRating] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");

  // Fetch lessons
  useEffect(() => {
    fetch("/api/lessons")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setLessons(data);
          checkTeachersOnlineStatus(data);
        }
      })
      .catch((err) => {
        console.error("Error fetching lessons:", err);
        setLessons([]);
      });
  }, []);

  const checkTeachersOnlineStatus = async (lessons) => {
    if (!lessons.length) return;

    const teacherIds = [...new Set(lessons.map((lesson) => lesson.teacher_id))];

    const onlineStatusMap = {};
    await Promise.all(
      teacherIds.map(async (teacherId) => {
        if (teacherId) {
          try {
            const response = await fetch(`/api/users/${teacherId}/status`);
            if (response.ok) {
              const data = await response.json();
              onlineStatusMap[teacherId] = data.is_online === 1;
            }
          } catch (error) {
            console.error(
              `❌ Eğitmen ID: ${teacherId} online durumu alınamadı:`,
              error
            );
            onlineStatusMap[teacherId] = false;
          }
        }
      })
    );

    setOnlineTeachers(onlineStatusMap);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      checkTeachersOnlineStatus(lessons);
    }, 10000);

    return () => clearInterval(interval);
  }, [lessons]);

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
        lesson.category_id.toString() === selectedCategory) &&
      (selectedGrade === "" || lesson.grade === selectedGrade) &&
      (selectedRating === "" ||
        Number(lesson.average_rating) >= Number(selectedRating)) &&
      (selectedLanguage === "" || lesson.language === selectedLanguage)
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
              {/* search header */}
              <SearchHeader
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
              />

              <div className="card mb-6">
                <div className="card-header d-flex flex-column flex-wrap align-items-center gap-4">
                  <div className="card-title mb-0 me-1">
                    <h5 className="mb-0">Dersler</h5>
                  </div>

                  {/* Dynamic Category Filter Dropdown */}
                  <LessonFilters
                    categories={categories}
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                    selectedGrade={selectedGrade}
                    setSelectedGrade={setSelectedGrade}
                    selectedRating={selectedRating}
                    setSelectedRating={setSelectedRating}
                    selectedLanguage={selectedLanguage}
                    setSelectedLanguage={setSelectedLanguage}
                  />
                </div>

                {/* Course List */}
                <div className="card-body">
                  <LessonGrid
                    lessons={paginatedLessons}
                    onlineTeachers={onlineTeachers}
                  />

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <Pagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      setCurrentPage={setCurrentPage}
                    />
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
