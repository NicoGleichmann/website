import React from 'react';
import './CategoryCard.css';

interface CategoryCardProps {
  icon: string;
  label: string;
  link: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ icon, label, link }) => {
  return (
    <a href={link} className="category-card">
      <div className="card-content">
        <img src={icon} alt={label} className="card-icon" />
        <span className="card-label">{label}</span>
      </div>
      <div className="card-underline"></div>
    </a>
  );
};

export default CategoryCard;