import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx'; // Importiere die Hauptkomponente
import './styles/base.css'; // Importiere globale Styles
import './styles/_variables.css'; // Importiere Variablen
import './styles/utilities.css'; // Importiere Utility-Klassen
import { BrowserRouter } from 'react-router-dom';

// Importiere deine globalen Styles
import './styles/base.css';
import './styles/_variables.css';
import './styles/utilities.css';


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);