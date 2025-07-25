import React from 'react';
import { Link } from 'react-router-dom';
import styles from "./NotFound.module.css"; // Ensure this matches the exact filename

const NotFound: React.FC = () => {
  return (
    <div className={styles.notFoundPage}>
      <h1 className={styles.title}>404</h1>
      <p className={styles.message}>Seite nicht gefunden.</p>
      <p className={styles.description}>Die angeforderte Seite konnte leider nicht gefunden werden. Vielleicht ist sie umgezogen oder existiert nicht mehr.</p>
      <Link to="/" className={styles.homeButton}>Zur Startseite</Link>
    </div>
  );
};

export default NotFound;