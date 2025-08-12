import React, { createContext, useState, useContext, ReactNode } from 'react';

// Definiere den Typ des Kontextes
interface ThemeContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

// Erstelle den Kontext mit einem Standardwert
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Erstelle den Provider, der den Zustand verwaltet
export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};