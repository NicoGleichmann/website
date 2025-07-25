import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '@/components/Header/Header.tsx';
import Footer from '@/components/Footer/Footer.tsx';
import styles from './MainLayout.module.css'; // Modulares CSS

const MainLayout: React.FC = () => {
  return (
    <div className={styles.layoutContainer}>
      <Header />
      <main className={styles.layoutContent}>
        <Outlet /> {/* Hier werden die Inhalte der aktuellen Route gerendert */}
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;