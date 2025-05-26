import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Users, Award, Target, Rocket } from 'lucide-react';

const stats = [
  { id: 1, name: 'Zufriedene Kunden', value: '200+', icon: Users },
  { id: 2, name: 'Projekte abgeschlossen', value: '150+', icon: Rocket },
  { id: 3, name: 'Auszeichnungen', value: '25+', icon: Award },
  { id: 4, name: 'Erfolgsrate', value: '99%', icon: Target },
];

const features = [
  {
    name: 'Innovation',
    description:
      'Wir setzen auf neueste Technologien und innovative Lösungen, um Ihren Vorsprung zu sichern.',
  },
  {
    name: 'Qualität',
    description:
      'Höchste Qualitätsstandards und Sorgfalt in jedem Projekt sind für uns selbstverständlich.',
  },
  {
    name: 'Kundenzufriedenheit',
    description:
      'Ihr Erfolg ist unser Erfolg. Wir gehen auf Ihre individuellen Bedürfnisse ein.',
  },
  {
    name: 'Nachhaltigkeit',
    description:
      'Wir denken langfristig und schaffen nachhaltige Lösungen für Ihr Unternehmen.',
  },
];

const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"
                alt="Unser Team"
                className="w-full h-auto"
              />
            </div>
            <div className="absolute -bottom-8 -right-8 w-64 h-64 bg-indigo-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
            <div className="absolute -top-8 -left-8 w-64 h-64 bg-purple-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-8 left-20 w-64 h-64 bg-pink-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="inline-block px-3 py-1 text-sm font-semibold text-indigo-600 bg-indigo-100 rounded-full mb-4">
              Über uns
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Wir gestalten die digitale Zukunft
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Lumio steht für innovative Lösungen und herausragende Qualität. Unser erfahrenes Team aus kreativen Köpfen und Technologie-Experten arbeitet leidenschaftlich daran, Ihre Visionen Wirklichkeit werden zu lassen.
            </p>
            
            <motion.div 
              variants={container}
              initial="hidden"
              animate={inView ? "show" : "hidden"}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8"
            >
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  variants={item}
                  className="p-4 bg-gray-50 rounded-lg hover:shadow-md transition-shadow"
                >
                  <h3 className="font-semibold text-gray-900 mb-2">
                    {feature.name}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.4 }}
              className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-xl"
            >
              <p className="text-gray-700 italic mb-4">
                "Unsere Mission ist es, durch innovative Technologien und kreative Lösungen nachhaltigen Mehrwert für unsere Kunden zu schaffen."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-gray-900">Max Mustermann</p>
                  <p className="text-sm text-gray-600">Geschäftsführer, Lumio</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div 
          className="mt-24 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          variants={container}
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.id}
              variants={item}
              className="bg-white p-6 rounded-xl shadow-lg text-center hover:shadow-xl transition-shadow"
              whileHover={{ y: -5 }}
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600">
                <stat.icon className="w-8 h-8" />
              </div>
              <p className="text-4xl font-bold text-gray-900 mb-2">{stat.value}</p>
              <p className="text-gray-600">{stat.name}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default About;
