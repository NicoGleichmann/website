const express = require("express");
const app = express();
const cors = require("cors");

// Middleware
app.use(cors()); // CORS aktivieren, falls Frontend auf anderer Domain
app.use(express.json());

// POST-Route für Newsletter
app.post("/newsletter", (req, res) => {
  const email = req.body.email;

  // Validierung auf Serverseite
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ message: "Ungültige E-Mail-Adresse" });
  }

  // TODO: Speichern (z. B. Datenbank oder Mailchimp etc.)
  console.log("Neue Newsletter-Anmeldung:", email);

  res.status(200).json({ message: "Erfolgreich angemeldet" });
});

// Server starten
app.listen(3000, () => {
  console.log("Backend läuft auf Port 3000");
});
