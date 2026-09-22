import React, { useState } from 'react';
import { ProjectItem } from '../../types';
import { X, CheckCircle, Terminal, ArrowUpRight, ChevronRight, Activity } from 'lucide-react';

interface ProjectDetailModalProps {
  project: ProjectItem | null;
  onClose: () => void;
  onCommissionSimilar: (title: string) => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  project,
  onClose,
  onCommissionSimilar
}) => {
  const [selectedStageIndex, setSelectedStageIndex] = useState(0);

  if (!project) return null;

  const currentStage = project.caseStudyStages[selectedStageIndex];

  return (
    <div
      id="project-detail-modal-backdrop"
      className="fixed inset-0 z-50 bg-[#24211D]/80 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6"
      onClick={onClose}
    >
      <div
        id="project-detail-modal-window"
        className="bg-[#F5F0E8] border border-[#24211D] max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-10 shadow-2xl flex flex-col justify-between"
        onClick={(e) => e.stopPropagation()}
      >
        <div>
          {/* Header */}
          <div className="flex items-center justify-between border-b border-[#CFC5B8] pb-4 mb-6">
            <div className="flex items-center gap-3">
              <span className="font-mono text-sm font-bold text-[#B56A3A]">
                PROJECT {project.number}
              </span>
              <span className="text-[#81776C] font-mono text-xs">// {project.category}</span>
            </div>

            <button
              onClick={onClose}
              className="btn-icon"
              aria-label="Close project modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Project Title & Overview */}
          <div className="space-y-4 mb-8">
            <h2 className="text-3xl sm:text-4xl font-bold font-sans text-[#24211D] tracking-tight">
              {project.title}
            </h2>
            <p className="font-serif italic text-base sm:text-lg text-[#81776C]">
              {project.tagline}
            </p>
            <p className="text-sm sm:text-base text-[#24211D] leading-relaxed">
              {project.summary}
            </p>

            {/* Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-[#CFC5B8]/80 font-mono">
              {project.impactMetrics.map((m, idx) => (
                <div key={idx} className="p-3 bg-[#FFFDF9] border border-[#CFC5B8]">
                  <div className="text-lg font-bold text-[#B56A3A]">{m.value}</div>
                  <div className="text-xs text-[#81776C] uppercase mt-0.5">{m.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* 5-Stage Audit Selector */}
          <div className="border border-[#24211D] bg-[#FFFDF9] p-6 space-y-6">
            <div className="flex items-center justify-between border-b border-[#CFC5B8] pb-3 text-xs font-mono">
              <span className="text-[#B56A3A] font-bold">5-STAGE ENGINEERING AUDIT</span>
              <span className="text-[#81776C]">SELECT STAGE TO INSPECT</span>
            </div>

            {/* Stage Pills */}
            <div className="grid grid-cols-5 gap-2 font-mono text-xs">
              {project.caseStudyStages.map((stg, sIdx) => {
                const isSelected = sIdx === selectedStageIndex;
                return (
                  <button
                    key={stg.step}
                    onClick={() => setSelectedStageIndex(sIdx)}
                    className={`py-2 px-1 text-center border transition-all ${
                      isSelected
                        ? 'border-[#B56A3A] bg-[#24211D] text-[#FFFDF9]'
                        : 'border-[#CFC5B8] bg-[#F5F0E8] text-[#81776C] hover:border-[#24211D]'
                    }`}
                  >
                    <div className="text-xs font-bold text-[#B56A3A]">{stg.step}</div>
                    <div className="truncate text-xs font-medium">{stg.title}</div>
                  </button>
                );
              })}
            </div>

            {/* Stage Narrative Box */}
            <div className="space-y-4 pt-2">
              <div className="flex items-center gap-2 font-mono text-xs text-[#B56A3A]">
                <span>STAGE {currentStage.step}:</span>
                <span className="text-[#24211D] font-bold uppercase">{currentStage.title}</span>
              </div>

              <h4 className="font-sans font-bold text-lg text-[#24211D]">
                {currentStage.headline}
              </h4>

              <p className="text-sm text-[#24211D] font-serif leading-relaxed">
                {currentStage.description}
              </p>

              <div className="space-y-2 pt-2">
                {currentStage.bulletPoints.map((bp, bIdx) => (
                  <div key={bIdx} className="flex items-start gap-2 text-xs text-[#24211D]">
                    <ChevronRight className="w-3.5 h-3.5 text-[#B56A3A] shrink-0 mt-0.5" />
                    <span>{bp}</span>
                  </div>
                ))}
              </div>

              {currentStage.codeOrMetricSnippet && (
                <div className="p-3 bg-[#1C1A17] border border-[#24211D] text-[#CFC5B8] font-mono text-xs mt-3">
                  <span className="text-[#81776C] block text-xs mb-1">// TELEMETRY PROBE:</span>
                  <code className="text-[#FFFDF9]">{currentStage.codeOrMetricSnippet}</code>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="pt-6 border-t border-[#CFC5B8] mt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono text-xs">
          <div className="text-[#81776C]">
            CLIENT: {project.client} // {project.year}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="btn-secondary"
            >
              Close
            </button>

            <button
              onClick={() => {
                onClose();
                onCommissionSimilar(project.category);
              }}
              className="btn-primary"
            >
              <span>Commission Similar System</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
