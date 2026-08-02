import React from 'react';
import { motion } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';
import { FaBriefcase, FaCalendarAlt } from 'react-icons/fa';

export default function Experience() {
  const experiences = portfolioData.experience;

  return (
    <section id="timeline" className="py-20 md:py-32 px-6 relative z-10 bg-transparent max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col items-center mb-16 text-center">
        <h2 className="text-3xl md:text-5xl font-black font-sans tracking-tight text-slate-900 dark:text-white mb-4">
          WORK <span className="text-gradient">EXPERIENCE</span>
        </h2>
        <div className="w-16 h-[4px] bg-gradient-to-r from-accentBlue to-accentPurple rounded-full" />
      </div>

      {/* Vertical Timeline container */}
      <div className="relative mt-12 md:mt-20">
        {/* Central Vertical Line (Desktop only) */}
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-accentBlue via-accentPurple to-transparent transform -translate-x-1/2 hidden md:block" />
        
        {/* Left Side Line for Mobile */}
        <div className="absolute left-4 top-0 bottom-0 w-[2px] bg-gradient-to-b from-accentBlue to-transparent md:hidden" />

        <div className="space-y-12">
          {experiences.map((exp, index) => {
            const isLeft = index % 2 === 0;

            return (
              <div key={index} className="relative flex flex-col md:flex-row items-center justify-between w-full">
                {/* Left Side */}
                {isLeft ? (
                  <div className="w-full md:w-[45%] flex justify-start md:justify-end pl-12 md:pl-0 pr-0">
                    <motion.div
                      initial={{ opacity: 0, x: -40 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                      className="w-full max-w-lg p-6 rounded-3xl glass border border-white/5 shadow-premium hover:border-accentBlue/25 hover:scale-[1.01] transition-all duration-300 relative"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/5 pb-3 mb-4">
                        <div>
                          <h3 className="text-lg font-bold font-sans text-slate-900 dark:text-white">{exp.role}</h3>
                          <p className="text-xs font-semibold text-accentBlue mt-0.5">{exp.company}</p>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-slate-400 font-semibold font-mono">
                          <FaCalendarAlt />
                          <span>{exp.duration}</span>
                        </div>
                      </div>
                      <p className="text-xs md:text-sm text-slate-500 dark:text-white leading-relaxed">
                        {exp.description}
                      </p>
                      <div className="flex flex-wrap gap-1.5 mt-5">
                        {exp.skills.map((skill) => (
                          <span key={skill} className="text-[10px] font-mono font-bold text-accentPurple bg-primary-500/10 px-2 py-0.5 rounded">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  </div>
                ) : (
                  <div className="hidden md:block md:w-[45%]" />
                )}

                {/* Timeline Center Point Icon Indicator */}
                <div className="absolute left-4 md:left-1/2 top-6 md:top-1/2 transform -translate-x-1/2 md:-translate-y-1/2 z-20">
                  <div className="w-8 h-8 rounded-full bg-slate-950 border-2 border-accentBlue flex items-center justify-center text-accentBlue shadow-glow-blue">
                    <FaBriefcase className="w-3.5 h-3.5" />
                  </div>
                </div>

                {/* Right Side */}
                {!isLeft ? (
                  <div className="w-full md:w-[45%] flex justify-start pl-12 md:pl-0 pr-0 mt-0">
                    <motion.div
                      initial={{ opacity: 0, x: 40 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                      className="w-full max-w-lg p-6 rounded-3xl glass border border-white/5 shadow-premium hover:border-accentPurple/25 hover:scale-[1.01] transition-all duration-300 relative"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/5 pb-3 mb-4">
                        <div>
                          <h3 className="text-lg font-bold font-sans text-slate-900 dark:text-white">{exp.role}</h3>
                          <p className="text-xs font-semibold text-accentPurple mt-0.5">{exp.company}</p>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-slate-400 font-semibold font-mono">
                          <FaCalendarAlt />
                          <span>{exp.duration}</span>
                        </div>
                      </div>
                      <p className="text-xs md:text-sm text-slate-500 dark:text-white leading-relaxed">
                        {exp.description}
                      </p>
                      <div className="flex flex-wrap gap-1.5 mt-5">
                        {exp.skills.map((skill) => (
                          <span key={skill} className="text-[10px] font-mono font-bold text-accentBlue bg-primary-500/10 px-2 py-0.5 rounded">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  </div>
                ) : (
                  <div className="hidden md:block md:w-[45%]" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
