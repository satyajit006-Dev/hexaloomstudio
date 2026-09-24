import React, { useState, useEffect, useCallback } from 'react';
import { SiteNavigation } from './components/navigation/SiteNavigation';
import { ScrollProgress } from './components/navigation/ScrollProgress';
import { CustomCursor } from './components/cursor/CustomCursor';
import { Preloader } from './components/preloader/Preloader';

import { HeroSection } from './components/sections/HeroSection';
import { PhilosophySection } from './components/sections/PhilosophySection';
import { TeamSection } from './components/sections/TeamSection';
import { ServicesSection } from './components/sections/ServicesSection';
import { TechStackSection } from './components/sections/TechStackSection';
import { SelectedWorkSection } from './components/sections/SelectedWorkSection';
import { CaseStudyViewer } from './components/sections/CaseStudyViewer';
import { ProcessTimelineSection } from './components/sections/ProcessTimelineSection';
import { MetricsSection } from './components/sections/MetricsSection';
import { TestimonialsSection } from './components/sections/TestimonialsSection';
import { CtaSection } from './components/sections/CtaSection';
import { ContactSection } from './components/sections/ContactSection';
import { FooterSection } from './components/sections/FooterSection';

import { ProjectDetailModal } from './components/modals/ProjectDetailModal';
import { LegalModal } from './components/modals/LegalModal';
import { CookieConsent } from './components/modals/CookieConsent';
import { OwnerInboxModal } from './components/modals/OwnerInboxModal';
import { ProjectItem } from './types';
import { SITE_CONFIG } from './data/siteConfig';

export default function App() {
  const [preloaderDone, setPreloaderDone] = useState(false);
  const [currentScene, setCurrentScene] = useState<string>('hero');
  const [selectedProjectForModal, setSelectedProjectForModal] = useState<ProjectItem | null>(null);
  const [legalModalType, setLegalModalType] = useState<'privacy' | 'terms' | null>(null);
  const [preselectedServiceForContact, setPreselectedServiceForContact] = useState<string>('');
  const [isOwnerInboxOpen, setIsOwnerInboxOpen] = useState(false);

  // Reduced motion support
  const [reducedMotion, setReducedMotion] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
    return false;
  });

  // Smooth jump to scene without forcing linear scroll
  const handleJumpToScene = useCallback((sceneId: string) => {
    const el = document.getElementById(sceneId);
    if (el) {
      const topOffset = 80;
      const elementPosition = el.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - topOffset;

      window.scrollTo({
        top: Math.max(offsetPosition, 0),
        behavior: reducedMotion ? 'auto' : 'smooth'
      });
      setCurrentScene(sceneId);
    }
  }, [reducedMotion]);

  // Section Observer to track active scene
  useEffect(() => {
    const sceneIds = SITE_CONFIG.navItems.map((n) => n.id);

    const handleScrollObserver = () => {
      const scrollMiddle = window.scrollY + window.innerHeight * 0.35;

      for (let i = sceneIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sceneIds[i]);
        if (el) {
          const top = el.offsetTop;
          if (scrollMiddle >= top) {
            setCurrentScene(sceneIds[i]);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScrollObserver, { passive: true });
    handleScrollObserver();
    return () => window.removeEventListener('scroll', handleScrollObserver);
  }, []);

  const handleCommissionService = (serviceTitle: string) => {
    setPreselectedServiceForContact(serviceTitle);
    handleJumpToScene('contact');
  };

  return (
    <div className="relative min-h-screen bg-[#F5F0E8] text-[#24211D]">
      {/* Editorial Preloader */}
      {!preloaderDone && (
        <Preloader
          onComplete={() => setPreloaderDone(true)}
          reducedMotion={reducedMotion}
        />
      )}

      {/* Refined Dot Cursor */}
      <CustomCursor reducedMotion={reducedMotion} />

      {/* Sticky Top Navigation & Spatial Drawer */}
      <SiteNavigation
        currentScene={currentScene}
        onJumpToScene={handleJumpToScene}
        reducedMotion={reducedMotion}
        onToggleReducedMotion={() => setReducedMotion(!reducedMotion)}
        onOpenOwnerInbox={() => setIsOwnerInboxOpen(true)}
      />

      {/* Top Track & Right Side Floating Scene Index */}
      <ScrollProgress
        currentScene={currentScene}
        onJumpToScene={handleJumpToScene}
      />

      {/* Main Sequential Interactive Story Canvas */}
      <main id="main-content" tabIndex={-1} className="focus:outline-none">
        {/* Scene 01 — Opening / Hero */}
        <HeroSection
          onStartProject={() => handleJumpToScene('contact')}
          onExploreWork={() => handleJumpToScene('selected-work')}
        />

        {/* Scene 02 — Studio Philosophy */}
        <PhilosophySection reducedMotion={reducedMotion} />

        {/* Scene 03 — Senior Engineering Leadership */}
        <TeamSection onContactLeadership={() => handleJumpToScene('contact')} />

        {/* Scene 04 — What We Build (Services) */}
        <ServicesSection onSelectService={handleCommissionService} />

        {/* Scene 04 — Technical Architecture Wall */}
        <TechStackSection />

        {/* Scene 05 — Selected Work (Sticky Project Containers) */}
        <SelectedWorkSection
          onOpenProjectCaseStudy={(proj) => setSelectedProjectForModal(proj)}
        />

        {/* Scene 06 — Continuous 5-Stage Case Study Audit */}
        <CaseStudyViewer />

        {/* Scene 07 — Development Process Timeline */}
        <ProcessTimelineSection reducedMotion={reducedMotion} />

        {/* Scene 08 — Studio Metrics */}
        <MetricsSection reducedMotion={reducedMotion} />

        {/* Scene 09 — Testimonials & Trust */}
        <TestimonialsSection />

        {/* Scene 10 — Call to Action (Espresso Canvas) */}
        <CtaSection onStartProject={() => handleJumpToScene('contact')} />

        {/* Scene 11 — Comprehensive Contact & Ticket Specification */}
        <ContactSection
          preselectedService={preselectedServiceForContact}
          onOpenOwnerInbox={() => setIsOwnerInboxOpen(true)}
        />
      </main>

      {/* Scene 12 — Studio Footer */}
      <FooterSection
        onJumpToScene={handleJumpToScene}
        onOpenPrivacy={() => setLegalModalType('privacy')}
        onOpenTerms={() => setLegalModalType('terms')}
        onOpenOwnerInbox={() => setIsOwnerInboxOpen(true)}
      />

      {/* Project Case Study Deep Dive Modal */}
      <ProjectDetailModal
        project={selectedProjectForModal}
        onClose={() => setSelectedProjectForModal(null)}
        onCommissionSimilar={handleCommissionService}
      />

      {/* Legal Information Modal (Privacy / Terms) */}
      <LegalModal
        type={legalModalType}
        onClose={() => setLegalModalType(null)}
      />

      {/* Owner Leads & Commission Inquiries Inbox */}
      <OwnerInboxModal
        isOpen={isOwnerInboxOpen}
        onClose={() => setIsOwnerInboxOpen(false)}
      />

      {/* Cookie & Telemetry Consent System */}
      <CookieConsent />
    </div>
  );
}
