import React from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink, ShieldAlert, Zap, Cpu, BarChart2 } from 'lucide-react';

// Import local project assets
import detectionguardImg from '../assets/projects/detectionguard.png';
import weatherImg from '../assets/projects/weather.png';
import votingImg from '../assets/projects/voting.png';
import portfolioImg from '../assets/projects/portfolio.png';
import taskManagerImg from '../assets/projects/taskmanager.png';
import wingspanImg from '../assets/projects/wingspan.png';


const projects = [
  {
    title: 'DetectionGuard',
    category: 'Cybersecurity & Machine Learning',
    image: detectionguardImg,
    description: 'A lightweight Byzantine-resilient Federated Learning Intrusion Detection System designed to secure distributed nodes from edge cyberattacks.',
    technologies: ['Python', 'Machine Learning', 'Federated Learning', 'Cybersecurity'],
    features: [
      { text: 'Attack Detection', desc: 'Identifies malicious payloads and intrusion patterns in real-time.', icon: ShieldAlert },
      { text: 'Secure Aggregation', desc: 'Byzantine-resilient validation algorithms filter poisoning updates.', icon: Cpu },
      { text: 'Lightweight Design', desc: 'Optimized parameter exchange protocols for edge nodes.', icon: Zap },
      { text: 'High Accuracy', desc: 'Achieves state-of-the-art anomaly discovery profiles.', icon: BarChart2 }
    ],
    github: 'https://github.com/elna-t/DetectionGuard',
    live: 'https://github.com/elna-t/DetectionGuard', // Fallback to github repo if live isn't deployed
  },
  {
    title: 'Student Voting System',
    category: 'Full Stack Web App',
    image: votingImg,
    description: 'A secure, audit-friendly online voting platform featuring administrator dashboards, user access control gates, and cryptographic polling counts.',
    technologies: ['React.js', 'Node.js', 'MongoDB', 'Express.js', 'Tailwind CSS'],
    features: [],
    github: 'https://github.com/elna-t/student-voting-system',
    live: 'https://github.com/elna-t/student-voting-system',
  },
  {
    title: 'Wingspan Airline Website',
    category: 'Frontend Web App',
    image: wingspanImg,
    description: 'A responsive airline booking website featuring flight search, travel destinations, booking interface, and a modern user-friendly design.',
    technologies: ['React.js', 'JavaScript', 'Tailwind CSS', 'HTML5', 'CSS3'],
    features: [],
    github: 'https://github.com/elna-t/wingspan-airline',
    live: 'https://github.com/elna-t/wingspan-airline',
  },
  {
    title: 'Task Manager',
    category: 'Full Stack Web App',
    image: taskManagerImg,
    description: 'A task management application that helps users create, organize, update, and track daily tasks with a clean and responsive interface.',
    technologies: ['React.js', 'Node.js', 'MongoDB', 'Express.js', 'Tailwind CSS'],
    features: [],
    github: 'https://github.com/elna-t/task-manager',
    live: 'https://github.com/elna-t/task-manager',
  },

  {
    title: 'Responsive Weather Application',
    category: 'API Web Utility',
    image: weatherImg,
    description: 'A lightweight weather forecasting application consuming third-party RESTful APIs, providing localized dynamic predictions and storm warnings.',
    technologies: ['React.js', 'JavaScript (ES6)', 'Tailwind CSS', 'Weather API'],
    features: [],
    github: 'https://github.com/elna-t/weather-app',
    live: 'https://github.com/elna-t/weather-app',
  },
  {
    title: 'Personal Portfolio',
    category: 'Premium Creative Frontend',
    image: portfolioImg,
    description: 'The very site you are exploring. A modern, monochrome developer portfolio designed to showcase projects, skills, and certifications to recruiters.',
    technologies: ['React.js', 'Vite.js', 'Tailwind CSS', 'Framer Motion', 'EmailJS'],
    features: [],
    github: 'https://github.com/elna-t/portfolio',
    live: 'https://github.com/elna-t/portfolio',
  }
];

const Projects = () => {
  return (
    <section id="projects" className="py-28 px-6 md:px-12 bg-bgPrimary relative overflow-hidden">
      {/* Visual top border styling */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-white/5" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="mb-16">
          <p className="text-xs font-mono tracking-widest text-textMuted uppercase mb-3">04 / Creations</p>
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-white">Selected Projects</h2>
        </div>

        {/* Projects Layout */}
        <div className="flex flex-col gap-20">
          {projects.map((project, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'
                  } gap-10 items-center justify-between`}
              >
                {/* Image Cover Container */}
                <div className="w-full lg:w-1/2 group/img relative rounded-2xl overflow-hidden glass border border-white/5 aspect-video cursor-pointer">
                  {/* Subtle dark overlay */}
                  <div className="absolute inset-0 bg-[#0A0A0A]/20 group-hover/img:bg-transparent transition-colors duration-500 z-10" />

                  {/* Project Image */}
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transform scale-100 group-hover/img:scale-105 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />
                </div>

                {/* Information Card */}
                <div className="w-full lg:w-1/2 flex flex-col items-start">
                  <span className="text-xs font-mono text-textMuted tracking-wider uppercase mb-2">
                    {project.category}
                  </span>
                  <h3 className="text-2xl md:text-3xl font-semibold text-white mb-4 tracking-tight">
                    {project.title}
                  </h3>

                  <p className="text-textSecondary text-sm md:text-base font-light leading-relaxed mb-6">
                    {project.description}
                  </p>

                  {/* Optional Key Features Grid (for DetectionGuard) */}
                  {project.features && project.features.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 w-full">
                      {project.features.map((feat, fIdx) => {
                        const FeatIcon = feat.icon;
                        return (
                          <div key={fIdx} className="flex gap-3 items-start">
                            <div className="w-6 h-6 rounded bg-white/5 border border-white/5 flex items-center justify-center flex-shrink-0 mt-0.5">
                              <FeatIcon size={12} className="text-white" />
                            </div>
                            <div>
                              <h4 className="text-xs font-semibold text-white">{feat.text}</h4>
                              <p className="text-[10px] text-textMuted leading-relaxed">{feat.desc}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* Technology Tags Stack */}
                  <div className="flex flex-wrap gap-2 mb-8">
                    {project.technologies.map((tech, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2.5 py-1 rounded bg-[#111111] border border-white/5 text-[10px] font-mono tracking-wider text-textSecondary"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Actions Links */}
                  <div className="flex items-center gap-4">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-2.5 text-xs font-mono tracking-widest text-white hover:text-bgPrimary bg-[#111111] hover:bg-white border border-white/10 hover:border-white rounded transition-all duration-300 flex items-center gap-2 group/btn"
                    >
                      <Github size={14} className="group-hover/btn:rotate-[360deg] transition-transform duration-500" />
                      GITHUB
                    </a>

                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-5 py-2.5 text-xs font-mono tracking-widest text-textSecondary hover:text-white bg-transparent border border-transparent hover:border-white/5 rounded transition-all duration-300 flex items-center gap-1.5"
                      >
                        LIVE DEMO
                        <ExternalLink size={12} />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Projects;
