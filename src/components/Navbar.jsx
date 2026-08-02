import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSun, FaMoon, FaBars, FaTimes } from 'react-icons/fa';

const navLinks = [
  { name: "Home", target: "#home" },
  { name: "About", target: "#about" },
  { name: "Skills", target: "#skills" },
  { name: "Projects", target: "#projects" },
  { name: "Timeline", target: "#timeline" },
  { name: "Certifications", target: "#certifications" },
  { name: "Contact", target: "#contact" }
];

export default function Navbar({ theme, toggleTheme }) {
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("Home");

  useEffect(() => {
    const handleScroll = () => {
      // Scrolled background change
      setScrolled(window.scrollY > 20);

      // Scroll Progress calculation
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100);
      }

      // Detect active section
      const scrollPosition = window.scrollY + 100; // Offset for navbar height
      for (const link of navLinks) {
        const el = document.querySelector(link.target);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(link.name);
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (e, target, name) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    setActiveSection(name);
    const targetElement = document.querySelector(target);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
      scrolled 
        ? 'py-4 glass border-b border-white/10 dark:border-white/5 shadow-md' 
        : 'py-6 bg-transparent'
    }`}>
      {/* Scroll Progress Bar */}
      <div className="absolute bottom-0 left-0 h-[3px] bg-gradient-to-r from-accentBlue to-accentPurple transition-all duration-75" style={{ width: `${scrollProgress}%` }} />

      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a 
          href="#home" 
          onClick={(e) => handleLinkClick(e, '#home', 'Home')}
          className="text-2xl font-black font-sans tracking-wider text-gradient select-none"
        >
          RAKESH.DEV
        </a>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center space-x-6">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.target}
              onClick={(e) => handleLinkClick(e, link.target, link.name)}
              className={`relative font-sans text-sm font-medium tracking-wide transition-colors duration-300 px-3 py-1 hover:text-accentBlue ${
                activeSection === link.name 
                  ? 'text-accentBlue' 
                  : 'text-slate-600 dark:text-slate-300'
              }`}
            >
              {link.name}
              {activeSection === link.name && (
                <motion.span
                  layoutId="activeIndicator"
                  className="absolute bottom-[-4px] left-0 w-full h-[2px] bg-accentBlue rounded-full"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </a>
          ))}

          {/* Theme Switcher Button */}
          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-full glass border border-white/20 hover:border-accentBlue text-slate-800 dark:text-slate-100 transition-colors duration-300"
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? <FaSun className="w-4.5 h-4.5 text-yellow-400" /> : <FaMoon className="w-4.5 h-4.5 text-indigo-600" />}
          </button>
        </div>

        {/* Mobile Toggle Buttons */}
        <div className="lg:hidden flex items-center space-x-4">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full glass border border-white/20 text-slate-800 dark:text-slate-100 transition-colors"
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? <FaSun className="w-4 h-4 text-yellow-400" /> : <FaMoon className="w-4 h-4 text-indigo-600" />}
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-full glass border border-white/20 text-slate-800 dark:text-slate-100"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <FaTimes className="w-5 h-5" /> : <FaBars className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden glass border-b border-white/10 dark:border-white/5 overflow-hidden"
          >
            <div className="flex flex-col space-y-4 px-6 py-6 max-h-[70vh] overflow-y-auto">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.target}
                  onClick={(e) => handleLinkClick(e, link.target, link.name)}
                  className={`text-base font-semibold tracking-wide font-sans py-2 border-b border-white/5 hover:text-accentBlue ${
                    activeSection === link.name ? 'text-accentBlue' : 'text-slate-600 dark:text-slate-300'
                  }`}
                >
                  {link.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
