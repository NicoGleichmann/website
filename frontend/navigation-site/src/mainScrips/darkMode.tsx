import { useState, useEffect } from 'react';

function ThemeToggle() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [themeSymbol, setThemeSymbol] = useState('☀️');

  // Bilder umschalten, abhängig vom Modus
  const updateImages = (darkMode: boolean) => {
    console.log('Aktualisiere Bilder, Modus:', darkMode ? 'dunkel' : 'hell');

    // Alle Elemente mit den Klassen dark-mode und white-mode finden
    const darkElements = document.querySelectorAll('.dark-mode');
    const lightElements = document.querySelectorAll('.white-mode');

    // Dark-Mode Elemente anzeigen/verstecken
    darkElements.forEach(el => {
      if (el instanceof HTMLElement) {
        el.style.display = darkMode ? 'block' : 'none';
      }
    });

    // Light-Mode Elemente anzeigen/verstecken
    lightElements.forEach(el => {
      if (el instanceof HTMLElement) {
        el.style.display = darkMode ? 'none' : 'block';
      }
    });

    // Spezielle Behandlung für die Icons in Box 2
    // Im Dark-Mode: dunkle Icons anzeigen, helle ausblenden
    // Im Light-Mode: helle Icons anzeigen, dunkle ausblenden
    const facebookDark = document.getElementById('facebook-d');
    const facebookLight = document.getElementById('facebook-w');
    const youtubeDark = document.getElementById('youtube-d');
    const youtubeLight = document.getElementById('youtube-w');

    if (facebookDark && facebookLight) {
      facebookDark.style.display = darkMode ? 'none' : 'block';
      facebookLight.style.display = darkMode ? 'block' : 'none';
    }

    if (youtubeDark && youtubeLight) {
      youtubeDark.style.display = darkMode ? 'none' : 'block';
      youtubeLight.style.display = darkMode ? 'block' : 'none';
    }
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
