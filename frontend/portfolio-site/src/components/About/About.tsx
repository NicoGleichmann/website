import styles from './About.module.css';
import { motion } from 'framer-motion';

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
      <div className={styles.decorLeft} />
      <div className={styles.decorRight} />
      <motion.div
        className={styles.content}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }} // Animation wird auch beim Scrollen ausgelöst
      >
        <motion.h2 className={styles.heading} variants={itemVariants}>About Me</motion.h2>
        <motion.p className={styles.description} variants={itemVariants}>
          Hallo, ich bin Nico! Ich bin ein leidenschaftlicher Webentwickler und Unternehmer. Ich konzentriere mich besonders auf die Gestaltung 
          ansprechender und funktionaler digitaler Erlebnisse. Ich interessiere mich sehr für Selbstoptimierung, Performance-Optimierung und die Entwicklung intuitiver Benutzeroberflächen. Lasst uns gemeinsam etwas Großartiges schaffen!
        </motion.p>
        <motion.a
          href="#contact"
          className={styles.ctaButton}
          variants={itemVariants}
        >
          Get In Touch
        </motion.a>
        <motion.h2 className={styles.heading} variants={itemVariants}>Where Iam NOW</motion.h2>
        <motion.p className={styles.description} variants={itemVariants}>
          Lumio ist noch keine fertige Firma – es ist eine Idee, ein Traum im Aufbau, der Schritt für Schritt Form annimmt.
          Aktuell stecke ich mitten in der Schulzeit. Ich lerne nicht nur für Prüfungen, sondern gleichzeitig auch für das echte Leben – über 
          E-Commerce, Trading, Marketing und alles, was dazugehört. Während andere sich vielleicht nur auf den nächsten Test 
          konzentrieren, arbeite ich parallel an meiner eigenen Vision.
          Es ist nicht immer leicht, Schule und Business unter einen Hut zu bringen, aber genau das macht es spannend. Ich wachse mit jeder 
          Herausforderung, lerne aus Fehlern, sammele Erfahrungen und bleibe dran – auch wenn’s mal stressig wird.
          Das hier ist mein Anfang. Zwischen Schulbüchern, Businessplänen und einer klaren Mission: Etwas Eigenes aufzubauen.
        </motion.p>
      </motion.div>

      <motion.div
        className={styles.imageWrapper}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }} // Animation wird auch beim Scrollen ausgelöst
      >
        <motion.img
          className={styles.image}
          src="./src/assets/nico.jpg"
          alt="Nico"
          variants={itemVariants}
        />
      </motion.div>
    </section>
  );
};

export default About;
