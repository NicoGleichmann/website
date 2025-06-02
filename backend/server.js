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

// CORS configuration
app.use((req, res, next) => {
  // Allow requests from the frontend development server
  const allowedOrigins = ['http://localhost:5173', 'http://127.0.0.1:5173'];
  const origin = req.headers.origin;
  
  if (allowedOrigins.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  next();
});

// Test route
app.get('/api/test', (req, res) => {
  res.json({ message: 'Test route is working!' });
});

// Newsletter subscription route
app.post('/api/newsletter', async (req, res) => {
  try {
    const { email, token } = req.body;
    
    // Validate input
    if (!email || !token) {
      return res.status(400).json({ error: 'Email and reCAPTCHA token are required' });
    }

    // Here you would typically:
    // 1. Verify the reCAPTCHA token with Google
    // 2. Save the email to your database
    // 3. Send a confirmation email

    // For now, just log and return success
    console.log('New subscription:', email);
    res.status(200).json({ 
      success: true, 
      message: 'Thank you for subscribing!',
      email: email
    });
    
  } catch (error) {
    console.error('Error in newsletter subscription:', error);
    res.status(500).json({ 
      success: false, 
      error: 'An error occurred while processing your subscription' 
    });
  }
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
