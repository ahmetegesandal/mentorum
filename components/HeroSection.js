import React, { useState } from "react";
import Image from "next/image";
import { useTranslation } from "next-i18next";

const HeroSection = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { t } = useTranslation();

  const slides = [
    {
      image: "/img/backgrounds/ogr4.jpg",
      title: t("imgTitle2"),
      description: [
        t("TitleDes1"),
        t("TitleDes2"),
        t("TitleDes3"),
        t("TitleDes4"),
      ],
      buttonText: t("imgButton2"),
      alignLeft: true,
    },
    {
      image: "/img/backgrounds/ogr6.jpg",
      title: t("imgTitle1"),
      description: <span className="img-desc-1">{t("imgDesc1")}</span>,
      buttonText: t("imgButton1"),
      alignLeft: true,
    },
    {
      image: "/img/backgrounds/ogr1.jpg",
      title: t("imgTitle3"),
      description: <span className="img-desc-3">{t("imgDesc3")}</span>,
      buttonText: t("imgButton3"),
      alignLeft: true,
    },
    {
      image: "/img/backgrounds/ogr5.jpg",
      title: t("imgTitle4"),
      description: <span className="img-desc-4">{t("imgDesc4")}</span>,
      buttonText: t("imgButton3"),
      alignLeft: false,
    },
  ];

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex - 1 + slides.length) % slides.length
    );
  };

  return (
    <section
      id="hero-section"
      className="position-relative"
      style={{ backgroundColor: "rgb(161 114 198 / 24%)", height: "100vh" }}
    >
      <div className="hero-image-container position-absolute top-0 start-50 translate-middle-x w-100 h-100">
        <Image
          src={slides[currentImageIndex].image}
          alt="Hero Image"
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="hero-navigation position-absolute top-50 start-0 translate-middle-y">
        <button
          className="btn btn-light"
          onClick={handlePrevImage}
          aria-label="Previous Image"
        >
          &#9665;
        </button>
      </div>
      <div className="hero-navigation position-absolute top-50 end-0 translate-middle-y">
        <button
          className="btn btn-light"
          onClick={handleNextImage}
          aria-label="Next Image"
        >
          &#9655;
        </button>
      </div>
      <div
        className={`hero-content ${
          slides[currentImageIndex].alignLeft ? "text-left" : "text-center"
        }`}
        style={{
          top: "50%",
          transform: "translateY(-50%)",
          left: slides[currentImageIndex].alignLeft ? "10%" : "auto",
          right: slides[currentImageIndex].alignLeft ? "auto" : "10%",
          textAlign: slides[currentImageIndex].alignLeft ? "left" : "center",
        }}
      >
        <h1 className="display-3 fw-bold">{slides[currentImageIndex].title}</h1>

        {/* Description render */}
        {Array.isArray(slides[currentImageIndex].description) ? (
          <ul
            className="fs-5 mb-4"
            style={{ listStyleType: "none", paddingLeft: 0 }}
          >
            {slides[currentImageIndex].description.map((desc, index) => (
              <li key={index} style={{ display: "flex", alignItems: "center" }}>
                <span className="icon-wrapper">
                  <img src="/img/backgrounds/check.svg" alt="check icon" />
                </span>
                {desc}
              </li>
            ))}
          </ul>
        ) : (
          <p className="fs-5 mb-4">{slides[currentImageIndex].description}</p>
        )}
        <button className="btn btn-primary btn-lg">
          {slides[currentImageIndex].buttonText}
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
