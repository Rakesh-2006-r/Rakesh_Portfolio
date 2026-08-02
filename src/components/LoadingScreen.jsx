import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const words = [
  "Hello",      // English
  "Swagatham",  // Telugu
  "Namaste",    // Hindi
  "Konnichiwa", // Japanese
  "Bonjour",    // French
  "Hola",       // Spanish
  "Ciao"        // Italian
];

export default function LoadingScreen({ finishLoading }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index === words.length - 1) {
      const timer = setTimeout(() => {
        finishLoading();
      }, 500);
      return () => clearTimeout(timer);
    }
    
    const interval = setTimeout(() => {
      setIndex(prev => prev + 1);
    }, index === 0 ? 400 : 220);
    
    return () => clearTimeout(interval);
  }, [index, finishLoading]);

  return (
    <motion.div
      className="fixed inset-0 bg-darkBg z-[99999] flex flex-col items-center justify-center text-white"
      initial={{ opacity: 1 }}
      exit={{ 
        y: '-100vh',
        transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } 
      }}
    >
      <div className="flex flex-col items-center">
        {/* Loading Progress Indicator */}
        <div className="w-48 h-[2px] bg-slate-800 mb-8 rounded-full overflow-hidden relative">
          <motion.div
            className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-accentBlue to-accentPurple"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 1.6, ease: "easeInOut" }}
          />
        </div>
        
        {/* Animated Word Cycle */}
        <div className="h-16 overflow-hidden flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.h1
              key={words[index]}
              className="text-4xl md:text-5xl font-bold font-sans flex items-center gap-3"
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -40, opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              <span className="inline-block w-3 h-3 rounded-full bg-accentBlue animate-ping mr-1" />
              {words[index]}
            </motion.h1>
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
