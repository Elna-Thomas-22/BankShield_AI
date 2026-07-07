import React from 'react';
import { motion } from 'framer-motion';
import { Award, BookOpen, Calendar, MapPin } from 'lucide-react';

const educationList = [
  {
    degree: 'Bachelor of Computer Applications (BCA)',
    institution: 'Christ College (Autonomous)',
    location: 'Irinjalakuda, Kerala, India',
    period: '2021 - 2024',
    grade: 'First Class with Distinction',
    details: 'Completed professional degree in computer applications with coursework emphasizing software engineering, analytical computing, and database designs.',
    highlights: [
      'Core Coursework: Data Structures, Database Systems (RDBMS), Software Engineering, Programming in Python, Web Applications (HTML, CSS, JS), Computer Networks.',
      'Completed academic projects on software automation and anomaly evaluation.',
      'Active participation in computer science symposiums, tech events, and cybersecurity seminars.'
    ]
  }
];

const Education = () => {
  return (
    <section id="education" className="py-28 px-6 md:px-12 bg-bgPrimary relative overflow-hidden">
      {/* Visual divider border */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-white/5" />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <p className="text-xs font-mono tracking-widest text-textMuted uppercase mb-3">06 / Academics</p>
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-white">Education History</h2>
        </div>

        {/* Timeline Path */}
        <div className="relative border-l border-white/10 ml-4 sm:ml-8 flex flex-col gap-12 pt-4">
          {educationList.map((edu, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="relative pl-8 sm:pl-12 group"
            >
              {/* Core indicator dots */}
              <div className="absolute left-0 top-1.5 -translate-x-1/2 w-4 h-4 rounded-full bg-bgPrimary border-2 border-white group-hover:bg-white transition-colors duration-300 z-10" />
              <div className="absolute left-0 top-1.5 -translate-x-1/2 w-8 h-8 rounded-full bg-white/5 scale-0 group-hover:scale-100 transition-transform duration-300 z-0" />

              {/* Box */}
              <div className="glass-card rounded-2xl p-6 md:p-8 glow-on-hover">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                  <div>
                    <h3 className="text-xl font-medium text-white flex items-center gap-2">
                      {edu.degree}
                    </h3>
                    <div className="flex items-center gap-1.5 text-textSecondary font-mono text-sm mt-1">
                      <BookOpen size={14} />
                      <span>{edu.institution}</span>
                    </div>
                  </div>

                  <div className="flex flex-row md:flex-col items-start gap-4 md:gap-2 text-xs font-mono text-textMuted">
                    <span className="flex items-center gap-1">
                      <Calendar size={12} />
                      {edu.period}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin size={12} />
                      {edu.location}
                    </span>
                  </div>
                </div>

                <div className="mb-6 flex items-center gap-2 text-xs font-mono text-white/80 bg-white/5 border border-white/5 px-3 py-1.5 rounded w-fit">
                  <Award size={13} className="text-white" />
                  <span>GRADUATION STATUS: {edu.grade}</span>
                </div>

                <p className="text-textSecondary text-sm md:text-base font-light leading-relaxed mb-6">
                  {edu.details}
                </p>

                <ul className="space-y-3 text-xs sm:text-sm text-textSecondary font-light list-disc list-inside">
                  {edu.highlights.map((hl, hlIdx) => (
                    <li key={hlIdx} className="leading-relaxed">
                      {hl}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
