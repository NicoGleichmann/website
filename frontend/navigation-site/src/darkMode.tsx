import React, { useState, useEffect } from 'react';


function ThemeToggle() {
  const [isDarkMode, setIsDarkMode] = useState(true); // Zustand für den Dark Mode
  const [themeSymbol, setThemeSymbol] = useState('☀️'); // Symbol für den Button

  // Dark Mode beim Laden aktivieren
  useEffect(() => {
    document.body.classList.add("dark-mode");
    setThemeSymbol('☀️'); // Setzt das richtige Symbol
    toggleFacebookImage(); // Bild für den initialen Modus setzen
  }, []);

  // Funktion, die das Bild je nach Modus anpasst
  const toggleFacebookImage = () => {
    const facebookW = document.getElementById('facebook-w');
    const facebookD = document.getElementById('facebook-d');
    const youtubeW = document.getElementById('youtube-w');
    const youtubeD = document.getElementById('youtube-d');
    const black_01 = document.getElementById('black_01');
    const white_01 = document.getElementById('white_01');
    const black_02 = document.getElementById('black_02');
    const white_02 = document.getElementById('white_02');
    const black_03 = document.getElementById('black_03');
    const white_03 = document.getElementById('white_03');
    const black_04 = document.getElementById('black_04');
    const white_04 = document.getElementById('white_04');
    const black_05 = document.getElementById('black_05');
    const white_05 = document.getElementById('white_05');
    const black_06 = document.getElementById('black_06');
    const white_06 = document.getElementById('white_06');

    if (isDarkMode) {
      facebookW.style.display = 'block';
      facebookD.style.display = 'none';
      youtubeW.style.display = 'block';
      youtubeD.style.display = 'none';
      black_01.style.display = 'block';
      white_01.style.display = 'none';
      black_02.style.display = 'block';
      white_02.style.display = 'none';
      black_03.style.display = 'block';
      white_03.style.display = 'none';
      black_04.style.display = 'block';
      white_04.style.display = 'none';
      black_05.style.display = 'block';
      white_05.style.display = 'none';
      black_06.style.display = 'block';
      white_06.style.display = 'none';
    } else {
      facebookW.style.display = 'none';
      facebookD.style.display = 'block';
      youtubeW.style.display = 'none';
      youtubeD.style.display = 'block';
      black_01.style.display = 'none';
      white_01.style.display = 'block';
      black_02.style.display = 'none';
      white_02.style.display = 'block';
      black_03.style.display = 'none';
      white_03.style.display = 'block';
      black_04.style.display = 'none';
      white_04.style.display = 'block';
      black_05.style.display = 'none';
      white_05.style.display = 'block';
      black_06.style.display = 'none';
      white_06.style.display = 'block';
    }
  };

  // Theme Toggle Funktion
  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
      document.body.classList.remove('white-mode');
      setThemeSymbol('☀️');
    } else {
      document.body.classList.remove('dark-mode');
      document.body.classList.add('white-mode');
      setThemeSymbol('🌙');
    }
    toggleFacebookImage(); // Bild je nach Mode wechseln
  };

  return (
    <div>
      <button id="theme-toggle" onClick={toggleTheme} className="theme-button">
        {themeSymbol}
      </button>
    </div>
  );
}

export default ThemeToggle;
