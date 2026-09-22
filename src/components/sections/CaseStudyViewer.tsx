import React, { useState } from 'react';
import { PROJECTS_DATA } from '../../data/projects';
import { ProjectItem, CaseStudyStage } from '../../types';
import { CheckCircle2, ChevronRight, Terminal, Activity, Zap, Cpu, Sparkles, Layers } from 'lucide-react';

export const CaseStudyViewer: React.FC = () => {
  const [activeProject, setActiveProject] = useState<ProjectItem>(PROJECTS_DATA[0]);
  const [activeStageIndex, setActiveStageIndex] = useState<number>(0);

  const currentStage: CaseStudyStage = activeProject.caseStudyStages[activeStageIndex];

  return (
    <section
      id="case-study"
      aria-label="Scene 07 Case Study Interaction"
      className="py-24 sm:py-32 border-b border-[#CFC5B8] bg-[#F5F0E8] relative"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="border-b border-[#CFC5B8] pb-6 mb-8">
          <div className="font-mono text-xs text-[#B56A3A] tracking-wider mb-2 flex items-center gap-2">
            <span>SCENE 07</span>
            <span>//</span>
            <span>CONTINUOUS CASE STUDY AUDIT</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <h2 className="text-3xl sm:text-5xl font-bold font-sans text-[#24211D] tracking-tight">
              5-Stage Engineering Breakdown
            </h2>
            <div className="font-mono text-xs text-[#81776C]">
              END-TO-END TECHNICAL DELIVERY PIPELINE
            </div>
          </div>
        </div>

        {/* Level 1: Project Selection Shelf (Hierarchical Grouping) */}
        <div className="mb-8 p-4 bg-[#FFFDF9] border border-[#CFC5B8] flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs font-mono text-[#81776C]">
            <Layers className="w-4 h-4 text-[#B56A3A]" />
            <span className="font-semibold text-[#24211D]">SELECT PROJECT:</span>
            <span className="text-xs text-[#81776C] hidden sm:inline">Choose an engagement to inspect</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {PROJECTS_DATA.map((proj) => (
              <button
                key={proj.id}
                id={`case-study-proj-btn-${proj.id}`}
                onClick={() => {
                  setActiveProject(proj);
                  setActiveStageIndex(0);
                }}
                className={`btn-tab ${
                  activeProject.id === proj.id ? 'active font-semibold' : ''
                }`}
              >
                <span className="text-[#B56A3A] font-bold">{proj.number}</span>
                <span className="truncate">{proj.title.split(' ')[0]}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Level 2: 5-Stage Interactive Progress Stepper for Selected Project */}
        <div className="mb-3 flex items-center justify-between font-mono text-xs text-[#81776C]">
          <span className="font-semibold text-[#24211D] flex items-center gap-1.5">
            <span>PIPELINE STEPS FOR:</span>
            <span className="text-[#B56A3A] font-bold uppercase">{activeProject.title}</span>
          </span>
          <span>STEP {activeStageIndex + 1} OF 5</span>
        </div>

        <div className="grid grid-cols-5 gap-2 sm:gap-4 mb-8 font-mono text-xs">
          {activeProject.caseStudyStages.map((stage, idx) => {
            const isActive = idx === activeStageIndex;
            const isCompleted = idx < activeStageIndex;
            return (
              <button
                key={stage.step}
                id={`case-stage-btn-${stage.step}`}
                onClick={() => setActiveStageIndex(idx)}
                className={`p-3 sm:p-4 border text-left transition-all ${
                  isActive
                    ? 'border-[#B56A3A] bg-[#24211D] text-[#FFFDF9] shadow-xs'
                    : isCompleted
                    ? 'border-[#CFC5B8] bg-[#FFFDF9] text-[#24211D]'
                    : 'border-[#CFC5B8]/60 bg-[#F5F0E8] text-[#81776C]'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span
                    className={`font-bold text-xs ${
                      isActive ? 'text-[#B56A3A]' : isCompleted ? 'text-[#527A5A]' : 'text-[#81776C]'
                    }`}
                  >
                    STAGE {stage.step}
                  </span>
                  {isCompleted && <CheckCircle2 className="w-3.5 h-3.5 text-[#527A5A]" />}
                </div>
                <div className="font-bold text-xs sm:text-sm uppercase tracking-tight truncate">
                  {stage.title}
                </div>
              </button>
            );
          })}
        </div>

        {/* 2-Column Split Case Study Viewer */}
        <div className="border border-[#24211D] bg-[#FFFDF9] grid grid-cols-1 lg:grid-cols-12 min-h-[500px]">
          {/* Left Column: Narrative Structured Content */}
          <div className="lg:col-span-6 p-8 sm:p-12 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-[#CFC5B8]">
            <div className="space-y-6">
              <div className="flex items-center gap-2 font-mono text-xs text-[#B56A3A]">
                <span>STAGE {currentStage.step} OF 05</span>
                <span>//</span>
                <span className="uppercase text-[#24211D] font-bold">{currentStage.title}</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold font-sans text-[#24211D] leading-tight">
                {currentStage.headline}
              </h3>

              <p className="text-base text-[#24211D] font-serif leading-relaxed">
                {currentStage.description}
              </p>

              <div className="pt-2">
                <div className="font-mono text-xs text-[#81776C] uppercase mb-3 font-semibold">
                  Engineering Notes & Key Findings:
                </div>
                <ul className="space-y-2.5">
                  {currentStage.bulletPoints.map((pt, pIdx) => (
                    <li key={pIdx} className="flex items-start gap-2.5 text-sm text-[#24211D]">
                      <ChevronRight className="w-4 h-4 text-[#B56A3A] mt-0.5 shrink-0" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Stage Navigation Buttons */}
            <div className="flex items-center justify-between pt-8 mt-8 border-t border-[#CFC5B8]/80 font-mono text-xs">
              <button
                disabled={activeStageIndex === 0}
                onClick={() => setActiveStageIndex((prev) => Math.max(prev - 1, 0))}
                className="btn-secondary disabled:opacity-40 disabled:cursor-not-allowed"
              >
                &larr; Previous Stage
              </button>

              <button
                disabled={activeStageIndex === activeProject.caseStudyStages.length - 1}
                onClick={() =>
                  setActiveStageIndex((prev) =>
                    Math.min(prev + 1, activeProject.caseStudyStages.length - 1)
                  )
                }
                className="btn-primary disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Next Stage &rarr;
              </button>
            </div>
          </div>

          {/* Right Column: Visual Stage Telemetry & Architecture Terminal */}
          <div className="lg:col-span-6 bg-[#24211D] text-[#FFFDF9] p-8 sm:p-12 flex flex-col justify-between font-mono">
            <div className="space-y-6">
              {/* Terminal Header */}
              <div className="flex items-center justify-between pb-4 border-b border-[#81776C]/40 text-xs">
                <div className="flex items-center gap-2 text-[#B56A3A]">
                  <Terminal className="w-4 h-4" />
                  <span>AUDIT_TELEMETRY // {activeProject.id.toUpperCase()}</span>
                </div>
                <span className="text-[#527A5A]">● ACTIVE BENCHMARK</span>
              </div>

              {/* Big Metric Badge */}
              <div className="p-6 bg-[#1C1A17] border border-[#81776C]/30 text-center space-y-1">
                <div className="text-4xl sm:text-5xl font-bold font-mono text-[#B56A3A] tracking-tight">
                  {currentStage.visualData.metricValue}
                </div>
                <div className="text-xs text-[#81776C] uppercase tracking-wider">
                  {currentStage.visualData.metricLabel}
                </div>
              </div>

              {/* Code / Command / Execution Snippet */}
              {currentStage.codeOrMetricSnippet && (
                <div className="p-4 bg-[#141311] border border-[#81776C]/20 text-xs text-[#CFC5B8] leading-relaxed">
                  <span className="text-[#81776C] block mb-1 text-xs">
                    // MONITORED RUNTIME TRACE:
                  </span>
                  <code className="text-[#FFFDF9] break-all">
                    {currentStage.codeOrMetricSnippet}
                  </code>
                </div>
              )}

              {/* Architectural telemetry status rows */}
              <div className="space-y-2 text-xs text-[#CFC5B8]">
                <div className="flex justify-between py-1.5 border-b border-[#81776C]/30">
                  <span className="text-[#81776C]">DATA ISOLATION:</span>
                  <span className="text-[#FFFDF9]">MULTI-TENANT SECURE</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-[#81776C]/30">
                  <span className="text-[#81776C]">EDGE PROPAGATION:</span>
                  <span className="text-[#FFFDF9]">38 GLOBAL REGIONS</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-[#81776C]/30">
                  <span className="text-[#81776C]">STATIC CODE AUDIT:</span>
                  <span className="text-[#B56A3A] font-semibold">ZERO FATAL WARNINGS</span>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-[#81776C]/40 flex items-center justify-between text-xs text-[#81776C] mt-6">
              <span>PROJECT: {activeProject.title}</span>
              <span className="text-[#FFFDF9]">STAGE {currentStage.step} VERIFIED</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
