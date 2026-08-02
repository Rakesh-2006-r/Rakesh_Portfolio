import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import Lenis from 'lenis';

// Layout Widgets
import LoadingScreen from './components/LoadingScreen';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import BackgroundBlobs from './components/BackgroundBlobs';
import FloatingParticles from './components/FloatingParticles';

// Sections
import Hero from './sections/Hero';
import About from './sections/About';
import Skills from './sections/Skills';
import Projects from './sections/Projects';
import Experience from './sections/Experience';
import Education from './sections/Education';
import Achievements from './sections/Achievements';
import Certifications from './sections/Certifications';
import Contact from './sections/Contact';
import Footer from './sections/Footer';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState(() => {
    // Default to dark theme, but check local storage
    const saved = localStorage.getItem('theme');
    if (saved) return saved;
    return 'dark';
  });

  // Initialize Lenis Smooth Scroll
  useEffect(() => {
    if (loading) return; // Wait until loader slides out to prevent scroll jank

    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Easing function
      smoothWheel: true,
      wheelMultiplier: 1,
    });

    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, [loading]);

  // Sync theme to document element class list
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const handleFinishLoading = () => {
    setLoading(false);
  };

  return (
    <>
      {/* Multilingual Preloader Screen */}
      <AnimatePresence mode="wait">
        {loading && <LoadingScreen finishLoading={handleFinishLoading} />}
      </AnimatePresence>

      {!loading && (
        <div className="relative min-h-screen transition-colors duration-300 bg-gradient-premium light:bg-gradient-premium-light overflow-x-hidden">
          {/* Custom Mouse Follower Spring Cursor */}
          <CustomCursor />

          {/* Sticky Navbar with Scroll Progress Bar */}
          <Navbar theme={theme} toggleTheme={toggleTheme} />

          {/* Animated Background Vector Blobs */}
          <BackgroundBlobs />

          {/* Subtle Stardust Floating Particles */}
          <FloatingParticles />

          {/* Scrollable Layout Content container */}
          <main className="relative z-10 w-full">
            <Hero />
            <About />
            <Skills />
            <Projects />
            <Experience />
            <Education />
            <Achievements />
            <Certifications />
            <Contact />
          </main>

          {/* Footer containing social links and scroll to top button */}
          <Footer />
        </div>
      )}
    </>
  );
}
