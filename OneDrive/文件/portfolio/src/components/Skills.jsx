import React from 'react';
import { motion } from 'framer-motion';
import { Cloud, Terminal, Monitor, Server, Database } from 'lucide-react';

const skillCategories = [
  {
    title: 'Cloud & Infrastructure',
    icon: Cloud,
    skills: [
      { name: 'AWS IAM', level: 85 },
      { name: 'Amazon EC2', level: 90 },
      { name: 'Amazon S3', level: 90 },
      { name: 'Amazon VPC', level: 80 },
      { name: 'AWS CloudWatch', level: 75 },
      { name: 'Route 53', level: 70 },
      { name: 'Elastic Load Balancer (ELB)', level: 80 },
      { name: 'Auto Scaling', level: 80 },
      { name: 'Networking Basics', level: 85 },
      { name: 'Compute & Storage Services', level: 85 },
    ],
  },
  {
    title: 'Programming Languages',
    icon: Terminal,
    skills: [
      { name: 'Python', level: 85 },
      { name: 'JavaScript (ES6+)', level: 80 },
      { name: 'HTML5', level: 95 },
      { name: 'CSS3', level: 85 },
    ],
  },
  {
    title: 'Frontend Frameworks',
    icon: Monitor,
    skills: [
      { name: 'React.js', level: 80 },
      { name: 'Tailwind CSS', level: 90 },
      { name: 'Bootstrap', level: 85 },
    ],
  },
  {
    title: 'Backend Engineering',
    icon: Server,
    skills: [
      { name: 'Node.js', level: 75 },
      { name: 'Express.js', level: 80 },
    ],
  },
  {
    title: 'Database Management',
    icon: Database,
    skills: [
      { name: 'MongoDB', level: 80 },
      { name: 'MySQL', level: 75 },
    ],
  },
  {
    title: 'Developer Tools',
    icon: Terminal, // Using Terminal as fallback for tools
    skills: [
      { name: 'Git', level: 85 },
      { name: 'GitHub', level: 85 },
      { name: 'VS Code', level: 95 },
      { name: 'Linux Command Line', level: 80 },
      { name: 'Postman', level: 80 },
    ],
  },
];

const Skills = () => {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const barVariants = (level) => ({
    hidden: { width: 0 },
    visible: {
      width: `${level}%`,
      transition: { duration: 1.2, ease: 'easeOut', delay: 0.2 },
    },
  });

  return (
    <section id="skills" className="py-28 px-6 md:px-12 bg-bgPrimary relative overflow-hidden">
      {/* Glow dot overlay in top corner */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white/[0.01] rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="mb-16">
          <p className="text-xs font-mono tracking-widest text-textMuted uppercase mb-3">02 / Capabilities</p>
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-white">Skills & Expertise</h2>
        </div>

        {/* Categories Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {skillCategories.map((category, idx) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={idx}
                variants={cardVariants}
                className="glass-card rounded-2xl p-6 md:p-8 glow-on-hover flex flex-col h-full"
              >
                {/* Header Icon + Title */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center border border-white/10">
                    <Icon size={18} className="text-white" />
                  </div>
                  <h3 className="text-lg font-medium text-white tracking-wide">{category.title}</h3>
                </div>

                {/* Skills Stack List */}
                <div className="flex flex-col gap-5 flex-grow">
                  {category.skills.map((skill, sIdx) => (
                    <div key={sIdx} className="group/item">
                      <div className="flex justify-between items-center text-xs font-mono mb-1.5">
                        <span className="text-textSecondary group-hover/item:text-white transition-colors duration-200">
                          {skill.name}
                        </span>
                        <span className="text-textMuted">{skill.level}%</span>
                      </div>
                      
                      {/* Premium animated progress bar */}
                      <div className="h-[3px] w-full bg-white/5 rounded-full overflow-hidden">
                        <motion.div
                          variants={barVariants(skill.level)}
                          className="h-full bg-white/50 group-hover/item:bg-white transition-colors duration-300 rounded-full"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
