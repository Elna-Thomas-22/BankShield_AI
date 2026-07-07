import mernPDF from "../assets/certificates/mern.pdf";
import dataPDF from "../assets/certificates/data.pdf";
import nptelPDF from "../assets/certificates/nptel.pdf"; import React from "react";
import { motion } from "framer-motion";
import {
  Award,
  ShieldCheck,
  GraduationCap,
  Server,
  ExternalLink,
} from "lucide-react";

const certifications = [

  {
    title: "Microsoft Office Specialist: Excel Associate (Office 2019)",
    issuer: "Microsoft",
    icon: Award,
    link: "https://www.credly.com/badges/6d1171bc-7a8f-4e16-a7b6-c57b1c8c8458/public_url",
  },
  {
    title: "MERN Stack Internship",
    issuer: "ICT Academy of Kerala",
    icon: Server,
    link: mernPDF,
  },
  {
    title: "IT Specialist - Data Analytics",
    issuer: "Certiport Pearson VUE",
    icon: ShieldCheck,
    link: dataPDF,
  },
  {
    title: "NPTEL Certifications",
    issuer: "IIT / National Programme on Technology Enhanced Learning",
    icon: GraduationCap,
    link: nptelPDF,
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: "easeOut",
    },
  },
};

const Certifications = () => {
  return (
    <section
      id="certifications"
      className="py-28 px-6 md:px-12 bg-bgSecondary relative overflow-hidden"
    >
      {/* Background Glow */}
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-white/5 rounded-full blur-[180px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Section Heading */}
        <div className="mb-16">
          <p className="text-xs uppercase tracking-[0.3em] text-textMuted font-mono mb-3">
            05 / Credentials
          </p>

          <h2 className="text-4xl md:text-5xl font-bold text-white">
            Certifications & Badges
          </h2>
        </div>

        {/* Certification Cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {certifications.map((cert, index) => {
            const Icon = cert.icon;

            return (
              <motion.div
                key={index}
                variants={cardVariants}
                className="glass-card rounded-2xl border border-white/10 p-7 hover:border-white/20 transition-all duration-300 hover:-translate-y-2"
              >
                {/* Icon */}
                <div className="w-14 h-14 rounded-xl bg-white/10 flex items-center justify-center mb-6">
                  <Icon className="text-white" size={28} />
                </div>

                {/* Title */}
                <h3 className="text-xl font-semibold text-white mb-2">
                  {cert.title}
                </h3>

                {/* Issuer */}
                <p className="text-textSecondary text-sm mb-8">
                  {cert.issuer}
                </p>

                {/* Button */}
                <a
                  href={cert.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 transition-all duration-300 text-white font-medium"
                >
                  View Certificate
                  <ExternalLink size={18} />
                </a>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
};

export default Certifications;