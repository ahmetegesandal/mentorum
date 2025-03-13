import React, { useState } from 'react';
import Image from 'next/image';
import { useTranslation } from "next-i18next";

const HeroSection = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { t } = useTranslation();

  const slides = [
    {
      image: '/img/backgrounds/ogr6.jpg',
      title: t("imgTitle1"),
      description:  t("imgDesc1"),
      buttonText:  t("imgButton1"), // Buton metni burada
      alignLeft: true,
    },
    {
      image: '/img/backgrounds/ogr4.jpg',
      title: t("imgTitle2"),
      description:  t("imgDesc2"),
      buttonText: t("imgButton2"), // Buton metni burada
      alignLeft: true,
    },
    {
      image: '/img/backgrounds/ogr1.jpg',
      title: t("imgTitle3"),
      description: t("imgDesc3"),
      buttonText: t("imgButton3"), // Buton metni burada
      alignLeft: true,
    },
    {
      image: '/img/backgrounds/ogr5.jpg',
      title: t("imgTitle4"),
      description:  t("imgDesc4"),
      buttonText: t("imgButton2"), // Buton metni burada
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
      style={{ backgroundColor: 'rgb(161 114 198 / 24%)', height: '100vh' }}
    >
      {/* Resim */}
      <div className="hero-image-container position-absolute top-0 start-50 translate-middle-x w-100 h-100">
        <Image
          src={slides[currentImageIndex].image}
          alt="Hero Image"
          layout="fill"
          objectFit="cover"
        />
      </div>
      

      {/* Sağ ve Sol Butonlar */}
      <div className="hero-navigation position-absolute top-50 start-0 translate-middle-y">
        <button className="btn btn-light" onClick={handlePrevImage} aria-label="Previous Image">
          &#9665;
        </button>
      </div>
      <div className="hero-navigation position-absolute top-50 end-0 translate-middle-y">
        <button className="btn btn-light" onClick={handleNextImage} aria-label="Next Image">
          &#9655;
        </button>
      </div>

      {/* Hero İçeriği (Başlıklar, Butonlar) */}
      <div
  className={`hero-content ${slides[currentImageIndex].alignLeft ? 'text-left' : 'text-center'}`}
  style={{
    top: '50%',
    transform: slides[currentImageIndex].alignLeft ? 'translateY(-50%)' : 'translate(72%, -50%)',
    right: slides[currentImageIndex].alignLeft ? '60%' : '35%',
    left: slides[currentImageIndex].alignLeft ? '10%' : '40%',
  }}
>
  <h1 className="display-3 fw-bold">{slides[currentImageIndex].title}</h1>
  <p className="fs-5 mb-4">{slides[currentImageIndex].description}</p>
  <button className="btn btn-primary btn-lg">{slides[currentImageIndex].buttonText}</button>
</div>



    </section>
  );
};

export default HeroSection;
