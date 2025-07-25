import React, { useState } from 'react';
import styles from './Contact.module.css';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In einem echten Szenario würden diese Daten an ein Backend gesendet
    console.log('Formulardaten gesendet:', formData);
    alert('Vielen Dank für Ihre Nachricht! Wir werden uns in Kürze bei Ihnen melden.');
    setFormData({ name: '', email: '', subject: '', message: '' }); // Formular zurücksetzen
  };

  return (
    <div className={styles.contactPage}>
      <h1 className={styles.pageTitle}>Kontaktieren Sie uns</h1>
      <section className={styles.contactInfo}>
        <p>Haben Sie Fragen oder Anregungen? Wir freuen uns auf Ihre Nachricht!</p>
        <ul className={styles.infoList}>
          <li><strong>E-Mail:</strong> <a href="mailto:info@deinstartup.de">info@deinstartup.de</a></li>
          <li><strong>Telefon:</strong> <a href="tel:+49123456789">+49 123 456789</a></li>
          <li><strong>Adresse:</strong> Musterstraße 1, 12345 Musterstadt, Deutschland</li>
        </ul>
      </section>

      <section className={styles.contactFormSection}>
        <h2>Schreiben Sie uns eine Nachricht</h2>
        <form className={styles.contactForm} onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="email">E-Mail:</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="subject">Betreff:</label>
            <input type="text" id="subject" name="subject" value={formData.subject} onChange={handleChange} />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="message">Nachricht:</label>
            <textarea id="message" name="message" rows={5} value={formData.message} onChange={handleChange} required></textarea>
          </div>
          <button type="submit" className={styles.submitButton}>Nachricht senden</button>
        </form>
      </section>

      <section className={styles.mapSection}>
        <h2>Finden Sie uns</h2>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2524.3644919525417!2d10.158013615967073!3d50.84931987953257!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47a41bb623f95e8d%3A0xc4a6c4b2b2b2b2b!2sDermbach%2C%20Deutschland!5e0!3m2!1sde!2sde!4v1700000000000!5m2!1sde!2sde"
          width="100%"
          height="450"
          style={{ border: 0 }}
          allowFullScreen={true}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className={styles.mapFrame}
          title="Standort von Dein Startup"
        ></iframe>
      </section>
    </div>
  );
};

export default Contact;