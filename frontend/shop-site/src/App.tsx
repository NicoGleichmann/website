import React from 'react';
import Header from './components/Header.tsx';
import HeroSection from './components/HeroSection.tsx';

const App: React.FC = () => {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
      </main>
    </>
  );
};

export default App;