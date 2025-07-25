import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faBars } from '@fortawesome/free-solid-svg-icons';
import styles from './Header.module.css'; // Modulares CSS

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link to="/" className={styles.logo}>Dein Startup</Link>

        {/* Hamburger-Menü für Mobil */}
        <button className={styles.mobileMenuToggle} onClick={toggleMobileMenu} aria-label="Toggle mobile menu">
          <FontAwesomeIcon icon={faBars} />
        </button>

        <nav className={`${styles.navbarNav} ${isMobileMenuOpen ? styles.mobileMenuOpen : ''}`}>
          <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
          <Link to="/ueber-uns" onClick={() => setIsMobileMenuOpen(false)}>Über Uns</Link>
          <Link to="/shop" onClick={() => setIsMobileMenuOpen(false)}>Produkte</Link>
          <Link to="/kontakt" onClick={() => setIsMobileMenuOpen(false)}>Kontakt</Link>
          {/* Füge hier weitere Links hinzu */}
        </nav>

        <div className={styles.headerActions}>
          <Link to="/warenkorb" className={styles.cartIcon} aria-label="Warenkorb">
            <FontAwesomeIcon icon={faShoppingCart} />
            {/* Optional: Warenkorb-Zähler (muss über State gemanagt werden) */}
            <span className={styles.cartCount}>0</span>
          </Link>
          {/* Optional: Suchfeld */}
        </div>
      </div>
    </header>
  );
};

export default Header;