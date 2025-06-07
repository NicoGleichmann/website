// sendEmail.js
// This file is responsible for sending emails using Brevo.

import * as SibApiV3Sdk from '@sendinblue/client';
import 'dotenv/config';

// Get environment variables
const BREVO_API_KEY = process.env.API_KEY;
const SENDER_EMAIL = process.env.SENDER_EMAIL;

// Check if the API Key is set
if (!BREVO_API_KEY) {
  process.exit(1);
}

// Configure the Brevo API Client
const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

// Set API key for authentication
apiInstance.setApiKey(SibApiV3Sdk.TransactionalEmailsApiApiKeys.apiKey, BREVO_API_KEY);


/**
 * Sends a welcome email to a new newsletter subscriber via Brevo.
 * @param {string} toEmail - The recipient's email address.
 * @param {string} [userName='Nutzer'] - The recipient's name (optional).
 * @returns {Promise<{success: boolean, messageId?: string, error?: string}>} - An object indicating the success of the send, and optionally a message ID or error message.
 */
export async function sendNewsletterEmail(toEmail, userName = 'Nutzer') {
  if (!toEmail) {
    return { success: false, error: 'Recipient email is required' };
  }

  const SENDER_EMAIL = process.env.SENDER_EMAIL; 

  if (!SENDER_EMAIL) {
    return { success: false, error: 'Sender email is not configured' };
  }

  let sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();

  sendSmtpEmail.sender = { email: SENDER_EMAIL, name: "Ihr Newsletter" }; 
  sendSmtpEmail.to = [{ email: toEmail, name: userName }]; 
  sendSmtpEmail.subject = "Willkommen beim Newsletter!";
  sendSmtpEmail.textContent = `Hallo ${userName},\n\nvielen Dank für Ihre Anmeldung zu unserem Newsletter!`;
  sendSmtpEmail.htmlContent = `
    <h1>Willkommen, ${userName}!</h1>
    <p>Vielen Dank für Ihre Anmeldung zu unserem Newsletter.</p>
    <p>Sie erhalten in Kürze weitere Informationen von uns.</p>
    <hr>
    <small>Falls Sie sich nicht angemeldet haben, ignorieren Sie bitte diese E-Mail.</small>
  `;
  // IMPORTANT: If you want to use a Brevo template, use templateId instead:
  // sendSmtpEmail.templateId = YOUR_BREVO_TEMPLATE_ID; 
  // sendSmtpEmail.params = { name: userName }; 

  try {
    const data = await apiInstance.sendTransacEmail(sendSmtpEmail);
    
    return { success: true, messageId: data.messageId || 'Brevo send successful' };
  } catch (error) {
    let errorMessage = 'Email could not be sent';
    if (error.response && error.response.text) {
        try {
            const errorDetails = JSON.parse(error.response.text);
            errorMessage = errorDetails.message || errorMessage;
        } catch (e) {
            // response.text was not valid JSON
        }
    }
    return { success: false, error: errorMessage };
  }
}
