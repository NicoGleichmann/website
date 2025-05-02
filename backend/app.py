from flask import Flask
from routes import register_user, login_user
from models import create_user_table

app = Flask(__name__)
create_user_table()

@app.route("/register", methods=["POST"])
def register():
    return register_user()

@app.route("/login", methods=["POST"])
def login():
    return login_user()

@app.route("/users", methods=["GET"])
def list_users():
    import sqlite3
    with sqlite3.connect("database.db") as conn:
        users = conn.execute("SELECT id, username, email FROM users").fetchall()
    return {
        "users": [{"id": u[0], "username": u[1], "email": u[2]} for u in users]
    }

if __name__ == "__main__":
    app.run(debug=True)
