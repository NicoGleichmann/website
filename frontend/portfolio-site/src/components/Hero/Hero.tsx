import styles from "./Hero.module.css"
//import { theme } from "@/styles/theme"
import { motion } from "framer-motion"

const HeroSection = () => {
  return (
    <section className={styles.hero}>
      <motion.div
        className={styles.content}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h1 className={styles.heading}>Hi, ich bin Nico 👋</h1>
        <p className={styles.subheading}>
          Zukunftsorientiert. <span className={styles.highlight}>Diszipliniert.</span> Kreativ.
        </p>
        <p className={styles.description}>
          16 Jahre jung, fokussiert auf Fortschritt. Ich entwickle mein Portfolio weiter,
          tauche tief in JavaScript ein & lebe Self-Improvement auf einem neuen Level.
        </p>
        <a href="#projects" className={styles.ctaButton}>
          ✨ Projekte entdecken
        </a>
      </motion.div>

      <motion.div
        className={styles.blurBackground}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ duration: 1.2 }}
      />
    </section>
  )
}

export default HeroSection
