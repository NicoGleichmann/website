import express from 'express';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import dotenv from 'dotenv';
import { securityMiddleware, rateLimiter, verifyRecaptcha } from './security.js';
import { sendNewsletterEmail } from './sendEmail.js';
import axios from 'axios';

// Konfiguration
dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();

// Middleware
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://ihre-domain.de'] 
    : ['http://localhost:3000'],
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.use(express.json());
app.use(express.static(join(__dirname, '../frontend/build')));

// Sicherheits-Middleware
app.use(securityMiddleware);

// API Routes
app.post('/api/newsletter', 
  rateLimiter,
  verifyRecaptcha,
  async (req, res) => {
    try {
      const { email, name = 'Nutzer' } = req.body;
      
      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return res.status(400).json({ error: 'Ungültige E-Mail-Adresse' });
      }

      await sendNewsletterEmail(email, name);
      res.json('Danke für deine Anmeldung!');
    } catch (error) {
      console.error('Newsletter Error:', error);
      const status = error.status || 500;
      const message = error.message || 'Ein Fehler ist aufgetreten';
      res.status(status).json({ error: message });
    }
  }
);

// Frontend ausliefern
app.get('*', (req, res) => {
  res.sendFile(join(__dirname, '../frontend/build/index.html'));
});

// Fehlerbehandlung 
app.use((err, req, res, next) => {
  console.error('Unbehandelter Fehler:', err);
  res.status(500).json({ 
    error: 'Ein unerwarteter Fehler ist aufgetreten',
    ...(process.env.NODE_ENV === 'development' && { details: err.message })
  });
});

// Server starten
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server läuft auf Port ${PORT} (${process.env.NODE_ENV})`);
});  

// Aktuelle Zeile:
res.json('Danke für deine Anmeldung!');

// Besser (konsistentes Antwortformat):
res.json({ 
  success: true, 
  message: 'Danke für deine Anmeldung!' 
});

app.post('/api/newsletter', 
  rateLimiter,
  verifyRecaptcha,
  async (req, res) => {
    try {
      const { email, name = 'Nutzer', recaptchaToken } = req.body;
      
      // 1. E-Mail-Validierung
      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return res.status(400).json({ error: 'Ungültige E-Mail-Adresse' });
      }

      // 2. reCAPTCHA-Validierung
      if (process.env.NODE_ENV === 'production') {
        const recaptchaResponse = await axios.post(
          `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${recaptchaToken}`
        );

        if (!recaptchaResponse.data.success) {
          return res.status(400).json({ 
            error: 'reCAPTCHA-Validierung fehlgeschlagen' 
          });
        }
      }

      // 3. E-Mail versenden
      await sendNewsletterEmail(email, name);
      
      // 4. Erfolgsantwort
      res.json({ 
        success: true, 
        message: 'Danke für deine Anmeldung!' 
      });
    } catch (error) {
      console.error('Newsletter Error:', error);
      res.status(500).json({ 
        error: 'Ein Fehler ist aufgetreten',
        ...(process.env.NODE_ENV === 'development' && { details: error.message })
      });
    }
  }
);