import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, Github } from 'lucide-react';

const Footer = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const footerLinks = [
    {
      title: 'Unternehmen',
      links: [
        { name: 'Über uns', href: '#' },
        { name: 'Karriere', href: '#' },
        { name: 'Team', href: '#' },
        { name: 'Blog', href: '#' },
      ],
    },
    {
      title: 'Dienstleistungen',
      links: [
        { name: 'Webentwicklung', href: '#' },
        { name: 'App Entwicklung', href: '#' },
        { name: 'UI/UX Design', href: '#' },
        { name: 'Digitale Strategie', href: '#' },
      ],
    },
    {
      title: 'Ressourcen',
      links: [
        { name: 'Blog', href: '#' },
        { name: 'Dokumentation', href: '#' },
        { name: 'Hilfe & Support', href: '#' },
        { name: 'Community', href: '#' },
      ],
    },
    {
      title: 'Rechtliches',
      links: [
        { name: 'AGB', href: '#' },
        { name: 'Datenschutz', href: '#' },
        { name: 'Impressum', href: '#' },
        { name: 'Cookie-Richtlinie', href: '#' },
      ],
    },
  ];

  const socialLinks = [
    { name: 'Facebook', icon: <Facebook className="w-5 h-5" />, href: '#' },
    { name: 'Twitter', icon: <Twitter className="w-5 h-5" />, href: '#' },
    { name: 'Instagram', icon: <Instagram className="w-5 h-5" />, href: '#' },
    { name: 'LinkedIn', icon: <Linkedin className="w-5 h-5" />, href: '#' },
    { name: 'GitHub', icon: <Github className="w-5 h-5" />, href: '#' },
  ];

  const contactInfo = [
    { icon: <Mail className="w-5 h-5 text-indigo-500" />, text: 'info@lumio.de' },
    { icon: <Phone className="w-5 h-5 text-indigo-500" />, text: '+49 123 456789' },
    { icon: <MapPin className="w-5 h-5 text-indigo-500" />, text: 'Musterstraße 123, 10115 Berlin' },
  ];

  return (
    <footer className="bg-gray-900 text-gray-300 pt-20 pb-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="col-span-1 lg:col-span-2"
          >
            <div className="flex items-center mb-6">
              <span className="text-2xl font-bold text-white">Lumio</span>
            </div>
            <p className="mb-6 text-gray-400">
              Wir helfen Unternehmen, ihre digitale Präsenz zu stärken und innovative Lösungen zu entwickeln, 
              die nachhaltigen Mehrwert schaffen.
            </p>
            
            <div className="space-y-3 mb-8">
              {contactInfo.map((item, index) => (
                <div key={index} className="flex items-start">
                  <span className="mt-1 mr-3">{item.icon}</span>
                  <span className="text-gray-400">{item.text}</span>
                </div>
              ))}
            </div>

            <div>
              <h4 className="text-white font-medium mb-4">Folgen Sie uns</h4>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-300 hover:bg-indigo-600 hover:text-white transition-colors"
                    aria-label={social.name}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {footerLinks.map((column, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: (index + 1) * 0.1 }}
            >
              <h3 className="text-white font-medium text-lg mb-6">{column.title}</h3>
              <ul className="space-y-3">
                {column.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.6 }}
          className="border-t border-gray-800 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center"
        >
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Lumio. Alle Rechte vorbehalten.
          </p>
          <div className="flex space-x-6">
            <a href="#" className="text-gray-500 hover:text-white text-sm">
              Datenschutz
            </a>
            <a href="#" className="text-gray-500 hover:text-white text-sm">
              Nutzungsbedingungen
            </a>
            <a href="#" className="text-gray-500 hover:text-white text-sm">
              Cookie-Richtlinie
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
