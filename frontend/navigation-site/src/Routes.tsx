import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./main.tsx"; // deine Startseite
import Credits from "./mainScrips/copyright";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/nutzungslinks" element={<Credits />} />
      </Routes>
    </Router>
  );
}

export default App;
