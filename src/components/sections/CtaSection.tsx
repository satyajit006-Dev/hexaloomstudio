import React from 'react';
import { ArrowUpRight, MessageSquare, Sparkles, Instagram } from 'lucide-react';
import { SITE_CONFIG } from '../../data/siteConfig';

interface CtaSectionProps {
  onStartProject: () => void;
}

export const CtaSection: React.FC<CtaSectionProps> = ({ onStartProject }) => {
  return (
    <section
      id="cta"
      aria-label="Scene 10 Call to Action"
      className="py-28 sm:py-36 bg-[#24211D] text-[#FFFDF9] border-b border-[#24211D] relative bg-grain-dark overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12 border-b border-[#81776C]/30 pb-16">
          <div className="space-y-6">
            <div className="font-mono text-xs text-[#B56A3A] tracking-widest uppercase flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              <span>COMMISSION CONTRACTS</span>
            </div>

            <h2 className="text-4xl sm:text-6xl md:text-7xl font-bold font-sans tracking-tight text-[#FFFDF9] leading-[1.02]">
              Let&apos;s build <br />
              something <br />
              <span className="text-[#B56A3A] font-serif italic font-normal">useful.</span>
            </h2>
          </div>

          <div className="max-w-md space-y-8 font-mono">
            <p className="text-base text-[#CFC5B8] leading-relaxed font-serif italic text-lg">
              Have an architectural challenge, a product prototype to launch, or an existing codebase that demands sub-second performance?
            </p>

            <div className="space-y-4">
              <button
                id="cta-start-conversation-btn"
                onClick={onStartProject}
                className="btn-accent w-full sm:w-auto flex items-center justify-center gap-3 shadow-md"
              >
                <span>Start a conversation</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-4 text-xs text-[#81776C] pt-2">
                <span>REPLY TIME: &lt; 24 HOURS</span>
                <span>//</span>
                <span>CONFIDENTIAL NDAs SIGNED</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Contact Links Banner */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-10 font-mono text-xs text-[#CFC5B8]">
          <div className="p-4 border border-[#81776C]/30 bg-[#1C1A17]">
            <div className="text-xs text-[#81776C] uppercase mb-1">DIRECT INQUIRY</div>
            <a
              href={`mailto:${SITE_CONFIG.contact.email}`}
              className="text-[#FFFDF9] hover:text-[#B56A3A] transition-colors font-medium break-all"
            >
              {SITE_CONFIG.contact.email}
            </a>
          </div>

          <div className="p-4 border border-[#81776C]/30 bg-[#1C1A17]">
            <div className="text-xs text-[#81776C] uppercase mb-1">TELEPHONE DESK</div>
            <div className="flex flex-col gap-1">
              <a
                href={`tel:${SITE_CONFIG.contact.phone}`}
                className="text-[#FFFDF9] hover:text-[#B56A3A] transition-colors font-medium text-xs sm:text-sm"
              >
                {SITE_CONFIG.contact.displayPhone}
              </a>
              <a
                href={`tel:${SITE_CONFIG.contact.secondaryPhone}`}
                className="text-[#CFC5B8] hover:text-[#B56A3A] transition-colors font-medium text-xs sm:text-sm"
              >
                {SITE_CONFIG.contact.displaySecondaryPhone}
              </a>
            </div>
          </div>

          <div className="p-4 border border-[#81776C]/30 bg-[#1C1A17]">
            <div className="text-xs text-[#81776C] uppercase mb-1">INSTAGRAM</div>
            <a
              href={SITE_CONFIG.contact.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#38BDF8] hover:text-[#67E8F9] transition-colors font-medium flex items-center gap-1.5"
            >
              <Instagram className="w-3.5 h-3.5" />
              <span>{SITE_CONFIG.contact.instagramHandle}</span>
            </a>
          </div>

          <div className="p-4 border border-[#81776C]/30 bg-[#1C1A17]">
            <div className="text-xs text-[#81776C] uppercase mb-1">WHATSAPP CHAT</div>
            <a
              href={SITE_CONFIG.contact.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#B56A3A] hover:text-[#FFFDF9] transition-colors font-medium flex items-center gap-1.5"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Direct Chat (+91...)</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
