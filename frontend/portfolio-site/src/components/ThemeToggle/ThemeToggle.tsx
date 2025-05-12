import React from 'react';
import { useTheme } from '../../context/ThemeProvider';
import styles from './ThemeToggle.module.css';

export const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button 
      className={styles.themeToggle} 
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'dark-mode' ? 'light' : 'dark'} mode`}
    >
      {theme === 'dark-mode' ? '🌞' : '🌙'}
    </button>
  );
};
