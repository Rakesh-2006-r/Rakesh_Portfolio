import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';
import { FaChevronDown } from 'react-icons/fa';

export default function Hero() {
  const { name, titles, socials, shortBio } = portfolioData.personalInfo;
  
  // Typewriter states
  const [currentTitleIndex, setCurrentTitleIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(100);

  useEffect(() => {
    let timer;
    const fullTitle = titles[currentTitleIndex];

    if (!isDeleting) {
      // Typing state
      timer = setTimeout(() => {
        setCurrentText(fullTitle.substring(0, currentText.length + 1));
        setTypingSpeed(75); // Fast typing
      }, typingSpeed);

      if (currentText === fullTitle) {
        // Pause before deleting
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, 1800);
      }
    } else {
      // Deleting state
      timer = setTimeout(() => {
        setCurrentText(fullTitle.substring(0, currentText.length - 1));
        setTypingSpeed(40); // Fast deleting
      }, typingSpeed);

      if (currentText === "") {
        setIsDeleting(false);
        setCurrentTitleIndex((prev) => (prev + 1) % titles.length);
      }
    }

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentTitleIndex, titles, typingSpeed]);

  const handleScrollDown = (e) => {
    e.preventDefault();
    const aboutSection = document.querySelector('#about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="home" 
      className="min-h-screen flex flex-col justify-center items-center relative px-6 z-10 pt-16 overflow-hidden bg-transparent"
    >
      <div className="max-w-4xl text-center flex flex-col items-center">
        {/* Intro Tag */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="px-4 py-1.5 rounded-full glass border border-white/10 dark:border-white/5 text-xs md:text-sm font-semibold text-accentBlue mb-6 select-none inline-flex items-center gap-2"
        >
          <span className="w-2 h-2 rounded-full bg-accentBlue animate-pulse" />
          Welcome to my portfolio
        </motion.div>

        {/* Large Main Name */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-5xl md:text-8xl font-black font-sans tracking-tight leading-none text-slate-900 dark:text-white"
        >
          I'm <span className="text-gradient">{name}</span>
        </motion.h1>

        {/* Typing Title */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="h-12 md:h-16 mt-4 flex items-center justify-center"
        >
          <h2 className="text-xl md:text-3xl font-mono text-slate-600 dark:text-slate-300 font-semibold">
            <span>{currentText}</span>
            <span className="text-accentBlue animate-[ping_0.8s_infinite] ml-0.5">|</span>
          </h2>
        </motion.div>

        {/* Short Bio */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="max-w-xl text-sm md:text-lg text-slate-600 dark:text-slate-400 mt-2 leading-relaxed"
        >
          {shortBio}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 mt-8 w-full sm:w-auto"
        >
          <a
            href="#projects"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-8 py-3.5 rounded-full font-semibold bg-gradient-to-r from-accentBlue to-accentPurple text-white shadow-glow-blue hover:scale-105 active:scale-95 transition-all text-center"
          >
            View Projects
          </a>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-8 py-3.5 rounded-full font-semibold glass border border-white/20 text-slate-800 dark:text-white hover:border-accentBlue hover:scale-105 active:scale-95 transition-all text-center"
          >
            Let's Talk
          </a>
        </motion.div>

        {/* Social Icons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="flex justify-center space-x-4 mt-12"
        >
          {socials.map((social) => {
            const Icon = social.icon;
            return (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noreferrer"
                className={`p-3 rounded-full border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 transition-all duration-350 ${social.color} hover:scale-110 shadow-sm`}
                title={social.name}
              >
                <Icon className="w-5 h-5" />
              </a>
            );
          })}
        </motion.div>
      </div>

      {/* Floating Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, delay: 1 }}
        className="absolute bottom-8 flex flex-col items-center cursor-pointer select-none"
        onClick={handleScrollDown}
      >
        <span className="text-xs tracking-widest text-slate-500 uppercase font-semibold mb-2">Scroll Down</span>
        <FaChevronDown className="w-4 h-4 text-slate-500 animate-bounce" />
      </motion.div>
    </section>
  );
}
