// backend/server.js
const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// SQLite DB Setup
const db = new sqlite3.Database("./database.db");

// Tabelle erstellen (einmalig)
db.run(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE,
    email TEXT,
    password TEXT
  )
`);

// Registrierung
app.post("/register", (req, res) => {
  const { username, email, password } = req.body;
  db.run(
    "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
    [username, email, password],
    function (err) {
      if (err) {
        return res.json({ message: "Nutzername schon vergeben oder Fehler." });
      }
      res.json({ message: "Registrierung erfolgreich!" });
    }
  );
});

// Login
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  db.get(
    "SELECT * FROM users WHERE username = ? AND password = ?",
    [username, password],
    (err, row) => {
      if (err) {
        return res.json({ message: "Fehler bei der Anmeldung." });
      }
      if (row) {
        res.json({ message: "Login erfolgreich!" });
      } else {
        res.json({ message: "Falsche Zugangsdaten." });
      }
    }
  );
});

// Alle registrierten Nutzer anzeigen
app.get("/users", (req, res) => {
  db.all("SELECT id, username, email FROM users", [], (err, rows) => {
    if (err) {
      return res.status(500).json({ message: "Fehler beim Abrufen der Nutzer" });
    }
    res.json(rows);
  });
});

// Server starten
app.listen(port, () => {
  console.log(`Backend läuft auf http://localhost:${port}`);
});
