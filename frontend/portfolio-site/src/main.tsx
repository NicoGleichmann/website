// main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import '@fortawesome/fontawesome-free/css/all.min.css';

// Blog Komponenten
import Home from "./Home";
import Blog01 from "./components/Blog/Blog01.tsx";
import Blog02 from "./components/Blog/Blog02.tsx";
import Blog03 from "./components/Blog/Blog03.tsx";

// Footer Komponenten
import PrivacyPolicy from "./components/Footer/PrivacyPolicy.tsx";
import TermsOfService from "./components/Footer/TermsOfService.tsx";
import Imprint from "./components/Footer/Imprint.tsx";

// Navbar Komponenten
import Login from "./components/Login/Login.tsx";

// DarkMode Komponenten
import { ThemeProvider } from "./components/DarkModeToggle/DarkModeProvider";
import { GoogleOAuthProvider } from "@react-oauth/google";

// App-Komponente (mit allen Routen)
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Blog/Blog01.tsx" element={<Blog01 />} />
      <Route path="/Blog/Blog02.tsx" element={<Blog02 />} />
      <Route path="/Blog/Blog03.tsx" element={<Blog03 />} />

      <Route path="/privacy" element={<PrivacyPolicy />} />
      <Route path="/terms" element={<TermsOfService />} />
      <Route path="/imprint" element={<Imprint />} />

      <Route path="/auth" element={<Login />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

// App in die Seite einfügen
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="419203612481-rfkutpmsa9hms5rm66g5sq8oc23ar3or.apps.googleusercontent.com">
      <ThemeProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ThemeProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);
    
