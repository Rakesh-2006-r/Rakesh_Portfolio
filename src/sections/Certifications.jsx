import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';
import { FaCertificate, FaExternalLinkAlt, FaAward, FaTimes } from 'react-icons/fa';

export default function Certifications() {
  const certifications = portfolioData.certifications;
  const [activeCert, setActiveCert] = useState(null);

  return (
    <section id="certifications" className="py-20 md:py-24 px-6 relative z-10 bg-transparent max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col items-center mb-16 text-center">
        <h2 className="text-3xl md:text-5xl font-black font-sans tracking-tight text-slate-900 dark:text-white mb-4">
          ACADEMIC <span className="text-gradient">CERTIFICATIONS</span>
        </h2>
        <div className="w-16 h-[4px] bg-gradient-to-r from-accentBlue to-accentPurple rounded-full" />
      </div>

      {/* Grid of Certifications */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
        {certifications.map((cert, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            onClick={() => setActiveCert(cert)}
            className="p-6 rounded-3xl glass border border-white/5 shadow-premium hover:border-accentBlue/20 hover:scale-103 transition-all duration-300 flex flex-col justify-between cursor-pointer group"
          >
            <div>
              {/* Card Header Icon */}
              <div className="p-3 rounded-2xl bg-primary-500/10 text-accentBlue group-hover:bg-accentBlue group-hover:text-white transition-all duration-300 w-fit mb-6">
                <FaCertificate className="w-5 h-5" />
              </div>
              <h3 className="text-sm md:text-base font-bold font-sans text-slate-950 dark:text-slate-100 group-hover:text-accentBlue transition-colors duration-300 line-clamp-2">
                {cert.title}
              </h3>
              <p className="text-xs text-slate-400 font-semibold mt-2.5">
                Issued by: <span className="text-slate-600 dark:text-slate-300 font-bold">{cert.issuer}</span>
              </p>
            </div>

            {/* Bottom info */}
            <div className="flex items-center justify-between mt-8 pt-4 border-t border-white/5">
              <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 font-bold">
                YEAR: {cert.date}
              </span>
              <span className="text-[10px] text-accentPurple font-semibold flex items-center gap-1 group-hover:underline">
                View <FaExternalLinkAlt className="w-2 h-2" />
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Certificate Viewer Modal Popup */}
      <AnimatePresence>
        {activeCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setActiveCert(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 30 }}
              transition={{ type: "spring", damping: 25, stiffness: 350 }}
              className="w-full max-w-2xl bg-[#08080c] border border-white/10 rounded-3xl p-6 md:p-10 relative overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Close Button */}
              <button
                onClick={() => setActiveCert(null)}
                className="absolute top-5 right-5 p-2 rounded-full bg-white/5 border border-white/10 text-slate-400 hover:text-white transition-colors"
                aria-label="Close Modal"
              >
                <FaTimes className="w-4 h-4" />
              </button>

              {/* Certificate Display */}
              {activeCert.image ? (
                <div className="relative w-full flex items-center justify-center bg-slate-900 rounded-2xl overflow-hidden p-2">
                  <img src={activeCert.image} alt={activeCert.title} className="max-w-full max-h-[65vh] object-contain rounded-xl" />
                </div>
              ) : (
                <div className="border-2 border-dashed border-accentBlue/30 rounded-2xl p-6 md:p-8 flex flex-col items-center justify-center text-center relative bg-gradient-to-br from-[#0d0d15] to-slate-950">
                  <FaAward className="w-16 h-16 text-yellow-500 mb-4 animate-pulse" />
                  <span className="text-[10px] font-mono tracking-widest text-accentBlue font-bold uppercase">
                    CERTIFICATE OF COMPLETION
                  </span>
                  
                  <h3 className="text-xl md:text-3xl font-black font-sans text-white mt-4 max-w-md">
                    {activeCert.title}
                  </h3>
                  
                  <p className="text-xs text-slate-400 mt-2 max-w-sm">
                    This document verifies that Pittala Rakesh has successfully satisfied all academic syllabus and challenge projects required for completion.
                  </p>

                  <div className="w-full border-t border-white/5 my-6" />

                  <div className="grid grid-cols-2 gap-4 w-full text-left">
                    <div>
                      <h4 className="text-[9px] font-mono text-slate-500 uppercase">ISSUING AUTHORITY</h4>
                      <p className="text-xs text-white font-bold font-sans mt-0.5">{activeCert.issuer}</p>
                    </div>
                    <div>
                      <h4 className="text-[9px] font-mono text-slate-500 uppercase">VERIFICATION ID</h4>
                      <p className="text-xs text-accentPurple font-mono font-bold mt-0.5">{activeCert.id}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Close Bottom link */}
              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={() => setActiveCert(null)}
                  className="px-5 py-2.5 rounded-xl font-semibold text-xs border border-white/10 text-slate-400 hover:text-white transition-colors"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
