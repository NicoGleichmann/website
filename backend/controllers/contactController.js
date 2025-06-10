import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

// Validiert eine E-Mail-Adresse
const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

// Erstelle einen Nodemailer-Transporter mit Gmail
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD // App-Passwort von Google
    },
    tls: {
        // Deaktiviere die Zertifikatsüberprüfung (nur für Entwicklung!)
        rejectUnauthorized: false
    }
});

/**
 * Sendet eine Kontaktanfrage als E-Mail über Gmail.
 * @param {object} req - Das Anfrageobjekt von Express.
 * @param {object} res - Das Antwortobjekt von Express.
 */
export const sendContactMessage = async (req, res) => {
    const { name, email, message } = req.body;

    // Validierung der Eingaben
    if (!name || !email || !message) {
        return res.status(400).json({
            success: false,
            message: 'Bitte füllen Sie alle erforderlichen Felder aus (Name, E-Mail, Nachricht).'
        });
    }

    if (!isValidEmail(email)) {
        return res.status(400).json({
            success: false,
            message: 'Bitte geben Sie eine gültige E-Mail-Adresse ein.'
        });
    }

    // Überprüfe, ob die erforderlichen Umgebungsvariablen gesetzt sind
    if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
        return res.status(500).json({
            success: false,
            message: 'Serverkonfigurationsfehler: E-Mail-Dienste sind nicht verfügbar.'
        });
    }

    // E-Mail-Optionen für die Benachrichtigung an dich
    const mailOptions = {
        from: `"${name}" <${process.env.GMAIL_USER}>`,
        to: process.env.GMAIL_USER, // An deine eigene E-Mail
        replyTo: email,
        subject: `Neue Kontaktanfrage von ${name}`,
        text: `
            Name: ${name}
            E-Mail: ${email}
            
            Nachricht:
            ${message}
        `,
        html: `
            <h2>Neue Kontaktanfrage</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>E-Mail:</strong> <a href="mailto:${email}">${email}</a></p>
            <p><strong>Nachricht:</strong></p>
            <p>${message.replace(/\n/g, '<br>')}</p>
        `
    };

    try {
        // Sende die Benachrichtigungs-E-Mail an dich selbst
        await transporter.sendMail(mailOptions);
        
        // Sende eine Bestätigungsmail an den Absender
        const confirmationMail = {
            from: `"Nico Gleichmann" <${process.env.GMAIL_USER}>`,
            to: email,
            subject: 'Danke für deine Nachricht',
            text: `Hallo ${name},\n\nVielen Dank für deine Nachricht. Ich werde mich so schnell wie möglich bei dir melden.\n\nDeine Nachricht:\n${message}\n\nViele Grüße,\nNico Gleichmann`,
            html: `
                <h2>Hallo ${name},</h2>
                <p>Vielen Dank für deine Nachricht. Ich werde mich so schnell wie möglich bei dir melden.</p>
                <p><strong>Deine Nachricht:</strong></p>
                <p>${message.replace(/\n/g, '<br>')}</p>
                <p>Viele Grüße,<br>Nico Gleichmann</p>
            `
        };

        await transporter.sendMail(confirmationMail);
        
        return res.status(200).json({
            success: true,
            message: 'Ihre Nachricht wurde erfolgreich gesendet!'
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Ein unerwarteter Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.'
        });
    }
};
