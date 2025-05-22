// src/context/ThemeProvider.tsx
import React, { createContext, useState, useContext, useEffect } from 'react';

type Theme = 'dark' | 'light';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'dark',
  toggleTheme: () => {}
});

export const useTheme = () => useContext(ThemeContext);

const themeStyles = {
  dark: {
    '--bg-color': '#1a1e1f',
    '--text-color': '#f5f6fa',
    '--text-secondary': '#d1d8e0',
    '--input-bg': '#2d3436',
    '--input-border': '#3d4849',
    '--input-placeholder': '#b2bec3',
    '--input-focus': 'rgba(245, 246, 250, 0.2)',
    '--button-bg': '#f5f6fa',
    '--button-text': '#1a1e1f',
    '--button-hover': '#d1d8e0',
  },
  light: {
    '--bg-color': '#f8f9fa',
    '--text-color': '#2d3436',
    '--text-secondary': '#636e72',
    '--input-bg': '#f1f2f6',
    '--input-border': '#dfe6e9',
    '--input-placeholder': '#b2bec3',
    '--input-focus': 'rgba(45, 52, 54, 0.1)',
    '--button-bg': '#2d3436',
    '--button-text': '#ffffff',
    '--button-hover': '#1e272e',
  }
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('theme') as Theme) || 'dark';
    }
    return 'dark';
  });

  useEffect(() => {
    const root = document.documentElement;
    
    // Setze die CSS-Variablen basierend auf dem aktuellen Theme
    const styles = themeStyles[theme];
    Object.entries(styles).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });
    
    // Setze die Klasse für andere CSS-Selektoren
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    
    // Speichere das Theme
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
