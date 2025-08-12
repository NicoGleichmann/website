// src/main.tsx (aktualisiert)
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { ThemeProvider } from './context/ThemeContext.tsx';
import { CartProvider } from './context/CartContext.tsx'; // Neu hinzugefügt
import './styles/themes.css';
import './styles/globals.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <CartProvider> {/* CartProvider hinzugefügt */}
        <App />
      </CartProvider>
    </ThemeProvider>
  </React.StrictMode>
);