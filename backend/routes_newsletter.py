import re
from flask import request, jsonify
import sqlite3

EMAIL_REGEX = re.compile(r"[^@]+@[^@]+\.[^@]+")

def create_newsletter_table():
    with sqlite3.connect("database.db") as conn:
        conn.execute("""
            CREATE TABLE IF NOT EXISTS newsletter (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                email TEXT UNIQUE NOT NULL
            )
        """)

def save_email(email):
    with sqlite3.connect("database.db") as conn:
        try:
            conn.execute("INSERT INTO newsletter (email) VALUES (?)", (email,))
            return True
        except sqlite3.IntegrityError:
            # E-Mail schon vorhanden
            return False

def newsletter_subscribe():
    data = request.get_json()
    email = data.get("email", "").strip()

    if not EMAIL_REGEX.match(email):
        return jsonify({"message": "Ungültige E-Mail-Adresse"}), 400

    if save_email(email):
        return jsonify({"message": "Danke fürs Abonnieren!"}), 200
    else:
        return jsonify({"message": "E-Mail-Adresse ist bereits registriert."}), 409
