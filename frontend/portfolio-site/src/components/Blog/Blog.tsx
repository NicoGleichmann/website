// src/components/Blog/Blog.tsx
import { motion } from "framer-motion";
import styles from "./Blog.module.css";

const posts = [
  {
    title: "Meine Reise in Self-Improvement",
    summary: "Wie ich mit 16 angefangen habe, bewusster zu leben und mich zu verbessern.",
    link: "#",
    date: "10. April 2025",
  },
  {
    title: "Gym, Ernährung & Routine",
    summary: "Was ich gelernt habe über Disziplin, Dopamin Detox & Ernährung.",
    link: "#",
    date: "5. März 2025",
  },
  {
    title: "Warum ich ein Portfolio mit Vite + React baue",
    summary: "Meine Motivation, mein Setup & was ich gelernt habe.",
    link: "#",
    date: "20. Februar 2025",
  },
];

export default function Blog() {
  return (
    <section id="blog" className={styles.section}>
      <div className={styles.container}>
        <motion.h2
          className={styles.heading}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Blog
        </motion.h2>
        <div className={styles.grid}>
          {posts.map((post, index) => (
            <motion.a
              href={post.link}
              key={index}
              className={styles.card}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <h3>{post.title}</h3>
              <p>{post.summary}</p>
              <span className={styles.date}>{post.date}</span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
