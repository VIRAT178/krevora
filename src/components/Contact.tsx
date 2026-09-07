import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight, CheckCircle2, Sparkles, Send, X, Globe, Mail, ShieldCheck } from 'lucide-react';
import { ContactFormData } from '../types';

interface ContactProps {
  isModalOpen?: boolean;
  onCloseModal?: () => void;
  onOpenModal?: () => void;
  preselectedDivision?: string | null;
}

export const Contact: React.FC<ContactProps> = ({
  isModalOpen = false,
  onCloseModal,
  onOpenModal,
  preselectedDivision = null,
}) => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    company: '',
    division: (preselectedDivision as any) || 'both',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 800);
  };

  const handleReset = () => {
    setSubmitted(false);
    setFormData({
      name: '',
      email: '',
      company: '',
      division: 'both',
      message: '',
    });
    if (onCloseModal) onCloseModal();
  };

  return (
    <section
      id="contact"
      className="relative py-28 sm:py-36 lg:py-44 border-t border-white/[0.06] bg-[#030712] overflow-hidden"
    >
      {/* Dramatic atmospheric blue/violet glow */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] sm:w-[1100px] h-[450px] sm:h-[600px] -z-10 pointer-events-none blur-[170px] opacity-25"
        style={{
          background: 'radial-gradient(circle, rgba(56, 189, 248, 0.22) 0%, rgba(99, 102, 241, 0.18) 45%, rgba(168, 85, 247, 0.08) 75%, transparent 90%)',
        }}
      />
      <div className="absolute inset-0 tech-grid-pattern opacity-30 pointer-events-none" />

      <div className="max-w-[1700px] mx-auto px-6 sm:px-8 md:px-12 relative z-10">
        
        {/* Main Section CTA Card */}
        <div className="relative rounded-3xl p-8 sm:p-14 lg:p-20 bg-[#050a14]/90 border border-white/[0.08] backdrop-blur-xl overflow-hidden shadow-[0_20px_80px_rgba(0,0,0,0.7)]">
          
          {/* Subtle perimeter light accents */}
          <div className="absolute top-0 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7">
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 mb-6"
              >
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_#22d3ee]" />
                <span className="text-[11px] font-mono tracking-[0.26em] uppercase text-cyan-400 font-semibold">
                  INITIATE ENGAGEMENT
                </span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-[-0.035em] leading-[1.05] text-white"
              >
                <span>Ready to build</span>
                <span className="block bg-gradient-to-r from-cyan-300 via-blue-400 to-violet-400 bg-clip-text text-transparent pb-1">
                  what moves forward?
                </span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="mt-6 text-base sm:text-lg lg:text-xl text-zinc-400 font-normal leading-relaxed max-w-xl"
              >
                Let&apos;s turn your next idea into something designed to move. We partner with ambitious leadership teams ready to establish definitive market leverage.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="mt-10 flex flex-wrap items-center gap-4 sm:gap-6"
              >
                <button
                  onClick={onOpenModal}
                  className="relative inline-flex items-center gap-3 px-8 py-4 rounded-full text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase text-slate-950 bg-white hover:bg-cyan-300 transition-all duration-300 hover:shadow-[0_0_35px_-5px_rgba(6,182,212,0.6)] group"
                >
                  <span>START A CONVERSATION</span>
                  <ArrowUpRight className="w-4 h-4 text-slate-950 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>

                <div className="flex items-center gap-2 text-xs font-mono text-zinc-500 tracking-wider">
                  <ShieldCheck className="w-4 h-4 text-cyan-400/80" />
                  <span>DIRECT EXECUTIVE CONSULTATION</span>
                </div>
              </motion.div>
            </div>

            {/* Right Meta details */}
            <div className="lg:col-span-5 border-t lg:border-t-0 lg:border-l border-white/[0.08] pt-8 lg:pt-0 lg:pl-12 space-y-6 text-xs font-mono">
              <div className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                <div className="text-zinc-500 tracking-[0.2em] uppercase mb-1">
                  DIRECT TRANSMISSION
                </div>
                <div className="text-sm font-semibold text-white tracking-wider flex items-center gap-2">
                  <Mail className="w-4 h-4 text-cyan-400" />
                  <span>partners@krevora.com</span>
                </div>
              </div>

              <div className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                <div className="text-zinc-500 tracking-[0.2em] uppercase mb-1">
                  DEPLOYMENT TIMEZONES
                </div>
                <div className="text-sm font-semibold text-white tracking-wider flex items-center gap-2">
                  <Globe className="w-4 h-4 text-blue-400" />
                  <span>GLOBAL / NYC · LDN · SGP</span>
                </div>
              </div>

              <div className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                <div className="text-zinc-500 tracking-[0.2em] uppercase mb-1">
                  TAGLINE DIRECTIVE
                </div>
                <div className="text-xs font-semibold bg-gradient-to-r from-cyan-400 via-blue-400 to-violet-400 bg-clip-text text-transparent tracking-[0.25em]">
                  CREATE. EVOLVE. GROW.
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* CONVERSATION MODAL / DRAWER */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-3 sm:p-6 md:p-10">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onCloseModal}
              className="absolute inset-0 bg-[#030712]/92 backdrop-blur-xl"
            />

            {/* Modal Dialog */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-xl bg-[#07101f] border border-cyan-500/30 rounded-xl sm:rounded-2xl p-5 pt-14 sm:p-10 shadow-[0_20px_80px_rgba(0,0,0,0.9)] z-10 max-h-[calc(100dvh-1.5rem)] sm:max-h-[90vh] overflow-y-auto"
            >
              {/* Close Button */}
              <button
                onClick={onCloseModal}
                className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 rounded-full bg-white/[0.05] hover:bg-white/[0.1] text-zinc-400 hover:text-white border border-white/10 transition-colors"
                aria-label="Close conversation dialog"
              >
                <X className="w-5 h-5" />
              </button>

              {submitted ? (
                <div className="py-10 text-center flex flex-col items-center">
                  <div className="w-14 h-14 rounded-full bg-cyan-500/10 border border-cyan-400/50 flex items-center justify-center mb-5 text-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.4)]">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <h3 className="text-2xl font-bold text-white tracking-tight">
                    TRANSMISSION RECEIVED
                  </h3>
                  <p className="mt-3 text-sm text-zinc-400 max-w-md leading-relaxed">
                    Thank you, <span className="text-white font-medium">{formData.name}</span>. An executive partner from Krevora will review your objectives and initiate contact within 12 business hours.
                  </p>
                  <button
                    onClick={handleReset}
                    className="mt-8 px-6 py-2.5 rounded-full text-xs font-mono tracking-[0.2em] uppercase text-zinc-300 bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 transition-colors"
                  >
                    RETURN TO SITE
                  </button>
                </div>
              ) : (
                <>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                    <span className="text-[11px] font-mono tracking-[0.25em] text-cyan-400 uppercase font-semibold">
                      DIRECT ENGAGEMENT
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                    Start a conversation.
                  </h3>

                  <p className="mt-2 text-xs sm:text-sm text-zinc-400 leading-relaxed">
                    Specify your organizational requirements to coordinate a confidential technical and growth assessment.
                  </p>

                  <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                    {/* Division selector */}
                    <div>
                      <label className="block text-[11px] font-mono tracking-[0.18em] uppercase text-zinc-400 mb-2">
                        DISCIPLINE OF FOCUS
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                        {[
                          { id: 'digitals', label: 'DIGITALS' },
                          { id: 'technologies', label: 'TECHNOLOGIES' },
                          { id: 'both', label: 'BOTH SYSTEMS' },
                        ].map((d) => (
                          <button
                            type="button"
                            key={d.id}
                            onClick={() => setFormData({ ...formData, division: d.id as any })}
                            className={`py-2.5 px-3 rounded-lg text-xs font-mono tracking-wider uppercase border transition-all ${
                              formData.division === d.id
                                ? 'bg-cyan-950/60 border-cyan-400 text-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.3)]'
                                : 'bg-white/[0.02] border-white/[0.08] text-zinc-400 hover:text-white'
                            }`}
                          >
                            {d.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Name & Email */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] font-mono tracking-[0.18em] uppercase text-zinc-400 mb-1.5">
                          FULL NAME *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="Elena Vance"
                          className="w-full px-4 py-3 rounded-lg bg-black/40 border border-white/10 focus:border-cyan-400 focus:outline-none text-sm text-white placeholder:text-zinc-600 font-sans"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-mono tracking-[0.18em] uppercase text-zinc-400 mb-1.5">
                          WORK EMAIL *
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="elena@enterprise.com"
                          className="w-full px-4 py-3 rounded-lg bg-black/40 border border-white/10 focus:border-cyan-400 focus:outline-none text-sm text-white placeholder:text-zinc-600 font-sans"
                        />
                      </div>
                    </div>

                    {/* Company */}
                    <div>
                      <label className="block text-[11px] font-mono tracking-[0.18em] uppercase text-zinc-400 mb-1.5">
                        ORGANIZATION / ENTERPRISE
                      </label>
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        placeholder="Organization Name"
                        className="w-full px-4 py-3 rounded-lg bg-black/40 border border-white/10 focus:border-cyan-400 focus:outline-none text-sm text-white placeholder:text-zinc-600 font-sans"
                      />
                    </div>

                    {/* Message / Brief */}
                    <div>
                      <label className="block text-[11px] font-mono tracking-[0.18em] uppercase text-zinc-400 mb-1.5">
                        OBJECTIVES OR ARCHITECTURAL SCOPE
                      </label>
                      <textarea
                        rows={3}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Brief overview of what you are aiming to build or accelerate..."
                        className="w-full px-4 py-3 rounded-lg bg-black/40 border border-white/10 focus:border-cyan-400 focus:outline-none text-sm text-white placeholder:text-zinc-600 resize-none font-sans"
                      />
                    </div>

                    {/* Submit Button */}
                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-4 rounded-xl text-xs font-semibold tracking-[0.2em] uppercase text-slate-950 bg-gradient-to-r from-cyan-300 via-cyan-400 to-blue-400 hover:opacity-95 transition-opacity flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(6,182,212,0.4)] disabled:opacity-50"
                      >
                        {loading ? (
                          <span>TRANSMITTING...</span>
                        ) : (
                          <>
                            <span>SEND TRANSMISSION</span>
                            <Send className="w-3.5 h-3.5" />
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
