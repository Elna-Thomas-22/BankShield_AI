import React, { useState } from 'react';
import { TypeAnimation } from 'react-type-animation';
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import { Github, Linkedin, Mail, ArrowDown, ChevronRight } from 'lucide-react';
import { Link } from 'react-scroll';
import ParticleBackground from './ParticleBackground';
import NeuralNetwork from "./NeuralNetwork";

const Hero = () => {
  // Cursor coordinate hooks for mouse-follow radial glow
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = ({ currentTarget, clientX, clientY }) => {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  };

  return (
    <section
      id="home"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative min-h-screen w-full flex items-center justify-center bg-bgPrimary overflow-hidden py-24 px-6 md:px-12"
    >
      {/* Noise background overlay */}
      <div className="absolute inset-0 bg-noise opacity-[0.02] pointer-events-none" />

      {/* Floating Canvas Particles */}
      <ParticleBackground />

      {/* Mouse Follow Ambient Glow (Vercel Style) */}
      <motion.div
        className="absolute -inset-px pointer-events-none opacity-0 md:opacity-100 transition duration-500 rounded-3xl"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(255, 255, 255, 0.04),
              transparent 80%
            )
          `,
        }}
      />

      {/* Hero Content Wrapper */}
      <div className="relative z-10 max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
        {/* Top Minimal Greeting Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass border border-white/5 text-xs font-mono tracking-widest text-textSecondary uppercase mb-8"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
          Available for Opportunities
        </motion.div>

        {/* Big Premium Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-semibold tracking-tight text-white mb-6 leading-tight whitespace-nowrap">
          Elna Thomas
        </motion.h1>

        {/* Dynamic Typing Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="h-10 sm:h-12 flex items-center lg:justify-start justify-center mb-6"
        >
          <span className="text-xl sm:text-2xl md:text-3xl font-mono text-textSecondary tracking-wide font-light">
            <TypeAnimation
              sequence={[
                'AWS Cloud Practitioner',
                2000,
                'Full Stack Developer',
                2000,
                'Cybersecurity Enthusiast',
                2000,
                'Cloud Learner',
                2000,
              ]}
              wrapper="span"
              cursor={true}
              repeat={Infinity}
              className="text-white"
            />
          </span>
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl text-textSecondary text-base sm:text-lg md:text-xl font-light tracking-wide leading-relaxed mb-12"
        >
          Building secure cloud solutions, scalable web applications, and continuously learning modern technologies.
        </motion.p>

        {/* Interactive Action Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md mb-12 px-4"
        >
          <Link
            to="resume"
            spy={true}
            smooth={true}
            offset={-80}
            duration={500}
            className="cursor-pointer w-full sm:w-auto px-8 py-3.5 text-xs font-mono tracking-widest text-bgPrimary bg-white hover:bg-accent border border-white hover:border-accent rounded font-semibold transition-all duration-300 flex items-center justify-center gap-2 group"
          >
            RESUME
            <ChevronRight size={14} className="transform group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            to="projects"
            spy={true}
            smooth={true}
            offset={-80}
            duration={500}
            className="cursor-pointer w-full sm:w-auto px-8 py-3.5 text-xs font-mono tracking-widest text-white hover:text-white bg-transparent hover:bg-white/5 border border-white/10 hover:border-white/30 rounded transition-all duration-300 flex items-center justify-center"
          >
            VIEW PROJECTS
          </Link>
          <Link
            to="contact"
            spy={true}
            smooth={true}
            offset={-80}
            duration={500}
            className="cursor-pointer w-full sm:w-auto px-8 py-3.5 text-xs font-mono tracking-widest text-textSecondary hover:text-white bg-transparent border border-transparent hover:border-white/5 rounded transition-all duration-300 flex items-center justify-center"
          >
            CONTACT ME
          </Link>
        </motion.div>

        {/* Social Icons Badge Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="flex items-center gap-6"
        >
          <a
            href="https://github.com/Elna-Thomas-22"
            target="_blank"
            rel="noopener noreferrer"
            className="text-textMuted hover:text-white transition-colors duration-300"
            aria-label="GitHub Profile"
          >
            <Github size={20} />
          </a>
          <a
            href="https://www.linkedin.com/in/elna-thomas/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-textMuted hover:text-white transition-colors duration-300"
            aria-label="LinkedIn Profile"
          >
            <Linkedin size={20} />
          </a>
          <a
            href="mailto:elnathomas039@gmail.com"
            className="text-textMuted hover:text-white transition-colors duration-300"
            aria-label="Send Email"
          >
            <Mail size={20} />
          </a>
        </motion.div>
      </div>
      {/* RIGHT: Globe */}

      <div className="hidden lg:flex justify-center items-center">
    <NeuralNetwork />
</div>
    </div>  
      {/* Floating Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 opacity-50 hover:opacity-100 transition-opacity duration-300 z-10">
        <Link
          to="about"
          spy={true}
          smooth={true}
          offset={-80}
          duration={500}
          className="cursor-pointer flex flex-col items-center gap-2"
        >
          <span className="text-[10px] font-mono tracking-widest uppercase text-textMuted">Scroll Down</span>
          <motion.div
            animate={{
              y: [0, 8, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="text-white"
          >
            <ArrowDown size={14} />
          </motion.div>
        </Link>
      </div>
    </section>
  );
};

export default Hero;
