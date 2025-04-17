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
            <a href="#hero">Home</a>
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
            <a href="https://github.com" target="_blank" rel="noopener noreferrer">Instagram</a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">TikTok</a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">YouTube</a>
          </div>

          {/* Contact */}
          <div className={styles["footer-column"]}>
            <h4>Kontakt</h4>
            <p>nicogleichmann39@gmail.com</p>
            <p>+49 176 44444 856</p>
            <p>Eisench, Germany</p>
          </div>
        </div>

        <div className={styles["footer-bottom"]}>
          <p>&copy; {new Date().getFullYear()} Nico Gleichmann. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
