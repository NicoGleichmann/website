import sqlite3
import hashlib

def hash_password(password):
    return hashlib.sha256(password.encode()).hexdigest()

def register_user(username, email, password):
    conn = sqlite3.connect("database.db")
    cur = conn.cursor()

    cur.execute("SELECT * FROM users WHERE username = ?", (username,))
    if cur.fetchone():
        return {"message": "Username already exists"}, 400

    hashed_pw = hash_password(password)
    cur.execute("INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
                (username, email, hashed_pw))
    conn.commit()
    conn.close()
    return {"message": "User registered successfully"}, 200

def login_user(username, password):
    conn = sqlite3.connect("database.db")
    cur = conn.cursor()
    cur.execute("SELECT password FROM users WHERE username = ?", (username,))
    row = cur.fetchone()
    conn.close()

    if row and hash_password(password) == row[0]:
        return {"message": "Login successful"}, 200
    else:
        return {"message": "Invalid credentials"}, 401
