import React from 'react';
import { PROJECTS_DATA } from '../../data/projects';
import { ProjectItem } from '../../types';
import { ArrowUpRight, CheckCircle, BarChart3, Layers, Terminal } from 'lucide-react';

interface SelectedWorkSectionProps {
  onOpenProjectCaseStudy: (project: ProjectItem) => void;
}

export const SelectedWorkSection: React.FC<SelectedWorkSectionProps> = ({
  onOpenProjectCaseStudy
}) => {
  return (
    <section
      id="selected-work"
      aria-label="Scene 06 Selected Work"
      className="py-24 sm:py-32 border-b border-[#CFC5B8] bg-[#F5F0E8] relative"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-[#CFC5B8] pb-6 mb-16 gap-4">
          <div>
            <div className="font-mono text-xs text-[#B56A3A] tracking-wider mb-2 flex items-center gap-2">
              <span>SCENE 06</span>
              <span>//</span>
              <span>SELECTED COMMISSIONS</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold font-sans text-[#24211D] tracking-tight">
              Selected Work
            </h2>
          </div>
          <div className="font-mono text-xs text-[#81776C] max-w-xs text-left sm:text-right">
            04 ARCHITECTURAL CASE STUDIES DEPLOYED AT SCALE
          </div>
        </div>

        {/* Project Cards (Stacked with sticky headers) */}
        <div className="space-y-16 sm:space-y-24">
          {PROJECTS_DATA.map((project: ProjectItem, index: number) => {
            return (
              <article
                key={project.id}
                id={`project-card-${project.id}`}
                className="border border-[#24211D] bg-[#FFFDF9] shadow-xs hover:border-[#B56A3A] transition-all"
              >
                {/* Project Header Bar */}
                <div className="p-6 sm:p-8 border-b border-[#CFC5B8] flex flex-wrap items-center justify-between gap-4 bg-[#F5F0E8]/50">
                  <div className="flex items-center gap-4">
                    <span className="font-mono text-base sm:text-lg font-bold text-[#B56A3A]">
                      PROJECT {project.number}
                    </span>
                    <span className="font-mono text-xs text-[#81776C]">// {project.client}</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="px-2.5 py-1 bg-[#24211D] text-[#FFFDF9] font-mono text-xs uppercase tracking-wider">
                      {project.category}
                    </span>
                    <span className="font-mono text-xs text-[#81776C]">{project.year}</span>
                  </div>
                </div>

                {/* Main Content & Visual Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 sm:p-10">
                  {/* Left Column: Project Overview & Metrics */}
                  <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-2xl sm:text-3xl font-bold font-sans text-[#24211D] tracking-tight">
                        {project.title}
                      </h3>
                      <p className="font-serif text-base text-[#81776C] italic">
                        {project.tagline}
                      </p>
                      <p className="text-sm sm:text-base text-[#24211D] leading-relaxed">
                        {project.summary}
                      </p>

                      {/* Tech Stack Pills */}
                      <div className="pt-2">
                        <div className="font-mono text-xs text-[#81776C] uppercase mb-2">
                          Engineered With:
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {project.stack.map((item, sIdx) => (
                            <span
                              key={sIdx}
                              className="px-2 py-1 bg-[#F5F0E8] border border-[#CFC5B8] font-mono text-xs text-[#24211D]"
                            >
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Impact Metrics Bento */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-[#CFC5B8]/80 font-mono">
                      {project.impactMetrics.map((m, mIdx) => (
                        <div key={mIdx} className="p-2.5 bg-[#F5F0E8]/70 border border-[#CFC5B8]/60">
                          <div className="text-lg font-bold text-[#B56A3A] tracking-tight">
                            {m.value}
                          </div>
                          <div className="text-xs text-[#81776C] uppercase leading-tight mt-0.5">
                            {m.label}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Action */}
                    <div className="pt-4">
                      <button
                        id={`view-case-study-btn-${project.id}`}
                        onClick={() => onOpenProjectCaseStudy(project)}
                        className="btn-primary"
                      >
                        <span>Explore 5-Stage Case Study</span>
                        <ArrowUpRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Right Column: Architectural Visual Schema */}
                  <div className="lg:col-span-6 bg-[#24211D] text-[#FFFDF9] p-6 sm:p-8 flex flex-col justify-between border border-[#24211D]">
                    <div className="space-y-6">
                      <div className="flex items-center justify-between border-b border-[#81776C]/40 pb-3 text-xs font-mono">
                        <span className="text-[#B56A3A] flex items-center gap-1.5">
                          <Terminal className="w-3.5 h-3.5" />
                          <span>ARCHITECTURE_SCHEMA_V{project.number}.TS</span>
                        </span>
                        <span className="text-[#CFC5B8] text-xs">VERIFIED_BUILD</span>
                      </div>

                      {/* Editorial Visual Diagrams */}
                      <div className="p-4 bg-[#1C1A17] border border-[#81776C]/30 font-mono text-xs text-[#CFC5B8] space-y-3">
                        <div className="text-[#B56A3A] font-semibold">// PRODUCTION PIPELINE EXECUTION:</div>
                        <div className="space-y-2 text-xs">
                          <div className="flex items-center justify-between border-b border-[#81776C]/20 pb-1.5">
                            <span className="text-[#81776C]">01 INGRESS:</span>
                            <span className="text-[#FFFDF9]">Edge Gateway (Global Anycast)</span>
                          </div>
                          <div className="flex items-center justify-between border-b border-[#81776C]/20 pb-1.5">
                            <span className="text-[#81776C]">02 STATE MACHINE:</span>
                            <span className="text-[#FFFDF9]">Optimistic CRDT / WebSocket Bus</span>
                          </div>
                          <div className="flex items-center justify-between border-b border-[#81776C]/20 pb-1.5">
                            <span className="text-[#81776C]">03 PERSISTENCE:</span>
                            <span className="text-[#FFFDF9]">Postgres ACID + Redis Cluster</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-[#81776C]">04 LATENCY TARGET:</span>
                            <span className="text-[#B56A3A] font-bold">&lt; 50ms Glass-to-Glass</span>
                          </div>
                        </div>
                      </div>

                      {/* Case study stages mini checklist preview */}
                      <div className="font-mono text-xs space-y-1.5">
                        <div className="text-xs text-[#81776C] uppercase mb-1">
                          Audited Case Study Stages:
                        </div>
                        <div className="grid grid-cols-5 gap-1.5 text-center text-xs">
                          {project.caseStudyStages.map((stg) => (
                            <div
                              key={stg.step}
                              className="py-1.5 bg-[#2A2722] border border-[#81776C]/30 text-[#CFC5B8]"
                            >
                              <div className="text-[#B56A3A] font-bold">{stg.step}</div>
                              <div className="truncate">{stg.title}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="pt-6 border-t border-[#81776C]/40 flex items-center justify-between text-xs font-mono text-[#81776C] mt-6">
                      <span>CLIENT: {project.client.toUpperCase()}</span>
                      <span className="text-[#527A5A]">● ZERO REGRESSION RATE</span>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
