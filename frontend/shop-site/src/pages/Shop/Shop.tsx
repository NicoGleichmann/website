import React from 'react';
import ProductCard from '@/components/ProductCard/ProductCard.tsx';
import { products, Product } from '@/data/products.ts'; // Typ-Import
import styles from "./Shop.module.css"; // Ensure this matches the exact filename

const Shop: React.FC = () => {
  const [searchTerm, setSearchTerm] = React.useState<string>('');
  const [filteredProducts, setFilteredProducts] = React.useState<Product[]>(products);

  React.useEffect(() => {
    const lowercasedSearchTerm = searchTerm.toLowerCase();
    const filtered = products.filter(product =>
      product.name.toLowerCase().includes(lowercasedSearchTerm) ||
      product.description.toLowerCase().includes(lowercasedSearchTerm)
    );
    setFilteredProducts(filtered);
  }, [searchTerm]);

  return (
    <div className={styles.shopPage}>
      <h1 className={styles.pageTitle}>Unsere Produkte</h1>

      <div className={styles.searchBar}>
        <input
          type="text"
          placeholder="Produkte suchen..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={styles.searchInput}
        />
      </div>

      {filteredProducts.length > 0 ? (
        <div className={styles.productGrid}>
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <p className={styles.noProducts}>Keine Produkte gefunden, die Ihrer Suche entsprechen.</p>
      )}
    </div>
  );
};

export default Shop;