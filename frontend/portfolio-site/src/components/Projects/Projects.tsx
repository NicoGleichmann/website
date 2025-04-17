// src/components/Projects/Projects.tsx
import styles from './Projects.module.css';
import { motion } from 'framer-motion';
import FadeInWhenVisible from "../ScrollToTop/FadeInWhenVisible";

const projects = [
  {
    title: 'Projekt 1',
    description: 'Der nächste Schritt auf meinem Weg ist Social Media. Ich arbeite dem nächst daran, meine Kanäle strategisch aufzubauen und sie als Plattform für meine Ideen, Inhalte und meine Marke zu nutzen. Ziel ist es, Sichtbarkeit zu schaffen – für Lumio, für die Themen, die mich bewegen, und für den Mehrwert, den ich bieten will. Dabei geht es nicht nur um Reichweite, sondern auch um echte Verbindung. Ich möchte Inhalte teilen, die inspirieren, motivieren und Einblicke in meinen Weg als junger Gründer geben. Der Aufbau läuft Schritt für Schritt – mit Plan, Geduld und Fokus.',
    link: 'https://github.com/your-username/project1',
    image: './src/assets/disciplin.jpg',
  },
  {
    title: 'Projekt 2',
    description: 'Der nächste große Meilenstein: Ich arbeite derzeit an meiner ersten eigenen App – einer Spiele-App, die voraussichtlich Anfang nächsten Jahres erscheinen wird. Im Vordergrund steht der Spaßfaktor – mit einfachen, unterhaltsamen Games, die leicht zugänglich sind und auf jedem Smartphone funktionieren. Die App soll ein Einstieg in die Welt der App-Entwicklung sein und gleichzeitig erste Erfahrungen im Mobile-Gaming-Bereich ermöglichen. Dies ist nur der Anfang – weitere Features und Ideen sind bereits in Planung.',
    link: 'https://github.com/your-username/project2',
    image: './src/assets/coding.jpg',
  },
  {
    title: 'Projekt 3',
    description: 'lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.',
    link: 'https://github.com/your-username/project3',
    image: './src/assets/looksgood.jpg',
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.3, // Verzögerung zwischen den Container-Elementen
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

export default function Projects() {
  return (
    <section className={styles.projectsSection} id="projects">
      <FadeInWhenVisible direction="up">
        <motion.div
          className={styles.container}
          initial="hidden"
          whileInView="visible"
          variants={containerVariants}
          viewport={{ once: false, amount: 0.3 }}
        >
          <h2 className={styles.title}>💻 Meine Projekte</h2>
          <div className={styles.grid}>
            {projects.map((project, index) => (
              <motion.div
                key={index}
                className={styles.card}
                variants={itemVariants} // Einzelne Karten werden mit Versatz angezeigt
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <img src={project.image} alt={project.title} className={styles.image} />
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <a href={project.link} target="_blank" rel="noopener noreferrer" className={styles.link}>
                  Mehr erfahren
                </a>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </FadeInWhenVisible>
    </section>
  );
}
