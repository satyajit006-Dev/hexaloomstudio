import React, { useState, useEffect } from 'react';
import { SITE_CONFIG } from '../../data/siteConfig';
import { ArrowUp, ArrowUpRight, Shield, FileText, Sparkles, Instagram, Mail, Phone, Inbox } from 'lucide-react';
import { HexaloomLogo } from '../brand/HexaloomLogo';
import { leadService } from '../../services/leadService';

interface FooterSectionProps {
  onJumpToScene: (id: string) => void;
  onOpenPrivacy: () => void;
  onOpenTerms: () => void;
  onOpenOwnerInbox?: () => void;
}

export const FooterSection: React.FC<FooterSectionProps> = ({
  onJumpToScene,
  onOpenPrivacy,
  onOpenTerms,
  onOpenOwnerInbox
}) => {
  const [inquiryCount, setInquiryCount] = useState(0);

  useEffect(() => {
    const updateCount = () => {
      setInquiryCount(leadService.getInquiries().length);
    };
    updateCount();
    window.addEventListener('hexaloom_new_inquiry', updateCount);
    window.addEventListener('hexaloom_inquiry_updated', updateCount);
    return () => {
      window.removeEventListener('hexaloom_new_inquiry', updateCount);
      window.removeEventListener('hexaloom_inquiry_updated', updateCount);
    };
  }, []);

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
        {/* Upper Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-[#3A352F]">
          {/* Col 1-4: Studio Brand & Ethos */}
          <div className="md:col-span-4 space-y-6">
            <HexaloomLogo size="md" variant="stacked" theme="light" showTagline={true} />

            <p className="font-serif text-base text-[#CFC5B8] max-w-sm leading-relaxed italic">
              Code. Design. Innovate.
            </p>

            <p className="text-xs text-[#81776C] max-w-sm leading-relaxed">
              Hexaloom Studio engineers architectural web applications, scalable SaaS platforms, and resilient cloud backends led directly by senior software architects.
            </p>

            <div className="pt-2 text-xs text-[#81776C]">
              OFFICE: TECH DISTRICT // INFOCITY // BHUBANESWAR // INDIA
            </div>
          </div>

          {/* Col 5-6: Navigation Directory */}
          <div className="md:col-span-2 space-y-4">
            <div className="text-xs font-bold text-[#B56A3A] uppercase tracking-wider">
              Navigation
            </div>
            <ul className="space-y-2.5">
              {SITE_CONFIG.navItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => onJumpToScene(item.id)}
                    className="text-[#CFC5B8] hover:text-[#FFFDF9] transition-colors flex items-center gap-2 text-left"
                  >
                    <span className="text-xs text-[#81776C]">{item.sceneNumber}</span>
                    <span>{item.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 7-9: Senior Developers Portfolios */}
          <div className="md:col-span-3 space-y-4">
            <div className="text-xs font-bold text-[#B56A3A] uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3 h-3 text-[#38BDF8]" />
              <span>Senior Principals</span>
            </div>
            <div className="space-y-4">
              {SITE_CONFIG.seniorDevelopers.map((dev) => (
                <div key={dev.name} className="p-3 border border-[#3A352F] bg-[#1C1A17] space-y-1.5">
                  <div className="font-bold text-[#FFFDF9] text-xs flex items-center justify-between">
                    <span>{dev.name}</span>
                    <span className="text-xs text-[#B56A3A]">{dev.initials}</span>
                  </div>
                  <a
                    href={dev.portfolioUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] text-[#38BDF8] hover:text-[#67E8F9] flex items-center gap-1 pt-1 font-mono"
                    style={{ fontSize: '11px' }}
                  >
                    <span style={{ fontSize: '10px' }} className="text-[10px]">{dev.domain}</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Col 10-12: Direct Channels & Connect */}
          <div className="md:col-span-3 space-y-4">
            <div className="text-xs font-bold text-[#B56A3A] uppercase tracking-wider">
              Contact & Connect
            </div>
            <ul className="space-y-2.5">
              <li>
                <a
                  href={`mailto:${SITE_CONFIG.contact.email}`}
                  className="text-[#CFC5B8] hover:text-[#FFFDF9] transition-colors flex items-center justify-between"
                >
                  <span className="flex items-center gap-2 truncate">
                    <Mail className="w-3.5 h-3.5 text-[#B56A3A]" />
                    <span className="truncate">{SITE_CONFIG.contact.email}</span>
                  </span>
                  <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />
                </a>
              </li>
              <li>
                <a
                  href={`tel:${SITE_CONFIG.contact.phone}`}
                  className="text-[#CFC5B8] hover:text-[#FFFDF9] transition-colors flex items-center justify-between"
                >
                  <span className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-[#B56A3A]" />
                    <span>{SITE_CONFIG.contact.displayPhone}</span>
                  </span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </li>
              <li>
                <a
                  href={`tel:${SITE_CONFIG.contact.secondaryPhone}`}
                  className="text-[#CFC5B8] hover:text-[#FFFDF9] transition-colors flex items-center justify-between"
                >
                  <span className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-[#B56A3A]" />
                    <span>{SITE_CONFIG.contact.displaySecondaryPhone}</span>
                  </span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </li>
              <li>
                <a
                  href={SITE_CONFIG.contact.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#38BDF8] hover:text-[#67E8F9] transition-colors flex items-center justify-between"
                >
                  <span className="flex items-center gap-2">
                    <Instagram className="w-3.5 h-3.5 text-[#38BDF8]" />
                    <span>{SITE_CONFIG.contact.instagramHandle}</span>
                  </span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </li>
              <li>
                <a
                  href={SITE_CONFIG.contact.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#527A5A] hover:text-[#FFFDF9] transition-colors flex items-center justify-between"
                >
                  <span>WhatsApp: Direct Desk</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </li>
              <li>
                <a
                  href={SITE_CONFIG.contact.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#CFC5B8] hover:text-[#FFFDF9] transition-colors flex items-center justify-between"
                >
                  <span>Infocity, Bhubaneswar</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
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

          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            {onOpenOwnerInbox && (
              <button
                onClick={onOpenOwnerInbox}
                className="text-[#B56A3A] hover:text-[#FFFDF9] transition-colors flex items-center gap-1.5 focus:outline-none font-bold"
                title="Open Studio Owner Inquiries & Leads Dashboard"
              >
                <Inbox className="w-3.5 h-3.5" />
                <span>Owner Leads ({inquiryCount})</span>
              </button>
            )}

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
              className="p-2 border border-[#3A352F] hover:border-[#FFFDF9] hover:text-[#FFFDF9] transition-colors flex items-center gap-1"
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
