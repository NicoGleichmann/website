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
      <motion.div
        className={styles.content}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }} // Animation wird auch beim Scrollen ausgelöst
      >
        <motion.h2 className={styles.heading} variants={itemVariants}>About Me</motion.h2>
        <motion.p className={styles.description} variants={itemVariants}>
          Hi, I'm Nico! I’m a passionate web developer with a strong focus on building beautiful and functional digital experiences. I have a deep interest in self-improvement, performance optimization, and creating intuitive user interfaces.
          Let’s create something amazing together!
        </motion.p>
        <motion.a
          href="#contact"
          className={styles.ctaButton}
          variants={itemVariants}
        >
          Get In Touch
        </motion.a>
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
