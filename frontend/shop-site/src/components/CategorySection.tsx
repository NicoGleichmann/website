import React from 'react';
import CategoryCard from './CategoryCard';
import './CategorySection.css';
// Importe deine Icons hier. Verwende z.B. Icons von https://heroicons.com/ oder erstelle eigene SVGs
import newArrivalsIcon from '../assets/new-arrivals-icon.svg';
import tShirtsIcon from '../assets/t-shirt-icon.svg';
import accessoriesIcon from '../assets/accessories-icon.svg';

const categories = [
  {
    icon: newArrivalsIcon,
    label: 'New Arrivals',
    link: '#new-arrivals',
  },
  {
    icon: tShirtsIcon,
    label: 'T-Shirts',
    link: '#t-shirts',
  },
  {
    icon: accessoriesIcon,
    label: 'Accessories',
    link: '#accessories',
  },
];

const CategorySection: React.FC = () => {
  return (
    <div className="category-section">
      {categories.map((category, index) => (
        <CategoryCard
          key={index}
          icon={category.icon}
          label={category.label}
          link={category.link}
        />
      ))}
    </div>
  );
};

export default CategorySection;