import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '@/data/products.ts'; // Typ-Import
import styles from './ProductCard.module.css';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className={styles.productCard}>
      <img src={product.image} alt={product.name} className={styles.productImage} />
      <div className={styles.productInfo}>
        <h3 className={styles.productName}>{product.name}</h3>
        <p className={styles.productDescription}>{product.description.substring(0, 80)}...</p> {/* Gekürzt */}
        <p className={styles.productPrice}>{product.price.toFixed(2)} €</p>
        <Link to={`/shop/${product.id}`} className={styles.detailsButton}>Details ansehen</Link>
        {/* Hier könnte ein "In den Warenkorb" Button folgen */}
      </div>
    </div>
  );
};

export default ProductCard;