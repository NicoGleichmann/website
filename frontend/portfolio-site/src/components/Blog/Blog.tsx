// src/components/Blog/Blog.tsx
import { motion } from "framer-motion";
import styles from "./Blog.module.css";
import { ArrowRight } from "lucide-react";

const posts = [
  {
    title: "Meine Reise in Self-Improvement",
    summary: "Wie ich mit 16 bewusster wurde, meine Routinen aufgebaut habe und mehr Kontrolle über mein Leben gewann.",
    link: "/blog/Blog01.tsx",
    date: "10. April 2025",
  },
  {
    title: "Gym, Ernährung & Dopamin Detox",
    summary: "Trainingsplan, meine Ernährung und wie ich mit Disziplin echte Ergebnisse gesehen habe.",
    link: "/blog/Blog02.tsx",
    date: "5. März 2025",
  },
  {
    title: "Warum ich ein Portfolio mit Vite + React baue",
    summary: "Meine Motivation, meine Vision und wie dieses Projekt mein Denken verändert hat.",
    link: "/blog/Blog03.tsx",
    date: "20. Februar 2025",
  },
];

export default function Blog() {
  return (
    <section id="blog" className={styles.section}>
      <div className={styles.wrapper}>
        <motion.h2
          className={styles.title}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          ✍️ Mein Blog
        </motion.h2>
        <motion.p
          className={styles.subtitle}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
        >
          Gedanken, Learnings & Erfahrungen auf meinem Weg zur besten Version.
        </motion.p>
        <div className={styles.grid}>
          {posts.map((post, i) => (
            <motion.a
              href={post.link}
              className={styles.card}
              key={i}
              whileHover={{ scale: 1.015 }}
              whileTap={{ scale: 0.985 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 * i, duration: 0.5 }}
            >
              <div className={styles.cardContent}>
                <h3>{post.title}</h3>
                <p>{post.summary}</p>
                <div className={styles.footer}>
                  <span>{post.date}</span>
                  <ArrowRight size={16} strokeWidth={1.5} />
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
