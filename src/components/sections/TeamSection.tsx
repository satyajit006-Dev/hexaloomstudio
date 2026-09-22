import React from 'react';
import { SITE_CONFIG } from '../../data/siteConfig';
import { ArrowUpRight, Code2, Cpu, ExternalLink, Terminal, Sparkles, Layers } from 'lucide-react';

interface TeamSectionProps {
  onContactLeadership: () => void;
}

export const TeamSection: React.FC<TeamSectionProps> = ({ onContactLeadership }) => {
  return (
    <section
      id="team"
      aria-label="Scene 03 Senior Engineering Leadership"
      className="py-24 sm:py-32 border-b border-[#CFC5B8] bg-[#F5F0E8] relative"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-[#CFC5B8] pb-6 mb-16 gap-4">
          <div>
            <div className="font-mono text-xs text-[#B56A3A] tracking-wider mb-2 flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>SCENE 03</span>
              <span>//</span>
              <span>ENGINEERING PRINCIPALS</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold font-sans text-[#24211D] tracking-tight">
              Senior Leadership
            </h2>
          </div>
          <div className="font-mono text-xs text-[#81776C] max-w-xs text-left sm:text-right">
            FOUNDING SENIOR DEVELOPERS // ZERO INTERMEDIARIES // DIRECT CODE ACCESS
          </div>
        </div>

        {/* Section Intro Narrative */}
        <div className="max-w-3xl mb-14 space-y-4">
          <p className="font-serif text-xl sm:text-2xl text-[#24211D] leading-relaxed italic">
            At Hexaloom Studio, clients work directly with senior software developers who write production code every single day.
          </p>
          <p className="font-sans text-sm sm:text-base text-[#81776C] leading-relaxed">
            No account managers, no offshore junior handoffs. Every architectural blueprint, performance benchmark, and release pipeline is led by our principal engineers. Explore their personal engineering portfolios below.
          </p>
        </div>

        {/* Senior Developers Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10">
          {SITE_CONFIG.seniorDevelopers.map((dev, idx) => {
            const isFirst = idx === 0;
            return (
              <div
                key={dev.name}
                id={`engineer-card-${dev.initials.toLowerCase()}`}
                className="border border-[#24211D] bg-[#FFFDF9] p-7 sm:p-9 relative flex flex-col justify-between group hover:shadow-lg transition-all duration-300"
              >
                {/* Upper Telemetry Bar */}
                <div>
                  <div className="flex items-center justify-between border-b border-[#CFC5B8] pb-4 mb-6 text-xs font-mono text-[#81776C]">
                    <div className="flex items-center gap-2">
                      <span className="text-[#B56A3A] font-bold">PRIN-{dev.initials}-0{idx + 1}</span>
                      <span>//</span>
                      <span className="uppercase text-[#24211D] font-medium">HEXALOOM CORE</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-[#527A5A]">
                      <span className="w-2 h-2 rounded-full bg-[#527A5A] animate-pulse" />
                      <span>ACTIVE PROD</span>
                    </div>
                  </div>

                  {/* Dev Identity & Title */}
                  <div className="flex items-start justify-between gap-4 mb-6">
                    <div className="space-y-1.5">
                      <a
                        href={dev.portfolioUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block group/link"
                        title={`Open ${dev.name}'s portfolio`}
                      >
                        <h3 className="text-2xl sm:text-3xl font-bold font-sans text-[#24211D] tracking-tight group-hover/link:text-[#B56A3A] transition-colors flex items-center gap-2">
                          <span>{dev.name}</span>
                          <ArrowUpRight className="w-5 h-5 text-[#81776C] group-hover/link:text-[#B56A3A] group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-all" />
                        </h3>
                      </a>
                      <div className="font-mono text-xs text-[#B56A3A] uppercase tracking-wide font-semibold flex items-center gap-2">
                        {isFirst ? <Cpu className="w-3.5 h-3.5" /> : <Layers className="w-3.5 h-3.5" />}
                        <span>{dev.role}</span>
                      </div>
                    </div>

                    {/* Monogram Badge */}
                    <a
                      href={dev.portfolioUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={`Open ${dev.name}'s portfolio`}
                      className="w-12 h-12 border border-[#24211D] bg-[#24211D] text-[#FFFDF9] hover:bg-[#B56A3A] hover:border-[#B56A3A] flex items-center justify-center font-mono text-base font-bold shrink-0 shadow-xs transition-colors"
                    >
                      {dev.initials}
                    </a>
                  </div>

                  {/* Bio */}
                  <p className="font-serif text-sm sm:text-base text-[#24211D] leading-relaxed mb-6 italic">
                    &ldquo;{dev.bio}&rdquo;
                  </p>

                  {/* Terminal-style Telemetry Card */}
                  <a
                    href={dev.portfolioUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Visit ${dev.name}'s portfolio at ${dev.domain}`}
                    className="block p-4 bg-[#1C1A17] border border-[#24211D] text-[#CFC5B8] font-mono text-xs mb-6 space-y-2 group/term hover:border-[#B56A3A] transition-colors rounded-xs"
                  >
                    <div className="flex items-center justify-between text-xs text-[#81776C] border-b border-[#81776C]/30 pb-2">
                      <span className="flex items-center gap-1.5">
                        <Terminal className="w-3.5 h-3.5 text-[#B56A3A]" />
                        <span>PORTFOLIO_ORIGIN</span>
                      </span>
                      <span className="text-[#38BDF8] font-semibold flex items-center gap-1 group-hover/term:text-[#7DD3FC] group-hover/term:underline cursor-pointer">
                        <span>{dev.domain}</span>
                        <ArrowUpRight className="w-3 h-3 text-[#38BDF8] group-hover/term:translate-x-0.5 group-hover/term:-translate-y-0.5 transition-transform" />
                      </span>
                    </div>
                    <div className="text-xs text-[#FFFDF9] flex items-center justify-between pt-1">
                      <span className="text-[#81776C]">Verified Status:</span>
                      <span className="text-[#527A5A] flex items-center gap-1.5 font-semibold">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#527A5A]" />
                        Live Production &bull; Click to View &rarr;
                      </span>
                    </div>
                  </a>

                  {/* Core Technical Capabilities Pills */}
                  <div className="space-y-2 mb-8">
                    <div className="font-mono text-xs text-[#81776C] uppercase tracking-wider">
                      Technical Specializations
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {dev.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-2.5 py-1 bg-[#F5F0E8] border border-[#CFC5B8] text-xs font-mono text-[#24211D]"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Action Buttons */}
                <div className="pt-6 border-t border-[#CFC5B8] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 font-mono text-xs">
                  <a
                    id={`portfolio-link-${dev.initials.toLowerCase()}`}
                    href={dev.portfolioUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary"
                  >
                    <span>View {dev.name.split(' ')[0]}&apos;s Portfolio</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </a>

                  <button
                    onClick={onContactLeadership}
                    className="btn-secondary"
                  >
                    <Code2 className="w-3.5 h-3.5 text-[#B56A3A]" />
                    <span>Engage with {dev.name.split(' ')[0]}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Studio Senior Engineer Commitment Banner */}
        <div className="mt-12 p-6 sm:p-8 border border-[#24211D] bg-[#24211D] text-[#FFFDF9] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 font-mono text-xs">
          <div className="space-y-1.5 max-w-xl">
            <div className="text-[#B56A3A] font-bold text-xs uppercase tracking-wider flex items-center gap-2">
              <span>HEXALOOM QUALITY GUARANTEE</span>
            </div>
            <p className="text-sm font-serif italic text-[#CFC5B8] leading-relaxed">
              Every system built by Hexaloom Studio is personally reviewed and merged by Ritesh Pati and Satyajit Nayak, assuring sub-second response times, zero tech debt, and clean scalable code.
            </p>
          </div>

          <button
            onClick={onContactLeadership}
            className="btn-accent shrink-0"
          >
            Start Project with Senior Team
          </button>
        </div>
      </div>
    </section>
  );
};
