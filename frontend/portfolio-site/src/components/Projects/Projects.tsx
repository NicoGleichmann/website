// src/components/Projects/Projects.tsx
import styles from './Projects.module.css'
import { motion } from 'framer-motion'

const projects = [
  {
    title: 'Projekt 1',
    description: 'lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    link: 'https://github.com/your-username/project1',
    image: './src/assets/disciplin.jpg',
  },
  {
    title: 'Projekt 2',
    description: 'lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor.',
    link: 'https://github.com/your-username/project2',
    image: './src/assets/coding.jpg',
  },
  {
    title: 'Projekt 3',
    description: 'lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.',
    link: 'https://github.com/your-username/project3',
    image: './src/assets/looksgood.jpg',
  },
]

export default function Projects() {
  return (
    <section className={styles.projectsSection} id="projects">
      <motion.div
        className={styles.container}
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        viewport={{ once: true }}
      >
        <h2 className={styles.title}>💻 Meine Projekte</h2>
        <div className={styles.grid}>
          {projects.map((project, index) => (
            <motion.div
              key={index}
              className={styles.card}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <img src={project.image} alt={project.title} className={styles.image} />
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <a href={project.link} target="_blank" rel="noopener noreferrer" className={styles.link}>
                Zum Projekt
              </a>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
