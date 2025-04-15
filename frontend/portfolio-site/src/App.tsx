import { Navbar } from "./components/Navbar/Navbar.tsx";
import HeroSection from "./components/Hero/Hero.tsx";
import About from "./components/About/About.tsx";
import Skills from "./components/Skills/Skills.tsx";
import Projects from "./components/Projects/Projects.tsx";
import Blog from "./components/Blog/Blog.tsx";
//import Contact from "./components/Contact/Contact.tsx";
//import Footer from "./components/Footer/Footer.tsx";

import "./styles/global.css";

function App() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <About />
      <Skills />
      <Projects />
      <Blog />
    </>
  );
}

export default App;
