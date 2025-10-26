const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('./database.js');

const app = express();
const PORT = 5000;
const JWT_SECRET = 'your_jwt_secret_key'; // Replace with a strong secret key

app.use(cors());
app.use(express.json());

// Register endpoint
app.post('/api/register', (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ message: 'Please provide all required fields.' });
    }

    const hashedPassword = bcrypt.hashSync(password, 8);

    const sql = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
    db.run(sql, [username, email, hashedPassword], function(err) {
        if (err) {
            if (err.message.includes('UNIQUE constraint failed')) {
                return res.status(400).json({ message: 'Username or email already exists.' });
            }
            return res.status(500).json({ message: 'Database error during registration.', error: err.message });
        }
        res.status(201).json({ message: 'User registered successfully.', userId: this.lastID });
    });
});

// Login endpoint
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Please provide email and password.' });
    }

    const sql = 'SELECT * FROM users WHERE email = ?';
    db.get(sql, [email], (err, user) => {
        if (err) {
            return res.status(500).json({ error: 'Database error during login.' });
        }
        if (!user) {
            return res.status(404).json({ error: 'User not found.' });
        }

        const passwordIsValid = bcrypt.compareSync(password, user.password);
        if (!passwordIsValid) {
            return res.status(401).json({ error: 'Invalid password.' });
        }

        const token = jwt.sign({ id: user.id }, JWT_SECRET, {
            expiresIn: 86400 // 24 hours
        });

        res.status(200).json({
            user: {
                id: user.id,
                username: user.username,
                email: user.email
            },
            token: token
        });
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
