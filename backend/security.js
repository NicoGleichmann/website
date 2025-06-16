import ipRangeCheck from 'ip-range-check';
import { RateLimiterRedis } from 'rate-limiter-flexible';
import Redis from 'ioredis';
import axios from 'axios';

const redisClient = new Redis(process.env.REDIS_URL || 'redis://localhost:6379');
const rateLimiter = new RateLimiterRedis({
  storeClient: redisClient,
  keyPrefix: 'api_limiter',
  points: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100'),
  duration: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '3600000') / 1000,
  blockDuration: 3600,
});

function blockIPs(req, res, next) {
  const blockedRanges = (process.env.BLOCKED_IP_RANGES || '')
    .split(',')
    .map(range => range.trim())
    .filter(Boolean);
  const clientIp = req.ip || req.connection.remoteAddress;
  if (ipRangeCheck(clientIp, blockedRanges)) {
    return res.status(403).json({ error: 'Zugriff verweigert' });
  }
  next();
}

function checkUserAgent(req, res, next) {
  const userAgent = req.get('User-Agent') || '';
  const blockedPatterns = [
    /bot/i, /crawl/i, /spider/i, /scrap/i,
    /curl|wget|python-requests|node-fetch|axios|http-client/i
  ];
  if (blockedPatterns.some(pattern => pattern.test(userAgent))) {
    return res.status(403).json({ error: 'Zugriff verweigert' });
  }
  next();
}

async function rateLimitMiddleware(req, res, next) {
  try {
    const clientIp = req.ip || req.connection.remoteAddress;
    await rateLimiter.consume(clientIp);
    next();
  } catch (rlRejected) {
    if (rlRejected instanceof Error) {
      return res.status(500).json({ error: 'Interner Serverfehler beim Rate Limiting.' });
    }
    res.status(429).json({
      error: 'Zu viele Anfragen. Bitte versuchen Sie es später erneut.',
      retryAfter: Math.ceil(rlRejected.msBeforeNext / 1000)
    });
  }
}

async function verifyRecaptcha(req, res, next) {
  const recaptchaToken = req.body.recaptchaToken;
  const RECAPTCHA_SECRET_KEY = process.env.RECAPTCHA_SECRET_KEY;
  if (!recaptchaToken) {
    return res.status(400).json({ error: 'reCAPTCHA-Token fehlt.' });
  }
  if (!RECAPTCHA_SECRET_KEY) {
    return res.status(500).json({ error: 'Serverkonfigurationsfehler: reCAPTCHA-Schlüssel fehlt.' });
  }
  try {
    const googleVerifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${RECAPTCHA_SECRET_KEY}&response=${recaptchaToken}`;
    const googleResponse = await axios.post(googleVerifyUrl);
    const { success, score } = googleResponse.data;
    if (success && score >= 0.5) {
      next();
    } else {
      return res.status(403).json({ error: 'reCAPTCHA-Überprüfung fehlgeschlagen. Bitte versuchen Sie es erneut.' });
    }
  } catch (error) {
    return res.status(500).json({ error: 'Ein Fehler bei der reCAPTCHA-Überprüfung ist aufgetreten.' });
  }
}

export const securityMiddleware = [
  blockIPs,
  checkUserAgent,
];

export { rateLimitMiddleware, verifyRecaptcha };