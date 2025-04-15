import styles from "./Navbar.module.css";
import { useState } from "react";

const navLinks = [
  { label: "Home", href: "#hero" },
  { label: "Über mich", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projekte", href: "#projects" },
  { label: "Blog", href: "#blog" },
  { label: "Kontakt", href: "#contact" },
];

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className={styles.navbar}>
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

      <button className={styles.burger} onClick={() => setMenuOpen(!menuOpen)}>
        <span className={menuOpen ? styles.active : ""}></span>
        <span className={menuOpen ? styles.active : ""}></span>
        <span className={menuOpen ? styles.active : ""}></span>
      </button>
    </nav>
  );
};
