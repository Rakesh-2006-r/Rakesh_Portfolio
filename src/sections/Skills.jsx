import React from 'react';
import { motion } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';

export default function Skills() {
  const skillCategories = portfolioData.skills;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <section id="skills" className="py-20 md:py-32 px-6 relative z-10 bg-transparent max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col items-center mb-16 text-center">
        <h2 className="text-3xl md:text-5xl font-black font-sans tracking-tight text-slate-900 dark:text-white mb-4">
          TECHNICAL <span className="text-gradient">SKILLS</span>
        </h2>
        <div className="w-16 h-[4px] bg-gradient-to-r from-accentBlue to-accentPurple rounded-full" />
      </div>

      {/* Grid of Skill Categories */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {skillCategories.map((category) => (
          <motion.div
            key={category.category}
            variants={cardVariants}
            className="p-6 md:p-8 rounded-3xl glass border border-white/5 shadow-premium hover:border-accentBlue/20 hover:shadow-glow-blue hover:scale-[1.02] transition-all duration-500 flex flex-col h-full group"
          >
            {/* Category Header */}
            <h3 className="text-lg md:text-xl font-bold font-sans tracking-wide mb-6 text-slate-800 dark:text-slate-200 border-b border-white/10 dark:border-white/5 pb-3">
              {category.category}
            </h3>

            {/* List of Skills inside Category */}
            <div className="space-y-5 flex-grow">
              {category.items.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.name} className="flex flex-col space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 text-slate-700 dark:text-slate-300">
                        <Icon className="w-4 h-4 text-accentBlue group-hover:text-accentPurple transition-colors duration-300" />
                        <span className="text-sm font-semibold tracking-wide">{item.name}</span>
                      </div>
                      <span className="text-xs font-mono font-bold text-white dark:text-white">{item.level}%</span>
                    </div>
                    {/* Animated Progress Bar */}
                    <div className="w-full h-2 bg-slate-200 dark:bg-slate-900 rounded-full overflow-hidden relative border border-black/5 dark:border-white/5">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${item.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                        className="h-full bg-gradient-to-r from-accentBlue to-accentPurple rounded-full"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
