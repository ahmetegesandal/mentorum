// pages/blog/index.js
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import MainNavbar from "../../components/MainNavbar";
import Footer from "../../components/Footer";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export default function BlogList({}) {
  const { t } = useTranslation("common");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [posts, setPosts] = useState([]);
  const postsPerPage = 3;

  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await fetch("/api/blog");
        const data = await res.json();
        setPosts(data);
      } catch (err) {
        console.error("Blog verileri alınamadı:", err);
      }
    }
    fetchPosts();
  }, []);

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <MainNavbar />
      <div data-bs-spy="scroll" className="scrollspy-example">
        <section id="landingFeatures" className="section-py landing-features">
          <div className="container py-5">
            <h2 className="text-center mb-4">Blog</h2>

            <div className="mb-4 text-center">
              <input
                type="text"
                placeholder="Ara..."
                className="form-control w-50 d-inline-block"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
              />
            </div>

            <div className="row gy-4">
              {currentPosts.map((post) => (
                <div className="col-12 col-sm-6 col-lg-4" key={post.id}>
                  <div className="card h-100 border-0 shadow rounded-3">
                    <Image
                      src={post.image}
                      alt={post.title}
                      width={400}
                      height={200}
                      style={{ objectFit: "cover" }}
                      className="card-img-top rounded-top"
                    />
                    <div className="card-body d-flex flex-column">
                      <h5 className="card-title mb-2">{post.title}</h5>
                      <p className="card-text text-muted flex-grow-1">{post.description}</p>
                      <Link href={`/blog/${post.slug}`} className="btn btn-outline-primary mt-3 align-self-start">
                        Devamını Oku
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-5 d-flex justify-content-center">
                <nav>
                  <ul className="pagination">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <li key={page} className={`page-item ${page === currentPage ? "active" : ""}`}>
                        <button className="page-link" onClick={() => handlePageChange(page)}>
                          {page}
                        </button>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            )}
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}