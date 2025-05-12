// src/styles/theme.ts

export const theme = {
  dark: {
    background: '#121212',
    text: '#ffffff',
    accent: '#1E88E5',
    border: '#1E1E1E',
    surface: '#1E1E1E',
  },
  light: {
    background: '#FFFFFF',
    text: '#000000',
    accent: '#1565C0',
    border: '#E0E0E0',
    surface: '#FFFFFF',
  }
};

export const setTheme = (isDarkMode: boolean) => {
  const root = document.documentElement;
  const currentTheme = isDarkMode ? theme.dark : theme.light;

  Object.entries(currentTheme).forEach(([key, value]) => {
    root.style.setProperty(`--${key}`, value);
  });

  document.body.classList.remove('light-mode', 'dark-mode');
  document.body.classList.add(isDarkMode ? 'dark-mode' : 'light-mode');
};