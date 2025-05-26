import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

type Testimonial = {
  id: number;
  name: string;
  role: string;
  company: string;
  image: string;
  content: string;
  rating: number;
};

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Sarah Müller',
    role: 'Marketing Director',
    company: 'TechVision GmbH',
    image: 'https://randomuser.me/api/portraits/women/44.jpg',
    content: 'Die Zusammenarbeit mit Lumio war außergewöhnlich. Unser neues Corporate Design hat uns geholfen, uns von der Konkurrenz abzuheben und unsere Markenpräsenz erheblich zu steigern.',
    rating: 5,
  },
  {
    id: 2,
    name: 'Thomas Weber',
    role: 'CEO',
    company: 'InnovateSoft',
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
    content: 'Das Team von Lumio hat unsere Webanwendung in Rekordzeit entwickelt. Die Benutzerfreundlichkeit und Performance übertreffen bei Weitem unsere Erwartungen.',
    rating: 5,
  },
  {
    id: 3,
    name: 'Julia Schmidt',
    role: 'Product Manager',
    company: 'Digital Solutions AG',
    image: 'https://randomuser.me/api/portraits/women/68.jpg',
    content: 'Die strategische Beratung und das technische Know-how von Lumio haben uns geholfen, unsere digitale Transformation erfolgreich umzusetzen. Absolute Empfehlung!',
    rating: 4,
  },
  {
    id: 4,
    name: 'Michael Braun',
    role: 'Gründer & Geschäftsführer',
    company: 'Startup Innovators',
    image: 'https://randomuser.me/api/portraits/men/86.jpg',
    content: 'Als Startup waren wir auf der Suche nach einem zuverlässigen Partner für unsere digitale Präsenz. Lumio hat nicht nur geliefert, sondern unsere Erwartungen bei Weitem übertroffen.',
    rating: 5,
  },
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const nextTestimonial = () => {
    setDirection(1);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setDirection(-1);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  const currentTestimonial = testimonials[currentIndex];

  const renderStars = (rating: number) => {
    return Array(5)
      .fill(0)
      .map((_, index) => (
        <svg
          key={index}
          className={`w-5 h-5 ${index < rating ? 'text-yellow-400' : 'text-gray-300'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ));
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  return (
    <section id="testimonials" className="py-20 bg-indigo-900 text-white overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-3 py-1 text-sm font-semibold text-indigo-200 bg-indigo-800 bg-opacity-50 rounded-full mb-4">
            Erfahrungsberichte
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Das sagen unsere Kunden
          </h2>
          <p className="text-lg text-indigo-200 max-w-2xl mx-auto">
            Erfahren Sie, was unsere Kunden über die Zusammenarbeit mit uns berichten.
          </p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          <div className="absolute -top-10 -left-10 w-32 h-32 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
          <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
          
          <AnimatePresence mode="wait" custom={direction} initial={false}>
            <motion.div
              key={currentTestimonial.id}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: 'spring', stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
              className="relative bg-white bg-opacity-5 backdrop-blur-lg rounded-2xl p-8 md:p-12 shadow-2xl"
            >
              <div className="absolute top-8 right-8 text-indigo-400 opacity-20">
                <Quote className="w-16 h-16" />
              </div>
              
              <div className="flex flex-col items-center text-center">
                <div className="relative mb-6">
                  <img
                    src={currentTestimonial.image}
                    alt={currentTestimonial.name}
                    className="w-20 h-20 rounded-full border-4 border-white border-opacity-20"
                  />
                  <div className="absolute -bottom-2 -right-2 bg-indigo-600 rounded-full p-1">
                    <div className="bg-white p-1 rounded-full">
                      <svg className="w-5 h-5 text-indigo-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                </div>
                
                <p className="text-lg md:text-xl text-white mb-6 italic leading-relaxed">
                  "{currentTestimonial.content}"
                </p>
                
                <div className="flex mb-4">
                  {renderStars(currentTestimonial.rating)}
                </div>
                
                <h4 className="text-xl font-bold text-white">
                  {currentTestimonial.name}
                </h4>
                <p className="text-indigo-200">
                  {currentTestimonial.role}, {currentTestimonial.company}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-center mt-8 space-x-4">
            <button
              onClick={prevTestimonial}
              className="w-12 h-12 rounded-full bg-white bg-opacity-10 hover:bg-opacity-20 flex items-center justify-center text-white transition-colors"
              aria-label="Vorheriges Testimonial"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            
            <div className="flex items-center space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setDirection(index > currentIndex ? 1 : -1);
                    setCurrentIndex(index);
                  }}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentIndex ? 'bg-white w-8' : 'bg-white bg-opacity-30'
                  }`}
                  aria-label={`Gehe zu Testimonial ${index + 1}`}
                />
              ))}
            </div>
            
            <button
              onClick={nextTestimonial}
              className="w-12 h-12 rounded-full bg-white bg-opacity-10 hover:bg-opacity-20 flex items-center justify-center text-white transition-colors"
              aria-label="Nächstes Testimonial"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.4 }}
          className="mt-16 text-center"
        >
          <p className="text-indigo-200 mb-6">
            Möchten Sie auch Teil unserer Erfolgsgeschichten werden?
          </p>
          <button className="px-8 py-3 bg-white text-indigo-900 font-medium rounded-lg hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl">
            Kontakt aufnehmen
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
