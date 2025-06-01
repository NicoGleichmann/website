// security.js
// Diese Datei enthält Middleware-Funktionen für die Sicherheit des Backends.

import ipRangeCheck from 'ip-range-check';
import { RateLimiterRedis } from 'rate-limiter-flexible';
import Redis from 'ioredis';
import axios from 'axios'; // Benötigt für die reCAPTCHA-Verifizierung

// Stelle sicher, dass dotenv.config() in der Hauptdatei (server.js) aufgerufen wird,
// damit Umgebungsvariablen hier verfügbar sind.

// Redis-Client für den Rate Limiter
const redisClient = new Redis(process.env.REDIS_URL || 'redis://localhost:6379');

// Rate Limiter Konfiguration
// Begrenzt die Anzahl der Anfragen pro Dauer pro IP-Adresse
const rateLimiter = new RateLimiterRedis({
  storeClient: redisClient,
  keyPrefix: 'api_limiter', // Präfix für Redis-Schlüssel
  points: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100'), // Max. Anfragen pro Dauer
  duration: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '3600000') / 1000, // Dauer in Sekunden (Standard: 1 Stunde)
  blockDuration: 3600, // IP-Blockierung für 1 Stunde nach Überschreitung des Limits
});

/**
 * Middleware zum Blockieren von Anfragen von bestimmten IP-Adressen oder -Bereichen.
 * Die blockierten Bereiche werden aus der Umgebungsvariable BLOCKED_IP_RANGES gelesen.
 */
function blockIPs(req, res, next) {
  const blockedRanges = (process.env.BLOCKED_IP_RANGES || '')
    .split(',')
    .map(range => range.trim())
    .filter(Boolean); // Entfernt leere Einträge

  const clientIp = req.ip || req.connection.remoteAddress; // Holt die IP-Adresse des Clients

  if (ipRangeCheck(clientIp, blockedRanges)) {
    console.warn(`Blocked request from blacklisted IP: ${clientIp}`);
    return res.status(403).json({ error: 'Zugriff verweigert' });
  }
  next(); // Gehe zur nächsten Middleware
}

/**
 * Middleware zur Prüfung des User-Agents, um verdächtige Bots zu blockieren.
 * Blockiert bekannte Bot-Signaturen und HTTP-Clients.
 */
function checkUserAgent(req, res, next) {
  const userAgent = req.get('User-Agent') || ''; // Holt den User-Agent-Header
  const blockedPatterns = [
    /bot/i, /crawl/i, /spider/i, /scrap/i, // Allgemeine Bot-Muster
    /curl|wget|python-requests|node-fetch|axios|http-client/i // Bekannte HTTP-Client-Muster
  ];

  const isBlocked = blockedPatterns.some(pattern => 
    pattern.test(userAgent)
  );

  if (isBlocked) {
    console.warn(`Blocked suspicious User-Agent: ${userAgent}`);
    return res.status(403).json({ error: 'Zugriff verweigert' });
  }
  next(); // Gehe zur nächsten Middleware
}

/**
 * Middleware für das Rate Limiting.
 * Begrenzt die Anzahl der Anfragen pro Client-IP-Adresse.
 */
async function rateLimitMiddleware(req, res, next) { // Removed 'export' keyword here
  try {
    const clientIp = req.ip || req.connection.remoteAddress;
    await rateLimiter.consume(clientIp); // Versucht, einen Punkt zu verbrauchen
    next(); // Gehe zur nächsten Middleware bei Erfolg
  } catch (rlRejected) {
    // Wenn das Limit überschritten wurde
    if (rlRejected instanceof Error) {
      // Dies sollte nur bei internen Fehlern des Rate Limiters passieren
      console.error('Rate Limiter internal error:', rlRejected);
      return res.status(500).json({ error: 'Interner Serverfehler beim Rate Limiting.' });
    }
    // Rate Limit überschritten (rlRejected ist ein Objekt vom RateLimiter)
    res.status(429).json({
      error: 'Zu viele Anfragen. Bitte versuchen Sie es später erneut.',
      retryAfter: Math.ceil(rlRejected.msBeforeNext / 1000) // Wartezeit in Sekunden
    });
  }
}

/**
 * Middleware zur Verifizierung des Google reCAPTCHA-Tokens.
 * Verwendet den geheimen Schlüssel, um das Token serverseitig zu überprüfen.
 */
async function verifyRecaptcha(req, res, next) { // Removed 'export' keyword here
  const recaptchaToken = req.body.recaptchaToken; // Holt das Token aus dem Request-Body
  const RECAPTCHA_SECRET_KEY = process.env.RECAPTCHA_SECRET_KEY; // Holt den geheimen Schlüssel aus den Umgebungsvariablen

  if (!recaptchaToken) {
    console.warn('reCAPTCHA-Token fehlt in der Anfrage.');
    return res.status(400).json({ error: 'reCAPTCHA-Token fehlt.' });
  }

  if (!RECAPTCHA_SECRET_KEY) {
    console.error('RECAPTCHA_SECRET_KEY ist nicht in den Umgebungsvariablen festgelegt.');
    return res.status(500).json({ error: 'Serverkonfigurationsfehler: reCAPTCHA-Schlüssel fehlt.' });
  }

  try {
    // Sende eine POST-Anfrage an den Google reCAPTCHA-Verifizierungsdienst
    const googleVerifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${RECAPTCHA_SECRET_KEY}&response=${recaptchaToken}`;
    const googleResponse = await axios.post(googleVerifyUrl);

    const { success, score } = googleResponse.data;

    // Überprüfe das Ergebnis der reCAPTCHA-Verifizierung
    // Ein Score von 0.5 ist ein gängiger Schwellenwert für reCAPTCHA v3, kann aber angepasst werden.
    if (success && score >= 0.5) { // >= 0.5 bedeutet, dass es wahrscheinlich ein Mensch ist
      console.log(`reCAPTCHA-Verifizierung erfolgreich. Score: ${score}`);
      next(); // Gehe zur nächsten Middleware/Route, wenn erfolgreich
    } else {
      console.warn(`reCAPTCHA-Verifizierung fehlgeschlagen. Erfolg: ${success}, Score: ${score}`);
      return res.status(403).json({ error: 'reCAPTCHA-Überprüfung fehlgeschlagen. Bitte versuchen Sie es erneut.' });
    }
  } catch (error) {
    console.error('Fehler bei der reCAPTCHA-Verifizierung:', error.response?.data || error.message);
    // Gib eine generische Fehlermeldung zurück, um interne Details zu verbergen
    return res.status(500).json({ error: 'Ein Fehler bei der reCAPTCHA-Überprüfung ist aufgetreten.' });
  }
}

// Kombinierte Sicherheits-Middleware, die global angewendet werden kann
export const securityMiddleware = [
  blockIPs,
  checkUserAgent,
  // rateLimitMiddleware und verifyRecaptcha werden separat in server.js aufgerufen.
];

// Exportiere rateLimitMiddleware und verifyRecaptcha separat,
// da sie oft spezifischen Routen zugewiesen werden.
export { rateLimitMiddleware, verifyRecaptcha }; // Keep this single export statement
