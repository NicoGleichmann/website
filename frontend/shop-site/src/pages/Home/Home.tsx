import React from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '@/components/ProductCard/ProductCard.tsx'; // Importiere die Produktkarte
import { products } from '@/data/products.ts'; // Importiere Dummy-Daten
import styles from './Home.module.css';

const Home: React.FC = () => {
  // Zeige die ersten 3 Produkte als Bestseller an
  const featuredProducts = products.slice(0, 3);

  return (
    <div className={styles.homePage}>
      <section className={styles.heroSection}>
        <h1>Innovation trifft [Dein Bereich/Vision]</h1>
        <p>Entdecke die Zukunft mit den Lösungen von Dein Startup. Wir gestalten Morgen schon heute.</p>
        <Link to="/shop" className={styles.btnPrimary}>Unsere Produkte entdecken</Link>
      </section>

      <section className={styles.aboutPreview}>
        <h2>Wer wir sind</h2>
        <p>Wir sind ein junges, dynamisches Team aus [Ort], das sich zum Ziel gesetzt hat, [Problem] zu lösen und [Vision] zu verwirklichen. Unsere Leidenschaft treibt uns an, Außergewöhnliches zu schaffen.</p>
        <Link to="/ueber-uns" className={styles.btnSecondary}>Mehr über uns erfahren</Link>
      </section>

      <section className={styles.featuredProducts}>
        <h2>Unsere Bestseller</h2>
        <div className={styles.productGrid}>
          {featuredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <Link to="/shop" className={styles.btnPrimary}>Alle Produkte ansehen</Link>
      </section>

      <section className={styles.callToAction}>
        <h2>Bereit für die nächste Stufe?</h2>
        <p>Kontaktieren Sie uns noch heute, um mehr über unsere innovativen Lösungen zu erfahren.</p>
        <Link to="/kontakt" className={styles.btnPrimary}>Jetzt Kontakt aufnehmen</Link>
      </section>
    </div>
  );
};

export default Home;