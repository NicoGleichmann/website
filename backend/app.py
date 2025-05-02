from flask import Flask, request
from flask_cors import CORS
from auth import register_user, login_user

app = Flask(__name__)
CORS(app)

@app.route("/register", methods=["POST"])
def register():
    data = request.json
    return register_user(data)

@app.route("/login", methods=["POST"])
def login():
    data = request.json
    return login_user(data)

if __name__ == "__main__":
    from db import create_user_table
    create_user_table()
    app.run(debug=True)
