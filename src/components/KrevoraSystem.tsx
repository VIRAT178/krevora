import React from 'react';
import { motion } from 'motion/react';
import { DivisionCard } from './DivisionCard';
import { DivisionData } from '../types';

interface KrevoraSystemProps {
  onSelectDivision: (divisionId: string) => void;
}

const divisionsData: DivisionData[] = [
  {
    id: 'digitals',
    number: '01',
    divisionLabel: 'DIVISION',
    title: 'KREVORA DIGITALS',
    description:
      'Demand, discoverability and growth systems for brands ready to move further.',
    tags: ['SEO / GEO', 'PERFORMANCE', 'BRAND SYSTEMS'],
    features: [
      'Algorithmic SEO & Generative Engine Optimization',
      'High-velocity performance acquisition architectures',
      'Multi-touch conversion & attribution modelling',
      'Autonomous lead enrichment & qualification pipelines',
      'Enterprise brand system design & positioning',
    ],
    metrics: [
      { label: 'Avg. Organic Lift', value: '+310%' },
      { label: 'Attribution Precision', value: '99.4%' },
    ],
    accentColor: 'cyan',
  },
  {
    id: 'technologies',
    number: '02',
    divisionLabel: 'DIVISION',
    title: 'KREVORA TECHNOLOGIES',
    description:
      'Digital products, automation and intelligent infrastructure built for momentum.',
    tags: ['WEB / SOFTWARE', 'AI SYSTEMS', 'AUTOMATION'],
    features: [
      'Production-grade full-stack web & cloud platforms',
      'Custom LLM integrations & multi-agent systems',
      'End-to-end workflow automation & API orchestrations',
      'High-throughput microservices & real-time telemetry',
      'Scalable enterprise cloud architecture on modern infra',
    ],
    metrics: [
      { label: 'Latency Reduction', value: '-65%' },
      { label: 'Process Automation', value: '88%' },
    ],
    accentColor: 'blue',
  },
];

export const KrevoraSystem: React.FC<KrevoraSystemProps> = ({ onSelectDivision }) => {
  return (
    <section
      id="system"
      className="relative py-28 sm:py-36 lg:py-44 border-t border-white/[0.06] bg-[#030712] overflow-hidden"
    >
      {/* Background subtle atmospheric depth */}
      <div className="absolute inset-0 tech-grid-pattern opacity-25 pointer-events-none" />
      <div 
        className="absolute top-1/2 left-0 w-[500px] h-[500px] -translate-y-1/2 -z-10 pointer-events-none blur-[150px] opacity-15"
        style={{
          background: 'radial-gradient(circle, rgba(6, 182, 212, 0.25) 0%, transparent 70%)'
        }}
      />
      <div 
        className="absolute top-1/2 right-0 w-[500px] h-[500px] -translate-y-1/2 -z-10 pointer-events-none blur-[150px] opacity-15"
        style={{
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.2) 0%, transparent 70%)'
        }}
      />

      <div className="max-w-[1700px] mx-auto px-6 sm:px-8 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-end pb-16 sm:pb-20 border-b border-white/[0.06]">
          
          {/* Left Column: Eyebrow + Headline */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2.5 mb-5"
            >
              <span className="w-2 h-[2px] bg-cyan-400" />
              <span className="text-[11px] sm:text-xs tracking-[0.28em] font-mono uppercase font-semibold text-cyan-400">
                THE KREVORA SYSTEM
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-[-0.03em] leading-[1.08]"
            >
              <span className="block text-white">
                Two disciplines.
              </span>
              <span className="block text-slate-400 font-semibold">
                One direction.
              </span>
            </motion.h2>
          </div>

          {/* Right Column: Statement paragraph */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-5"
          >
            <p className="text-base sm:text-lg text-zinc-400 font-normal leading-[1.7] max-w-lg">
              Where sharp thinking meets considered execution. We connect growth and technology to make businesses more capable, visible and ready for what's next.
            </p>
          </motion.div>

        </div>

        {/* The Two Large Division Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 mt-12 sm:mt-16">
          {divisionsData.map((division, idx) => (
            <DivisionCard
              key={division.id}
              data={division}
              index={idx}
              onSelectDivision={onSelectDivision}
            />
          ))}
        </div>

        {/* Integration Bar: Explaining the Synergy */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-12 sm:mt-16 p-6 sm:p-8 rounded-xl bg-white/[0.02] border border-white/[0.06] flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="flex items-center gap-4">
            <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_10px_#22d3ee]" />
            <div className="text-xs sm:text-sm font-mono uppercase tracking-[0.2em] text-zinc-300">
              SYNCHRONIZED DEPLOYMENT
            </div>
          </div>
          <div className="text-xs sm:text-sm text-zinc-400 text-center md:text-right max-w-xl">
            Growth without reliable technology reaches a ceiling. Technology without distribution stalls. Krevora engineers both in lockstep.
          </div>
        </motion.div>

      </div>
    </section>
  );
};
