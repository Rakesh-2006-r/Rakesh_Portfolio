import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';
import developerAvatar from '../assets/user_photo.jpg';
import resumePdf from '../assets/Rakesh_Resume (1).pdf';
import { FaGraduationCap, FaBriefcase, FaCode, FaCertificate, FaFilePdf } from 'react-icons/fa';

// Scroll-triggered counter component
function AnimatedCounter({ value, suffix = "", delay = 0 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (inView) {
      const start = 0;
      const end = parseInt(value, 10);
      if (isNaN(end)) return;

      const duration = 2.0; // seconds
      const startTime = performance.now();

      const animate = (currentTime) => {
        const elapsedTime = (currentTime - startTime) / 1000;
        if (elapsedTime < duration) {
          const progress = elapsedTime / duration;
          // Easing out quadratic
          const easeOut = progress * (2 - progress);
          setCount(Math.floor(easeOut * (end - start) + start));
          requestAnimationFrame(animate);
        } else {
          setCount(end);
        }
      };

      const delayTimer = setTimeout(() => {
        requestAnimationFrame(animate);
      }, delay * 1000);

      return () => clearTimeout(delayTimer);
    }
  }, [inView, value, delay]);

  return (
    <span ref={ref} className="font-bold text-3xl md:text-5xl text-gradient">
      {count}
      {suffix}
    </span>
  );
}

export default function About() {
  const { name, bio } = portfolioData.personalInfo;
  const stats = portfolioData.stats;
  
  const quickFacts = [
    { label: "Education", value: "B.Tech Computer Science (Data Science)", icon: FaGraduationCap },
    { label: "Focus Areas", value: "MERN Stack, Machine Learning & Algorithms", icon: FaCode },
    { label: "Credentials", value: "Infosys DSE Qualified, 1000+ DSA Solutions", icon: FaBriefcase },
    { label: "Contest Metrics", value: "CodeChef Division 2, Weekly Contest Participant", icon: FaCertificate }
  ];

  return (
    <section id="about" className="py-20 md:py-32 px-6 relative z-10 bg-transparent max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col items-center mb-16 text-center">
        <h2 className="text-3xl md:text-5xl font-black font-sans tracking-tight text-slate-900 dark:text-white mb-4">
          ABOUT <span className="text-gradient">ME</span>
        </h2>
        <div className="w-16 h-[4px] bg-gradient-to-r from-accentBlue to-accentPurple rounded-full" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Avatar Visual Grid Section */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-5 flex justify-center"
        >
          <div className="relative group">
            {/* Background Accent Gradients */}
            <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-accentBlue to-accentPurple opacity-40 blur-lg group-hover:opacity-70 transition duration-500" />
            
            {/* Visual Glassmorphic Frame wrapper */}
            <div className="relative rounded-3xl p-3 glass border border-white/20 shadow-premium overflow-hidden">
              <img 
                src={developerAvatar} 
                alt={name} 
                className="w-full max-w-[320px] aspect-square object-cover rounded-2xl shadow-inner transform group-hover:scale-[1.03] transition duration-500"
              />
            </div>
          </div>
        </motion.div>

        {/* Biography & Quick Info Section */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-7 flex flex-col space-y-6"
        >
          <h3 className="text-xl md:text-2xl font-bold font-sans text-slate-800 dark:text-slate-100">
            A developer pushing boundaries with data & clean interfaces.
          </h3>
          <p className="text-sm md:text-base text-slate-600 dark:text-white leading-relaxed">
            {bio}
          </p>

          {/* Quick Facts Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            {quickFacts.map((fact, index) => {
              const Icon = fact.icon;
              return (
                <div key={index} className="flex items-start space-x-3 p-3.5 rounded-2xl glass border border-white/5">
                  <div className="p-2 rounded-xl bg-primary-500/10 text-accentBlue mt-0.5">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-white uppercase tracking-wider">{fact.label}</h4>
                    <p className="text-sm text-slate-800 dark:text-slate-200 font-medium mt-0.5">{fact.value}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Resume Download Action */}
          <div className="pt-4">
            <a
              href={resumePdf}
              download="Pittala_Rakesh_Resume.pdf"
              className="px-6 py-3.5 rounded-xl font-semibold bg-gradient-to-r from-accentBlue to-accentPurple text-white hover:scale-105 active:scale-95 transition-all text-center flex items-center justify-center gap-2 cursor-pointer shadow-glow-blue w-full sm:w-auto inline-flex"
            >
              <FaFilePdf />
              Download Resume
            </a>
          </div>
        </motion.div>
      </div>

      {/* Numerical Stats Counters */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-20">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="p-6 rounded-2xl glass border border-white/5 flex flex-col items-center justify-center text-center shadow-lg hover:border-accentBlue/20 hover:scale-102 transition-all duration-300"
          >
            <AnimatedCounter value={stat.target} suffix={stat.suffix} delay={i * 0.15} />
            <span className="text-xs md:text-sm text-white dark:text-white font-semibold mt-2 uppercase tracking-wide">
              {stat.label}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
