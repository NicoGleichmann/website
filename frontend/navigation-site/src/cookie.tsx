import { useState, useEffect } from 'react';
import './style.css';


function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [analytics, setAnalytics] = useState(true);
  const [personalization, setPersonalization] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      setShowBanner(true);
      document.body.classList.add("cookie-lock");
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookie-consent", JSON.stringify({ analytics: true, personalization: true }));
    setShowBanner(false);
    document.body.classList.remove("cookie-lock");
  };

  const handleDecline = () => {
    localStorage.setItem("cookie-consent", JSON.stringify({ analytics: false, personalization: false }));
    setShowBanner(false);
    document.body.classList.remove("cookie-lock");
  };

  const handleSaveSettings = () => {
    localStorage.setItem("cookie-consent", JSON.stringify({ analytics, personalization }));
    setShowSettings(false);
    setShowBanner(false);
    document.body.classList.remove("cookie-lock");
  };


  return (
    <>
      {showBanner && (
        <div className="cookie-banner">
          <p>
            🍪 Diese Website verwendet Cookies, um dir die bestmögliche Erfahrung zu bieten.
          </p>
          <div className="cookie-buttons">
            <button onClick={handleDecline} className="decline-btn">Ablehnen</button>
            <button onClick={() => setShowSettings(true)} className="settings-btn">Einstellungen</button>
            <button onClick={handleAccept} className="accept-btn">Akzeptieren</button>
          </div>
        </div>
      )}

      {showSettings && (
        <div className="cookie-settings-overlay">
          <div className="cookie-settings-modal">
            <button className="close-button" onClick={() => setShowSettings(false)}>×</button>
            <h2>🔧 Cookie-Einstellungen</h2>
            <p>
              Wähle aus, welche Cookies wir verwenden dürfen. Du kannst deine Einstellungen jederzeit anpassen.
            </p>

            <div className="checkbox-group">
              <label>
                <input
                  type="checkbox"
                  checked={true} // Der Haken ist immer gesetzt
                  disabled // Kann nicht geändert werden
                />
                <span>
                  <strong>Notwendige Cookies</strong> Für den grundlegenden Betrieb einer Website erforderlich.
                </span>
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={analytics}
                  onChange={() => setAnalytics(!analytics)} />
                <span>
                  <strong>Analyse-Cookies:</strong> Helfen uns, unsere Website zu verbessern.
                </span>
              </label>

              <label>
                <input
                  type="checkbox"
                  checked={personalization}
                  onChange={() => setPersonalization(!personalization)} />
                <span>
                  <strong>Personalisierung:</strong> Macht die Website-Erfahrung individueller.
                </span>
              </label>
            </div>

            <div className="modal-buttons">
              <button onClick={() => setShowSettings(false)} className="cancel">Abbrechen</button>
              <button onClick={handleSaveSettings} className="save">Einstellungen speichern</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default CookieConsent;
