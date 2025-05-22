import { useState } from 'react';
import styles from './Projects.module.css';
import { motion } from 'framer-motion';
import FadeInWhenVisible from "../ScrollToTop/FadeInWhenVisible";
import { useTheme } from '../DarkModeToggle/DarkModeProvider';

const projects = [
  {
    title: 'Projekt 1',
    description: 'Der nächste Schritt auf meinem Weg ist Social Media. Ich arbeite demnächst daran, meine Kanäle strategisch aufzubauen und sie als Plattform für meine Ideen, Inhalte und meine Marke zu nutzen. Ziel ist es, Sichtbarkeit zu schaffen – für Lumio, für die Themen, die mich bewegen, und für den Mehrwert, den ich bieten will. Dabei geht es nicht nur um Reichweite, sondern auch um echte Verbindung. Ich möchte Inhalte teilen, die inspirieren, motivieren und Einblicke in meinen Weg als junger Gründer geben. Der Aufbau läuft Schritt für Schritt – mit Plan, Geduld und Fokus.',
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
    description: 'Etwas Großes steht bevor – und du willst auf keinen Fall der Letzte sein, der davon erfährt. Mein Newsletter wird mehr als nur Updates liefern: Du bekommst exklusiven Einblick hinter die Kulissen von Lumio, persönliche Learnings, Business-Tipps, Motivation und Tools, die ich selbst nutze – direkt in dein Postfach. Kein Bullshit, nur echter Mehrwert. Du willst früher durchstarten als andere? Dann halt die Augen offen. Der Newsletter kommt bald – und er wird alles verändern.',
    link: 'https://github.com/your-username/project3',
    image: './src/assets/looksgood.jpg',
  },
];

const containerVariants = {
  hidden: {},     
  visible: {
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

export default function Projects() {
  const [expanded, setExpanded] = useState<number | null>(null);
  const { isDarkMode } = useTheme();

  const toggleExpand = (index: number) => {
    setExpanded((prev) => (prev === index ? null : index));
  };

  return (
    <section 
      className={styles.projectsSection} 
      id="projects" 
      data-theme={isDarkMode ? 'dark' : 'light'}
    >
      <FadeInWhenVisible direction="up">
        <motion.div
          className={styles.container}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.h2 className={`${styles.title} fadeIn`} variants={itemVariants}>
            💻 Meine Projekte
          </motion.h2>
          
          <div className={styles.grid}>
            {projects.map((project, index) => {
              const isExpanded = expanded === index;
              const shortText = project.description.slice(0, 200) + '...';

              return (
                <motion.div
                  key={index}
                  className={`${styles.card} fadeInUp`}
                  variants={itemVariants}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className={styles.image} 
                    loading="lazy"
                  />
                  <h3>{project.title}</h3>
                  <p>{isExpanded ? project.description : shortText}</p>
                  <button 
                    onClick={() => toggleExpand(index)} 
                    className={styles.toggleButton}
                  >
                    {isExpanded ? 'Weniger anzeigen' : 'Mehr erfahren'}
                  </button>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </FadeInWhenVisible>
    </section>
  );
}
