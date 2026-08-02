import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { FaEnvelope, FaPaperPlane, FaUser, FaClipboardList, FaSpinner, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';
import { portfolioData } from '../data/portfolioData';

export default function Contact() {
  const formRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState(null); // { type: 'success'|'error', message: '' }

  const showToast = (type, message) => {
    setToast({ type, message });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  const validate = () => {
    const tempErrors = {};
    if (!formData.name.trim()) tempErrors.name = "Name is required";
    if (!formData.email.trim()) {
      tempErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = "Please enter a valid email address";
    }
    if (!formData.subject.trim()) tempErrors.subject = "Subject is required";
    if (!formData.message.trim()) tempErrors.message = "Message content is required";
    
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for that specific input field on change
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);

    try {
      const response = await fetch(`https://formsubmit.co/ajax/${portfolioData.personalInfo.email}`, {
        method: "POST",
        headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            subject: formData.subject,
            message: formData.message,
            _subject: `New Portfolio Message: ${formData.subject}`
        })
      });

      if (response.ok) {
        setLoading(false);
        showToast("success", "Your message was sent successfully! I will reply shortly.");
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        throw new Error("Failed to send");
      }
    } catch (error) {
      setLoading(false);
      console.error("FormSubmit error: ", error);
      showToast("error", "Failed to dispatch message. Please try emailing me directly.");
    }
  };

  return (
    <section id="contact" className="py-20 md:py-32 px-6 relative z-10 bg-transparent max-w-5xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col items-center mb-16 text-center">
        <h2 className="text-3xl md:text-5xl font-black font-sans tracking-tight text-slate-900 dark:text-white mb-4">
          GET IN <span className="text-gradient">TOUCH</span>
        </h2>
        <div className="w-16 h-[4px] bg-gradient-to-r from-accentBlue to-accentPurple rounded-full" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">
        {/* Info Column */}
        <div className="md:col-span-4 flex flex-col justify-between p-6 md:p-8 rounded-3xl glass border border-white/5 shadow-premium text-slate-750 dark:text-slate-350">
          <div>
            <h3 className="text-lg md:text-xl font-bold font-sans text-slate-900 dark:text-white mb-4">
              Let's build something epic
            </h3>
            <p className="text-xs md:text-sm text-slate-500 dark:text-white leading-relaxed mb-8">
              I am open to software development intern opportunities, full stack project contracts, or data analysis collaborations. Drop me a line!
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex items-center space-x-3.5">
              <div className="p-3 rounded-2xl bg-primary-500/10 text-accentBlue">
                <FaEnvelope className="w-4 h-4" />
              </div>
              <div className="flex flex-col space-y-1">
                <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">EMAIL ADDRESSES</h4>
                <a href={`mailto:${portfolioData.personalInfo.email}`} className="text-xs md:text-sm font-semibold text-slate-900 dark:text-slate-200 hover:text-accentBlue transition-colors break-all">
                  {portfolioData.personalInfo.email}
                </a>
                <a href={`mailto:${portfolioData.personalInfo.emailSecondary}`} className="text-xs md:text-sm font-semibold text-slate-900 dark:text-slate-200 hover:text-accentBlue transition-colors break-all">
                  {portfolioData.personalInfo.emailSecondary}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form Column */}
        <div className="md:col-span-8">
          <form 
            ref={formRef} 
            onSubmit={handleSubmit}
            className="p-6 md:p-8 rounded-3xl glass border border-white/5 shadow-premium flex flex-col space-y-5"
          >
            {/* Name Input */}
            <div className="flex flex-col space-y-1.5">
              <label htmlFor="name" className="text-xs font-semibold text-slate-650 dark:text-slate-300 flex items-center gap-1.5">
                <FaUser className="text-slate-450 dark:text-slate-500 w-3 h-3" /> Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className={`px-4 py-3 rounded-xl bg-slate-100/50 dark:bg-slate-900/50 border outline-none text-sm transition-all focus:border-accentBlue text-slate-900 dark:text-white ${
                  errors.name ? 'border-red-500' : 'border-white/10 dark:border-white/5'
                }`}
                placeholder="John Doe"
              />
              {errors.name && <span className="text-[11px] text-red-500 font-semibold">{errors.name}</span>}
            </div>

            {/* Email Input */}
            <div className="flex flex-col space-y-1.5">
              <label htmlFor="email" className="text-xs font-semibold text-slate-650 dark:text-slate-300 flex items-center gap-1.5">
                <FaEnvelope className="text-slate-450 dark:text-slate-500 w-3 h-3" /> Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`px-4 py-3 rounded-xl bg-slate-100/50 dark:bg-slate-900/50 border outline-none text-sm transition-all focus:border-accentBlue text-slate-900 dark:text-white ${
                  errors.email ? 'border-red-500' : 'border-white/10 dark:border-white/5'
                }`}
                placeholder="john@example.com"
              />
              {errors.email && <span className="text-[11px] text-red-500 font-semibold">{errors.email}</span>}
            </div>

            {/* Subject Input */}
            <div className="flex flex-col space-y-1.5">
              <label htmlFor="subject" className="text-xs font-semibold text-slate-655 dark:text-slate-300 flex items-center gap-1.5">
                <FaClipboardList className="text-slate-450 dark:text-slate-500 w-3 h-3" /> Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                className={`px-4 py-3 rounded-xl bg-slate-100/50 dark:bg-slate-900/50 border outline-none text-sm transition-all focus:border-accentBlue text-slate-900 dark:text-white ${
                  errors.subject ? 'border-red-500' : 'border-white/10 dark:border-white/5'
                }`}
                placeholder="Project Collaboration"
              />
              {errors.subject && <span className="text-[11px] text-red-500 font-semibold">{errors.subject}</span>}
            </div>

            {/* Message Input */}
            <div className="flex flex-col space-y-1.5">
              <label htmlFor="message" className="text-xs font-semibold text-slate-655 dark:text-slate-300">Message</label>
              <textarea
                id="message"
                name="message"
                rows="4"
                value={formData.message}
                onChange={handleInputChange}
                className={`px-4 py-3 rounded-xl bg-slate-100/50 dark:bg-slate-900/50 border outline-none text-sm transition-all focus:border-accentBlue text-slate-900 dark:text-white resize-none ${
                  errors.message ? 'border-red-500' : 'border-white/10 dark:border-white/5'
                }`}
                placeholder="Hi Rakesh, I would love to connect..."
              />
              {errors.message && <span className="text-[11px] text-red-500 font-semibold">{errors.message}</span>}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 mt-2 rounded-xl bg-gradient-to-r from-accentBlue to-accentPurple text-white font-semibold text-sm flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99] transition-all disabled:opacity-55 disabled:pointer-events-none shadow-glow-blue cursor-pointer"
            >
              {loading ? (
                <>
                  <FaSpinner className="animate-spin w-4 h-4" /> Sending Message...
                </>
              ) : (
                <>
                  <FaPaperPlane className="w-3.5 h-3.5" /> Send Message
                </>
              )}
            </button>
          </form>
        </div>
      </div>

      {/* Toast Notification Container */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-2xl glass border border-white/10 shadow-2xl max-w-sm"
          >
            {toast.type === "success" ? (
              <FaCheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
            ) : (
              <FaExclamationCircle className="w-5 h-5 text-red-500 shrink-0" />
            )}
            <p className="text-xs font-semibold text-slate-950 dark:text-slate-200">
              {toast.message}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
