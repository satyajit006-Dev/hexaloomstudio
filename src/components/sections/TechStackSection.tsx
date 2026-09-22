import React, { useState } from 'react';
import { TECH_STACK_DATA, TECH_CATEGORIES } from '../../data/techStack';
import { TechnologyItem } from '../../types';
import { Code2, Server, Cloud, Sparkles, Filter } from 'lucide-react';

export const TechStackSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedTech, setSelectedTech] = useState<TechnologyItem>(TECH_STACK_DATA[0]);

  const filteredTech = activeCategory === 'all'
    ? TECH_STACK_DATA
    : TECH_STACK_DATA.filter((item) => item.category === activeCategory);

  return (
    <section
      id="tech-stack"
      aria-label="Scene 05 Technical Wall"
      className="py-24 sm:py-32 border-b border-[#CFC5B8] bg-[#F5F0E8] relative"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header with Left-Aligned Filter Controls */}
        <div className="border-b border-[#CFC5B8] pb-6 mb-12 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="font-mono text-xs text-[#B56A3A] tracking-wider mb-2 flex items-center gap-2">
                <span>SCENE 05</span>
                <span>//</span>
                <span>TECHNICAL ARCHITECTURE WALL</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-bold font-sans text-[#24211D] tracking-tight">
                What We Use
              </h2>
            </div>
            <div className="font-mono text-xs text-[#81776C]">
              PRODUCTION-HARDENED STACK // ZERO FLUFF
            </div>
          </div>

          {/* Category Filters (Left-aligned in direct visual path) */}
          <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
            <span className="text-[#81776C] mr-1 flex items-center gap-1.5 font-semibold">
              <Filter className="w-3.5 h-3.5 text-[#B56A3A]" />
              <span>FILTER:</span>
            </span>
            {TECH_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                id={`tech-filter-${cat.id}`}
                onClick={() => setActiveCategory(cat.id)}
                className={`btn-tab ${
                  activeCategory === cat.id ? 'active font-semibold' : ''
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* The Technical Wall Layout with unified visual proximity */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Tech Grid (Columns 1-7) */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-3">
            {filteredTech.map((tech) => {
              const isSelected = selectedTech.name === tech.name;
              return (
                <button
                  key={tech.name}
                  id={`tech-node-${tech.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                  onClick={() => setSelectedTech(tech)}
                  onMouseEnter={() => setSelectedTech(tech)}
                  className={`p-4 border text-left transition-all relative group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B56A3A] ${
                    isSelected
                      ? 'border-[#B56A3A] bg-[#24211D] text-[#FFFDF9] shadow-sm z-10'
                      : 'border-[#CFC5B8] bg-[#FFFDF9] text-[#24211D] hover:border-[#24211D]'
                  }`}
                  aria-pressed={isSelected}
                >
                  {/* Status Indicator Tag */}
                  <div className="flex items-center justify-between font-mono text-xs mb-3">
                    <span
                      className={`uppercase ${
                        isSelected ? 'text-[#B56A3A]' : 'text-[#81776C]'
                      }`}
                    >
                      {tech.category}
                    </span>
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        isSelected ? 'bg-[#B56A3A] ring-2 ring-[#B56A3A]/40' : 'bg-[#CFC5B8]'
                      }`}
                    />
                  </div>

                  <div className="font-mono text-sm sm:text-base font-bold tracking-tight mb-1">
                    {tech.name}
                  </div>

                  <div
                    className={`text-xs truncate ${
                      isSelected ? 'text-[#CFC5B8]' : 'text-[#81776C]'
                    }`}
                  >
                    {tech.role}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Inspector Terminal Panel (Columns 8-12) - Sticky with tight proximity */}
          <div className="lg:col-span-5 lg:sticky lg:top-24">
            <div className="border border-[#24211D] bg-[#24211D] text-[#FFFDF9] p-6 sm:p-7 flex flex-col justify-between shadow-md relative font-mono">
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-[#81776C]/40 pb-4 text-xs">
                  <span className="text-[#B56A3A] font-semibold flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#B56A3A] animate-pulse" />
                    <span>INSPECTOR // {selectedTech.name}</span>
                  </span>
                  <span className="text-[#CFC5B8] uppercase text-xs">
                    STATUS: {selectedTech.status}
                  </span>
                </div>

                <div>
                  <div className="text-xs text-[#81776C] uppercase mb-1">SYSTEM ROLE</div>
                  <h3 className="text-2xl font-bold font-sans text-[#FFFDF9] tracking-tight">
                    {selectedTech.role}
                  </h3>
                </div>

                <div className="bg-[#1C1A17] p-4 border border-[#81776C]/30 text-xs text-[#CFC5B8] leading-relaxed">
                  <span className="text-[#B56A3A] block font-semibold mb-1">// ARCHITECTURAL IMPACT:</span>
                  {selectedTech.highlight}
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex justify-between py-1.5 border-b border-[#81776C]/30 text-[#CFC5B8]">
                    <span className="text-[#81776C]">PRODUCTION READINESS:</span>
                    <span className="text-[#FFFDF9]">100% AUDITED</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-[#81776C]/30 text-[#CFC5B8]">
                    <span className="text-[#81776C]">DEPLOYMENT PIPELINE:</span>
                    <span className="text-[#FFFDF9]">STRICT AUTOMATED CI</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-[#81776C]/30 text-[#CFC5B8]">
                    <span className="text-[#81776C]">TYPE COUPLING:</span>
                    <span className="text-[#B56A3A] font-semibold">ZERO RUNTIME ESCAPES</span>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-[#81776C]/40 text-xs text-[#81776C] flex items-center justify-between mt-6">
                <span>PRESS OR HOVER ANY COMPONENT TO AUDIT</span>
                <span className="text-[#B56A3A]">● VERIFIED</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
