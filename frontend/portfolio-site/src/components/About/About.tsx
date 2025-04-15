import styles from './About.module.css';

const About = () => {
  return (
    <section className={styles.about}>
      <div className={styles.content}>
        <h2 className={styles.heading}>About Me</h2>
        <p className={styles.description}>
          Hi, I'm Nico! I’m a passionate web developer with a strong focus on building beautiful and functional digital experiences. I have a deep interest in self-improvement, performance optimization, and creating intuitive user interfaces. 
          Let’s create something amazing together!
        </p>
        <a href="#contact" className={styles.ctaButton}>
          Get In Touch
        </a>
      </div>
      <div className={styles.imageWrapper}>
        <img className={styles.image} src="./src/assets/nico.jpg" alt="Nico" />
      </div>
    </section>
  );
};

export default About;
