// main.tsx
import './style.css';
//import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import ReCAPTCHA from 'react-google-recaptcha';

//Scripts
import ExternalLink from './mainScrips/links.tsx'
import InstaSlider from './mainScrips/imageSlider.tsx'
import HorizontalScroll from './mainScrips/scroll.tsx';
//import Credits from './mainScrips/copyright.tsx'

//Global Scripts
import ThemeToggle from './mainScrips/darkMode.tsx';
import CookieBanner from './mainScrips/cookie.tsx'
import { Link } from 'react-router-dom';
import { useState, useRef } from 'react';



const HomePage = () => {
  //const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [responseMsg, setResponseMsg] = useState({
    text: "",
    type: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  // Temporäre Problemumgehung: Direkte Zuweisung des Schlüssels
  const siteKey = '6LcBGFErAAAAABnKFKdfxPx5uq7WS2gJNyFMmneJ';
  
  // Debug-Ausgabe
  console.log('Verwende reCAPTCHA Site Key:', siteKey);
  
  // Später können wir zur Umgebungsvariable zurückkehren:
  // const siteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY;

  const handleRecaptchaChange = (token: string | null) => {
    setRecaptchaToken(token);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!recaptchaToken) {
      setResponseMsg({
        text: "Bitte bestätige, dass du kein Roboter bist!",
        type: "error"
      });
      return;
    }

    setIsLoading(true);
    setResponseMsg({
      text: "...lädt",
      type: "loading"
    });
  
    try {
      const response = await fetch('http://localhost:5000/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          token: recaptchaToken
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setResponseMsg({
          text: data.message || "Erfolgreich für den Newsletter angemeldet!",
          type: "success"
        });
        setEmail("");
        recaptchaRef.current?.reset();
        setRecaptchaToken(null);
      } else {
        throw new Error(data.error || "Ein Fehler ist aufgetreten");
      }
    } catch (error) {
      console.error("Error:", error);
      const errorMessage = error instanceof Error ? error.message : "Ein unerwarteter Fehler ist aufgetreten";
      setResponseMsg({
        text: `Fehler: ${errorMessage}`,
        type: "error"
      });
    } finally {
      setIsLoading(false);
      recaptchaRef.current?.reset();
    }
  };


  return (
    <>
      <HorizontalScroll />
      <div className="top">
        <ThemeToggle />
      </div>
      <div className="main container">
        <motion.div 
          className="box1 box slide-in" 
          onClick={() => window.location.href = 'http://localhost:5174/'}
          whileHover={{ scale: 1.008 }}
          whileTap={{ scale: 1 }}
          style={{ cursor: 'pointer' }}
        >
            <div className="top">
              <img src="public/Profil.jpg" alt="Logo" loading="lazy"/>
              <h4>Nico Gleichmann</h4>
              <p><span className="point"></span>Entrepreneur | Digital Creator | Innovator</p>
            </div>
            <div className="mid">
              <h2>„Die Zukunft gehört denen, die sie gestalten. Ich entwickle digitale Lösungen, die begeistern und Mehrwert schaffen.“</h2>
            </div>
            <div className="bot">
              <h4>📍 Sitz in Eisenach, Thüringen, Deutschland</h4>
              <p>🕒 Mitteleuropäische Zeit (MEZ)</p>
            </div>
        </motion.div>

        <div className="box2 slide-in">
         <ExternalLink/>
          <div className="case large_box" id="insta" data-link="https://www.instagram.com/nico.gleichmann/">
            <div className="icon"><img src="/img/insta.png" alt="Logo" loading="lazy"/></div>
            <div className="text">
              <div className="username">@nico.gleichmann</div>
              <div className="followers">5,215 followers</div>
            </div>
          </div>

          <div className="case" id="tiktok" data-link="https://www.tiktok.com/@nico.gleichmann">
            <div className="icon"><img src="/img/tiktok.png" alt="Logo" loading="lazy"/></div>
            <div className="text">
              <div className="username">@tiktok</div>
            </div>
          </div>

          <div className="case" id="youtube" data-link="https://www.youtube.com/@NicoGleichmann">
            <div className="icon">
              <img id="youtube-w" className="dark-mode" src="/img/youtube_w.png" alt="Logo" loading="lazy" style={{display: 'block'}}/>
              <img id="youtube-d" className="white-mode" src="/img/youtube_d.png" alt="Logo" loading="lazy" style={{display: 'none'}}/>
            </div>
            <div className="text">
              <div className="username">@NicoGleichmann</div>
            </div>
          </div>

          <div className="email-box case" id="email_box" data-link="https://mail.google.com/mail/u/0/#inbox">
            <img src="/img/gmail.png" alt="Logo"/>nicogleichmann39@gmail.com
          </div>

          <div className="large_box case" id="business" data-link="https://lumio.printify.me">
            <div className="icon">🔗</div>
            <div className="text">
              <div className="username">@BusinessSite</div>
              <div className="followers">488 connections</div>
            </div>
          </div>

          <div className="case" id="facebook" data-link="https://www.facebook.com/profile.php?id=61571706736157">
            <div className="icon">
              <img id="facebook-w" className="dark-mode" src="/img/facebook_w.png" alt="Logo" loading="lazy" style={{display: 'block'}}/>
              <img id="facebook-d" className="white-mode" src="/img/facebook_d.png" alt="Logo" loading="lazy" style={{display: 'none'}}/>
            </div>
            <div className="text">
              <div className="username">@Nico Gleichmann</div>
            </div>
          </div>

          <div className="case" id="x" data-link="https://x.com/nico_gleichmann">
            <div className="icon"><img src="/img/x2.png" alt="Logo" loading="lazy"/></div>
            <div className="text">
              <div className="username">@nico_gleichmann</div>
            </div>
          </div>
        </div>

        <div className="box3 box no-hover slide-in">
          <img id="black_01" src="/img/d05.png" className="dark-mode" alt="Logo" loading="lazy"/>
          <img id="white_01" src="/img/w01.jpg" className="white-mode" alt="Logo" loading="lazy"/>
        </div>

        <div className="box4">
          <div className="row">
            <div id="black_02" className="top_images dark-mode"><img src="/img/d02.png" alt="Logo" loading="lazy"/></div>
            <div id="black_03" className="top_images dark-mode"><img src="/img/d04.jpg" alt="Logo" loading="lazy"/></div>
            <div id="white_02" className="top_images white-mode"><img src="/img/w02.jpg" alt="Logo" loading="lazy"/></div>
            <div id="white_03" className="top_images white-mode"><img src="/img/w03.jpg" alt="Logo" loading="lazy"/></div>
          </div>

          <div id="black_04" className="full-width dark-mode"><img src="/img/d08.jpg" alt="Logo" loading="lazy"/></div>
          <div id="black_05" className="full-width dark-mode"><img src="/img/d01.jpg" alt="Logo" loading="lazy"/></div>

          <div id="white_04" className="full-width white-mode"><img src="/img/w04.jpg" alt="Logo" loading="lazy"/></div>
          <div id="white_05" className="full-width white-mode"><img src="/img/w05.jpg" alt="Logo" loading="lazy"/></div>
        </div>

        <div className="box5 box no-hover slide-in">
          <img id="black_06" src="/img/d07.jpg" className="dark-mode" alt="Logo" loading="lazy"/>
          <img id="white_06" src="/img/w06.jpg" className="white-mode" alt="Logo" loading="lazy"/>
        </div>

        <div className="post-container box6 box insta slide-in">
          <InstaSlider /> 
        </div>

        <div className="box7 slide-in">
          <div className="lite">
            <h4>1. Website Portfolio fertig machen</h4>
            <p>1.April 2025</p>
          </div>
          <div className="lite">
            <h4>2. Website Business fertig machen</h4>
            <p>15.Mai 2025</p>
          </div>
          <div className="lite">
            <h4>3. Social Media up to date bringen</h4>
          </div>
        </div>

        {/* Newsletter Box */}
        <div className="box8 box slide-in">
          <div className="form-box newsletter-box">
            <h2>Abonniere meinen Newsletter!</h2>
            <p>Erhalte die neuesten Updates direkt in dein Postfach!</p>
            <form id="newsletter-form" onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="Deine E-Mail-Adresse"
                id="textInput"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
              />
              <button 
              type="submit" 
              disabled={isLoading}
              className={isLoading ? 'loading' : ''}
              >
              {isLoading ? 'Wird gesendet...' : 'Abonnieren'}
              </button>
              <ReCAPTCHA
                ref={recaptchaRef}
                sitekey={siteKey}
                onChange={handleRecaptchaChange}
              />
            </form>
            {responseMsg.text && (
              <p id="response-msg" className={`response-${responseMsg.type}`}>{responseMsg.text}</p>
            )}
          </div>
        </div>
      </div>
      {/* Footer */}
          <motion.div
      className="footer"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <p>
        2025 by{" "}
        <a
          href="https://www.instagram.com/nico.gleichmann/"
          className="hover-effect instagram_link"
          id="instagram_link"
          rel="noopener noreferrer"
        >
          Nico Gleichmann
        </a>
        {" "}|
      </p>

      <span className="info-container">
        <p style={{paddingLeft: "0.36rem"}}>Weitere Infos</p>
        <span className="info-dropdown">
          <Link to="/nutzungslinks">
            Nutzungslinks
          </Link>
          <a
            href="https://www.instagram.com/nico.gleichmann/"
            className="hover-effect"
            rel="noopener noreferrer"
          >
            Impressum
          </a>
          <a
            href="https://www.instagram.com/nico.gleichmann/"
            className="hover-effect"
            rel="noopener noreferrer"
          >
            Datenschutz
          </a>
        </span>
      </span>
    </motion.div>
    

      <CookieBanner />
    </>
  );
};

export default HomePage;