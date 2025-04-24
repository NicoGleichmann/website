from flask import Flask, request, jsonify
from flask_cors import CORS
import smtplib
from email.mime.text import MIMEText
import os
from dotenv import load_dotenv

load_dotenv()  # .env-Datei laden

app = Flask(__name__)
CORS(app)

SENDER_EMAIL = os.getenv("SENDER_EMAIL")
SENDER_PASSWORD = os.getenv("SENDER_PASSWORD")
RECIPIENT_EMAIL = os.getenv("RECIPIENT_EMAIL")

SMTP_SERVER = "smtp.gmail.com"
SMTP_PORT = 587

@app.route("/api/contact", methods=["POST"])
def contact():
    data = request.get_json()
    name = data.get("name")
    email = data.get("email")
    message = data.get("message")

    if not name or not email or not message:
        return jsonify({"error": "Alle Felder sind erforderlich."}), 400

    msg = MIMEText(f"Nachricht von {name} <{email}>:\n\n{message}")
    msg["Subject"] = "Neue Kontaktformular-Nachricht"
    msg["From"] = SENDER_EMAIL
    msg["To"] = RECIPIENT_EMAIL

    try:
        with smtplib.SMTP(SMTP_SERVER, SMTP_PORT) as server:
            server.starttls()
            server.login(SENDER_EMAIL, SENDER_PASSWORD)
            server.send_message(msg)
        return jsonify({"success": "Nachricht wurde gesendet!"}), 200
    except Exception as e:
        print("Fehler beim Senden:", e)
        return jsonify({"error": "Fehler beim Senden der Nachricht."}), 500

if __name__ == "__main__":
    app.run(debug=True)

