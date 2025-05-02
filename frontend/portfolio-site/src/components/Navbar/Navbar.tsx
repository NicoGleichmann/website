import styles from "./Navbar.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiLogIn, FiMoon, FiSun } from "react-icons/fi";
import { useDarkMode } from "../DarkModeToggle/DarkModeToggle.tsx";

const navLinks = [
  { label: "Home", href: "#hero" },
  { label: "About ME", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Kontakt", href: "#contact" },
];

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { darkMode, toggleDarkMode } = useDarkMode();
  const navigate = useNavigate();

  return (
    <nav className={`${styles.navbar} ${darkMode ? styles.dark : ""}`}>
      <p>Aktueller Modus: {darkMode ? "Dark" : "Light"}</p>
      <div className={styles.logo}>Nico</div>

      <ul className={`${styles.navLinks} ${menuOpen ? styles.open : ""}`}>
        {navLinks.map((link) => (
          <li key={link.href}>
            <a href={link.href} onClick={() => setMenuOpen(false)}>
              {link.label}
            </a>
          </li>
        ))}
      </ul>

      <div className={styles.iconContainer}>
        <button
          className={styles.iconButton}
          onClick={() => navigate("/login")}
          aria-label="Login"
        >
          <FiLogIn />
        </button>
        <button
          className={styles.iconButton}
          onClick={toggleDarkMode}
          aria-label="Toggle Dark Mode"
        >
          {darkMode ? <FiSun /> : <FiMoon />}
        </button>
      </div>

      <button
        className={`${styles.burger} ${menuOpen ? styles.openBurger : ""}`}
        onClick={() => setMenuOpen(false)}
        aria-label="Toggle menu"
      >
        <span className={styles.line}></span>
        <span className={styles.line}></span>
        <span className={styles.line}></span>
      </button>
    </nav>
  );
};
