import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Calendar, MapPin } from 'lucide-react';

const experiences = [
  {
    role: 'AWS Cloud Practitioner Training',
    company: 'DBMS Kothanur',
    location: 'Bangalore, India',
    duration: '3 Months (2025/2026)',
    description: 'Intensive practical training focusing on enterprise cloud computing. Acquired hands-on skills in deploying, monitoring, and scaling applications on Amazon Web Services (AWS).',
    bullets: [
      'Configured secure administrative hierarchies using AWS IAM policies and MFA integration.',
      'Configured and launched EC2 instances, setting up custom VPC networking, routing tables, security groups, and subnets.',
      'Designed highly available architectures incorporating Elastic Load Balancers and Auto Scaling policies.',
      'Managed object stores using Amazon S3 access control policies, lifecycle configuration rules, and CloudWatch metrics.'
    ],
    skills: ['AWS IAM', 'EC2', 'S3', 'VPC', 'CloudWatch', 'Route 53', 'ELB', 'Auto Scaling']
  },
  {
    role: 'AI & Machine Learning Intern',
    company: 'CSEED',
    location: 'Kerala, India',
    duration: 'May 2024 – June 2024 (2 Weeks)',
    description:
      'Completed a two-week internship focused on Artificial Intelligence and Machine Learning, gaining practical exposure to data analysis, visualization, and predictive modeling.',
    bullets: [
      'Gained hands-on experience using Spyder IDE and Anaconda for machine learning development.',
      'Implemented Logistic Regression models for predictive analysis.',
      'Created data visualizations using Seaborn and Matplotlib.',
      'Performed line chart analysis and explored AI-based model development workflows.'
    ],
    skills: [
      'Python',
      'Machine Learning',
      'Spyder',
      'Anaconda',
      'Seaborn',
      'Matplotlib',
      'Logistic Regression'
    ]
  },

  {
    role: 'MERN Stack Internship',
    company: 'ICT Academy of Kerala',
    location: 'Kerala, India',
    duration: 'Duration: Internship Project Cycle',
    description: 'Collaboratively designed, built, and optimized full-stack web applications following agile methodologies.',
    bullets: [
      'Built fully responsive modular web interfaces using React.js and Tailwind CSS.',
      'Created RESTful server endpoints using Express.js and Node.js to enable stable server-client queries.',
      'Configured schema-less structures in MongoDB and implemented query optimizations.',
      'Integrated Git-based pull-request flows for source code version management.'
    ],
    skills: ['MongoDB', 'Express.js', 'React.js', 'Node.js', 'Tailwind CSS', 'Git']
  }
];

const Experience = () => {
  return (
    <section id="experience" className="py-28 px-6 md:px-12 bg-bgSecondary relative overflow-hidden">
      {/* Decorative vertical background divider line */}
      <div className="absolute top-0 left-1/4 w-[1px] h-full bg-white/[0.02] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="mb-16">
          <p className="text-xs font-mono tracking-widest text-textMuted uppercase mb-3">03 / Experience</p>
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-white">Work History & Internships</h2>
        </div>

        {/* Timeline Stack */}
        <div className="relative border-l border-white/10 ml-4 md:ml-6 flex flex-col gap-16">
          {experiences.map((exp, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="relative pl-8 sm:pl-12 group"
            >
              {/* Timeline Indicator Dot */}
              <div className="absolute left-0 top-1.5 -translate-x-1/2 w-4 h-4 rounded-full bg-bgPrimary border-2 border-white group-hover:bg-white transition-colors duration-300 z-10" />
              <div className="absolute left-0 top-1.5 -translate-x-1/2 w-8 h-8 rounded-full bg-white/5 scale-0 group-hover:scale-100 transition-transform duration-300 z-0" />

              {/* Card Container */}
              <div className="glass-card rounded-2xl p-6 md:p-8 glow-on-hover">
                {/* Meta details */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                  <div>
                    <h3 className="text-xl font-medium text-white flex items-center gap-2">
                      {exp.role}
                    </h3>
                    <div className="flex items-center gap-1.5 text-textSecondary font-mono text-sm mt-1">
                      <Briefcase size={14} />
                      <span>{exp.company}</span>
                    </div>
                  </div>

                  <div className="flex flex-row md:flex-col items-start gap-4 md:gap-2 text-xs font-mono text-textMuted">
                    <span className="flex items-center gap-1">
                      <Calendar size={12} />
                      {exp.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin size={12} />
                      {exp.location}
                    </span>
                  </div>
                </div>

                <p className="text-textSecondary text-sm md:text-base font-light leading-relaxed mb-6">
                  {exp.description}
                </p>

                {/* Bullets */}
                <ul className="space-y-2.5 mb-6 text-xs sm:text-sm text-textSecondary font-light list-disc list-inside">
                  {exp.bullets.map((bullet, bIdx) => (
                    <li key={bIdx} className="leading-relaxed">
                      {bullet}
                    </li>
                  ))}
                </ul>

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
                  {exp.skills.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="px-2.5 py-1 rounded bg-white/5 border border-white/5 text-[10px] font-mono tracking-wider text-textSecondary hover:text-white hover:border-white/10 transition-colors duration-200"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
