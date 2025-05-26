import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Code, LayoutDashboard, Smartphone, BarChart2, Zap, Users } from 'lucide-react';

const services = [
  {
    icon: <Code className="w-10 h-10 text-indigo-500" />,
    title: 'Webentwicklung',
    description: 'Maßgeschneiderte Webanwendungen mit modernsten Technologien für herausragende Benutzererfahrungen.',
    color: 'from-indigo-500 to-blue-500'
  },
  {
    icon: <Smartphone className="w-10 h-10 text-purple-500" />,
    title: 'Mobile Apps',
    description: 'Intuitive und leistungsstarke mobile Anwendungen für iOS und Android.',
    color: 'from-purple-500 to-pink-500'
  },
  {
    icon: <LayoutDashboard className="w-10 h-10 text-pink-500" />,
    title: 'UI/UX Design',
    description: 'Ansprechende Benutzeroberflächen, die Ihre Marke zum Leben erwecken.',
    color: 'from-pink-500 to-rose-500'
  },
  {
    icon: <BarChart2 className="w-10 h-10 text-amber-500" />,
    title: 'Digital Marketing',
    description: 'Strategien, die Ihre Online-Präsenz stärken und neue Kunden gewinnen.',
    color: 'from-amber-500 to-yellow-500'
  },
  {
    icon: <Zap className="w-10 h-10 text-blue-500" />,
    title: 'Branding',
    description: 'Einzigartige Markenidentität, die im Gedächtnis bleibt.',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    icon: <Users className="w-10 h-10 text-emerald-500" />,
    title: 'Beratung',
    description: 'Expertenwissen für Ihre digitale Transformation und Geschäftsentwicklung.',
    color: 'from-emerald-500 to-teal-500'
  },
];

const Services = () => {
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
        delayChildren: 0.3,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-3 py-1 text-sm font-semibold text-indigo-600 bg-indigo-100 rounded-full mb-4">
            Unsere Leistungen
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Was wir Ihnen bieten
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto rounded-full"></div>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={item}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              whileHover={{ y: -5 }}
            >
              <div className="p-8">
                <div className={`w-16 h-16 flex items-center justify-center rounded-full bg-gradient-to-r ${service.color} text-white mb-6 mx-auto`}>
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-center">
                  {service.description}
                </p>
                <div className="mt-6 text-center">
                  <a 
                    href="#" 
                    className="inline-flex items-center text-indigo-600 font-medium hover:text-indigo-500 transition-colors"
                  >
                    Mehr erfahren
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
