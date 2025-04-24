// src/Home.tsx
import { Navbar } from "./components/Navbar/Navbar";
import HeroSection from "./components/Hero/Hero";
import About from "./components/About/About";
import Skills from "./components/Skills/Skills";
import Projects from "./components/Projects/Projects";
import Blog from "./components/Blog/Blog";
import ContactSection from "./components/Contact/Contact";
import Footer from "./components/Footer/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <About />
      <Skills />
      <Projects />
      <Blog />
      <ContactSection />
      <Footer />
    </>
  );
}
