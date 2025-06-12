import express from 'express';
import cors from 'cors';
import fs from 'fs/promises'; // Correctly imported for promise-based file system operations
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import fetch from 'node-fetch';
import { sendContactMessage } from './controllers/contactController.js'; // Ensure this file exists and exports sendContactMessage

// Load environment variables as early as possible
dotenv.config();

// Initialize the Express app
const app = express();

// Globale Pfadvariablen für ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Pfad zur JSON-Datei für Newsletter-Abonnenten
const subscribersPath = path.join(__dirname, 'newsletterSubscribers.json');

// Pfad zur JSON-Datei für Benutzer (für Login/Register)
const usersPath = path.join(__dirname, 'users.json');

// Brevo API-URLs (using constants for consistency)
const BREVO_API_URL = 'https://api.brevo.com/v3/smtp/email';
const BREVO_CONTACTS_API_URL = 'https://api.brevo.com/v3/contacts';

// --- Environment Variable Checks (Critical: Place early) ---
if (!process.env.API_KEY) {
    console.error('Umgebungsvariable API_KEY fehlt. Bitte in der .env-Datei festlegen.');
    // In a production environment, you might want to exit, but for development, a warning might suffice.
    // process.exit(1);
}
if (!process.env.SENDER_EMAIL) {
    console.error('Umgebungsvariable SENDER_EMAIL fehlt. Bitte in der .env-Datei festlegen.');
    // process.exit(1);
}

// --- CORS Configuration (Apply once at the top) ---
const corsOptions = {
    origin: ['http://localhost:5173', 'http://127.0.0.1:5173', 'https://deine-domain.de'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
};

// Enable CORS with the specified options
app.use(cors(corsOptions));
// Handle preflight requests for all routes (important for complex CORS scenarios)
app.options('*', cors(corsOptions));

// --- Core Middleware (Apply once at the top) ---
// Parses incoming requests with JSON payloads
app.use(express.json());
// Parses incoming requests with URL-encoded payloads
app.use(express.urlencoded({ extended: true }));

// --- Security Middleware ---
// Helmet helps secure Express apps by setting various HTTP headers.
app.use(helmet());

// Rate Limiting to prevent brute-force attacks and abuse
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: 'Zu viele Anfragen von dieser IP, bitte versuchen Sie es nach 15 Minuten erneut.'
});
app.use(limiter);

// CSP-Konfiguration (Consider applying only to specific routes or using helmet's CSP)
// Note: Helmet can also manage CSP more robustly. If using helmet.contentSecurityPolicy,
// you might not need this manual setHeader for CSP.
app.use((req, res, next) => {
    res.setHeader(
        'Content-Security-Policy',
        "default-src 'self'; " +
        "script-src 'self' 'unsafe-inline' https://www.google.com https://www.gstatic.com; " +
        "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; " +
        "img-src 'self' data: https:; " +
        "font-src 'self' https://fonts.gstatic.com; " +
        "connect-src 'self' https://www.google.com;"
    );
    next();
});

// Zusätzliche Sicherheits-Header
app.use((req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    next();
});

// --- Helper Functions ---

// Funktion zum Lesen der Abonnenten aus newsletterSubscribers.json
async function getSubscribers() {
    try {
        await fs.access(subscribersPath); // Check if file exists
        const data = await fs.readFile(subscribersPath, 'utf-8');
        return data.trim() ? JSON.parse(data) : [];
    } catch (error) {
        if (error.code === 'ENOENT') {
            await fs.writeFile(subscribersPath, JSON.stringify([], null, 2), 'utf-8');
            return [];
        }
        console.error('Fehler beim Lesen der Abonnenten:', error);
        return []; // Fallback to empty array on other errors
    }
}

