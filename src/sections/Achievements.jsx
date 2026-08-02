import React from 'react';
import { motion } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';
import { FaTrophy, FaMedal, FaCode, FaAward, FaUserCheck } from 'react-icons/fa';

export default function Achievements() {
  const achievements = portfolioData.achievements;

  // Icon mapping
  const getIcon = (index) => {
    switch (index) {
      case 0: return <FaCode className="w-6 h-6 text-yellow-500" />;
      case 1: return <FaTrophy className="w-6 h-6 text-accentBlue" />;
      case 2: return <FaMedal className="w-6 h-6 text-accentPurple" />;
      case 3: return <FaUserCheck className="w-6 h-6 text-emerald-400" />;
      case 4: return <FaAward className="w-6 h-6 text-pink-400" />;
      default: return <FaAward className="w-6 h-6" />;
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <section id="achievements" className="py-20 md:py-24 px-6 relative z-10 bg-transparent max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col items-center mb-16 text-center">
        <h2 className="text-3xl md:text-5xl font-black font-sans tracking-tight text-slate-900 dark:text-white mb-4">
          KEY <span className="text-gradient">ACHIEVEMENTS</span>
        </h2>
        <div className="w-16 h-[4px] bg-gradient-to-r from-accentBlue to-accentPurple rounded-full" />
      </div>

      {/* Achievements Cards Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12"
      >
        {achievements.map((ach, index) => (
          <motion.div
            key={index}
            variants={cardVariants}
            className="p-6 rounded-3xl glass border border-white/5 shadow-premium hover:border-accentBlue/20 hover:shadow-glow-blue hover:scale-102 transition-all duration-300 flex flex-col items-start gap-4 relative overflow-hidden group"
          >
            {/* Ambient hover light grid background */}
            <div className="absolute inset-0 bg-gradient-to-tr from-primary-500/0 via-primary-500/0 to-primary-500/5 group-hover:from-accentBlue/5 group-hover:to-accentPurple/5 transition-all duration-500" />
            
            {/* Achievement Icon */}
            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 group-hover:bg-primary-500/10 group-hover:border-accentBlue/20 transition-all duration-300">
              {getIcon(index)}
            </div>

            <div>
              <span className="text-[10px] font-mono font-bold tracking-widest text-slate-400 uppercase">
                {ach.platform}
              </span>
              <h3 className="text-base md:text-lg font-bold font-sans text-slate-900 dark:text-white mt-1 group-hover:text-accentBlue transition-colors duration-300">
                {ach.title}
              </h3>
              <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-2.5 leading-relaxed">
                {ach.description}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
