import React, { useState, useEffect, useRef } from 'react';
import { PROCESS_STAGES } from '../../data/process';
import { ProcessStage } from '../../types';
import { Clock, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface ProcessTimelineProps {
  reducedMotion: boolean;
}

export const ProcessTimelineSection: React.FC<ProcessTimelineProps> = ({ reducedMotion }) => {
  const containerRef = useRef<HTMLElement>(null);
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [timelineProgress, setTimelineProgress] = useState(33);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const totalScrollable = rect.height;
      const currentScroll = windowHeight - rect.top;

      const pct = Math.min(Math.max((currentScroll / (windowHeight + totalScrollable)) * 100, 0), 100);
      setTimelineProgress(pct);

      // Map progress to active step
      const step = Math.min(
        Math.floor((pct / 100) * PROCESS_STAGES.length),
        PROCESS_STAGES.length - 1
      );
      setActiveStepIndex(Math.max(step, 0));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      id="process"
      ref={containerRef}
      aria-label="Scene 08 Development Process"
      className="py-24 sm:py-32 border-b border-[#CFC5B8] bg-[#F5F0E8] relative"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-[#CFC5B8] pb-6 mb-12 gap-4">
          <div>
            <div className="font-mono text-xs text-[#B56A3A] tracking-wider mb-2 flex items-center gap-2">
              <span>SCENE 08</span>
              <span>//</span>
              <span>ENGINEERING PROTOCOL</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold font-sans text-[#24211D] tracking-tight uppercase">
              Development Process
            </h2>
          </div>
          <div className="font-mono text-xs text-[#81776C] max-w-xs text-left sm:text-right">
            SIX STRICT PHASES FROM INITIAL RFC TO ZERO-DOWNTIME ROLLOUT
          </div>
        </div>

        {/* Global Timeline Track / Scrub Bar */}
        <div className="border border-[#24211D] bg-[#FFFDF9] p-6 sm:p-8 mb-12 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono text-xs mb-6">
            <div className="flex items-center gap-3">
              <span className="text-[#81776C]">TIMELINE COMPLETION:</span>
              <span className="font-bold text-[#B56A3A] text-sm">
                {Math.round(timelineProgress)}%
              </span>
            </div>
            <div className="text-[#81776C]">
              PHASE {PROCESS_STAGES[activeStepIndex].number}: {PROCESS_STAGES[activeStepIndex].name}
            </div>
          </div>

          {/* Interactive Step Line */}
          <div className="relative">
            <div className="h-[3px] w-full bg-[#CFC5B8] relative">
              <div
                className="h-full bg-[#B56A3A] transition-all duration-150 ease-out"
                style={{ width: `${timelineProgress}%` }}
              />
            </div>

            {/* Stepper Node Badges */}
            <div className="grid grid-cols-6 pt-4 text-center font-mono">
              {PROCESS_STAGES.map((stg, sIdx) => {
                const isReached = sIdx <= activeStepIndex;
                const isCurrent = sIdx === activeStepIndex;
                return (
                  <button
                    key={stg.number}
                    id={`process-node-${stg.number}`}
                    onClick={() => setActiveStepIndex(sIdx)}
                    className="flex flex-col items-center group focus:outline-none"
                  >
                    <div
                      className={`w-4 h-4 rounded-full border-2 -mt-[26px] mb-2 transition-all ${
                        isCurrent
                          ? 'border-[#B56A3A] bg-[#24211D] ring-4 ring-[#B56A3A]/20 scale-125'
                          : isReached
                          ? 'border-[#527A5A] bg-[#527A5A]'
                          : 'border-[#CFC5B8] bg-[#FFFDF9]'
                      }`}
                    />
                    <span
                      className={`text-[10px] sm:text-xs font-bold transition-colors ${
                        isCurrent
                          ? 'text-[#B56A3A]'
                          : isReached
                          ? 'text-[#24211D]'
                          : 'text-[#81776C]'
                      }`}
                    >
                      {stg.name}
                    </span>
                    <span className="hidden md:inline text-[9px] text-[#81776C]">
                      {stg.duration}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* 6 Stage Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROCESS_STAGES.map((stage: ProcessStage, idx: number) => {
            const isCurrent = idx === activeStepIndex;
            return (
              <div
                key={stage.number}
                id={`process-card-${stage.number}`}
                onClick={() => setActiveStepIndex(idx)}
                className={`p-6 sm:p-8 border cursor-pointer transition-all flex flex-col justify-between ${
                  isCurrent
                    ? 'border-[#24211D] bg-[#24211D] text-[#FFFDF9] shadow-md scale-[1.01]'
                    : 'border-[#CFC5B8] bg-[#FFFDF9] text-[#24211D] hover:border-[#81776C]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between font-mono text-xs mb-4">
                    <span
                      className={`font-bold ${
                        isCurrent ? 'text-[#B56A3A]' : 'text-[#81776C]'
                      }`}
                    >
                      STAGE {stage.number}
                    </span>
                    <span
                      className={`px-2 py-0.5 text-[10px] uppercase border ${
                        isCurrent
                          ? 'border-[#81776C] text-[#CFC5B8]'
                          : 'border-[#CFC5B8] text-[#81776C]'
                      }`}
                    >
                      {stage.duration}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold font-sans tracking-tight uppercase mb-1">
                    {stage.name}
                  </h3>
                  <div
                    className={`font-serif italic text-sm mb-4 ${
                      isCurrent ? 'text-[#CFC5B8]' : 'text-[#81776C]'
                    }`}
                  >
                    {stage.label}
                  </div>

                  <p
                    className={`text-sm leading-relaxed mb-6 font-sans ${
                      isCurrent ? 'text-[#FFFDF9]/90' : 'text-[#24211D]'
                    }`}
                  >
                    {stage.description}
                  </p>

                  <div className="space-y-2 mb-6">
                    <div
                      className={`font-mono text-[10px] uppercase tracking-wider ${
                        isCurrent ? 'text-[#CFC5B8]' : 'text-[#81776C]'
                      }`}
                    >
                      Key Deliverables:
                    </div>
                    {stage.deliverables.map((del, dIdx) => (
                      <div
                        key={dIdx}
                        className="text-xs font-mono flex items-start gap-2"
                      >
                        <CheckCircle2
                          className={`w-3.5 h-3.5 mt-0.5 shrink-0 ${
                            isCurrent ? 'text-[#B56A3A]' : 'text-[#527A5A]'
                          }`}
                        />
                        <span className={isCurrent ? 'text-[#FFFDF9]' : 'text-[#24211D]'}>
                          {del}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div
                  className={`pt-4 border-t text-[11px] font-mono ${
                    isCurrent
                      ? 'border-[#81776C]/40 text-[#CFC5B8]'
                      : 'border-[#CFC5B8]/80 text-[#81776C]'
                  }`}
                >
                  <span className="block font-semibold mb-0.5">EXIT GATE:</span>
                  <span>{stage.gateCriteria}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
