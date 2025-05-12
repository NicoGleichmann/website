const fs = require("fs");
const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");

const app = express();
app.use(cors());
app.use(express.json());

const usersFile = "users.json";
if (!fs.existsSync(usersFile)) {
  fs.writeFileSync(usersFile, "[]"); // leeres Array als Startwert
}
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

app.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  const users = JSON.parse(fs.readFileSync("users.json", "utf8"));

  const existingUser = users.find(user => user.username === username || user.email === email);
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  users.push({ username, email, password: hashedPassword });
  fs.writeFileSync("users.json", JSON.stringify(users, null, 2));
  res.status(201).json({ message: "User registered successfully" });
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const users = JSON.parse(fs.readFileSync("users.json", "utf8"));

  const user = users.find(user => user.username === username);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  res.status(200).json({ message: "Login successful" });
});