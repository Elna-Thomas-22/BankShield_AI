import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { Mail, Github, Linkedin, MapPin, Send, CheckCircle, AlertCircle } from 'lucide-react';

const Contact = () => {
  const formRef = useRef();
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null); // 'success' | 'error' | null
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const sendEmail = (e) => {
    e.preventDefault();

    // Basic Validation
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      setStatus('error');
      return;
    }

    setLoading(true);
    setStatus(null);

    // Retrieve EmailJS configuration from environment variables
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_mock';
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_mock';
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'mock_public_key';

    if (serviceId === 'service_mock') {
      // Simulate submission in local test scenarios if config variables are unset
      setTimeout(() => {
        setLoading(false);
        setStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      }, 1500);
      return;
    }

    emailjs
      .sendForm(serviceId, templateId, formRef.current, {
        publicKey: publicKey,
      })
      .then(
        () => {
          setLoading(false);
          setStatus('success');
          setFormData({ name: '', email: '', subject: '', message: '' });
        },
        (error) => {
          setLoading(false);
          setStatus('error');
          console.error('EmailJS Error:', error.text);
        }
      );
  };

  return (
    <section id="contact" className="py-28 px-6 md:px-12 bg-bgPrimary relative overflow-hidden">
      {/* Decorative vertical divider line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-white/5" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-white/[0.01] rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="mb-16">
          <p className="text-xs font-mono tracking-widest text-textMuted uppercase mb-3">08 / Connection</p>
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-white">Get In Touch</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Information & Social Contacts Block (2 Columns) */}
          <div className="lg:col-span-2 flex flex-col justify-between gap-12">
            <div>
              <h3 className="text-xl font-medium text-white mb-4 tracking-tight">Let's build something secure together.</h3>
              <p className="text-textSecondary text-sm md:text-base font-light leading-relaxed mb-8">
                Whether you want to discuss cloud architecture workflows, hiring opportunities at your company, cybersecurity policies, or just talk tech, feel free to send a message.
              </p>

              {/* Direct Info List */}
              <div className="flex flex-col gap-6 text-sm">
                <a
                  href="mailto:elnathomas039@gmail.com"
                  className="flex items-center gap-4 text-textSecondary hover:text-white transition-colors duration-200 group w-fit"
                >
                  <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/5 group-hover:border-white/10 flex items-center justify-center flex-shrink-0">
                    <Mail size={16} />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-textMuted block uppercase">EMAIL</span>
                    <span className="font-light">elnathomas039@gmail.com</span>
                  </div>
                </a>

                <a
                  href="https://linkedin.com/in/elna-thomas"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 text-textSecondary hover:text-white transition-colors duration-200 group w-fit"
                >
                  <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/5 group-hover:border-white/10 flex items-center justify-center flex-shrink-0">
                    <Linkedin size={16} />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-textMuted block uppercase">LINKEDIN</span>
                    <span className="font-light">linkedin.com/in/elna-thomas</span>
                  </div>
                </a>

                <a
                  href="https://github.com/Elna-Thomas-22"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 text-textSecondary hover:text-white transition-colors duration-200 group w-fit"
                >
                  <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/5 group-hover:border-white/10 flex items-center justify-center flex-shrink-0">
                    <Github size={16} />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-textMuted block uppercase">GITHUB</span>
                    <span className="font-light">github.com/Elna-Thomas-22</span>
                  </div>
                </a>

                <div className="flex items-center gap-4 text-textSecondary w-fit">
                  <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center flex-shrink-0">
                    <MapPin size={16} />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-textMuted block uppercase">LOCATION</span>
                    <span className="font-light">Kerala, India</span>
                  </div>
                </div>
              </div>
            </div>

          <div className="hidden lg:block p-4 rounded-lg bg-white/[0.02] border border-white/5 text-[10px] font-mono text-textMuted">
  <span className="text-white block mb-1">LET'S CONNECT</span>
  "Great ideas begin with a simple conversation. Feel free to reach out anytime."
</div>
          </div>

          {/* Contact Form Block (3 Columns) */}
          <div className="lg:col-span-3 glass-card rounded-2xl p-8 md:p-10">
            <form ref={formRef} onSubmit={sendEmail} className="flex flex-col gap-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Name field */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="name" className="text-[10px] font-mono text-textSecondary uppercase tracking-widest">
                    Your Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    className="w-full bg-[#111111] border border-white/5 focus:border-white/20 rounded-lg px-4 py-3 text-sm text-white placeholder-textMuted transition-colors duration-200 focus:outline-none"
                    required
                  />
                </div>

                {/* Email field */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="email" className="text-[10px] font-mono text-textSecondary uppercase tracking-widest">
                    Your Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="name@company.com"
                    className="w-full bg-[#111111] border border-white/5 focus:border-white/20 rounded-lg px-4 py-3 text-sm text-white placeholder-textMuted transition-colors duration-200 focus:outline-none"
                    required
                  />
                </div>
              </div>

              {/* Subject field */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="subject" className="text-[10px] font-mono text-textSecondary uppercase tracking-widest">
                  Subject
                  </label>
                <input
                  type="text"
                  name="subject"
                  id="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Inquiry or Project Proposal"
                  className="w-full bg-[#111111] border border-white/5 focus:border-white/20 rounded-lg px-4 py-3 text-sm text-white placeholder-textMuted transition-colors duration-200 focus:outline-none"
                  required
                />
              </div>

              {/* Message field */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="message" className="text-[10px] font-mono text-textSecondary uppercase tracking-widest">
                  Message
                </label>
                <textarea
                  name="message"
                  id="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project..."
                  className="w-full bg-[#111111] border border-white/5 focus:border-white/20 rounded-lg px-4 py-3 text-sm text-white placeholder-textMuted transition-colors duration-200 focus:outline-none resize-none"
                  required
                />
              </div>

              {/* Status Alert Panels */}
              {status === 'success' && (
                <div className="flex items-center gap-3 p-4 rounded-lg bg-green-500/5 border border-green-500/10 text-green-400 text-xs font-light">
                  <CheckCircle size={16} />
                  <span>Your message was sent successfully! I will reach out shortly.</span>
                </div>
              )}

              {status === 'error' && (
                <div className="flex items-center gap-3 p-4 rounded-lg bg-red-500/5 border border-red-500/10 text-red-400 text-xs font-light">
                  <AlertCircle size={16} />
                  <span>Please fill out all the fields and enter a valid email address.</span>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="mt-2 w-full py-4 text-xs font-mono tracking-widest font-semibold text-bgPrimary bg-white hover:bg-accent border border-white hover:border-accent rounded-lg transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? 'SENDING...' : 'SEND MESSAGE'}
                <Send size={12} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
