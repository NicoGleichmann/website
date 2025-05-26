import ipRangeCheck from 'ip-range-check';
import { RateLimiterRedis } from 'rate-limiter-flexible';
import Redis from 'ioredis';

const redisClient = new Redis(process.env.REDIS_URL || 'redis://localhost:6379');

// Rate Limiter Konfiguration
const rateLimiter = new RateLimiterRedis({
  storeClient: redisClient,
  keyPrefix: 'api_limiter',
  points: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100'),
  duration: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '3600000') / 1000,
  blockDuration: 3600,
});

// IP-Blockierung
function blockIPs(req, res, next) {
  const blockedRanges = (process.env.BLOCKED_IP_RANGES || '')
    .split(',')
    .map(range => range.trim())
    .filter(Boolean);
  
  const clientIp = req.ip || req.connection.remoteAddress;
  
  if (ipRangeCheck(clientIp, blockedRanges)) {
    console.warn(`Blocked request from blacklisted IP: ${clientIp}`);
    return res.status(403).json({ error: 'Zugriff verweigert' });
  }
  next();
}

// User-Agent Prüfung
function checkUserAgent(req, res, next) {
  const userAgent = req.get('User-Agent') || '';
  const blockedPatterns = [
    /bot/i, /crawl/i, /spider/i, /scrap/i,
    /curl|wget|python-requests|node-fetch|axios|http-client/i
  ];
  
  const isBlocked = blockedPatterns.some(pattern => 
    pattern.test(userAgent)
  );
  
  if (isBlocked) {
    console.warn(`Blocked suspicious User-Agent: ${userAgent}`);
    return res.status(403).json({ error: 'Zugriff verweigert' });
  }
  next();
}

// Rate Limiting Middleware
async function rateLimitMiddleware(req, res, next) {
  try {
    const clientIp = req.ip || req.connection.remoteAddress;
    await rateLimiter.consume(clientIp);
    next();
  } catch (rlRejected) {
    if (rlRejected instanceof Error) throw rlRejected;
    res.status(429).json({
      error: 'Zu viele Anfragen. Bitte versuchen Sie es später erneut.',
      retryAfter: Math.ceil(rlRejected.msBeforeNext / 1000)
    });
  }
}

// Kombinierte Security-Middleware
export const securityMiddleware = [
  blockIPs,
  checkUserAgent,
  rateLimitMiddleware
];