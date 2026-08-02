import React from 'react';
import { motion } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';
import { FaGraduationCap, FaCalendarAlt, FaStar } from 'react-icons/fa';

export default function Education() {
  const educationList = portfolioData.education;

  return (
    <section id="education" className="py-20 md:py-24 px-6 relative z-10 bg-transparent max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col items-center mb-16 text-center">
        <h2 className="text-3xl md:text-5xl font-black font-sans tracking-tight text-slate-900 dark:text-white mb-4">
          EDUCATION <span className="text-gradient">TIMELINE</span>
        </h2>
        <div className="w-16 h-[4px] bg-gradient-to-r from-accentBlue to-accentPurple rounded-full" />
      </div>

      {/* Grid structure */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
        {educationList.map((edu, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
            className="p-6 md:p-8 rounded-3xl glass border border-white/5 shadow-premium hover:border-accentBlue/25 hover:shadow-glow-blue hover:scale-[1.01] transition-all duration-300 flex flex-col justify-between group"
          >
            <div>
              {/* Card Header */}
              <div className="flex items-start justify-between gap-4 border-b border-white/5 pb-4 mb-5">
                <div className="flex items-center space-x-3">
                  <div className="p-3 rounded-2xl bg-primary-500/10 text-accentBlue group-hover:bg-accentBlue group-hover:text-white transition-all duration-300">
                    <FaGraduationCap className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-base md:text-lg font-bold font-sans text-slate-900 dark:text-white group-hover:text-accentBlue transition-colors duration-300">
                      {edu.institution}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-white font-semibold mt-0.5">
                      {edu.degree}
                    </p>
                  </div>
                </div>
              </div>

              {/* Course details */}
              <p className="text-xs md:text-sm text-slate-500 dark:text-white leading-relaxed mb-6">
                {edu.description}
              </p>
            </div>

            {/* Card Footer Grade and Duration */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/5">
              <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono font-semibold">
                <FaCalendarAlt />
                <span>{edu.duration}</span>
              </div>
              <div className="flex items-center gap-1 text-xs font-bold text-accentBlue dark:text-accentPurple bg-primary-500/10 px-3 py-1 rounded-full">
                <FaStar className="w-3 h-3 text-yellow-400 animate-spin-slow" />
                <span>{edu.grade}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
