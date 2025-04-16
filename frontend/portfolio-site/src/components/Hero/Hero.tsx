import styles from "./Hero.module.css"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { fadeInUp, fadeInLeft, fadeInRight } from "../ScrollToTop/scrollAnimations.tsx"

const typingTexts = [
  "Zukunftsorientiert.",
  "Diszipliniert.",
  "Kreativ.",
  "Strukturiert.",
  "Wissbegierig.",
  "Auf dem Weg zur eigenen Marke."
]

const HeroSection = () => {
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [blink, setBlink] = useState(true);
  const [reverse, setReverse] = useState(false);

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
    <section className={styles.hero}>
      <div className={styles.decorLeft} />
      <div className={styles.decorRight} />

      <motion.div
        className={styles.content}
        initial="initial"
        whileInView="whileInView"
        transition={{ staggerChildren: 0.2 }}
      >
        <motion.h1 className={styles.heading} variants={fadeInLeft}>
          Hi, ich bin Nico 👋
        </motion.h1>

        <motion.p className={styles.subheading} variants={fadeInRight}>
          {text}
          <span className={styles.cursor}>{blink ? "|" : " "}</span>
        </motion.p>

        <motion.p className={styles.description} variants={fadeInUp}>
          16 Jahre jung, fokussiert auf Fortschritt. Ich entwickle mein Portfolio weiter,
          tauche tief in JavaScript ein & lebe bewusst.
        </motion.p>

        <motion.a
          href="#portfolio"
          className={styles.ctaButton}
          variants={fadeInUp}
        >
          Lebenslauf herunterladen
        </motion.a>
      </motion.div>
    </section>
  );
};

export default HeroSection;
