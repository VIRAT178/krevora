import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ApproachPrinciple } from '../types';
import { Sparkles, ArrowRight } from 'lucide-react';

const principles: ApproachPrinciple[] = [
  {
    number: '01',
    title: 'CLARITY',
    subtitle: 'Signal extraction',
    description:
      'Distilling complex problem spaces into unambiguous, high-leverage strategic priorities. We eliminate guesswork before writing a single line of code.',
    detailPoints: ['First-principles audit', 'Friction diagnosis', 'Zero fluff roadmaps'],
  },
  {
    number: '02',
    title: 'SYSTEMS',
    subtitle: 'Connected engines',
    description:
      'Architecting interconnected engines where growth systems and modern technology continuously compound each other rather than operating in silos.',
    detailPoints: ['Interlocked data pipelines', 'Autonomous feedback loops', 'Scalable infra'],
  },
  {
    number: '03',
    title: 'EXECUTION',
    subtitle: 'Surgical precision',
    description:
      'Engineering with relentless craft and high standards. Zero bloated dependencies, maximum velocity, resilient architectures built to last.',
    detailPoints: ['Production-grade code', 'Sub-second latencies', 'Pixel-perfect craft'],
  },
  {
    number: '04',
    title: 'MOMENTUM',
    subtitle: 'Compounding impact',
    description:
      'Creating compounding advantages and automated growth loops that sustain long-term business performance long after initial deployment.',
    detailPoints: ['Self-optimizing workflows', 'Measurable ROI', 'Future-proof agility'],
  },
];

export const Approach: React.FC = () => {
  const [activePrinciple, setActivePrinciple] = useState<string>('01');

  return (
    <section
      id="approach"
      className="relative py-28 sm:py-36 lg:py-44 border-t border-white/[0.06] bg-[#030712] overflow-hidden"
    >
      {/* Background glow and subtle grid */}
      <div className="absolute inset-0 tech-grid-fine opacity-20 pointer-events-none" />
      <div 
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[350px] -z-10 pointer-events-none blur-[160px] opacity-15"
        style={{
          background: 'radial-gradient(circle, rgba(56, 189, 248, 0.2) 0%, rgba(99, 102, 241, 0.1) 50%, transparent 80%)'
        }}
      />

      <div className="max-w-[1700px] mx-auto px-6 sm:px-8 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl pb-16 sm:pb-20">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2.5 mb-5"
          >
            <span className="w-2 h-[2px] bg-cyan-400" />
            <span className="text-[11px] sm:text-xs tracking-[0.28em] font-mono uppercase font-semibold text-cyan-400">
              OUR APPROACH
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-[-0.03em] leading-[1.08]"
          >
            <span className="block text-white">
              Less noise.
            </span>
            <span className="block text-cyan-200/80">
              More signal.
            </span>
            <span className="block text-slate-500">
              Better outcomes.
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-6 text-base sm:text-lg text-zinc-400 leading-relaxed font-normal max-w-xl"
          >
            We discard conventional agency bloat. Every deliverable is calibrated against real commercial leverage, technical resilience, and compound growth.
          </motion.p>
        </div>

        {/* 4 Principles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {principles.map((item, idx) => {
            const isActive = activePrinciple === item.number;
            return (
              <motion.div
                key={item.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                onMouseEnter={() => setActivePrinciple(item.number)}
                className={`relative flex flex-col justify-between p-8 sm:p-9 rounded-2xl border transition-all duration-400 cursor-pointer overflow-hidden backdrop-blur-sm ${
                  isActive
                    ? 'bg-[#07101f] border-cyan-500/50 shadow-[0_10px_40px_-15px_rgba(6,182,212,0.3)] -translate-y-1'
                    : 'bg-[#050a14]/80 border-white/[0.07] hover:border-white/20'
                }`}
              >
                {/* Principle Card Top: Number & Accent */}
                <div>
                  <div className="flex items-center justify-between pb-6 border-b border-white/[0.06]">
                    <span className="text-2xl sm:text-3xl font-mono font-bold tracking-tight text-cyan-400/90">
                      {item.number}
                    </span>
                    <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-zinc-500">
                      {item.subtitle}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="mt-6 text-xl sm:text-2xl font-bold tracking-tight text-white">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="mt-3 text-sm text-zinc-400 leading-[1.65]">
                    {item.description}
                  </p>
                </div>

                {/* Key Points */}
                <div className="mt-8 pt-6 border-t border-white/[0.06] space-y-2">
                  {item.detailPoints.map((point) => (
                    <div
                      key={point}
                      className="flex items-center gap-2 text-xs font-mono text-zinc-400"
                    >
                      <span className="w-1 h-1 rounded-full bg-cyan-400/80" />
                      <span>{point}</span>
                    </div>
                  ))}
                </div>

                {/* Bottom subtle glow line */}
                <div
                  className={`absolute bottom-0 left-0 right-0 h-[2px] transition-opacity duration-300 ${
                    isActive
                      ? 'bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 opacity-100'
                      : 'opacity-0'
                  }`}
                />
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
