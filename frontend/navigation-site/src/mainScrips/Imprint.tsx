import React from "react";

const Imprint: React.FC = () => {
    return (
      <main style={{ margin: "2rem auto", padding: "0 1rem", fontFamily: "Arial, sans-serif", lineHeight: 1.2, color: "#fff" }}>
        <section id="impressum">
          <h1 style={{ color: "#0056b3" }}>Impressum</h1>
          <p><strong>Angaben gemäß § 5 TMG:</strong></p>
          <address>
            Nico Gleichmann<br />
            Musterstraße 12<br />
            12345 Musterstadt<br />
            Deutschland
          </address>
          <p>
            <strong>Kontakt:</strong><br />
            Telefon: +49 123 456789<br />
            E-Mail: <a href="mailto:kontakt@deine-domain.de">kontakt@deine-domain.de</a>
          </p>
          <p>
            <strong>Vertreten durch:</strong><br />
            Nico Gleichmann
          </p>
          <p>
            <strong>Registereintrag:</strong><br />
            Eintragung im Handelsregister.<br />
            Registergericht: Musterstadt<br />
            Registernummer: HRB 12345
          </p>
          <p>
            <strong>Umsatzsteuer-ID:</strong><br />
            Umsatzsteuer-Identifikationsnummer gemäß §27 a Umsatzsteuergesetz: DE123456789
          </p>
          <p>
            <strong>Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV:</strong><br />
            Nico Gleichmann<br />
            Musterstraße 12<br />
            12345 Musterstadt
          </p>
        </section>
  
        <section id="datenschutz" style={{ marginTop: "3rem" }}>
          <h1 style={{ color: "#0056b3" }}>Datenschutzerklärung</h1>
  
          <h2>1. Datenschutz auf einen Blick</h2>
          <p>
            Wir freuen uns sehr über Ihr Interesse an unserem Unternehmen. Datenschutz hat einen besonders hohen Stellenwert für die Geschäftsleitung von Nico Gleichmann. Eine Nutzung der Internetseiten ist grundsätzlich ohne jede Angabe personenbezogener Daten möglich.
          </p>
  
          <h2>2. Erhebung und Verarbeitung personenbezogener Daten</h2>
          <p>
            Personenbezogene Daten werden nur erhoben, wenn Sie diese freiwillig, z.B. im Rahmen einer Anfrage oder Registrierung, an uns übermitteln.
          </p>
  
          <h2>3. Zweck der Datenverarbeitung</h2>
          <p>
            Wir verwenden die von Ihnen mitgeteilten Daten ausschließlich zur Erfüllung und Abwicklung Ihrer Anfrage oder zur Vertragsdurchführung.
          </p>
  
          <h2>4. Weitergabe an Dritte</h2>
          <p>
            Eine Weitergabe Ihrer personenbezogenen Daten an Dritte erfolgt nur, wenn dies zur Vertragserfüllung notwendig ist oder Sie ausdrücklich eingewilligt haben.
          </p>
  
          <h2>5. Cookies</h2>
          <p>
            Unsere Website verwendet Cookies, um die Benutzerfreundlichkeit zu verbessern. Sie können die Verwendung von Cookies in Ihrem Browser deaktivieren.
          </p>
  
          <h2>6. Google Analytics (sofern verwendet)</h2>
          <p>
            Unsere Website nutzt Google Analytics, einen Webanalysedienst der Google Inc., zur Analyse der Nutzung der Website. Details finden Sie in der Google Datenschutzerklärung.
          </p>
  
          <h2>7. Ihre Rechte</h2>
          <p>
            Sie haben jederzeit das Recht auf Auskunft, Berichtigung, Sperrung oder Löschung Ihrer personenbezogenen Daten. Kontaktieren Sie uns dazu bitte unter:{" "}
            <a href="mailto:kontakt@deine-domain.de">kontakt@deine-domain.de</a>.
          </p>
  
          <h2>8. Änderungen dieser Datenschutzerklärung</h2>
          <p>
            Wir behalten uns vor, diese Datenschutzerklärung gelegentlich anzupassen, damit sie stets den aktuellen rechtlichen Anforderungen entspricht.
          </p>
        </section>
      </main>
    );
  };
  
  export default Imprint;