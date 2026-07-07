import React, { useState, useEffect } from 'react';
import { Link } from 'react-scroll';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight } from 'lucide-react';

const navLinks = [
  { name: 'Home', target: 'home' },
  { name: 'About', target: 'about' },
  { name: 'Skills', target: 'skills' },
  { name: 'Experience', target: 'experience' },
  { name: 'Projects', target: 'projects' },
  { name: 'Certifications', target: 'certifications' },
  { name: 'Education', target: 'education' },
  { name: 'Resume', target: 'resume' },
  { name: 'Contact', target: 'contact' },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Monitor scroll for visual updates (e.g. shadow, blur depth, scroll progress bar)
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      setScrolled(isScrolled);

      // Compute page scroll percentage
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent background scrolling when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'glass-navbar py-4' : 'bg-transparent py-6 border-b border-transparent'
        }`}
      >
        {/* Scroll Progress Bar */}
        <div
          className="absolute bottom-0 left-0 h-[2px] bg-white transition-all duration-75"
          style={{ width: `${scrollProgress}%` }}
        />

        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo / Initials */}
          <Link
            to="home"
            spy={true}
            smooth={true}
            duration={500}
            className="cursor-pointer text-white font-mono text-xl font-medium tracking-wider flex items-center gap-2 group"
          >
            <span>ELNA</span>
            <span className="text-textMuted group-hover:text-white transition-colors duration-300">.</span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.target}
                to={link.target}
                spy={true}
                activeClass="text-white font-medium"
                smooth={true}
                offset={-80}
                duration={500}
                className="cursor-pointer text-textSecondary hover:text-white text-sm font-light tracking-wide transition-colors duration-300 relative py-1"
              >
                {link.name}
              </Link>
            ))}

            <Link
              to="contact"
              spy={true}
              smooth={true}
              offset={-80}
              duration={500}
              className="cursor-pointer px-4 py-2 text-xs font-mono tracking-widest text-bgPrimary bg-white hover:bg-accent border border-white hover:border-accent rounded transition-all duration-300 flex items-center gap-1.5"
            >
              HIRE ME <ArrowUpRight size={13} />
            </Link>
          </nav>

          {/* Mobile Navigation Toggle Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden text-white hover:text-accent transition-colors duration-200 focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed inset-0 z-40 bg-[#0A0A0A] flex flex-col pt-24 px-6 md:px-12 select-none lg:hidden"
          >
            <div className="absolute inset-0 bg-noise opacity-20 pointer-events-none" />

            <div className="flex flex-col gap-6 items-start mt-8 w-full z-10">
              {navLinks.map((link, idx) => (
                <motion.div
                  key={link.target}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="w-full"
                >
                  <Link
                    to={link.target}
                    spy={true}
                    smooth={true}
                    offset={-80}
                    duration={500}
                    onClick={() => setIsOpen(false)}
                    className="block text-2xl font-light text-textSecondary hover:text-white transition-colors duration-300 py-2 border-b border-white/5"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navLinks.length * 0.05 }}
                className="w-full mt-4"
              >
                <Link
                  to="contact"
                  spy={true}
                  smooth={true}
                  offset={-80}
                  duration={500}
                  onClick={() => setIsOpen(false)}
                  className="w-full block py-4 text-center text-sm font-mono tracking-widest text-bgPrimary bg-white hover:bg-accent rounded transition-all duration-300"
                >
                  HIRE ME
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
