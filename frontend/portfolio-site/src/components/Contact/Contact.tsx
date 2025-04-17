import styles from './Contact.module.css';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

const ContactSection = () => {
  return (
    <section className={styles.contactSection} id="contact"> 
      <motion.div
        className={styles.left}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }} // Animation wird auch bei Scrollen ausgelöst
      >
        <motion.h1 variants={itemVariants}>Let’s talk</motion.h1>
        <motion.p variants={itemVariants}>Stelle eine Frage oder sage einfach nur „Hallo“ …</motion.p>
        <motion.div className={styles.contactInfo} variants={itemVariants}>
          <p>📞 +49 176 44444 856</p>
          <p>📧 nicogleichmann39@gmail.com</p>
        </motion.div>
      </motion.div>

      <motion.div
        className={styles.right}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }} // Animation wird auch bei Scrollen ausgelöst
      >
        <motion.form className={styles.form} variants={itemVariants}>
          <div className={styles.inputGroup}>
            <input type="text" placeholder="Name..." />
            <input type="email" placeholder="example@yourdomain.com" />
          </div>
          <textarea placeholder="Hallo du..." />
          <button type="submit">SENDEN ➤</button>
        </motion.form>

        <motion.div className={styles.socials} variants={itemVariants}>
          <a href="#">📘</a>
          <a href="#">🐦</a>
          <a href="#">▶️</a>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default ContactSection;
