import React from 'react';
import { motion } from 'framer-motion';
import { Award, BookOpen, ShieldCheck, Database, Cloud } from 'lucide-react';
import profileImage from "../assets/profile.jpg";
const About = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section id="about" className="py-28 px-6 md:px-12 bg-bgSecondary relative overflow-hidden">
      {/* Grid subtle background overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="mb-16">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="text-xs font-mono tracking-widest text-textMuted uppercase mb-3"
          >
            01 / Introduction
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-3xl md:text-5xl font-semibold tracking-tight text-white"
          >
            About Me
          </motion.h2>
        </div>

        {/* Bento Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {/* Big Profile Summary Card */}
          <motion.div
            variants={itemVariants}
            className="md:col-span-2 glass-card rounded-2xl p-8 md:p-10 flex flex-col justify-between glow-on-hover relative overflow-hidden"
          >
            
             <div className="flex flex-col md:flex-row items-center md:items-start gap-8">

  {/* Text */}
  <div className="flex-1">
    <span className="text-xs font-mono text-textMuted uppercase tracking-widest block mb-6">
      Profile Summary
    </span>

    <h3 className="text-xl md:text-2xl font-light text-white leading-relaxed mb-6">
      I am <span className="font-semibold">Elna Thomas</span>, a BCA graduate with a passion for designing secure cloud systems and modern full-stack web applications.
    </h3>

    <p className="text-textSecondary text-sm md:text-base font-light leading-relaxed">
      I enjoy engineering solutions to real-world problems. Whether building responsive frontends, designing robust backend APIs, or configuring cloud infrastructure, I focus on security, scalability, and modern development practices.
    </p>
  </div>

  {/* Professional Photo */}
  <div className="flex justify-center">
    <img
      src={profileImage}
      alt="Elna Thomas"
      className="w-36 h-36 md:w-40 md:h-40 rounded-2xl object-cover border border-white/10 shadow-xl"
    />
  </div>

</div>

            {/* Minimal Stat/Status */}
            <div className="border-t border-white/5 pt-6 mt-8 flex flex-wrap gap-6 items-center text-xs font-mono text-textMuted">
              <div>
                STATUS: <span className="text-white">PREPARING FOR CLOUD ROLES</span>
              </div>
              <div className="hidden sm:block text-white/20">|</div>
              <div>
                LOCATION: <span className="text-white">KERALA, INDIA</span>
              </div>
            </div>
          </motion.div>

          {/* Education Spotlight Card */}
          <motion.div
            variants={itemVariants}
            className="glass-card rounded-2xl p-8 flex flex-col justify-between glow-on-hover"
          >
            <div>
              <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center mb-6 border border-white/10">
                <BookOpen size={20} className="text-white" />
              </div>
              <span className="text-xs font-mono text-textMuted uppercase tracking-widest block mb-2">Education</span>
              <h4 className="text-lg font-medium text-white mb-2">Bachelor of Computer Applications</h4>
              <p className="text-textSecondary text-xs font-light leading-relaxed mb-4">
                Christ College (Autonomous), Irinjalakuda. Graduated with a strong analytical foundation in computational logic, programming frameworks, and databases.
              </p>
            </div>

            <div className="text-[10px] font-mono tracking-wider text-textMuted border-t border-white/5 pt-4">
              GRADUATED: <span className="text-white">BCA </span>
            </div>
          </motion.div>

          {/* Cloud Journey Spotlight Card */}
          <motion.div
            variants={itemVariants}
            className="glass-card rounded-2xl p-8 flex flex-col justify-between glow-on-hover"
          >
            <div>
              <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center mb-6 border border-white/10">
                <Cloud size={20} className="text-white" />
              </div>
              <span className="text-xs font-mono text-textMuted uppercase tracking-widest block mb-2">AWS Cloud Path</span>
              <h4 className="text-lg font-medium text-white mb-2">Cloud Practitioner Training</h4>
              <p className="text-textSecondary text-xs font-light leading-relaxed">
                Currently undergoing immersive training in AWS Architecture. Focusing on IAM protocols, VPC layout designs, high availability EC2 configurations, secure S3 pipelines, and AWS compliance frameworks.
              </p>
            </div>


          </motion.div>

          {/* Focus Pillars (Bento Wide) */}
          <motion.div
            variants={itemVariants}
            className="md:col-span-2 glass-card rounded-2xl p-8 glow-on-hover"
          >
            <span className="text-xs font-mono text-textMuted uppercase tracking-widest block mb-6">Pillars of Passion</span>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <ShieldCheck size={16} className="text-white" />
                  <h5 className="text-sm font-semibold text-white">Cybersecurity</h5>
                </div>
                <p className="text-textSecondary text-xs font-light leading-relaxed">
                  Integrating security at the code level, emphasizing secure IAM configurations and robust data isolation structures.
                </p>
              </div>

              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <Cloud size={16} className="text-white" />
                  <h5 className="text-sm font-semibold text-white">AWS Infrastructure</h5>
                </div>
                <p className="text-textSecondary text-xs font-light leading-relaxed">
                  Building fault-tolerant environments using AWS EC2 auto-scaling, route rules, S3 access points, and ELB balancing.
                </p>
              </div>

              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <Database size={16} className="text-white" />
                  <h5 className="text-sm font-semibold text-white">Data & Analytics</h5>
                </div>
                <p className="text-textSecondary text-xs font-light leading-relaxed">
                  Designing database indexes, relational structures (MySQL), and NoSQL datasets (MongoDB) for analytics.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
