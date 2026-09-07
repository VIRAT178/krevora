import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { HeroThreeK } from './HeroThreeK';

interface HeroProps {
  onExplore: () => void;
  onApproach: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExplore, onApproach }) => {
  return (
    <section
      id="hero"
      className="relative min-h-[90vh] lg:min-h-screen flex items-center pt-24 pb-16 lg:pt-28 lg:pb-20 overflow-hidden"
    >
      {/* Background Atmosphere: Subtle dark navy gradient & light bloom */}
      <div className="absolute inset-0 -z-20 tech-grid-pattern opacity-40 pointer-events-none" />
      <div 
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[900px] h-[400px] sm:h-[500px] -z-10 pointer-events-none blur-[140px] opacity-25"
        style={{
          background: 'radial-gradient(circle, rgba(6, 182, 212, 0.2) 0%, rgba(59, 130, 246, 0.12) 40%, rgba(124, 58, 237, 0.04) 70%, transparent 80%)'
        }}
      />

      <div className="max-w-[1700px] w-full mx-auto px-6 sm:px-8 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* LEFT COLUMN: Editorial Typography & CTAs */}
          <div className="lg:col-span-7 flex flex-col justify-center z-10">
            
            {/* Small eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-3 mb-6"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee]" />
              <span className="text-[11px] sm:text-xs tracking-[0.28em] uppercase font-semibold text-cyan-300/90 font-mono">
                CREATE. EVOLVE. GROW.
              </span>
              <div className="h-[1px] w-12 bg-gradient-to-r from-cyan-400/40 to-transparent" />
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-[44px] sm:text-[62px] md:text-[76px] lg:text-[84px] xl:text-[96px] font-extrabold tracking-[-0.035em] leading-[1.02] max-w-2xl xl:max-w-3xl"
            >
              <span className="block text-white">
                Build what
              </span>
              <span className="block bg-gradient-to-r from-cyan-300 via-blue-400 to-violet-400 bg-clip-text text-transparent pb-1 drop-shadow-[0_0_35px_rgba(56,189,248,0.25)]">
                moves forward.
              </span>
            </motion.h1>

            {/* Sub-copy */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="mt-6 sm:mt-8 text-base sm:text-lg md:text-xl text-zinc-400 font-normal leading-[1.65] max-w-xl"
            >
              Krevora combines digital growth, technology and intelligent systems to turn ambitious ideas into meaningful business momentum.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="mt-8 sm:mt-10 flex flex-wrap items-center gap-4 sm:gap-5"
            >
              {/* Primary CTA */}
              <button
                onClick={onExplore}
                className="relative inline-flex items-center gap-3 px-7 py-3.5 rounded-full text-xs sm:text-sm font-semibold tracking-[0.16em] uppercase text-slate-950 bg-white hover:bg-cyan-100 transition-all duration-300 hover:shadow-[0_0_30px_-5px_rgba(56,189,248,0.6)] group overflow-hidden"
              >
                <span className="relative z-10">EXPLORE KREVORA</span>
                <ArrowRight className="w-4 h-4 relative z-10 transition-transform duration-300 group-hover:translate-x-1 text-slate-950" />
              </button>

              {/* Secondary CTA */}
              <button
                onClick={onApproach}
                className="relative inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full text-xs sm:text-sm font-semibold tracking-[0.16em] uppercase text-zinc-300 hover:text-white bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 hover:border-white/30 transition-all duration-300 group"
              >
                <span>OUR APPROACH</span>
                <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-cyan-400" />
              </button>
            </motion.div>

            {/* Key domain tags below CTA */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="mt-12 sm:mt-14 pt-8 border-t border-white/[0.06] flex flex-wrap items-center gap-x-6 gap-y-2 text-[11px] font-mono tracking-[0.18em] text-zinc-500 uppercase"
            >
              <div className="flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-cyan-400" />
                <span>AI & AUTOMATION</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-blue-400" />
                <span>DIGITAL PRODUCTS</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-violet-400" />
                <span>GROWTH SYSTEMS</span>
              </div>
            </motion.div>

          </div>

          {/* RIGHT COLUMN: Interactive 3D K Symbol & Editorial Annotations */}
          <div className="lg:col-span-5 relative flex items-center justify-center min-h-[380px] sm:min-h-[480px] lg:min-h-[580px]">
            
            {/* Small Editorial Labels around 3D visual */}
            <div className="absolute top-2 right-2 sm:right-6 pointer-events-none hidden sm:block z-20">
              <span className="text-[9px] sm:text-[10px] uppercase font-mono tracking-[0.26em] text-zinc-500/70 border-b border-white/[0.08] pb-1">
                DIGITAL GROWTH / TECHNOLOGY / AI
              </span>
            </div>

            <div className="absolute top-1/4 -left-2 pointer-events-none hidden xl:block z-20">
              <span className="text-[9px] uppercase font-mono tracking-[0.26em] text-zinc-500/70 rotate-90 origin-left inline-block">
                K / INTELLIGENT SYSTEMS
              </span>
            </div>

            <div className="absolute bottom-6 left-2 sm:left-6 pointer-events-none hidden sm:block z-20">
              <span className="text-[9px] sm:text-[10px] uppercase font-mono tracking-[0.24em] text-zinc-500/70">
                CONNECTED GROWTH
              </span>
            </div>

            <div className="absolute bottom-2 right-2 sm:right-6 pointer-events-none hidden sm:block z-20">
              <span className="text-[9px] sm:text-[10px] uppercase font-mono tracking-[0.24em] text-cyan-400/60 font-mono">
                DATA / AUTOMATION / AI
              </span>
            </div>

            {/* The 3D Three.js rotating and interactive K */}
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="w-full h-full relative"
            >
              <HeroThreeK />
            </motion.div>

          </div>

        </div>
      </div>
    </section>
  );
};
