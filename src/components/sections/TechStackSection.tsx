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
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-[#CFC5B8] pb-6 mb-12 gap-4">
          <div>
            <div className="font-mono text-xs text-[#B56A3A] tracking-wider mb-2 flex items-center gap-2">
              <span>SCENE 05</span>
              <span>//</span>
              <span>TECHNICAL ARCHITECTURE WALL</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold font-sans text-[#24211D] tracking-tight uppercase">
              What We Use
            </h2>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap items-center gap-1.5 font-mono text-xs">
            {TECH_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                id={`tech-filter-${cat.id}`}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3 py-1.5 border transition-all ${
                  activeCategory === cat.id
                    ? 'border-[#24211D] bg-[#24211D] text-[#FFFDF9]'
                    : 'border-[#CFC5B8] bg-[#FFFDF9] text-[#81776C] hover:border-[#24211D] hover:text-[#24211D]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* The Technical Wall Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
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
                  className={`p-4 border text-left transition-all relative group focus:outline-none ${
                    isSelected
                      ? 'border-[#B56A3A] bg-[#24211D] text-[#FFFDF9] shadow-xs'
                      : 'border-[#CFC5B8] bg-[#FFFDF9] text-[#24211D] hover:border-[#24211D]'
                  }`}
                >
                  {/* Status Indicator Tag */}
                  <div className="flex items-center justify-between font-mono text-[10px] mb-3">
                    <span
                      className={`uppercase ${
                        isSelected ? 'text-[#B56A3A]' : 'text-[#81776C]'
                      }`}
                    >
                      {tech.category}
                    </span>
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        isSelected ? 'bg-[#B56A3A]' : 'bg-[#CFC5B8]'
                      }`}
                    />
                  </div>

                  <div className="font-mono text-sm sm:text-base font-bold tracking-tight mb-1">
                    {tech.name}
                  </div>

                  <div
                    className={`text-[11px] truncate ${
                      isSelected ? 'text-[#CFC5B8]' : 'text-[#81776C]'
                    }`}
                  >
                    {tech.role}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Inspector Terminal Panel (Columns 8-12) */}
          <div className="lg:col-span-5">
            <div className="border border-[#24211D] bg-[#24211D] text-[#FFFDF9] p-6 sm:p-8 flex flex-col justify-between h-full relative font-mono">
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-[#81776C]/40 pb-4 text-xs">
                  <span className="text-[#B56A3A] font-semibold">
                    INSPECTOR // {selectedTech.name}
                  </span>
                  <span className="text-[#CFC5B8] uppercase text-[10px]">
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

              <div className="pt-6 border-t border-[#81776C]/40 text-[11px] text-[#81776C] flex items-center justify-between mt-6">
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
