from flask import request, jsonify
import sqlite3
from utils import hash_password, verify_password

def register_user():
    data = request.get_json()
    username = data.get("username")
    email = data.get("email")
    password = hash_password(data.get("password"))

    try:
        with sqlite3.connect("database.db") as conn:
            conn.execute("INSERT INTO users (username, email, password) VALUES (?, ?, ?)", 
                         (username, email, password))
        return jsonify({"message": "User registered successfully!"}), 201
    except sqlite3.IntegrityError:
        return jsonify({"message": "Username or Email already exists!"}), 409

def login_user():
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")

    with sqlite3.connect("database.db") as conn:
        cursor = conn.execute("SELECT password FROM users WHERE username = ?", (username,))
        result = cursor.fetchone()

    if result and verify_password(password, result[0]):
        return jsonify({"message": "Login successful!"}), 200
    return jsonify({"message": "Invalid credentials"}), 401
