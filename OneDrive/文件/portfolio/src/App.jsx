import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import Loader from './components/Loader';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Certifications from './components/Certifications';
import Education from './components/Education';
import Resume from './components/Resume';
import Contact from './components/Contact';
import Footer from './components/Footer';
import BackToTopButton from './components/BackToTopButton';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {/* Custom Mouse Follower Effect */}
      <CustomCursor />

      <AnimatePresence mode="wait">
        {isLoading ? (
          // Preloader Screen
          <Loader key="loader" finishLoading={() => setIsLoading(false)} />
        ) : (
          // Main Website Content
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="flex flex-col min-h-screen bg-bgPrimary text-white relative select-none"
          >
            {/* Ambient Noise overlay for paper/premium feeling */}
            <div className="absolute inset-0 bg-noise opacity-[0.015] pointer-events-none z-[2]" />

            {/* Sticky Header Navbar */}
            <Navbar />

            {/* Main Sections */}
            <main className="flex-grow">
              <Hero />
              <About />
              <Skills />
              <Experience />
              <Projects />
              <Certifications />
              <Education />
              <Resume />
              <Contact />
            </main>

            {/* Page Footer */}
            <Footer />

            {/* Floating back to top trigger */}
            <BackToTopButton />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default App;
