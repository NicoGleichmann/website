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
    setIsDarkMode(prevMode => {
      const newMode = !prevMode; // Den Modus umkehren
      document.body.classList.toggle('dark-mode', newMode); // dark-mode-Klasse setzen
      document.body.classList.toggle('white-mode', !newMode); // white-mode-Klasse entfernen oder setzen

      setThemeSymbol(newMode ? '☀️' : '🌙'); // Symbol ändern
      toggleImages(); // Bilder je nach Mode anpassen
      return newMode; // Rückgabewert für setIsDarkMode
    });
  };

  useEffect(() => {
    document.body.classList.add('dark-mode');
    setThemeSymbol('☀️');
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
