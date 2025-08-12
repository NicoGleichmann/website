import React from 'react';
import './HeroSection.css';
import heroBg from '../assets/hero-bg.jpg';
import hoodieImage from '../assets/hoodie.png'; // Bitte den Dateinamen anpassen
import CategorySection from './CategorySection';

const HeroSection: React.FC = () => {
  return (
    <section className="hero-section" style={{ backgroundImage: `url(${heroBg})` }}>
      <div className="hero-content">
        <div className="hoodie-container">
          <img src={hoodieImage} alt="Lumio Hoodie" className="hoodie-image" />
        </div>
        <h1 className="hero-title">EMBRACE THE LIGHT.</h1>
        <CategorySection />
      </div>
    </section>
  );
};

export default HeroSection;