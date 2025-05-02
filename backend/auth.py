import sqlite3
import hashlib

def hash_password(password):
    return hashlib.sha256(password.encode()).hexdigest()

def register_user(data):
    username = data.get("username")
    email = data.get("email")
    password = hash_password(data.get("password"))

    try:
        conn = sqlite3.connect("database.db")
        cur = conn.cursor()
        cur.execute("INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
                    (username, email, password))
        conn.commit()
        return {"message": "User registered successfully"}, 201
    except sqlite3.IntegrityError:
        return {"error": "Username or email already exists"}, 409
    finally:
        conn.close()

def login_user(data):
    username = data.get("username")
    password = hash_password(data.get("password"))

    conn = sqlite3.connect("database.db")
    cur = conn.cursor()
    cur.execute("SELECT * FROM users WHERE username=? AND password=?", (username, password))
    user = cur.fetchone()
    conn.close()

    if user:
        return {"message": "Login successful", "username": username}, 200
    else:
        return {"error": "Invalid username or password"}, 401
