import styles from './Skills.module.css';
import { FaReact, FaHtml5, FaCss3Alt, FaJs, FaGithub } from 'react-icons/fa';
import { SiTypescript } from 'react-icons/si';
import { motion } from 'framer-motion';

const techStack = [
  { icon: <FaHtml5 />, label: 'HTML5' },
  { icon: <FaCss3Alt />, label: 'CSS3' },
  { icon: <FaJs />, label: 'JavaScript' },
  { icon: <SiTypescript />, label: 'TypeScript' },
  { icon: <FaReact />, label: 'React' },
  { icon: <FaGithub />, label: 'GitHub' },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } },
};

const Skills = () => {
  return (
    <section className={styles.skills} id="skills">
      <div className={styles.decorLeft} />
      <div className={styles.decorRight} />
      <div className={styles.inner}>
        <motion.h2
          className={styles.heading}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: false, amount: 0.3 }} // Animation bei erneutem Eintritt auslösen
        >
          SKILLS
        </motion.h2>
        <motion.p
          className={styles.subheading}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.3 }}
          viewport={{ once: false, amount: 0.3 }} // Animation bei erneutem Eintritt auslösen
        >
          Meine aktuellen Tech-Stacks und Tools – ich erweitere mein Wissen täglich.
        </motion.p>

        <motion.div
          className={styles.grid}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }} // Animation bei erneutem Eintritt auslösen
        >
          {techStack.map(({ icon, label }, index) => (
            <motion.div key={index} className={styles.skill} variants={itemVariants}>
              <span className={styles.icon}>{icon}</span>
              <span>{label}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
