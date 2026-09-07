import React from 'react';

interface BrandLogoProps {
  variant?: 'navbar' | 'full' | 'icon-only' | 'footer';
  className?: string;
  iconSize?: number;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  variant = 'navbar',
  className = '',
  iconSize = 28,
}) => {
  // SVG for the custom faceted K monogram matching the uploaded brand asset
  const renderKIcon = (size: number, showBorder: boolean = true) => (
    <div
      className={`relative inline-flex items-center justify-center transition-transform duration-300 group-hover:scale-105 ${
        showBorder
          ? 'border border-cyan-400/40 bg-cyan-950/20 p-1.5 rounded-sm shadow-[0_0_15px_-3px_rgba(6,182,212,0.3)]'
          : ''
      }`}
      style={{ width: showBorder ? size + 10 : size, height: showBorder ? size + 10 : size }}
    >
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <defs>
          <linearGradient id="kStemGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="50%" stopColor="#0284c7" />
            <stop offset="100%" stopColor="#0369a1" />
          </linearGradient>
          <linearGradient id="kUpperArmGrad" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0284c7" />
            <stop offset="60%" stopColor="#38bdf8" />
            <stop offset="100%" stopColor="#67e8f9" />
          </linearGradient>
          <linearGradient id="kLowerArmGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0369a1" />
            <stop offset="50%" stopColor="#0ea5e9" />
            <stop offset="100%" stopColor="#38bdf8" />
          </linearGradient>
          <linearGradient id="kFacetGlow" x1="30%" y1="30%" x2="70%" y2="70%">
            <stop offset="0%" stopColor="#a5f3fc" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#0284c7" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Vertical Stem - faceted geometric column */}
        <path
          d="M20 12 H42 V50 L20 62 Z"
          fill="url(#kStemGrad)"
        />
        <path
          d="M20 62 L42 50 V88 H20 Z"
          fill="url(#kLowerArmGrad)"
        />
        
        {/* Upper diagonal arm - sharp faceted chevron reaching top-right */}
        <path
          d="M42 46 L76 12 H98 L56 50 Z"
          fill="url(#kUpperArmGrad)"
        />
        {/* Upper highlight edge */}
        <path
          d="M74 12 L98 12 L84 25 Z"
          fill="#cffafe"
          opacity="0.8"
        />

        {/* Lower diagonal arm - angled geometric shard extending bottom-right */}
        <path
          d="M47 48 L98 88 H72 L36 57 Z"
          fill="url(#kLowerArmGrad)"
        />

        {/* Center facet triangle / light prism */}
        <path
          d="M42 46 L56 50 L36 57 Z"
          fill="url(#kFacetGlow)"
        />
      </svg>
    </div>
  );

  // Vector wordmark for KREVORA with precision styling (stylized 'E' and open 'A' with cyan glow triangle)
  const renderWordmark = (trackingClass: string = 'tracking-[0.28em]', fontSizeClass: string = 'text-lg') => (
    <div className={`font-extrabold uppercase select-none flex items-center text-white ${trackingClass} ${fontSizeClass}`}>
      <span>KR</span>
      {/* Custom curved tech 'E' matching the uploaded image */}
      <span className="inline-block relative px-0.5 text-zinc-100">
        <svg className="w-[0.9em] h-[0.9em] inline-block -mt-[0.08em]" viewBox="0 0 32 32" fill="currentColor">
          <path d="M26 6 H14 C9.5 6 6 9.5 6 14 V18 C6 22.5 9.5 26 14 26 H26 V22 H14 C11.8 22 10 20.2 10 18 V17 H22 V14 H10 V14 C10 11.8 11.8 10 14 10 H26 V6 Z" />
        </svg>
      </span>
      <span>VOR</span>
      {/* Custom 'A' with cyan glowing triangle counter */}
      <span className="relative inline-block">
        <span>A</span>
        <span className="absolute bottom-[0.18em] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[3px] border-l-transparent border-r-[3px] border-r-transparent border-b-[5px] border-b-cyan-400 drop-shadow-[0_0_4px_#38bdf8]" />
      </span>
    </div>
  );

  if (variant === 'icon-only') {
    return (
      <div className={`inline-flex items-center ${className}`}>
        {renderKIcon(iconSize, true)}
      </div>
    );
  }

  if (variant === 'full') {
    return (
      <div className={`flex flex-col items-center text-center group ${className}`}>
        {renderKIcon(iconSize * 1.6, false)}
        <div className="mt-4">
          {renderWordmark('tracking-[0.32em]', 'text-2xl md:text-3xl')}
        </div>
        <div className="mt-2 flex items-center gap-2">
          <div className="h-[1px] w-8 bg-gradient-to-r from-transparent to-cyan-500/50" />
          <span className="text-[10px] tracking-[0.25em] font-semibold bg-gradient-to-r from-cyan-400 via-blue-400 to-violet-400 bg-clip-text text-transparent">
            CREATE. EVOLVE. GROW.
          </span>
          <div className="h-[1px] w-8 bg-gradient-to-l from-transparent to-cyan-500/50" />
        </div>
      </div>
    );
  }

  if (variant === 'footer') {
    return (
      <div className={`flex items-center gap-3 group ${className}`}>
        {renderKIcon(iconSize - 4, true)}
        {renderWordmark('tracking-[0.24em]', 'text-base font-bold')}
      </div>
    );
  }

  // Default: Navbar variant
  return (
    <div className={`flex items-center gap-3.5 group cursor-pointer ${className}`}>
      {renderKIcon(iconSize, true)}
      {renderWordmark('tracking-[0.26em]', 'text-base md:text-lg font-bold')}
    </div>
  );
};
