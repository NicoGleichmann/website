const fs = require("fs");
const express = require("express");
const app = express();

app.get("/users", (req, res) => {
    try {
      const users = fs.readFileSync("users.json");
      res.json(JSON.parse(users));
    } catch (err) {
      res.status(500).json({ message: "Fehler beim Laden der Nutzer." });
    }
  });

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server läuft auf Port ${PORT}`);
});
