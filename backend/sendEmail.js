// sendEmail.js
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587', 10),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  },
  connectionTimeout: 10000,
});

export async function sendNewsletterEmail(toEmail, userName = 'Nutzer') {
  if (!toEmail) {
    throw new Error('Empfänger-E-Mail ist erforderlich');
  }

  try {
    const info = await transporter.sendMail({
      from: `"Ihr Newsletter" <${process.env.NO_REPLY_EMAIL}>`,
      to: toEmail,
      subject: "Willkommen beim Newsletter!",
      text: `Hallo ${userName},\n\nvielen Dank für Ihre Anmeldung zu unserem Newsletter!`,
      html: `
        <h1>Willkommen, ${userName}!</h1>
        <p>Vielen Dank für Ihre Anmeldung zu unserem Newsletter.</p>
        <p>Sie erhalten in Kürze weitere Informationen von uns.</p>
        <hr>
        <small>Falls Sie sich nicht angemeldet haben, ignorieren Sie bitte diese E-Mail.</small>
      `,
    });
    
    console.log(`E-Mail an ${toEmail} gesendet:`, info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Fehler beim Senden der E-Mail:', error);
    throw new Error('E-Mail konnte nicht gesendet werden');
  }
}