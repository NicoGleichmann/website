import express from "express";
import cors from "cors";
import validator from "validator";
import SibApiV3Sdk from "@sendinblue/client";
import dotenv from "dotenv";
dotenv.config();

// API-Key Konfiguration
const apiKey = process.env.API_KEY;
if (!apiKey) {
    console.error("FEHLER: Kein API-Key gefunden. Bitte überprüfen Sie die .env-Datei.");
    process.exit(1);
}

const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

// Authentifizierung
apiInstance.authentications['apiKey'].apiKey = apiKey;

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/newsletter", async (req, res) => {
  const email = req.body.email;

  if (!validator.isEmail(email)) {
    return res.status(400).send("Ungültige E-Mail-Adresse");
  }

  const safeEmail = validator.normalizeEmail(email);
  console.log("Newsletter-Abo:", safeEmail);

  try {
    const sendSmtpEmail = {
      to: [{ email: safeEmail }],
      templateId: 1, // Ersetzen Sie dies mit Ihrer tatsächlichen Template-ID
      params: { name: "Newsletter-Abonnent" },
      sender: {
        name: "Dein Projektname",
        email: process.env.SENDER_EMAIL,
      },
    };

    const response = await apiInstance.sendTransacEmail(sendSmtpEmail);
    console.log("Brevo Response:", response);
    res.status(200).send("Vielen, vielen Dank für Ihre Anmeldung! :D");
  } catch (error) {
    console.error("Fehler beim E-Mail-Versand:", error.response?.body || error.message);
    res.status(500).send("Fehler beim Versenden der E-Mail.");
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server läuft auf Port ${PORT}`);
});