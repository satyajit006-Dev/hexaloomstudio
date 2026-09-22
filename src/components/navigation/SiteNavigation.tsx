import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Sparkles, Sliders } from 'lucide-react';
import { SITE_CONFIG } from '../../data/siteConfig';
import { HexaloomLogo } from '../brand/HexaloomLogo';

interface SiteNavigationProps {
  currentScene: string;
  onJumpToScene: (id: string) => void;
  reducedMotion: boolean;
  onToggleReducedMotion: () => void;
}

export const SiteNavigation: React.FC<SiteNavigationProps> = ({
  currentScene,
  onJumpToScene,
  reducedMotion,
  onToggleReducedMotion
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
          isScrolled
            ? 'bg-[#F5F0E8]/90 backdrop-blur-md py-3.5 border-[#CFC5B8]/60 shadow-xs'
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

            <button
              id="nav-index-drawer-toggle"
              onClick={() => setIndexDrawerOpen(true)}
              className="px-2.5 py-1 text-[#81776C] hover:text-[#24211D] border border-[#CFC5B8] text-[11px] flex items-center gap-1.5 transition-colors"
            >
              <Sliders className="w-3 h-3 text-[#B56A3A]" />
              <span>INDEX</span>
            </button>
          </nav>

          {/* Right Action Cluster */}
          <div className="flex items-center gap-3">
            {/* Direct CTA */}
            <button
              id="nav-cta-start-project"
              onClick={() => handleNavClick('contact')}
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 bg-[#24211D] hover:bg-[#B56A3A] text-[#FFFDF9] font-mono text-xs tracking-wider transition-colors"
            >
              <span>START A PROJECT</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>

            {/* Mobile Hamburger Menu */}
            <button
              id="mobile-nav-hamburger"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-[#24211D] border border-[#CFC5B8] bg-[#FFFDF9] focus:outline-none"
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile slide-down menu */}
        {mobileMenuOpen && (
          <div
            id="mobile-nav-sheet"
            className="md:hidden border-b border-[#CFC5B8] bg-[#F5F0E8] px-6 py-6 shadow-md animate-in slide-in-from-top-2 duration-200"
          >
            <div className="flex flex-col gap-3 font-mono text-sm mb-6">
              {SITE_CONFIG.navItems.map((item) => (
                <button
                  key={item.id}
                  id={`mobile-nav-item-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className="flex items-center justify-between py-2 border-b border-[#CFC5B8]/40 text-left text-[#24211D]"
                >
                  <span className="flex items-center gap-2">
                    <span className="text-xs text-[#B56A3A]">{item.sceneNumber}</span>
                    <span>{item.label}</span>
                  </span>
                  <ArrowUpRight className="w-4 h-4 text-[#81776C]" />
                </button>
              ))}
            </div>

            <div className="flex flex-col gap-3 pt-2">
              <button
                id="mobile-toggle-motion-btn"
                onClick={onToggleReducedMotion}
                className="w-full py-2 border border-[#CFC5B8] font-mono text-xs text-[#24211D] flex items-center justify-center gap-2"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#B56A3A]" />
                <span>ANIMATION MODE: {reducedMotion ? 'MINIMAL' : 'FULL SCROLL'}</span>
              </button>

              <button
                id="mobile-cta-btn"
                onClick={() => handleNavClick('contact')}
                className="w-full py-3 bg-[#24211D] text-[#FFFDF9] font-mono text-xs tracking-wider uppercase flex items-center justify-center gap-2"
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
            className="w-full max-w-md bg-[#F5F0E8] h-full p-8 border-l border-[#CFC5B8] overflow-y-auto flex flex-col justify-between"
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
                        <span className="text-[10px] text-[#B56A3A] uppercase tracking-wider">
                          ACTIVE
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="pt-8 border-t border-[#CFC5B8] mt-8 text-xs font-mono text-[#81776C] space-y-1">
              <div className="text-[#24211D] font-bold">HEXALOOM STUDIO &copy; 2026</div>
              <div>OFFICE: INFOCITY, BHUBANESWAR</div>
              <div className="text-[11px] pt-1">
                <a
                  href={SITE_CONFIG.contact.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#B56A3A] hover:underline"
                >
                  Instagram: {SITE_CONFIG.contact.instagramHandle}
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
