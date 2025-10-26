import styles from "./Hero.module.css"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { fadeInUp, fadeInLeft, fadeInRight } from "../ScrollToTop/scrollAnimations.tsx"
import Modal from "./Modal.tsx"
import { useTheme } from "../DarkModeToggle/DarkModeProvider"


const typingTexts = [
  "Zukunftsorientiert.",
  "Diszipliniert.",
  "Kreativ.",
  "Strukturiert.",
  "Wissbegierig.",
  "Auf dem Weg zur eigenen Marke."
]

const HeroSection = () => {
  const { isDarkMode } = useTheme()
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [blink, setBlink] = useState(true);
  const [reverse, setReverse] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (index === typingTexts.length) return;

    if (subIndex === typingTexts[index].length + 1 && !reverse) {
      setTimeout(() => setReverse(true), 1000);
      return;
    }

    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((prev) => (prev + 1) % typingTexts.length);
      return;
    }

    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1));
      setText(typingTexts[index].substring(0, subIndex));
    }, reverse ? 50 : 100);

    return () => clearTimeout(timeout);
  }, [subIndex, index, reverse]);

  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setBlink((prev) => !prev);
    }, 500);
    return () => clearInterval(blinkInterval);
  }, []);

  return (
    <section 
      className={styles.hero} 
      id="home"
      data-theme={isDarkMode ? 'dark' : 'light'}
    >
      <div className={styles.decorLeft} />
      <div className={styles.decorRight} />

      <motion.div
        className={styles.content}
        initial="initial"
        whileInView="whileInView"
        transition={{ staggerChildren: 0.2 }}
      >
        <motion.h1 className={styles.heading} variants={fadeInLeft}>
          Hi, ich bin Nico <span className={styles.wave}>👋</span>
        </motion.h1>

        <motion.p className={styles.subheading} variants={fadeInRight}>
          {text}
          <span className={styles.cursor}>{blink ? "|" : " "}</span>
        </motion.p>

        <motion.p className={styles.description} variants={fadeInUp}>
          16 Jahre jung, fokussiert auf Fortschritt. Ich entwickle mein Portfolio stetig weiter,
          tauche tief in JavaScript ein & lebe bewusst.
        </motion.p>

        <motion.div className={styles.buttons} variants={fadeInUp}>
          <motion.a
            href="#contact"
            className={styles.primaryButton}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Kontakt aufnehmen
          </motion.a>
          <motion.button
            onClick={() => setIsModalOpen(true)}
            className={styles.secondaryButton}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Lebenslauf herunterladen
          </motion.button>
        </motion.div>
      </motion.div>
      {isModalOpen && <Modal onClose={() => setIsModalOpen(false)} />}
    </section>
  );
};

export default HeroSection;
