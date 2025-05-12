import React from "react";
import { useRef, useState } from "react";

// Scripts
import '../style.css';

const InstaSlider = () => {
  const sliderRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = [
    "/img/insta_post1.jpg",
    "/img/insta_post2.jpg",
    "/img/insta_post3.jpg"
  ];

  const scrollTo = (index) => {
    const slider = sliderRef.current;
    if (slider) {
      const width = slider.clientWidth;
      slider.scrollTo({ left: index * width, behavior: "smooth" });
      setCurrentIndex(index);
    }
  };

  const prevSlide = () => {
    scrollTo((currentIndex - 1 + images.length) % images.length);
  };

  const nextSlide = () => {
    scrollTo((currentIndex + 1) % images.length);
  };

  return (
    <div className="slider-full-wrapper">
      <div className="header">
        <img src="/img/insta.png" alt="Instagram Logo" className="icon" loading="lazy" />
      </div>

      <div className="slider-wrapper">
        <div className="slider" ref={sliderRef}>
          {images.map((src, i) => (
            <div className="slide" key={i}>
              <img src={src} alt={`Instagram Post ${i + 1}`} />
            </div>
          ))}
        </div>

        <div className="slider-nav prev" onClick={prevSlide}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M12 4L6 10L12 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>
        <div className="slider-nav next" onClick={nextSlide}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M8 4L14 10L8 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>

        <div className="dots">
          {images.map((_, i) => (
            <span
              key={i}
              className={`dot ${currentIndex === i ? "active" : ""}`}
              onClick={() => scrollTo(i)}
            ></span>
          ))}
        </div>
      </div>

      <div className="lower_section">
        <span id="insta2">@nico.gleichmann</span>
      </div>
    </div>
  );
};

export default InstaSlider;
