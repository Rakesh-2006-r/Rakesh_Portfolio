import React from 'react';
import { motion } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';
import { FaChevronUp, FaHeart } from 'react-icons/fa';

export default function Footer() {
  const { name, socials } = portfolioData.personalInfo;

  const handleBackToTop = (e) => {
    e.preventDefault();
    document.querySelector('#home')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="py-12 px-6 border-t border-white/5 bg-transparent relative z-10 text-center max-w-7xl mx-auto flex flex-col items-center">
      {/* Back To Top Button */}
      <motion.button
        onClick={handleBackToTop}
        whileHover={{ scale: 1.1, y: -4 }}
        whileTap={{ scale: 0.95 }}
        className="p-4 rounded-full glass border border-white/10 text-accentBlue hover:border-accentBlue/40 shadow-glow-blue cursor-pointer mb-8 animate-bounce-slow"
        aria-label="Back to Top"
      >
        <FaChevronUp className="w-4 h-4" />
      </motion.button>

      {/* Social Links */}
      <div className="flex gap-4 mb-6">
        {socials.map((social) => {
          const Icon = social.icon;
          return (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noreferrer"
              className={`p-3 rounded-full border border-slate-200 dark:border-slate-800 text-white dark:text-white transition-all duration-300 ${social.color} hover:scale-105 shadow-sm`}
              title={social.name}
            >
              <Icon className="w-4 h-4" />
            </a>
          );
        })}
      </div>

      {/* Copyright */}
      <p className="text-xs text-white dark:text-white font-semibold tracking-wider font-sans select-none flex items-center justify-center gap-1.5">
        &copy; {new Date().getFullYear()} {name.toUpperCase()}. Built with 
        <FaHeart className="w-3 h-3 text-red-500 animate-pulse" /> 
        using React & Tailwind.
      </p>
    </footer>
  );
}
