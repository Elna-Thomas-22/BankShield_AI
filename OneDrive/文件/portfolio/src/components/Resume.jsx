import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, Eye, X, Award, FileText, ExternalLink, Calendar, MapPin } from 'lucide-react';
import resumePDF from "../assets/projects/elna_resume.pdf";
const Resume = () => {
  const [isViewerOpen, setIsViewerOpen] = useState(false);

  // Prevent background scroll when modal is open
  const toggleViewer = () => {
    setIsViewerOpen(!isViewerOpen);
    if (!isViewerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  };

  return (
    <section id="resume" className="py-28 px-6 md:px-12 bg-bgSecondary relative overflow-hidden">
      {/* Decorative vertical line */}
      <div className="absolute top-0 right-1/4 w-[1px] h-full bg-white/[0.01] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="mb-16">
          <p className="text-xs font-mono tracking-widest text-textMuted uppercase mb-3">07 / Credentials Preview</p>
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-white font-sans">Curriculum Vitae</h2>
        </div>

        {/* Premium Preview Card */}
        <div className="glass-card rounded-2xl p-8 md:p-12 flex flex-col lg:flex-row items-center justify-between gap-10 glow-on-hover">
          <div className="max-w-xl">
            <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center mb-6">
              <FileText size={20} className="text-white" />
            </div>
            <h3 className="text-2xl font-medium text-white mb-4 tracking-tight">Professional Resume</h3>
            <p className="text-textSecondary text-sm md:text-base font-light leading-relaxed mb-6">
              Access my fully comprehensive CV detailing my credentials, academic achievements, cloud infrastructure skills, and full stack coding abilities. Designed to match enterprise recruiting guidelines.
            </p>
            <div className="flex flex-wrap gap-4 text-xs font-mono text-textMuted">
              <span className="flex items-center gap-1.5"><Award size={13} /> ATS Optimized</span>
              <span className="text-white/20">|</span>
              <span className="flex items-center gap-1.5"><Calendar size={13} /> Updated July 2026</span>
            </div>
          </div>

          {/* Interactive controls */}
          <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
            <button
              onClick={toggleViewer}
              className="w-full sm:w-auto px-8 py-3.5 text-xs font-mono tracking-widest text-white hover:text-bgPrimary bg-[#111111] hover:bg-white border border-white/10 hover:border-white rounded transition-all duration-300 flex items-center justify-center gap-2 group"
            >
              <Eye size={14} className="group-hover:scale-110 transition-transform" />
              VIEW RESUME
            </button>
           <a
  href={resumePDF}
  download="Elna_Thomas_Resume.pdf"
  className="w-full sm:w-auto px-8 py-3.5 text-xs font-mono tracking-widest text-bgPrimary bg-white hover:bg-accent border border-white hover:border-accent rounded font-semibold transition-all duration-300 flex items-center justify-center gap-2 group"
>
  <Download size={14} />
  DOWNLOAD CV
</a>
          </div>
        </div>
      </div>

      {/* Modal Resume Lightbox Viewer */}
<AnimatePresence>
  {isViewerOpen && (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-[#0A0A0A]/95 flex items-center justify-center p-4 md:p-8"
    >
      {/* Background Overlay */}
      <div
        className="absolute inset-0 cursor-zoom-out"
        onClick={toggleViewer}
      />

      {/* Modal */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ duration: 0.4 }}
        className="relative w-full max-w-5xl h-[90vh] bg-bgCard border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden z-10"
      >
        {/* Header */}
        <div className="p-4 bg-bgSecondary border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-green-500"></span>

            <span className="text-xs font-mono text-textMuted ml-3">
              Elna_Thomas_Resume.pdf
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Download */}
            <a
              href={resumePDF}
              download="Elna_Thomas_Resume.pdf"
              className="p-2 rounded bg-white/5 hover:bg-white/10 text-white transition"
              title="Download Resume"
            >
              <Download size={18} />
            </a>

            {/* Close */}
            <button
              onClick={toggleViewer}
              className="p-2 rounded bg-white/5 hover:bg-white/10 text-white transition"
              title="Close"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* PDF Viewer */}
        <div className="flex-1 bg-white">
          <iframe
            src={resumePDF}
            title="Resume"
            className="w-full h-full"
          />
        </div>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>
    </section>
  );
};

export default Resume;
