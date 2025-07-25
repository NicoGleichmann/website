import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Footer.module.css'; // Modulares CSS

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.footerSection}>
          <h3>Über uns</h3>
          <p>Dein Startup: Wir entwickeln innovative Lösungen für [dein Bereich] und legen Wert auf [Werte].</p>
          <div className={styles.socialLinks}>
            {/* Beispiel für Social Media Links */}
            <a href="#" target="_blank" rel="noopener noreferrer">Facebook</a>
            <a href="#" target="_blank" rel="noopener noreferrer">Instagram</a>
            <a href="#" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          </div>
        </div>
        <div className={styles.footerSection}>
          <h3>Nützliche Links</h3>
          <ul>
            <li><Link to="/impressum">Impressum</Link></li>
            <li><Link to="/datenschutz">Datenschutz</Link></li>
            <li><Link to="/agb">AGB</Link></li>
            <li><Link to="/widerrufsrecht">Widerrufsrecht</Link></li>
            <li><Link to="/blog">Blog</Link></li>
          </ul>
        </div>
        <div className={styles.footerSection}>
          <h3>Kontakt</h3>
          <p>E-Mail: <a href="mailto:info@deinstartup.de">info@deinstartup.de</a></p>
          <p>Telefon: <a href="tel:+49123456789">+49 123 456789</a></p>
          <p>Adresse: Musterstraße 1, 12345 Musterstadt</p>
          {/* Optional: Newsletter-Anmeldung */}
          <form className={styles.newsletterForm}>
            <input type="email" placeholder="Ihre E-Mail für den Newsletter" />
            <button type="submit" className={styles.newsletterButton}>Abonnieren</button>
          </form>
        </div>
      </div>
      <div className={styles.copyright}>
        © {new Date().getFullYear()} Dein Startup. Alle Rechte vorbehalten.
      </div>
    </footer>
  );
};

export default Footer;