import { useState, useEffect } from 'react';

function ThemeToggle() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [themeSymbol, setThemeSymbol] = useState('☀️');

  // Bilder umschalten, abhängig vom Modus
  const updateImages = (darkMode: boolean) => {
    const toggleDisplay = (darkId: string, lightId: string) => {
      const darkEl = document.getElementById(darkId);
      const lightEl = document.getElementById(lightId);
      if (darkEl && lightEl) {
        darkEl.style.display = darkMode ? 'block' : 'none';
        lightEl.style.display = darkMode ? 'none' : 'block';
      }
    };

    toggleDisplay('facebookD', 'facebookW');
    toggleDisplay('youtubeD', 'youtubeW');
    toggleDisplay('black_01', 'white_01');
    toggleDisplay('black_02', 'white_02');
    toggleDisplay('black_03', 'white_03');
    toggleDisplay('black_04', 'white_04');
    toggleDisplay('black_05', 'white_05');
    toggleDisplay('black_06', 'white_06');
  };

  // Theme umschalten
  const toggleTheme = () => {
    const newMode = !isDarkMode;
    document.body.classList.remove(isDarkMode ? 'dark-mode' : 'white-mode');
    document.body.classList.add(newMode ? 'dark-mode' : 'white-mode');
    setIsDarkMode(newMode);
    setThemeSymbol(newMode ? '☀️' : '🌙');
    localStorage.setItem('theme', newMode ? 'dark' : 'white');
  };

  // Beim Laden: Theme setzen
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const initialMode = savedTheme === 'white' ? false : true;
    setIsDarkMode(initialMode);
    document.body.classList.add(initialMode ? 'dark-mode' : 'white-mode');
    setThemeSymbol(initialMode ? '☀️' : '🌙');
  }, []);

  // Immer wenn sich isDarkMode ändert → Bilder aktualisieren
  useEffect(() => {
    updateImages(isDarkMode);
  }, [isDarkMode]);

  return (
    <button onClick={toggleTheme} className="theme-button">
      {themeSymbol}
    </button>
  );
}

export default ThemeToggle;
