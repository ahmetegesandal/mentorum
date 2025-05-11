// pages/blog/[slug].js
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import MainNavbar from "../../components/MainNavbar";
import Footer from "../../components/Footer";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export default function BlogDetail() {
  const router = useRouter();
  const { slug } = router.query;
  const { t } = useTranslation("common");
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!slug) return;

    async function fetchPost() {
      try {
        const res = await fetch(`/api/blog/${slug}`);
        if (!res.ok) throw new Error("Blog bulunamadı");
        const data = await res.json();
        setPost(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchPost();
  }, [slug]);

  if (loading) {
    return <p className="text-center py-5">Yükleniyor...</p>;
  }

  if (error || !post) {
    return <p className="text-center py-5 text-danger">{error || "Yazı bulunamadı."}</p>;
  }

  return (
    <>
      <MainNavbar />
      <div data-bs-spy="scroll" className="scrollspy-example">
        <section id="landingFeatures" className="section-py landing-features">
          <div className="container py-5">
            <Link href="/blog" className="btn btn-outline-secondary mb-4">
              ← {t("backToBlog", "Geri Dön")}
            </Link>
            <h1 className="mb-4 fw-bold text-center">{post.title}</h1>
            <Image
              src={post.image}
              alt={post.title}
              width={800}
              height={400}
              style={{ objectFit: "cover" }}
              className="img-fluid rounded mb-4"
            />
            <p className="lead text-justify">{post.content}</p>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}

export async function getServerSideProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}