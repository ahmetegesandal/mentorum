import React from "react";

const Preloader = () => {
  console.log("PRELOAD YÜKLENDİ");
  return (
    <div className="preloader-container">
      <div className="preloader">
        <div className="spinner"></div>
      </div>
    </div>
  );
};

export default Preloader;
