import React from 'react';
import { BrandLogo } from './BrandLogo';
import { ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-white/[0.08] bg-[#02050e] py-12 sm:py-16 text-zinc-400">
      <div className="max-w-[1700px] mx-auto px-6 sm:px-8 md:px-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 sm:gap-6">
          
          {/* LEFT: K icon + KREVORA */}
          <div className="flex items-center gap-3">
            <BrandLogo variant="footer" iconSize={24} />
          </div>

          {/* CENTER: Tagline */}
          <div className="text-center">
            <span className="text-[11px] sm:text-xs tracking-[0.28em] font-mono uppercase font-semibold bg-gradient-to-r from-cyan-400 via-blue-400 to-violet-400 bg-clip-text text-transparent">
              CREATE. EVOLVE. GROW.
            </span>
          </div>

          {/* RIGHT: Copyright & Back to top */}
          <div className="flex items-center gap-6 text-xs font-mono tracking-widest text-zinc-500">
            <span>© 2026 KREVORA</span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-full bg-white/[0.03] hover:bg-white/[0.08] text-zinc-400 hover:text-white border border-white/10 transition-colors"
              aria-label="Back to top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

        {/* Lower Micro Line: Subtle system metadata */}
        <div className="mt-8 pt-6 border-t border-white/[0.04] flex flex-col sm:flex-row items-center justify-between gap-3 text-[10px] font-mono tracking-[0.2em] text-zinc-600 uppercase">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400/80 animate-pulse" />
            <span>CORE PROTOCOL / OPERATIONAL</span>
          </div>
          <div className="flex items-center gap-6">
            <span className="hover:text-zinc-400 transition-colors cursor-pointer">PRIVACY POLICY</span>
            <span className="hover:text-zinc-400 transition-colors cursor-pointer">TERMS OF SERVICE</span>
            <span className="hover:text-zinc-400 transition-colors cursor-pointer">ENCRYPTED TELEMETRY</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
