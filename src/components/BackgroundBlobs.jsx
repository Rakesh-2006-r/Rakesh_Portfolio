import React from 'react';
import { motion } from 'framer-motion';

export default function BackgroundBlobs() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      {/* Glow Blob 1: Accent Blue */}
      <motion.div
        animate={{
          x: [0, 80, -40, 0],
          y: [0, -100, 50, 0],
          scale: [1, 1.2, 0.9, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-[10%] left-[5%] w-[30vw] h-[30vw] min-w-[250px] min-h-[250px] rounded-full bg-gradient-to-tr from-accentBlue/20 to-primary-500/10 blur-[80px] md:blur-[120px]"
      />

      {/* Glow Blob 2: Accent Purple */}
      <motion.div
        animate={{
          x: [0, -60, 80, 0],
          y: [0, 80, -60, 0],
          scale: [1, 0.85, 1.15, 1],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-[40%] right-[5%] w-[35vw] h-[35vw] min-w-[300px] min-h-[300px] rounded-full bg-gradient-to-br from-accentPurple/15 to-pink-500/10 blur-[90px] md:blur-[140px]"
      />

      {/* Glow Blob 3: Accent Indigo */}
      <motion.div
        animate={{
          x: [0, 40, -50, 0],
          y: [0, 50, -100, 0],
          scale: [1, 1.1, 0.95, 1],
        }}
        transition={{
          duration: 28,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute bottom-[10%] left-[20%] w-[25vw] h-[25vw] min-w-[200px] min-h-[200px] rounded-full bg-gradient-to-bl from-indigo-500/10 to-accentBlue/10 blur-[70px] md:blur-[100px]"
      />
    </div>
  );
}
