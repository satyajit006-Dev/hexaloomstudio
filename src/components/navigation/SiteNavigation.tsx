import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Sparkles, Sliders } from 'lucide-react';
import { SITE_CONFIG } from '../../data/siteConfig';
import { HexaloomLogo } from '../brand/HexaloomLogo';

interface SiteNavigationProps {
  currentScene: string;
  onJumpToScene: (id: string) => void;
  reducedMotion: boolean;
  onToggleReducedMotion: () => void;
  onOpenOwnerInbox?: () => void;
}

export const SiteNavigation: React.FC<SiteNavigationProps> = ({
  currentScene,
  onJumpToScene,
  reducedMotion,
  onToggleReducedMotion,
  onOpenOwnerInbox
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [indexDrawerOpen, setIndexDrawerOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu or spatial index drawer is open
  useEffect(() => {
    if (mobileMenuOpen || indexDrawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen, indexDrawerOpen]);

  const handleNavClick = (id: string) => {
    onJumpToScene(id);
    setMobileMenuOpen(false);
    setIndexDrawerOpen(false);
  };

  return (
    <>
      {/* Skip to content accessibility link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#24211D] focus:text-[#FFFDF9] focus:font-mono focus:text-xs"
      >
        Skip to main content
      </a>

      {/* Main sticky navigation header */}
      <header
        id="site-header"
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ease-out border-b ${
          isScrolled || mobileMenuOpen
            ? 'bg-[#F5F0E8]/95 backdrop-blur-md py-3.5 border-[#CFC5B8]/80 shadow-xs'
            : 'bg-transparent py-6 md:py-8 border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between">
          {/* Studio Brandmark */}
          <button
            id="nav-brand-logo"
            onClick={() => handleNavClick('hero')}
            className="flex items-center text-left group focus:outline-none focus-visible:ring-1 focus-visible:ring-[#B56A3A]"
          >
            <HexaloomLogo size="sm" variant="inline" showTagline={false} />
          </button>

          {/* Desktop Navigation Links */}
          <nav
            aria-label="Main Navigation"
            className="hidden lg:flex items-center gap-6 text-xs font-mono tracking-wider"
          >
            {SITE_CONFIG.navItems.slice(0, 6).map((item) => {
              const isActive = currentScene === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-link-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative py-1 transition-colors hover:text-[#24211D] focus:outline-none ${
                    isActive ? 'text-[#B56A3A] font-semibold' : 'text-[#81776C]'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#B56A3A]" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Cluster: Single Consolidated Index Trigger */}
          <div className="flex items-center gap-3">
            <button
              id="nav-index-drawer-toggle"
              onClick={() => setIndexDrawerOpen(!indexDrawerOpen)}
              className="btn-tab text-xs flex items-center gap-2 font-mono py-1.5 px-3"
              aria-label={indexDrawerOpen ? 'Close index roadmap' : 'Open index roadmap'}
              aria-expanded={indexDrawerOpen}
            >
              <Sliders className="w-3.5 h-3.5 text-[#B56A3A]" />
              <span>INDEX</span>
            </button>
          </div>
        </div>

        {/* Mobile slide-down menu bar - perfectly scrollable on all phone screens */}
        {mobileMenuOpen && (
          <div
            id="mobile-nav-sheet"
            className="lg:hidden border-b border-[#CFC5B8] bg-[#F5F0E8] px-6 py-6 shadow-xl animate-in slide-in-from-top-2 duration-200 max-h-[calc(100dvh-4.5rem)] overflow-y-auto overscroll-contain"
            style={{ WebkitOverflowScrolling: 'touch' }}
          >
            <div className="flex flex-col gap-2.5 font-mono text-sm mb-6">
              {SITE_CONFIG.navItems.map((item) => {
                const isActive = currentScene === item.id;
                return (
                  <button
                    key={item.id}
                    id={`mobile-nav-item-${item.id}`}
                    onClick={() => handleNavClick(item.id)}
                    className={`flex items-center justify-between py-2.5 px-2 border-b border-[#CFC5B8]/40 text-left transition-colors rounded-xs ${
                      isActive
                        ? 'bg-[#B56A3A]/10 text-[#B56A3A] font-semibold border-b-[#B56A3A]'
                        : 'text-[#24211D] hover:bg-[#FFFDF9]'
                    }`}
                  >
                    <span className="flex items-center gap-2.5">
                      <span className={`text-xs font-bold ${isActive ? 'text-[#B56A3A]' : 'text-[#81776C]'}`}>
                        {item.sceneNumber}
                      </span>
                      <span>{item.label}</span>
                    </span>
                    <ArrowUpRight className="w-4 h-4 text-[#81776C]" />
                  </button>
                );
              })}
            </div>

            <div className="flex flex-col gap-3 pt-4 border-t border-[#CFC5B8] pb-6">
              <button
                id="mobile-cta-btn"
                onClick={() => handleNavClick('contact')}
                className="btn-primary w-full flex items-center justify-center gap-2"
              >
                <span>START A PROJECT</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Spatial Index Drawer (Full scene overview for instant jump) */}
      {indexDrawerOpen && (
        <div
          id="spatial-index-backdrop"
          className="fixed inset-0 z-50 bg-[#24211D]/60 backdrop-blur-xs flex justify-end"
          onClick={() => setIndexDrawerOpen(false)}
        >
          <div
            id="spatial-index-panel"
            className="w-full sm:max-w-md bg-[#F5F0E8] h-full p-6 sm:p-8 border-l border-[#CFC5B8] overflow-y-auto flex flex-col justify-between shadow-2xl overscroll-contain"
            style={{ WebkitOverflowScrolling: 'touch' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-[#CFC5B8] mb-6">
                <div>
                  <span className="font-mono text-xs text-[#B56A3A] tracking-wider block">
                    SPATIAL INDEX
                  </span>
                  <h3 className="font-serif text-xl text-[#24211D]">Story Roadmap</h3>
                </div>
                <button
                  id="close-spatial-index"
                  onClick={() => setIndexDrawerOpen(false)}
                  className="p-2 text-[#24211D] hover:bg-[#CFC5B8]/30 transition-colors"
                  aria-label="Close index"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <p className="font-mono text-xs text-[#81776C] mb-6">
                Jump directly to any scene in the interactive story without continuous scrolling:
              </p>

              <div className="space-y-2">
                {SITE_CONFIG.navItems.map((item) => {
                  const isCurrent = currentScene === item.id;
                  return (
                    <button
                      key={item.id}
                      id={`spatial-jump-${item.id}`}
                      onClick={() => handleNavClick(item.id)}
                      className={`w-full flex items-center justify-between p-3 border transition-colors text-left font-mono text-xs ${
                        isCurrent
                          ? 'border-[#B56A3A] bg-[#B56A3A]/10 text-[#24211D]'
                          : 'border-[#CFC5B8]/60 hover:border-[#24211D] bg-[#FFFDF9]'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-[#B56A3A] font-semibold">{item.sceneNumber}</span>
                        <span className="font-medium">{item.label}</span>
                      </div>
                      {isCurrent && (
                        <span className="text-xs text-[#B56A3A] uppercase tracking-wider">
                          ACTIVE
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="pt-8 border-t border-[#CFC5B8] mt-8 text-xs font-mono text-[#81776C] space-y-3">
              {onOpenOwnerInbox && (
                <button
                  onClick={() => {
                    setIndexDrawerOpen(false);
                    onOpenOwnerInbox();
                  }}
                  className="w-full py-2.5 px-3 bg-[#24211D] text-[#FFFDF9] hover:bg-[#B56A3A] transition-colors flex items-center justify-between text-xs font-bold"
                >
                  <span className="flex items-center gap-2">
                    <Sliders className="w-3.5 h-3.5 text-[#B56A3A]" />
                    <span>OWNER LEADS PORTAL</span>
                  </span>
                  <span className="text-[10px] bg-[#B56A3A] px-1.5 py-0.5 text-white">ACCESS</span>
                </button>
              )}

              <div className="text-[#24211D] font-bold">HEXALOOM STUDIO &copy; 2026</div>
              <div>OFFICE: INFOCITY, BHUBANESWAR</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
