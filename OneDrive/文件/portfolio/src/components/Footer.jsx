import React from 'react';
import { Link } from 'react-scroll';
import { Github, Linkedin, Mail, ArrowUp } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-bgPrimary py-12 px-6 md:px-12 border-t border-white/5 relative overflow-hidden select-none">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
        
        {/* Logo / Left Block */}
        <div className="flex flex-col items-center md:items-start gap-1">
          <Link
            to="home"
            spy={true}
            smooth={true}
            duration={500}
            className="cursor-pointer text-white font-mono text-base font-medium tracking-widest uppercase hover:text-accent transition-colors"
          >
            ELNA THOMAS
          </Link>
          <span className="text-[10px] font-mono text-textMuted uppercase">
            Designed & Developed by Elna Thomas
          </span>
        </div>

        {/* Central Copyright Block */}
        <p className="text-xs font-light text-textMuted text-center md:text-left">
          &copy; {currentYear} Elna Thomas. All rights reserved. 
        </p>

        {/* Right Social Grid / Actions */}
        <div className="flex items-center gap-6">
          <a
            href="https://github.com/Elna-Thomas-22"
            target="_blank"
            rel="noopener noreferrer"
            className="text-textMuted hover:text-white transition-colors duration-200"
            aria-label="GitHub Profile"
          >
            <Github size={18} />
          </a>
          <a
            href="https://linkedin.com/in/elna-thomas"
            target="_blank"
            rel="noopener noreferrer"
            className="text-textMuted hover:text-white transition-colors duration-200"
            aria-label="LinkedIn Profile"
          >
            <Linkedin size={18} />
          </a>
          <a
            href="mailto:elnathomas039.com"
            className="text-textMuted hover:text-white transition-colors duration-200"
            aria-label="Send Email"
          >
            <Mail size={18} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
