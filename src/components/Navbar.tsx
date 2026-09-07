import React, { useState, useEffect } from 'react';
import { BrandLogo } from './BrandLogo';
import { ArrowUpRight, Menu, X } from 'lucide-react';

interface NavbarProps {
  onOpenContact: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenContact }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'DIVISIONS', href: '#system' },
    { label: 'APPROACH', href: '#approach' },
    { label: 'CONTACT', href: '#contact' },
  ];

  const handleLinkClick = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        id="navbar"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#030712]/90 backdrop-blur-md border-b border-white/[0.08] shadow-[0_4px_30px_rgba(0,0,0,0.5)] py-3.5'
            : 'bg-[#030712]/40 backdrop-blur-[6px] border-b border-white/[0.04] py-5'
        }`}
      >
        <div className="max-w-[1700px] mx-auto px-6 sm:px-8 md:px-12 flex items-center justify-between">
          {/* LEFT: K icon inside thin cyan square + KREVORA */}
          <a
            href="#"
            className="flex items-center gap-3 group focus:outline-none"
            aria-label="Krevora Home"
          >
            <BrandLogo variant="navbar" iconSize={26} />
          </a>

          {/* CENTER: Clean Minimal Navigation Links (Desktop) */}
          <nav className="hidden md:flex items-center gap-10 lg:gap-14" aria-label="Main Navigation">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleLinkClick(link.href)}
                className="relative text-[12px] tracking-[0.24em] font-medium text-zinc-400 hover:text-white transition-colors duration-200 uppercase py-1 group"
              >
                <span>{link.label}</span>
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-300 group-hover:w-full" />
              </button>
            ))}
          </nav>

          {/* RIGHT: CTA Button (Desktop) */}
          <div className="hidden md:flex items-center">
            <button
              onClick={onOpenContact}
              className="relative inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-[11px] font-semibold tracking-[0.2em] uppercase text-white bg-white/[0.03] hover:bg-white/[0.07] border border-white/15 hover:border-cyan-400/50 transition-all duration-300 hover:shadow-[0_0_20px_-5px_rgba(6,182,212,0.4)] group overflow-hidden"
            >
              <span className="relative z-10">START A CONVERSATION</span>
              <ArrowUpRight className="w-3.5 h-3.5 relative z-10 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-cyan-400" />
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-zinc-300 hover:text-white border border-white/10 rounded-md bg-white/[0.03] transition-colors"
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer / Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#030712]/95 backdrop-blur-xl pt-24 px-6 md:hidden flex flex-col justify-between pb-12 border-b border-white/10 animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="flex flex-col space-y-6">
            <div className="text-[10px] tracking-[0.3em] uppercase text-zinc-500 font-mono">
              NAVIGATION
            </div>
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleLinkClick(link.href)}
                className="text-left text-2xl font-bold tracking-[0.15em] text-zinc-200 hover:text-cyan-400 transition-colors py-2 border-b border-white/[0.05]"
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="pt-8">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenContact();
              }}
              className="w-full py-4 rounded-xl text-center text-xs font-semibold tracking-[0.2em] uppercase text-white bg-gradient-to-r from-cyan-600/30 to-blue-600/30 border border-cyan-400/40 hover:border-cyan-300 flex items-center justify-center gap-2 shadow-[0_0_25px_-5px_rgba(6,182,212,0.3)]"
            >
              <span>START A CONVERSATION</span>
              <ArrowUpRight className="w-4 h-4 text-cyan-300" />
            </button>
            <div className="mt-6 text-center text-[10px] tracking-[0.25em] text-zinc-500 uppercase">
              CREATE. EVOLVE. GROW.
            </div>
          </div>
        </div>
      )}
    </>
  );
};
