import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight, CheckCircle2, Layers, Cpu, ChevronRight, X } from 'lucide-react';
import { DivisionData } from '../types';

interface DivisionCardProps {
  data: DivisionData;
  index: number;
  onSelectDivision?: (divisionId: string) => void;
}

export const DivisionCard: React.FC<DivisionCardProps> = ({
  data,
  index,
  onSelectDivision,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const isDigitals = data.id === 'digitals';

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.7, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => setIsModalOpen(true)}
        className="group relative flex flex-col justify-between p-8 sm:p-10 lg:p-12 rounded-2xl bg-[#050a14]/90 border border-white/[0.08] hover:border-cyan-400/40 transition-all duration-300 cursor-pointer overflow-hidden backdrop-blur-sm hover:shadow-[0_10px_40px_-15px_rgba(6,182,212,0.25)]"
      >
        {/* Subtle hover gradient spotlight behind card surface */}
        <div 
          className="absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none -z-10 rounded-2xl"
          style={{
            background: isDigitals
              ? 'radial-gradient(circle at 80% 20%, rgba(6, 182, 212, 0.12) 0%, rgba(59, 130, 246, 0.05) 50%, transparent 80%)'
              : 'radial-gradient(circle at 80% 20%, rgba(99, 102, 241, 0.12) 0%, rgba(6, 182, 212, 0.05) 50%, transparent 80%)',
          }}
        />

        {/* Card Header: Number & Division Badge */}
        <div>
          <div className="flex items-center justify-between pb-8 border-b border-white/[0.06]">
            <div className="flex items-center gap-3">
              <span className="text-[11px] font-mono tracking-[0.24em] text-cyan-400 font-semibold uppercase">
                {data.divisionLabel}
              </span>
              <span className="text-zinc-600">/</span>
              <span className="text-[11px] font-mono tracking-[0.2em] text-zinc-400">
                {data.number}
              </span>
            </div>

            {/* Micro Arrow indicator */}
            <div className="w-9 h-9 rounded-full bg-white/[0.04] border border-white/10 group-hover:border-cyan-400/50 flex items-center justify-center transition-all duration-300 group-hover:bg-cyan-500/10 group-hover:scale-105">
              <ArrowUpRight className="w-4 h-4 text-zinc-400 group-hover:text-cyan-300 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
          </div>

          {/* Division Title */}
          <div className="mt-8">
            <div className="flex items-center gap-3 mb-2">
              {isDigitals ? (
                <Layers className="w-5 h-5 text-cyan-400" />
              ) : (
                <Cpu className="w-5 h-5 text-blue-400" />
              )}
              <span className="text-xs tracking-[0.2em] font-mono uppercase text-zinc-500">
                DISCIPLINE
              </span>
            </div>
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight group-hover:text-white transition-colors">
              {data.title}
            </h3>
          </div>

          {/* Description */}
          <p className="mt-4 text-sm sm:text-base text-zinc-400 leading-[1.65] font-normal transition-transform duration-300 group-hover:translate-x-1">
            {data.description}
          </p>
        </div>

        {/* Card Footer: Tags & Interaction Hint */}
        <div className="mt-10 pt-6 border-t border-white/[0.06]">
          <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
            {data.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1.5 rounded-md text-[11px] font-mono tracking-[0.15em] font-medium text-zinc-300 bg-white/[0.04] border border-white/[0.08] group-hover:border-cyan-500/30 group-hover:text-cyan-200 transition-colors"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-6 flex items-center justify-between text-xs text-zinc-500 group-hover:text-cyan-400/90 font-mono tracking-[0.15em] transition-colors">
            <span>VIEW CAPABILITIES</span>
            <ChevronRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </div>
        </div>
      </motion.div>

      {/* DETAIL MODAL (Opens for client demo showcase) */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-[#030712]/90 backdrop-blur-xl"
            />

            {/* Modal Dialog */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-[#07101f] border border-cyan-500/30 rounded-2xl p-6 sm:p-10 shadow-[0_20px_70px_rgba(0,0,0,0.8)] z-10"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-6 right-6 p-2 rounded-full bg-white/[0.05] hover:bg-white/[0.1] text-zinc-400 hover:text-white border border-white/10 transition-colors"
                aria-label="Close details"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Eyebrow */}
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono tracking-[0.25em] text-cyan-400 uppercase font-semibold">
                  {data.divisionLabel}
                </span>
                <span className="text-zinc-600">/</span>
                <span className="text-xs font-mono tracking-[0.2em] text-zinc-400">
                  {data.number}
                </span>
              </div>

              <h3 className="mt-3 text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {data.title}
              </h3>

              <p className="mt-3 text-base text-zinc-300 leading-relaxed">
                {data.description}
              </p>

              {/* Tags */}
              <div className="mt-5 flex flex-wrap gap-2">
                {data.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded text-xs font-mono tracking-wider text-cyan-300 bg-cyan-950/40 border border-cyan-800/40"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Core Execution Deliverables */}
              <div className="mt-8 pt-6 border-t border-white/[0.08]">
                <h4 className="text-xs font-mono tracking-[0.2em] text-zinc-400 uppercase mb-4">
                  CORE SYSTEM DELIVERABLES
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {data.features.map((feat) => (
                    <div key={feat} className="flex items-start gap-2.5 text-sm text-zinc-300">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Benchmark Performance Metrics */}
              <div className="mt-8 pt-6 border-t border-white/[0.08]">
                <h4 className="text-xs font-mono tracking-[0.2em] text-zinc-400 uppercase mb-4">
                  PERFORMANCE IMPACT
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  {data.metrics.map((metric) => (
                    <div
                      key={metric.label}
                      className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]"
                    >
                      <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono tracking-tight">
                        {metric.value}
                      </div>
                      <div className="text-xs text-zinc-400 mt-1 uppercase tracking-wider font-mono">
                        {metric.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Modal CTA */}
              <div className="mt-8 pt-6 border-t border-white/[0.08] flex items-center justify-end">
                <button
                  onClick={() => {
                    setIsModalOpen(false);
                    if (onSelectDivision) onSelectDivision(data.id);
                  }}
                  className="px-6 py-3 rounded-full text-xs font-semibold tracking-[0.18em] uppercase text-slate-950 bg-cyan-400 hover:bg-cyan-300 transition-colors flex items-center gap-2"
                >
                  <span>INQUIRE ABOUT {data.title}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
