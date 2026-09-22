import React, { useEffect, useState } from 'react';
import { ArrowDown, ArrowUpRight, Terminal, Compass, CheckCircle2, Sparkles } from 'lucide-react';
import { HexaloomLogo } from '../brand/HexaloomLogo';
import { SITE_CONFIG } from '../../data/siteConfig';

interface HeroSectionProps {
  onStartProject: () => void;
  onExploreWork: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onStartProject,
  onExploreWork
}) => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Subtle scroll parallax transforms
  const headlineShift = Math.min(scrollY * 0.22, 90);
  const copyOpacity = Math.max(1 - scrollY / 380, 0);
  const badgeShift = Math.min(scrollY * 0.1, 40);

  return (
    <section
      id="hero"
      aria-label="Scene 01 Opening"
      className="relative min-h-[94vh] flex flex-col justify-between pt-28 sm:pt-36 pb-12 border-b border-[#CFC5B8] bg-grain"
    >
      {/* Top Metadata Bar / Studio Ticket Header */}
      <div className="max-w-7xl mx-auto w-full px-6 sm:px-8">
        <div
          className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#CFC5B8]/80 text-xs font-mono text-[#81776C]"
          style={{ transform: `translateY(-${badgeShift}px)` }}
        >
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-[#527A5A] animate-pulse" />
            <span className="text-[#24211D] font-medium">
              Hexaloom Studio: Active Production // Senior Developer Commissions
            </span>
          </div>

          <div className="flex items-center gap-6">
            <span className="hidden sm:inline">Bhubaneswar // India</span>
            <span className="text-[#B56A3A] font-semibold">Scene 01 / 11</span>
          </div>
        </div>
      </div>

      {/* Main Center Typography Stage */}
      <div className="max-w-7xl mx-auto w-full px-6 sm:px-8 py-8 sm:py-14 my-auto">
        <div
          className="transition-transform duration-75 ease-out"
          style={{ transform: `translateY(-${headlineShift}px)` }}
        >
          {/* Eyebrow / Classification with Hexaloom Tagline */}
          <div className="flex items-center gap-3 mb-4">
            <div className="font-mono text-xs sm:text-sm tracking-widest text-[#B56A3A] flex items-center gap-2">
              <Terminal className="w-4 h-4 text-[#38BDF8]" />
              <span>HEXALOOM STUDIO // CODE. DESIGN. INNOVATE.</span>
            </div>
          </div>

          {/* Large Editorial Headline with Hexaloom Logo Lockup */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-[#24211D] leading-[1.02] max-w-4xl font-sans">
              HEXALOOM <br />
              <span className="text-[#2563EB]">STUDIO.</span> <br />
              <span className="text-[#81776C] font-serif italic lowercase text-3xl sm:text-5xl md:text-6xl tracking-normal">
                code. design. innovate.
              </span>
            </h1>

            {/* Visual 3D Hexaloom Emblem Badge */}
            <div className="hidden lg:flex flex-col items-center justify-center p-6 border border-[#24211D] bg-[#FFFDF9] shadow-md max-w-xs">
              <div className="relative w-44 h-44 flex items-center justify-center bg-[#1A1815] p-3 border border-[#24211D] mb-5">
                <img
                  src="/assets/hexaloom-logo.jpg"
                  alt="Hexaloom Studio Logo"
                  className="w-full h-full object-contain select-none"
                  loading="eager"
                  decoding="async"
                />
              </div>
              <div className="font-mono text-xs font-bold text-[#24211D] uppercase tracking-widest text-center">
                HEXALOOM STUDIO
              </div>
              <div className="text-xs font-mono text-[#81776C] text-center mt-1.5 uppercase tracking-wider">
                ARCHITECTURAL SOFTWARE CRAFT
              </div>
            </div>
          </div>
        </div>

        {/* Secondary Description & Actions Grid */}
        <div
          className="grid grid-cols-1 md:grid-cols-12 gap-8 sm:gap-12 mt-8 sm:mt-12 pt-8 border-t border-[#CFC5B8]/60 transition-opacity duration-150"
          style={{ opacity: copyOpacity }}
        >
          <div className="md:col-span-7">
            <p className="text-lg sm:text-2xl text-[#24211D] font-normal leading-relaxed max-w-2xl font-serif">
              We design and build modern digital products that work. High-precision web applications, resilient cloud backends, and responsive design systems engineered by senior software architects.
            </p>

            <div className="flex flex-wrap items-center gap-4 mt-8">
              <button
                id="hero-cta-start"
                onClick={onStartProject}
                className="btn-primary"
              >
                <span>Start a project</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>

              <button
                id="hero-cta-explore-work"
                onClick={onExploreWork}
                className="btn-secondary"
              >
                <span>Explore work</span>
                <Compass className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Editorial Spec Ticket & Senior Engineers Highlight */}
          <div className="md:col-span-5 flex flex-col justify-between border-l border-[#CFC5B8]/80 pl-6 sm:pl-8 font-mono text-xs text-[#81776C] space-y-4">
            <div>
              <div className="text-xs text-[#24211D] font-semibold uppercase tracking-wider mb-2 flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-[#B56A3A]" />
                <span>Senior Engineering Principals</span>
              </div>
              <ul className="space-y-2 text-[#24211D]">
                <li className="flex items-center justify-between">
                  <span className="font-semibold text-[#24211D]">Ritesh Pati</span>
                  <a
                    href="https://riteshpati.indevs.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#38BDF8] hover:text-[#2563EB] flex items-center gap-1 font-mono text-xs"
                  >
                    <span>riteshpati.indevs.in</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </a>
                </li>
                <li className="flex items-center justify-between">
                  <span className="font-semibold text-[#24211D]">Satyajit Nayak</span>
                  <a
                    href="https://satyajitportfolio-amber.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#38BDF8] hover:text-[#2563EB] flex items-center gap-1 font-mono text-xs"
                  >
                    <span>satyajitportfolio-amber</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </a>
                </li>
              </ul>
            </div>

            <div className="pt-4 border-t border-[#CFC5B8]/60 text-xs space-y-1">
              <div>
                <span className="text-[#B56A3A] font-semibold">DIRECT DESK:</span> {SITE_CONFIG.contact.email}
              </div>
              <div>
                <span className="text-[#B56A3A] font-semibold">TELEPHONE:</span> {SITE_CONFIG.contact.displayPhone}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Scroll Prompt */}
      <div className="max-w-7xl mx-auto w-full px-6 sm:px-8 pt-4">
        <div className="flex items-center justify-between font-mono text-xs text-[#81776C] border-t border-[#CFC5B8]/60 pt-4">
          <div className="flex items-center gap-2 text-[#24211D]">
            <span className="animate-bounce">
              <ArrowDown className="w-3.5 h-3.5 text-[#B56A3A]" />
            </span>
            <span>SCROLL TO BEGIN STUDIO EXPERIENCE</span>
          </div>

          <div className="hidden sm:flex items-center gap-4">
            <span>HEXALOOM 2D SCROLL EXPERIENCE</span>
            <span className="text-[#B56A3A]">●</span>
            <span>CODE. DESIGN. INNOVATE.</span>
          </div>
        </div>
      </div>
    </section>
  );
};
