import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';
import { FaGithub, FaExternalLinkAlt, FaBook, FaCheckCircle, FaLeaf, FaCar } from 'react-icons/fa';

// Custom 3D Tilt Project Card Component
function ProjectCard({ project }) {
  const cardRef = useRef(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [shineStyle, setShineStyle] = useState({ opacity: 0 });

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Relative coordinates from card center
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;
    
    // Max rotation 12deg
    const rX = -(mouseY / height) * 12;
    const rY = (mouseX / width) * 12;
    
    setRotateX(rX);
    setRotateY(rY);

    // Shine effect calculation
    const shineX = ((e.clientX - rect.left) / width) * 100;
    const shineY = ((e.clientY - rect.top) / height) * 100;
    setShineStyle({
      opacity: 0.35,
      background: `radial-gradient(circle at ${shineX}% ${shineY}%, rgba(255,255,255,0.2) 0%, transparent 60%)`
    });
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setShineStyle({ opacity: 0 });
  };

  // Custom graphic generators to act as premium mockup images
  const renderProjectGraphic = (id) => {
    switch (id) {
      case 1:
        return (
          <div className="w-full h-full bg-gradient-to-br from-indigo-950/80 to-purple-950/80 flex items-center justify-center relative overflow-hidden group-hover:scale-105 transition-transform duration-500">
            {/* Grid Overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:16px_16px]" />
            <div className="absolute w-28 h-28 rounded-full bg-accentPurple/20 blur-xl top-1/4 left-1/4" />
            <div className="relative z-10 flex flex-col items-center text-center p-4">
              <FaCheckCircle className="w-12 h-12 text-accentPurple mb-2 animate-bounce" />
              <span className="text-xs font-mono tracking-widest text-slate-400">INCENTIVE SYSTEM</span>
              <div className="mt-3 flex gap-2">
                <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded text-white font-mono">Leaderboard</span>
                <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded text-white font-mono">Real-time</span>
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="w-full h-full bg-gradient-to-br from-blue-950/80 to-teal-950/80 flex items-center justify-center relative overflow-hidden group-hover:scale-105 transition-transform duration-500">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:16px_16px]" />
            <div className="absolute w-28 h-28 rounded-full bg-accentBlue/20 blur-xl bottom-1/4 right-1/4" />
            <div className="relative z-10 flex flex-col items-center text-center p-4">
              <FaBook className="w-12 h-12 text-accentBlue mb-2 animate-pulse" />
              <span className="text-xs font-mono tracking-widest text-slate-400">E-LIBRARY MANAGEMENT</span>
              <div className="mt-3 flex gap-2">
                <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded text-white font-mono">PDF Storage</span>
                <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded text-white font-mono">Auth Gate</span>
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="w-full h-full bg-gradient-to-br from-emerald-950/80 to-slate-900 flex items-center justify-center relative overflow-hidden group-hover:scale-105 transition-transform duration-500">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:16px_16px]" />
            <div className="relative z-10 flex flex-col items-center text-center p-4">
              <FaLeaf className="w-12 h-12 text-emerald-400 mb-2" />
              <span className="text-xs font-mono tracking-widest text-slate-400">AGRICONNECT AI</span>
              <div className="mt-3 flex gap-2">
                <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded text-white font-mono">Gemini AI</span>
                <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded text-white font-mono">Mandi Engine</span>
              </div>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="w-full h-full bg-gradient-to-br from-orange-950/80 to-slate-900 flex items-center justify-center relative overflow-hidden group-hover:scale-105 transition-transform duration-500">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:16px_16px]" />
            <div className="relative z-10 flex flex-col items-center text-center p-4">
              <FaCar className="w-12 h-12 text-orange-500 mb-2" />
              <span className="text-xs font-mono tracking-widest text-slate-400">CAR RENTAL WEB APP</span>
              <div className="mt-3 flex gap-2">
                <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded text-white font-mono">Live Tracking</span>
                <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded text-white font-mono">MERN Stack</span>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ rotateX, rotateY }}
      transition={{ type: "spring", stiffness: 350, damping: 25 }}
      style={{ transformStyle: "preserve-3d" }}
      className="rounded-3xl glass border border-white/5 shadow-premium overflow-hidden group relative flex flex-col h-full hover:border-white/15 transition-all duration-300"
    >
      {/* Dynamic Shine Overlay */}
      <div className="absolute inset-0 z-20 pointer-events-none transition-opacity duration-300 rounded-3xl" style={shineStyle} />

      {/* Large Graphic/Image mockup container */}
      <div className="w-full h-48 bg-slate-900 border-b border-white/5 relative overflow-hidden">
        {renderProjectGraphic(project.id)}
      </div>

      {/* Project content */}
      <div className="p-6 md:p-8 flex flex-col flex-grow relative z-10" style={{ transform: "translateZ(30px)" }}>
        <h3 className="text-lg md:text-xl font-bold font-sans text-slate-900 dark:text-slate-100 group-hover:text-accentBlue transition-colors duration-300">
          {project.title}
        </h3>
        
        <p className="text-xs md:text-sm text-slate-700 dark:text-white mt-3 leading-relaxed flex-grow">
          {project.description}
        </p>

        {/* Feature Bullet tags */}
        <div className="flex flex-wrap gap-1.5 mt-4">
          {project.highlights.slice(0, 3).map((hl, i) => (
            <span key={i} className="text-[10px] font-semibold text-slate-600 dark:text-slate-300 bg-slate-200 dark:bg-slate-900 px-2 py-0.5 rounded-full select-none">
              {hl}
            </span>
          ))}
        </div>

        {/* Technology Badges */}
        <div className="flex flex-wrap gap-1.5 mt-4 pt-4 border-t border-white/5">
          {project.tags.map((tag) => (
            <span key={tag} className="text-[10px] font-mono font-bold tracking-wide text-accentBlue dark:text-accentPurple bg-primary-500/10 px-2.5 py-0.5 rounded-md">
              {tag}
            </span>
          ))}
        </div>

        {/* Buttons */}
        <div className="flex gap-4 mt-6">
          <a
            href={project.github}
            target="_blank"
            rel="noreferrer"
            className="flex-1 flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-semibold glass border border-white/10 hover:border-accentBlue text-slate-800 dark:text-white transition-all hover:scale-102 active:scale-98"
          >
            <FaGithub /> GitHub
          </a>
          <a
            href={project.demo}
            target="_blank"
            rel="noreferrer"
            className="flex-1 flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-semibold bg-gradient-to-r from-accentBlue to-accentPurple text-white hover:scale-102 active:scale-98 transition-all"
          >
            <FaExternalLinkAlt className="w-3 h-3" /> Live Demo
          </a>
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const allProjects = portfolioData.projects;
  const [filter, setFilter] = useState("All");

  // Filtering criteria tags
  const filterTabs = ["All", "MERN Stack", "React", "Gemini AI", "Socket.io"];

  const filteredProjects = allProjects.filter((proj) => {
    if (filter === "All") return true;
    if (filter === "MERN Stack") return proj.tags.includes("MongoDB") && proj.tags.includes("Express");
    if (filter === "React") return proj.tags.includes("React");
    if (filter === "Gemini AI") return proj.tags.includes("Gemini AI");
    if (filter === "Socket.io") return proj.tags.includes("Socket.io");
    return true;
  });

  return (
    <section id="projects" className="py-20 md:py-32 px-6 relative z-10 bg-transparent max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col items-center mb-16 text-center">
        <h2 className="text-3xl md:text-5xl font-black font-sans tracking-tight text-slate-900 dark:text-white mb-4">
          FEATURED <span className="text-gradient">PROJECTS</span>
        </h2>
        <div className="w-16 h-[4px] bg-gradient-to-r from-accentBlue to-accentPurple rounded-full" />
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap justify-center gap-3 mb-12">
        {filterTabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`px-5 py-2.5 rounded-full text-xs font-semibold font-sans tracking-wide transition-all border ${
              filter === tab
                ? 'bg-gradient-to-r from-accentBlue to-accentPurple text-white border-transparent shadow-glow-blue scale-105'
                : 'glass border-white/10 text-slate-600 dark:text-slate-300 hover:border-accentBlue'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <motion.div 
        layout
        className="grid grid-cols-1 md:grid-cols-2 gap-8"
      >
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((proj) => (
            <motion.div
              layout
              key={proj.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5 }}
            >
              <ProjectCard project={proj} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
