import { useState, useEffect, useRef } from 'react';
import { Toaster } from 'react-hot-toast';

// Komponenten
import Hero from './components/Hero';
import Services from './components/Services';
import About from './components/About';
import Portfolio from './components/Portfolio';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Loader from './components/Loader';
import ScrollToTop from './components/ScrollToTop';

// Main App Component
const App = () => {
  const homeRef = useRef<HTMLDivElement | null>(null);
  const servicesRef = useRef<HTMLDivElement | null>(null);
  const aboutRef = useRef<HTMLDivElement | null>(null);
  const portfolioRef = useRef<HTMLDivElement | null>(null);
  const contactRef = useRef<HTMLDivElement | null>(null);
  
  const [loading, setLoading] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Initialize dark mode from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedMode = localStorage.getItem('darkMode') === 'true';
      setIsDarkMode(savedMode);
      if (savedMode) {
        document.documentElement.classList.add('dark');
      }
    }
  }, []);

  // Toggle dark mode
  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem('darkMode', String(newMode));
    
    if (newMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  // Handle smooth scrolling to sections
  const scrollToSection = (sectionId: string) => {
    const refs: Record<string, React.RefObject<HTMLDivElement | null> | null> = {
      'home': homeRef,
      'services': servicesRef,
      'about': aboutRef,
      'portfolio': portfolioRef,
      'contact': contactRef,
    };

    const ref = refs[sectionId];
    if (ref?.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark bg-gray-900' : 'bg-white'}`}>
      <Toaster position="top-center" />
      
      <>
        <Navbar 
          isDarkMode={isDarkMode} 
          toggleDarkMode={toggleDarkMode} 
          onNavClick={scrollToSection} 
        />
        
        <main>
          <div ref={homeRef}>
            <Hero />
          </div>
          
          <div ref={servicesRef} className="py-20">
            <Services />
          </div>
          
          <div ref={aboutRef} className="py-20 bg-gray-50 dark:bg-gray-800">
            <About />
          </div>
          
          <div ref={portfolioRef} className="py-20">
            <Portfolio />
          </div>
          
          <div className="py-20 bg-gray-50 dark:bg-gray-800">
            <Testimonials />
          </div>
          
          <div ref={contactRef} className="py-20">
            <Contact />
          </div>
        </main>
        
        <Footer />
        <ScrollToTop />
      </>
    </div>
  );
}

export default App;