// Funktion zum Speichern eines neuen Abonnenten in newsletterSubscribers.json
async function saveSubscriber(email) {
    if (!email || typeof email !== 'string' || !email.includes('@')) {
        return { success: false, message: 'Ungültige E-Mail-Adresse.' };
    }

    try {
        const subscribers = await getSubscribers();
        if (!Array.isArray(subscribers)) {
            // This case should be handled by getSubscribers, but as a fallback
            await fs.writeFile(subscribersPath, JSON.stringify([], null, 2), 'utf-8');
            return saveSubscriber(email); // Retry
        }

        const exists = subscribers.some(sub =>
            sub && sub.email && sub.email.toLowerCase() === email.toLowerCase()
        );

        if (exists) {
            return { success: false, message: 'Diese E-Mail ist bereits angemeldet.' };
        }

        const newSubscriber = {
            email: email.toLowerCase(),
            subscribedAt: new Date().toISOString()
        };

        const updatedSubscribers = [...subscribers, newSubscriber];

        try {
            await fs.writeFile(
                subscribersPath,
                JSON.stringify(updatedSubscribers, null, 2),
                'utf-8'
            );
            return {
                success: true,
                message: 'Erfolgreich für den Newsletter angemeldet!',
                data: newSubscriber
            };
        } catch (writeError) {
            console.error('Fehler beim Speichern der Abonnenten:', writeError);
            return {
                success: false,
                message: 'Fehler beim Speichern. Bitte versuchen Sie es später erneut.'
            };
        }
    } catch (error) {
        console.error('Ein unerwarteter Fehler in saveSubscriber ist aufgetreten:', error);
        return {
            success: false,
            message: 'Ein unerwarteter Fehler ist aufgetreten.',
            error: error.message
        };
    }
}

// Funktion zum Lesen der Benutzer aus users.json
async function getUsers() {
    try {
        await fs.access(usersPath); // Check if file exists
        const data = await fs.readFile(usersPath, 'utf8'); // Use fs.readFile directly
        return data.trim() ? JSON.parse(data) : [];
    } catch (error) {
        if (error.code === 'ENOENT') {
            await fs.writeFile(usersPath, JSON.stringify([], null, 2), 'utf8');
            return [];
        }
        console.error('Fehler in getUsers:', error.message);
        return [];
    }
};

// --- API Routes (DEFINE ALL API ROUTES BEFORE STATIC FILE SERVING) ---

// Basic root route for testing if the server is running
app.get('/', (req, res) => {
    res.send('Backend server is running!');
});

// GET-Route für /api/newsletter (nur für Tests)
app.get('/api/newsletter', (req, res) => {
    res.json({ status: 'running', message: 'Newsletter-API ist erreichbar' });
});

// POST-Route zur Newsletter-Anmeldung (Brevo integration)
app.post('/api/newsletter', async (req, res) => {
    const { email, token } = req.body;

    // Temporarily disable reCAPTCHA for testing if needed
    /*
    if (process.env.RECAPTCHA_SECRET_KEY) {
        // ... reCAPTCHA verification logic ...
    }
    */

    if (!email || typeof email !== 'string' || !email.includes('@')) {
        return res.status(400).json({ success: false, message: 'Ungültige E-Mail-Adresse.' });
    }

    try {
        const result = await saveSubscriber(email);

        if (!result.success) {
            return res.status(409).json(result); // 409 Conflict if email already exists
        }

        // Optional: Integration mit Brevo (Kontakt hinzufügen)
        if (!process.env.API_KEY) {
            console.warn('Brevo API key is not configured. Skipping Brevo integration for /api/newsletter.');
            return res.status(200).json({ success: true, message: 'Erfolgreich für den Newsletter angemeldet (ohne Brevo-Integration).', data: result.data });
        }

        let brevoData = {};
        try {
            const brevoResponse = await fetch(BREVO_CONTACTS_API_URL, { // Use constant
                method: 'POST',
                headers: {
                    'api-key': process.env.API_KEY, // Correct API key usage
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    updateEnabled: false, // Prevents updating existing contact attributes if they already exist
                }),
            });

            if (!brevoResponse.ok) {
                const brevoErrorText = await brevoResponse.text();
                console.error('Brevo API error on /api/newsletter:', brevoErrorText);
                return res.status(500).json({ success: false, message: 'Anmeldung erfolgreich, aber Brevo-Integration fehlgeschlagen.' });
            }
            brevoData = await brevoResponse.json(); // Parse response
        } catch (brevoApiError) {
            console.error('Fehler bei der Brevo API Integration auf /api/newsletter:', brevoApiError);
            // We still return success as local storage was successful
            return res.status(200).json({
                success: true,
                message: 'Erfolgreich für den Newsletter angemeldet (Brevo-Integration fehlgeschlagen).',
                data: result.data
            });
        }

        return res.status(200).json({ ...result, brevoData });

    } catch (error) {
        console.error('Serverfehler bei der Newsletter-Anmeldung (/api/newsletter):', error);
        return res.status(500).json({ success: false, message: 'Serverfehler bei der Anmeldung.' });
    }
});

