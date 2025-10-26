import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSun, FiMoon, FiLogIn } from 'react-icons/fi';
import { useTheme } from '../DarkModeToggle/DarkModeProvider';
import styles from './Navbar.module.css';

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Über mich", href: "#about" },
  { label: "Projekte", href: "#projects" },
  { label: "Kontakt", href: "#contact" },
];

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { isDarkMode, toggleTheme } = useTheme();
  const navigate = useNavigate();

  // Schließe das Menü, wenn die Fenstergröße über 768px ist
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Verhindere Scrollen, wenn das Menü geöffnet ist
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [menuOpen]);


  const handleLinkClick = () => {
    setMenuOpen(false);
  };

  return (
    <nav className={`${styles.navbar} ${isDarkMode ? styles.dark : ''}`}>
      <div className={styles.logo}>Nico</div>

      <button 
        className={`${styles.burger} ${menuOpen ? styles.open : ''}`}
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
        aria-expanded={menuOpen}
      >
        <span className={styles.line}></span>
        <span className={styles.line}></span>
        <span className={styles.line}></span>
      </button>


      <ul className={`${styles.navLinks} ${menuOpen ? styles.open : ''}`}>
        {navLinks.map((link) => (
          <li key={link.href}>
            <a 
              href={link.href} 
              onClick={handleLinkClick}
              aria-label={link.label}
            >
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
          onClick={toggleTheme}
          aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
        >
          {isDarkMode ? <FiSun /> : <FiMoon />}
        </button>
      </div>
    </nav>
  );
};
