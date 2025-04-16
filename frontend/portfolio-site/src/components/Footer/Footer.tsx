// src/components/Footer/Footer.tsx
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles["footer-container"]}>
        <div className={styles["footer-grid"]}>
          {/* Navigation */}
          <div className={styles["footer-column"]}>
            <h4>Navigation</h4>
            <a href="#home">Home</a>
            <a href="#about">About</a>
            <a href="#projects">Projects</a>
            <a href="#contact">Contact</a>
          </div>

          {/* Legal */}
          <div className={styles["footer-column"]}>
            <h4>Legal</h4>
            <a href="#privacy">Privacy Policy</a>
            <a href="#terms">Terms of Service</a>
            <a href="#imprint">Imprint</a>
          </div>

          {/* Socials */}
          <div className={styles["footer-column"]}>
            <h4>Socials</h4>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer">GitHub</a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
          </div>

          {/* Contact */}
          <div className={styles["footer-column"]}>
            <h4>Contact</h4>
            <p>nico@example.com</p>
            <p>+49 123 456789</p>
            <p>Berlin, Germany</p>
          </div>
        </div>

        <div className={styles["footer-bottom"]}>
          <p>&copy; {new Date().getFullYear()} Nico Gleichmann. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