// Route zur Newsletter-Anmeldung (new route, identical functionality to /api/newsletter post)
app.post('/api/subscribe', async (req, res) => {
    const { email } = req.body;

    if (!email || typeof email !== 'string' || !email.includes('@')) {
        return res.status(400).json({ success: false, message: 'Ungültige E-Mail-Adresse.' });
    }

    try {
        const result = await saveSubscriber(email);

        if (!result.success) {
            return res.status(409).json(result);
        }

        // Integration mit Brevo (Kontakt hinzufügen)
        if (!process.env.API_KEY) {
            console.warn('Brevo API key is not configured. Skipping Brevo integration for /api/subscribe.');
            return res.status(200).json({ success: true, message: 'Erfolgreich für den Newsletter angemeldet (ohne Brevo-Integration).', data: result.data });
        }

        let brevoData = {};
        try {
            const brevoPayload = {
                email,
                updateEnabled: true,
                attributes: {
                    NEWSLETTER: true,
                    SIGNUP_DATE: new Date().toISOString()
                },
                listIds: [3] // Assuming list ID 3 exists in Brevo
            };

            const brevoResponse = await fetch(BREVO_CONTACTS_API_URL, { // Use constant
                method: 'POST',
                headers: {
                    'accept': 'application/json',
                    'api-key': process.env.API_KEY, // Correct API key usage
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(brevoPayload),
            });

            try {
                brevoData = await brevoResponse.json();
            } catch (jsonError) {
                const responseText = await brevoResponse.text();
                throw new Error(`Invalid JSON response from Brevo API: ${responseText}`);
            }

            if (!brevoResponse.ok) {
                console.error('Brevo API error on /api/subscribe:', brevoData);
                return res.status(500).json({ success: false, message: 'Kontakt konnte nicht in Brevo erstellt/aktualisiert werden.' });
            } else {
                return res.status(200).json({
                    success: true,
                    message: 'Erfolgreich für den Newsletter angemeldet!',
                    data: result.data,
                    brevoData: brevoData
                });
            }
        } catch (brevoApiError) {
            console.error('Fehler bei der Brevo API Integration auf /api/subscribe:', brevoApiError);
            // We still return success as local storage was successful
            return res.status(200).json({
                success: true,
                message: 'Erfolgreich für den Newsletter angemeldet (Brevo-Integration fehlgeschlagen).',
                data: result.data
            });
        }
    } catch (error) {
        console.error('Serverfehler bei der Newsletter-Anmeldung (/api/subscribe):', error);
        return res.status(500).json({ success: false, message: 'Serverfehler bei der Anmeldung.' });
    }
});


// Route für das Kontaktformular (Use the imported controller)
app.post('/api/contact', sendContactMessage);

// Login & Register API routes
app.get('/api/users', async (req, res) => { // Changed to /api/users for clarity
    try {
        const users = await getUsers();
        res.json(users);
    } catch (error) {
        console.error('Fehler beim Abrufen der Benutzer:', error);
        res.status(500).json({ error: 'Fehler beim Abrufen der Benutzer' });
    }
});

app.post('/api/register', async (req, res) => { // Changed to /api/register
    try {
        const { username, email, password } = req.body;
        // Basic validation
        if (!username || !email || !password) {
            return res.status(400).json({ message: 'Alle Felder müssen ausgefüllt werden.' });
        }
        // Placeholder for actual user registration logic (e.g., hashing password, saving to DB)
        // For now, let's just save to users.json (for demonstration)
        const users = await getUsers();
        const userExists = users.some(u => u.email === email || u.username === username);
        if (userExists) {
            return res.status(409).json({ message: 'Benutzername oder E-Mail existiert bereits.' });
        }
        const newUser = { id: users.length + 1, username, email, password }; // IMPORTANT: Hash password in a real app!
        users.push(newUser);
        await fs.writeFile(usersPath, JSON.stringify(users, null, 2), 'utf8');

        res.status(201).json({ message: 'Benutzer erfolgreich registriert', user: { id: newUser.id, username: newUser.username, email: newUser.email } });
    } catch (error) {
        console.error('Registrierung fehlgeschlagen:', error);
        res.status(500).json({ error: 'Registrierung fehlgeschlagen' });
    }
});

app.post('/api/login', async (req, res) => { // Changed to /api/login
    try {
        const { email, password } = req.body;
        const users = await getUsers();
        const user = users.find(u => u.email === email && u.password === password); // IMPORTANT: Compare hashed passwords in a real app!

        if (user) {
            // In a real application, you would generate a JWT token here
            const token = `dummy-jwt-token-for-${user.id}`;
            res.json({ message: 'Anmeldung erfolgreich', token, user: { id: user.id, username: user.username, email: user.email } });
        } else {
            res.status(401).json({ error: 'E-Mail oder Passwort ist falsch' });
        }
    } catch (error) {
        console.error('Anmeldung fehlgeschlagen:', error);
        res.status(401).json({ error: 'Anmeldung fehlgeschlagen' });
    }
});

// --- Static Files & Catch-All Route (Must be ABSOLUTELY LAST) ---
// This part handles serving your frontend application.
const staticPath = path.join(__dirname, '../frontend/navigation-site/dist');

// Serve static files from the 'dist' directory of your frontend
app.use(express.static(staticPath, { index: false })); // 'index: false' ensures the catch-all handles index.html explicitly

// For any other GET route not handled by API routes, serve the index.html of your frontend application
// This is crucial for Single Page Applications (SPAs) and client-side routing.
app.get('/*', (req, res) => {
    // Log invalid route access, but proceed to serve the main app.
    console.log(`Ungültige Route aufgerufen (nicht als API): ${req.path}, leite zur Hauptseite weiter`);
    res.sendFile(path.join(staticPath, 'index.html'), (err) => {
        if (err) {
            console.error('Unhandled error trying to serve index.html:', err);
            // Send a 404 response if index.html itself cannot be found
            res.status(404).send('<!DOCTYPE html><html lang="de"><head><meta charset="UTF-8"><title>404 Nicht gefunden</title><style>body{font-family:sans-serif;display:flex;justify-content:center;align-items:center;height:100vh;margin:0;background-color:#f0f0f0;color:#333;}div{text-align:center;padding:20px;background-color:#fff;border-radius:8px;box-shadow:0 2px 10px rgba(0,0,0,0.1);}</style></head><body><div><h1>404 - Seite nicht gefunden</h1><p>Entschuldigung, die angeforderte Seite konnte nicht gefunden werden.</p><p><a href="/">Zur Startseite</a></p></div></body></html>');
        }
    });
});

// --- Error handling middleware (should be the last piece of middleware) ---
app.use((err, req, res, next) => {
    console.error('Unhandled error caught by error middleware:', err);
    // Send a generic 500 error response to the client
    res.status(500).json({ error: 'Internal server error', details: err.message });
});

// --- Server Listener ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => { // Listen on 0.0.0.0 to be accessible from other devices on the network
    console.log(`Server läuft auf Port ${PORT}`);
});
