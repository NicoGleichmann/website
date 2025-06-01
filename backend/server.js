// server.js - Minimal version to test basic functionality

import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

console.log('Environment variables:', {
  API_KEY: process.env.API_KEY ? '***' + String(process.env.API_KEY).slice(-4) : 'Not set',
  SENDER_EMAIL: process.env.SENDER_EMAIL || 'Not set',
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: process.env.PORT || 5000
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();

// Basic middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Simple CORS for development
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Test route
app.get('/api/test', (req, res) => {
  res.json({ message: 'Test route is working!' });
});

// Simple error handling
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} (${process.env.NODE_ENV})`);
  console.log(`Test the server at: http://localhost:${PORT}/api/test`);
});
