import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { products, Product } from '@/data/products.ts'; // Typ-Import
import styles from './ProductDetail.module.css';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Typisierung für useParams
  const navigate = useNavigate();
  const product: Product | undefined = products.find(p => p.id === id); // explizite Typisierung

  if (!product) {
    return (
      <div className={styles.productNotFound}>
        <p>Produkt nicht gefunden.</p>
        <button onClick={() => navigate('/shop')} className={styles.backToShopButton}>Zum Shop zurück</button>
      </div>
    );
  }

  const handleAddToCart = () => {
    // Hier würde die Logik zum Hinzufügen zum Warenkorb stehen.
    // In einem echten Shop: Zustand im Context/Redux aktualisieren, Backend-Call.
    alert(`${product.name} wurde zum Warenkorb hinzugefügt! (Dummy-Funktion)`);
    // Optional: Weiterleitung zum Warenkorb oder Bestätigungsnachricht
  };

  return (
    <div className={styles.productDetailPage}>
      <button onClick={() => navigate(-1)} className={styles.backButton}>← Zurück zum Shop</button>
      <div className={styles.productContent}>
        <div className={styles.productImageGallery}>
          <img src={product.image} alt={product.name} className={styles.mainImage} />
          {/* Hier könnten weitere Produktbilder in einer kleineren Galerie folgen */}
        </div>
        <div className={styles.productInfo}>
          <h1 className={styles.productName}>{product.name}</h1>
          <p className={styles.productPrice}>{product.price.toFixed(2)} €</p>
          <p className={styles.productDescription}>{product.description}</p>
          <p className={styles.productDetails}>{product.details}</p>
          <button onClick={handleAddToCart} className={styles.addToCartButton}>In den Warenkorb</button>
          {/* Optional: Kundenbewertungen, Verfügbarkeit, Mengenauswahl */}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;