import React from 'react';
import { SITE_CONFIG } from '../../data/siteConfig';
import { ArrowUp, ArrowUpRight, Shield, FileText, Instagram, Mail, Phone } from 'lucide-react';
import { HexaloomLogo } from '../brand/HexaloomLogo';

interface FooterSectionProps {
  onJumpToScene: (id: string) => void;
  onOpenPrivacy: () => void;
  onOpenTerms: () => void;
}

export const FooterSection: React.FC<FooterSectionProps> = ({
  onJumpToScene,
  onOpenPrivacy,
  onOpenTerms
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      id="site-footer"
      aria-label="Scene 12 Studio Footer"
      className="bg-[#24211D] text-[#FFFDF9] pt-20 pb-12 border-t border-[#3A352F] font-mono text-xs"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Upper Main Footer Grid - Evenly distributed 4-column structure */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 pb-16 border-b border-[#3A352F]">
          {/* Column 1: Studio Identity & Office Details */}
          <div className="space-y-4">
            <div className="text-xs font-bold text-[#B56A3A] uppercase tracking-wider flex items-center gap-1.5">
              <span>01 STUDIO & ETHOS</span>
            </div>

            <HexaloomLogo size="md" variant="stacked" theme="light" showTagline={true} />

            <p className="font-serif text-sm text-[#CFC5B8] leading-relaxed italic pt-1">
              Code. Design. Innovate.
            </p>

            <p className="text-xs text-[#81776C] leading-relaxed">
              Engineering architectural web applications, scalable SaaS systems, and high-performance cloud infrastructure with zero intermediaries.
            </p>

            <div className="pt-3 border-t border-[#3A352F] space-y-1.5 text-xs text-[#81776C]">
              <div className="flex items-center gap-2 text-[#FFFDF9] font-medium">
                <span className="w-2 h-2 rounded-full bg-[#527A5A] animate-pulse" />
                <span>STUDIO ACTIVE &bull; 09:00 - 18:00 IST</span>
              </div>
              <div>TECH DISTRICT &bull; INFOCITY</div>
              <div>BHUBANESWAR, ODISHA 751024, INDIA</div>
            </div>
          </div>

          {/* Column 2: Navigation Directory (Evenly organized in 2-column mini grid) */}
          <div className="space-y-4">
            <div className="text-xs font-bold text-[#B56A3A] uppercase tracking-wider flex items-center gap-1.5">
              <span>02 SCENE DIRECTORY</span>
            </div>

            <p className="text-xs text-[#81776C]">
              Direct jump links to all studio scenes and architectural portfolios:
            </p>

            <div className="grid grid-cols-2 gap-x-4 gap-y-2.5 pt-1">
              {SITE_CONFIG.navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => onJumpToScene(item.id)}
                  className="text-[#CFC5B8] hover:text-[#FFFDF9] transition-colors flex items-center gap-1.5 text-left py-0.5 focus:outline-none group"
                >
                  <span className="text-[10px] text-[#81776C] font-mono group-hover:text-[#B56A3A] transition-colors shrink-0">
                    {item.sceneNumber}
                  </span>
                  <span className="truncate group-hover:translate-x-0.5 transition-transform">
                    {item.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Column 3: Founding Developers & Portfolios */}
          <div className="space-y-4">
            <div className="text-xs font-bold text-[#B56A3A] uppercase tracking-wider flex items-center gap-1.5">
              <span>03 ENGINEERING TEAM</span>
            </div>

            <p className="text-xs text-[#81776C]">
              Direct code access and personal production portfolios:
            </p>

            <div className="space-y-3 pt-1">
              {SITE_CONFIG.seniorDevelopers.map((dev) => (
                <div
                  key={dev.name}
                  className="p-4 border border-[#3A352F] bg-[#1C1A17] space-y-2 hover:border-[#B56A3A]/60 transition-colors rounded-[24px]"
                >
                  <div className="font-bold text-[#FFFDF9] text-xs flex items-center justify-between">
                    <span>{dev.name}</span>
                    <span className="text-xs text-[#B56A3A] font-mono">{dev.initials}</span>
                  </div>
                  <div className="text-[11px] text-[#81776C] font-mono leading-tight">
                    {dev.role}
                  </div>
                  <a
                    href={dev.portfolioUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-[#38BDF8] hover:text-[#67E8F9] flex items-center justify-between pt-1 font-mono group"
                  >
                    <span className="truncate">{dev.domain}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0" />
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Column 4: Direct Channels & Connect */}
          <div className="space-y-4">
            <div className="text-xs font-bold text-[#B56A3A] uppercase tracking-wider flex items-center gap-1.5">
              <span>04 CONNECT & DESK</span>
            </div>

            <p className="text-xs text-[#81776C]">
              Inquiries, rapid project dispatch, and studio communication lines:
            </p>

            <ul className="space-y-2.5 pt-1">
              <li>
                <a
                  href={`mailto:${SITE_CONFIG.contact.email}`}
                  className="text-[#CFC5B8] hover:text-[#FFFDF9] transition-colors flex items-center justify-between group"
                >
                  <span className="flex items-center gap-2 truncate">
                    <Mail className="w-3.5 h-3.5 text-[#B56A3A] shrink-0" />
                    <span className="truncate">{SITE_CONFIG.contact.email}</span>
                  </span>
                  <ArrowUpRight className="w-3.5 h-3.5 shrink-0 text-[#81776C] group-hover:text-[#FFFDF9] transition-colors" />
                </a>
              </li>
              <li>
                <a
                  href={`tel:${SITE_CONFIG.contact.phone}`}
                  className="text-[#CFC5B8] hover:text-[#FFFDF9] transition-colors flex items-center justify-between group"
                >
                  <span className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-[#B56A3A] shrink-0" />
                    <span>{SITE_CONFIG.contact.displayPhone}</span>
                  </span>
                  <ArrowUpRight className="w-3.5 h-3.5 shrink-0 text-[#81776C] group-hover:text-[#FFFDF9] transition-colors" />
                </a>
              </li>
              <li>
                <a
                  href={`tel:${SITE_CONFIG.contact.secondaryPhone}`}
                  className="text-[#CFC5B8] hover:text-[#FFFDF9] transition-colors flex items-center justify-between group"
                >
                  <span className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-[#B56A3A] shrink-0" />
                    <span>{SITE_CONFIG.contact.displaySecondaryPhone}</span>
                  </span>
                  <ArrowUpRight className="w-3.5 h-3.5 shrink-0 text-[#81776C] group-hover:text-[#FFFDF9] transition-colors" />
                </a>
              </li>
              <li>
                <a
                  href={SITE_CONFIG.contact.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#527A5A] hover:text-[#86EFAC] transition-colors flex items-center justify-between group"
                >
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#527A5A] shrink-0" />
                    <span>WhatsApp Direct Desk</span>
                  </span>
                  <ArrowUpRight className="w-3.5 h-3.5 shrink-0 text-[#81776C] group-hover:text-[#86EFAC] transition-colors" />
                </a>
              </li>
              <li>
                <a
                  href={SITE_CONFIG.contact.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#38BDF8] hover:text-[#67E8F9] transition-colors flex items-center justify-between group"
                >
                  <span className="flex items-center gap-2">
                    <Instagram className="w-3.5 h-3.5 text-[#38BDF8] shrink-0" />
                    <span>{SITE_CONFIG.contact.instagramHandle}</span>
                  </span>
                  <ArrowUpRight className="w-3.5 h-3.5 shrink-0 text-[#81776C] group-hover:text-[#67E8F9] transition-colors" />
                </a>
              </li>
              <li>
                <a
                  href={SITE_CONFIG.contact.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#CFC5B8] hover:text-[#FFFDF9] transition-colors flex items-center justify-between group"
                >
                  <span className="flex items-center gap-2 truncate">
                    <span className="text-[#B56A3A] font-bold text-[10px] shrink-0">MAP</span>
                    <span className="truncate">Infocity, Bhubaneswar</span>
                  </span>
                  <ArrowUpRight className="w-3.5 h-3.5 shrink-0 text-[#81776C] group-hover:text-[#FFFDF9] transition-colors" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Legal, Back to Top, and Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[#81776C] text-xs">
          <div>
            &copy; 2026 {SITE_CONFIG.name}. ALL RIGHTS RESERVED. CODE. DESIGN. INNOVATE.
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={onOpenPrivacy}
              className="hover:text-[#FFFDF9] transition-colors flex items-center gap-1 focus:outline-none"
            >
              <Shield className="w-3 h-3" />
              <span>Privacy Policy</span>
            </button>

            <button
              onClick={onOpenTerms}
              className="hover:text-[#FFFDF9] transition-colors flex items-center gap-1 focus:outline-none"
            >
              <FileText className="w-3 h-3" />
              <span>Terms of Service</span>
            </button>

            <button
              onClick={scrollToTop}
              className="p-2 border border-[#3A352F] hover:border-[#FFFDF9] hover:text-[#FFFDF9] transition-colors flex items-center gap-1 rounded-full px-3"
              aria-label="Scroll back to top"
            >
              <ArrowUp className="w-3 h-3" />
              <span className="hidden sm:inline">TOP</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
