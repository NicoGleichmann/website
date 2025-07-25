import React from 'react';
import styles from "./About.module.css"; // Ensure this matches the exact filename

const About: React.FC = () => {
  return (
    <div className={styles.aboutPage}>
      <h1 className={styles.pageTitle}>Unsere Geschichte</h1>
      <section className={styles.intro}>
        <p>Bei **Dein Startup** glauben wir daran, dass **Innovation** und **Nachhaltigkeit** Hand in Hand gehen können. Unsere Reise begann im Jahr **[Gründungsjahr, z.B. 2023]** mit einer einfachen, aber mutigen Idee: [kurze, prägnante Problemstellung oder Vision]. Wir sahen die Notwendigkeit für [deine Lösung/Produktkategorie] und waren entschlossen, diese Lücke mit herausragenden Produkten zu schließen.</p>
        <img src="/images/team-hero.jpg" alt="Unser Team bei der Arbeit" className={styles.teamImage} />
      </section>

      <section className={styles.milestones}>
        <h2>Unsere Meilensteine</h2>
        <div className={styles.timeline}>
          <div className={styles.timelineItem}>
            <h3>[Gründungsjahr] - Die Vision entsteht</h3>
            <p>Die erste Idee und die Gründung des Startups durch [Gründername/n] mit dem Ziel, [erste Vision].</p>
          </div>
          <div className={styles.timelineItem}>
            <h3>[Jahr] - Entwicklung des Prototyps</h3>
            <p>Monate intensive Forschung und Entwicklung führten zum ersten funktionierenden Prototyp von [Produkt/Service].</p>
          </div>
          <div className={styles.timelineItem}>
            <h3>[Jahr] - Erfolgreiche Finanzierungsrunde</h3>
            <p>Mit der Unterstützung unserer ersten Investoren konnten wir unser Team erweitern und die Produktion hochfahren.</p>
          </div>
          <div className={styles.timelineItem}>
            <h3>[Jahr] - Markteinführung & erste Erfolge</h3>
            <p>Die Einführung von [Produkt] im Markt und die ersten positiven Kundenrückmeldungen bestätigten unseren Weg.</p>
          </div>
          {/* Füge weitere Meilensteine hinzu */}
        </div>
      </section>

      <section className={styles.ourValues}>
        <h2>Unsere Werte</h2>
        <ul className={styles.valuesList}>
          <li>
            <strong>Innovation</strong>
            <p>Wir streben ständig nach neuen Wegen, um Probleme zu lösen und die Grenzen des Möglichen zu erweitern.</p>
          </li>
          <li>
            <strong>Nachhaltigkeit</strong>
            <p>Umweltbewusstsein ist tief in unserer DNA verankert. Wir setzen auf umweltfreundliche Materialien und Prozesse.</p>
          </li>
          <li>
            <strong>Qualität</strong>
            <p>Jedes Produkt, das unser Haus verlässt, steht für höchste Qualität und Langlebigkeit.</p>
          </li>
          <li>
            <strong>Kundenorientierung</strong>
            <p>Ihre Zufriedenheit ist unser Antrieb. Wir hören zu und entwickeln uns ständig weiter, um Ihre Bedürfnisse zu erfüllen.</p>
          </li>
        </ul>
      </section>

      <section className={styles.ourTeam}>
        <h2>Unser Team</h2>
        <div className={styles.teamMembers}>
          <div className={styles.memberCard}>
            <img src="/images/team-member-1.jpg" alt="Max Mustermann" className={styles.memberPhoto} />
            <h3>Max Mustermann</h3>
            <p>CEO & Gründer</p>
            <p>Max ist die treibende Kraft hinter unserer Vision und führt das Unternehmen mit Leidenschaft und Weitblick.</p>
          </div>
          <div className={styles.memberCard}>
            <img src="/images/team-member-2.jpg" alt="Erika Musterfrau" className={styles.memberPhoto} />
            <h3>Erika Musterfrau</h3>
            <p>CTO & Mitgründerin</p>
            <p>Erika ist unser Technologie-Genie und verantwortlich für die Entwicklung unserer innovativen Produkte.</p>
          </div>
          <div className={styles.memberCard}>
            <img src="/images/team-member-3.jpg" alt="Lena Beispiel" className={styles.memberPhoto} />
            <h3>Lena Beispiel</h3>
            <p>Marketing Manager</p>
            <p>Lena sorgt dafür, dass unsere Botschaft gehört wird und wir mit unseren Kunden in Verbindung bleiben.</p>
          </div>
          {/* Weitere Teammitglieder nach Bedarf */}
        </div>
      </section>
    </div>
  );
};

export default About;