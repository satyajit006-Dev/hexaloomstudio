import React, { useState } from 'react';
import { SERVICES_DATA } from '../../data/services';
import { ArrowUpRight, Check, ChevronDown, Sparkles } from 'lucide-react';
import { ServiceItem } from '../../types';

interface ServicesSectionProps {
  onSelectService: (serviceName: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectService }) => {
  const [expandedId, setExpandedId] = useState<string>('web-apps');

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? '' : id));
  };

  return (
    <section
      id="services"
      aria-label="Scene 04 What We Build"
      className="py-24 sm:py-32 border-b border-[#CFC5B8] bg-[#F5F0E8] relative"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-[#CFC5B8] pb-6 mb-12 gap-4">
          <div>
            <div className="font-mono text-xs text-[#B56A3A] tracking-wider mb-2 flex items-center gap-2">
              <span>SCENE 04</span>
              <span>//</span>
              <span>STUDIO SERVICE CATALOG</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold font-sans text-[#24211D] tracking-tight">
              What We Build
            </h2>
          </div>
          <div className="font-mono text-xs text-[#81776C] max-w-xs text-left sm:text-right">
            06 CORE DISCIPLINES ENGINEERED FOR RELIABILITY & SUB-SECOND PERFORMANCE
          </div>
        </div>

        {/* 6 Services Stacked / Sequential Cards */}
        <div className="space-y-4">
          {SERVICES_DATA.map((service: ServiceItem, idx: number) => {
            const isExpanded = expandedId === service.id;
            return (
              <div
                key={service.id}
                id={`service-card-${service.id}`}
                className={`border transition-all duration-200 group ${
                  isExpanded
                    ? 'border-[#24211D] bg-[#FFFDF9] shadow-xs'
                    : 'border-[#CFC5B8] bg-[#FFFDF9]/60 hover:border-[#81776C]'
                }`}
              >
                {/* Header Strip / Clickable Trigger */}
                <div className="p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <button
                    onClick={() => toggleExpand(service.id)}
                    className="flex-1 flex items-start sm:items-center gap-4 sm:gap-8 text-left focus:outline-none focus-visible:ring-1 focus-visible:ring-[#B56A3A]"
                    aria-expanded={isExpanded}
                  >
                    <span className="font-mono text-sm sm:text-base font-bold text-[#B56A3A]">
                      {service.number}
                    </span>
                    <div>
                      <div className="font-mono text-xs text-[#81776C] tracking-wider uppercase mb-1">
                        {service.categoryTag}
                      </div>
                      <h3 className="text-xl sm:text-2xl font-bold font-sans text-[#24211D] tracking-tight group-hover:text-[#B56A3A] transition-colors">
                        {service.title}
                      </h3>
                    </div>
                  </button>

                  <div className="flex items-center gap-3 self-end sm:self-center shrink-0">
                    <span className="font-mono text-xs text-[#81776C] hidden md:inline">
                      {service.specs.latency}
                    </span>

                    {/* Prominent, consistent conversion CTA */}
                    <button
                      type="button"
                      onClick={() => onSelectService(service.title)}
                      className="btn-primary py-2 px-4 text-xs"
                      title={`Inquire about commissioning ${service.title}`}
                    >
                      <span>Inquire Now</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>

                    {/* Expand/Collapse toggle button */}
                    <button
                      type="button"
                      onClick={() => toggleExpand(service.id)}
                      aria-label={isExpanded ? `Collapse ${service.title}` : `Expand details for ${service.title}`}
                      className={`btn-icon w-8 h-8 rounded-full border border-[#CFC5B8] flex items-center justify-center transition-transform duration-200 ${
                        isExpanded ? 'rotate-180 bg-[#24211D] text-[#FFFDF9]' : 'text-[#24211D] hover:border-[#24211D]'
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Expanded Details Body */}
                {isExpanded && (
                  <div className="px-6 sm:px-8 pb-8 pt-2 border-t border-[#CFC5B8]/60 grid grid-cols-1 lg:grid-cols-12 gap-8 animate-in fade-in duration-200">
                    <div className="lg:col-span-6 space-y-4">
                      <p className="text-base text-[#24211D] leading-relaxed font-serif">
                        {service.summary}
                      </p>

                      <div className="pt-2">
                        <div className="font-mono text-xs font-semibold text-[#81776C] uppercase tracking-wider mb-2">
                          Key Deliverables
                        </div>
                        <ul className="space-y-2">
                          {service.deliverables.map((item, dIdx) => (
                            <li
                              key={dIdx}
                              className="text-xs font-mono text-[#24211D] flex items-start gap-2"
                            >
                              <Check className="w-3.5 h-3.5 text-[#B56A3A] mt-0.5 shrink-0" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Architecture Specs & CTA */}
                    <div className="lg:col-span-6 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-[#CFC5B8]/80 pt-6 lg:pt-0 lg:pl-8 space-y-6">
                      <div className="space-y-4">
                        <div className="font-mono text-xs">
                          <span className="text-[#81776C] block mb-1">ARCHITECTURE PROFILE:</span>
                          <span className="text-[#24211D] font-medium">
                            {service.specs.architecture}
                          </span>
                        </div>

                        <div>
                          <span className="font-mono text-xs text-[#81776C] block mb-2">
                            PRIMARY TOOLSETS:
                          </span>
                          <div className="flex flex-wrap gap-2">
                            {service.specs.stack.map((tech, tIdx) => (
                              <span
                                key={tIdx}
                                className="px-2.5 py-1 bg-[#F5F0E8] border border-[#CFC5B8] text-xs font-mono text-[#24211D]"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="pt-4 border-t border-[#CFC5B8]/60 flex items-center justify-between">
                        <span className="font-mono text-xs text-[#81776C]">
                          ORDER CODE: #{service.number} // AUDIT_READY
                        </span>

                        <button
                          type="button"
                          onClick={() => onSelectService(service.title)}
                          className="btn-primary py-2 px-4 text-xs"
                          title={`Inquire about commissioning ${service.title}`}
                        >
                          <span>Inquire Now</span>
                          <ArrowUpRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
