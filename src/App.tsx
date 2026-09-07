/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { KrevoraPreloader } from './components/KrevoraPreloader';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { KrevoraSystem } from './components/KrevoraSystem';
import { Approach } from './components/Approach';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

export default function App() {
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [selectedDivision, setSelectedDivision] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Subtle ambient mouse light bloom for deep dark canvas
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleExplore = () => {
    const el = document.getElementById('system');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleApproach = () => {
    const el = document.getElementById('approach');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleOpenContact = () => {
    setContactModalOpen(true);
  };

  const handleCloseContact = () => {
    setContactModalOpen(false);
    setSelectedDivision(null);
  };

  const handleSelectDivision = (divisionId: string) => {
    setSelectedDivision(divisionId);
    setContactModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#030712] text-white selection:bg-cyan-500/20 selection:text-cyan-300 relative">
      
      {/* Subtle global ambient glow following mouse */}
      <div
        className="fixed inset-0 pointer-events-none -z-10 transition-opacity duration-1000 hidden md:block"
        style={{
          background: `radial-gradient(650px circle at ${mousePos.x}px ${mousePos.y}px, rgba(6, 182, 212, 0.035), transparent 80%)`,
        }}
      />

      {/* Subtle vertical alignment guide lines across viewport (very faint) */}
      <div className="fixed inset-0 pointer-events-none -z-10 max-w-[1700px] mx-auto px-6 sm:px-8 md:px-12 flex justify-between opacity-[0.03]">
        <div className="w-[1px] h-full bg-white" />
        <div className="w-[1px] h-full bg-white hidden sm:block" />
        <div className="w-[1px] h-full bg-white hidden lg:block" />
        <div className="w-[1px] h-full bg-white hidden xl:block" />
        <div className="w-[1px] h-full bg-white" />
      </div>

      {/* 0. Premium Preloader */}
      <KrevoraPreloader />

      {/* 1. Navbar */}
      <Navbar onOpenContact={handleOpenContact} />

      {/* Main Content Sections (strictly non-overlapping document flow) */}
      <main className="relative">
        {/* 2. Hero Section with 3D K */}
        <Hero onExplore={handleExplore} onApproach={handleApproach} />

        {/* 3. Section 2 — Krevora System */}
        <KrevoraSystem onSelectDivision={handleSelectDivision} />

        {/* 4. Section 3 — Approach */}
        <Approach />

        {/* 5. Section 4 — Contact / Final CTA */}
        <Contact
          isModalOpen={contactModalOpen}
          onCloseModal={handleCloseContact}
          onOpenModal={handleOpenContact}
          preselectedDivision={selectedDivision}
        />
      </main>

      {/* 6. Footer */}
      <Footer />
    </div>
  );
}
