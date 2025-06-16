import styles from './About.module.css';
import { motion } from 'framer-motion';
import NicoImg from '../../assets/Nico.jpg'; // <-- Bild importieren
import React from 'react';

const containerVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const About = () => {
  return (
    <section className={styles.about} id="about">
      <div className={styles.blurBackground} />
      <div className={styles.decorLeft} />
      <div className={styles.decorRight} />
      
      <motion.div
        className={styles.content}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.h2 className={styles.heading} variants={itemVariants}>
          About Me
        </motion.h2>
        
        <motion.p className={styles.description} variants={itemVariants}>
          Hallo, ich bin Nico! Ich bin ein leidenschaftlicher Webentwickler, Unternehmer und natürlich auch noch Schüler. 
          Ich arbeite leidenschaftlich daran, eigene Produkte zu entwickeln und meine Marke Lumio Schritt für Schritt 
          aufzubauen – mit einem klaren Fokus auf E-Commerce, starkem Design und einer authentischen Präsenz auf Social Media.
          Ich interessiere mich sehr für Selbstoptimierung (engl. Self Improvement), Coding und die Welt des Unternehmertums. 
          Lasst uns gemeinsam etwas Großartiges schaffen!
        </motion.p>

        <motion.a
          href="#contact"
          className={styles.ctaButton}
          variants={itemVariants}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
        >
          Kontaktiere mich
        </motion.a>

        <motion.h2 className={styles.heading} variants={itemVariants}>
          Where I am NOW
        </motion.h2>
        
        <motion.p className={styles.description} variants={itemVariants}>
          Lumio ist noch keine fertige Firma – es ist eine Idee, ein Traum im Aufbau, der Schritt für Schritt Form annimmt.
          Aktuell stecke ich mitten in der Schulzeit. Ich lerne nicht nur für Prüfungen, sondern gleichzeitig auch für das echte Leben – über 
          E-Commerce, Trading, Marketing und alles, was dazugehört. Während andere sich vielleicht nur auf den nächsten Test 
          konzentrieren, arbeite ich parallel an meiner eigenen Vision.
          Es ist nicht immer leicht, Schule und Business unter einen Hut zu bringen, aber genau das macht es spannend. Ich wachse mit jeder 
          Herausforderung, lerne aus Fehlern, sammele Erfahrungen und bleibe dran – auch wenn's mal stressig wird.
          Das hier ist mein Anfang. Zwischen Schulbüchern, Businessplänen und einer klaren Mission: Etwas Eigenes aufzubauen.
        </motion.p>
      </motion.div>

      <motion.div
        className={styles.imageWrapper}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.img
          className={styles.image}
          src={NicoImg}
          alt="Nico"
          variants={itemVariants}
          loading="lazy"
        />
      </motion.div>
    </section>
  );
};

export default About;
