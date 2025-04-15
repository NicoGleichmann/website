import styles from './Skills.module.css';
import { FaReact, FaHtml5, FaCss3Alt, FaJs, FaGithub } from 'react-icons/fa';
import { SiTypescript } from 'react-icons/si';

const Skills = () => {
  return (
    <section className={styles.skills} id="skills">
      <div className={styles.inner}>
        <h2 className={styles.heading}>SKILLS</h2>
        <p className={styles.subheading}>
          Meine aktuellen Tech-Stacks und Tools – ich erweitere mein Wissen täglich.
        </p>
        <div className={styles.grid}>
          <div className={styles.skill}>
            <FaHtml5 className={styles.icon} />
            <span>HTML5</span>
          </div>
          <div className={styles.skill}>
            <FaCss3Alt className={styles.icon} />
            <span>CSS3</span>
          </div>
          <div className={styles.skill}>
            <FaJs className={styles.icon} />
            <span>JavaScript</span>
          </div>
          <div className={styles.skill}>
            <SiTypescript className={styles.icon} />
            <span>TypeScript</span>
          </div>
          <div className={styles.skill}>
            <FaReact className={styles.icon} />
            <span>React</span>
          </div>
          
          <div className={styles.skill}>
            <FaGithub className={styles.icon} />
            <span>GitHub</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
