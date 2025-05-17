import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp-relay.sendinblue.com",
  port: 587,
  secure: false, // true für 465, false für andere Ports
  auth: {
    user: "deine-email@domain.de",      // dein Brevo SMTP Login (meist E-Mail)
    pass: "dein SMTP API-Key",           // dein SMTP API Schlüssel von Brevo
  },
});

export async function sendNewsletterEmail(toEmail) {
  try {
    const info = await transporter.sendMail({
      from: '"Dein Newsletter" <deine-email@domain.de>',
      to: toEmail,
      subject: "Danke fürs Abonnieren!",
      text: "Willkommen in unserem Newsletter.",
      html: "<h1>Willkommen in unserem Newsletter</h1><p>Danke, dass du dich angemeldet hast!</p>",
    });
    console.log("Email gesendet: ", info.messageId);
  } catch (error) {
    console.error("Fehler beim E-Mail senden: ", error);
  }
}
