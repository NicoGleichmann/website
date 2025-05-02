from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3
from auth import register_user, login_user

app = Flask(__name__)
CORS(app)  # Erlaubt Anfragen vom React-Frontend

@app.route("/register", methods=["POST"])
def register():
    data = request.json
    username = data.get("username")
    email = data.get("email")
    password = data.get("password")
    return register_user(username, email, password)

@app.route("/login", methods=["POST"])
def login():
    data = request.json
    username = data.get("username")
    password = data.get("password")
    return login_user(username, password)

if __name__ == "__main__":
    app.run(debug=True)
