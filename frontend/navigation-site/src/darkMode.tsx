import { useState, useEffect } from 'react';

function ThemeToggle() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [themeSymbol, setThemeSymbol] = useState('☀️');

  // Update styles und Bilder nach jedem Wechsel des Modus
  const toggleImages = () => {
    const toggleDisplay = (darkId: string, lightId: string) => {
      const darkEl = document.getElementById(darkId);
      const lightEl = document.getElementById(lightId);
      if (darkEl && lightEl) {
        darkEl.style.display = isDarkMode ? 'block' : 'none';
        lightEl.style.display = isDarkMode ? 'none' : 'block';
      }
    };

    toggleDisplay('facebookW', 'facebookD');
    toggleDisplay('youtubeW', 'youtubeD');
    toggleDisplay('black_01', 'white_01');
    toggleDisplay('black_02', 'white_02');
    toggleDisplay('black_03', 'white_03');
    toggleDisplay('black_04', 'white_04');
    toggleDisplay('black_05', 'white_05');
    toggleDisplay('black_06', 'white_06');
  };

  // Theme wechseln
  const toggleTheme = () => {
    const newMode = !isDarkMode; // Den Modus umkehren
    
    // Ensure both classes are properly toggled
    document.body.classList.remove(isDarkMode ? 'white-mode' : 'dark-mode');
    document.body.classList.add(newMode ? 'dark-mode' : 'white-mode');

    setIsDarkMode(newMode);
    setThemeSymbol(newMode ? '☀️' : '🌙'); // Symbol ändern
    toggleImages(); // Bilder je nach Mode anpassen
    
    // Optional: Save theme preference in localStorage
    localStorage.setItem('theme', newMode ? 'dark' : 'white');
  };

  useEffect(() => {
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    const initialMode = savedTheme === 'white' ? false : true;
    
    setIsDarkMode(initialMode);
    document.body.classList.add(initialMode ? 'dark-mode' : 'white-mode');
    setThemeSymbol(initialMode ? '☀️' : '🌙');
    toggleImages(); // Initiale Bilder setzen
  }, []);

  return (
    <div>
      <button id="theme-toggle" onClick={toggleTheme} className="theme-button">
        {themeSymbol}
      </button>
    </div>
  );
}

export default ThemeToggle;