import React, { createContext, useState, useContext, useEffect } from 'react';

type Theme = 'dark-mode' | 'light-mode';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'dark-mode',
  toggleTheme: () => {}
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    // Check localStorage first, default to dark mode
    const savedTheme = localStorage.getItem('theme') as Theme;
    return savedTheme || 'dark-mode';
  });

  useEffect(() => {
    // Apply theme to body
    document.body.className = theme;
    // Save theme preference
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => 
      prevTheme === 'dark-mode' ? 'light-mode' : 'dark-mode'
    );
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
