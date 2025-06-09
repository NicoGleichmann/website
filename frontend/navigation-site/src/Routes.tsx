import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./main.tsx"; // deine Startseite
import Credits from "./mainScrips/copyright";
import Imprint from "./mainScrips/Imprint";
import PrivacyPolicy from "./mainScrips/PrivacyPolicy";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/nutzungslinks" element={<Credits />} />
        <Route path="/imprint" element={<Imprint />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      </Routes>
    </Router>
  );
}

export default App;
