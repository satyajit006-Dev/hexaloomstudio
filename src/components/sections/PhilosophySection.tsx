import React, { useRef, useState, useEffect } from 'react';
import { Layers, ShieldCheck, Zap, Cpu } from 'lucide-react';

interface PhilosophySectionProps {
  reducedMotion: boolean;
}

export const PhilosophySection: React.FC<PhilosophySectionProps> = ({ reducedMotion }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [scrollFraction, setScrollFraction] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      // Calculate how far through this section we have scrolled
      const progress = Math.min(
        Math.max((windowHeight - rect.top) / (windowHeight + rect.height), 0),
        1
      );
      setScrollFraction(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const firstSentenceWords = ['Code', 'should', 'feel', 'invisible.'];
  const secondSentenceWords = ['Experience', 'should', 'feel', 'obvious.'];

  return (
    <section
      id="philosophy"
      ref={sectionRef}
      aria-label="Scene 02 Studio Philosophy"
      className="relative min-h-[95vh] py-24 sm:py-32 border-b border-[#CFC5B8] bg-[#F5F0E8] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header Stamp */}
        <div className="flex items-center justify-between border-b border-[#CFC5B8] pb-4 mb-16 text-xs font-mono text-[#81776C]">
          <div className="flex items-center gap-2">
            <span className="text-[#B56A3A] font-semibold">SCENE 02</span>
            <span>//</span>
            <span className="text-[#24211D] font-medium">STUDIO PHILOSOPHY</span>
          </div>
          <span className="tracking-widest">MANIFESTO & ENGINEERING ETHOS</span>
        </div>

        {/* Large Kinetic Word-Split Statement */}
        <div className="mb-20">
          <div className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-serif text-[#24211D] tracking-tight leading-[1.12]">
            <div className="flex flex-wrap gap-x-4 sm:gap-x-6 gap-y-2 mb-3">
              {firstSentenceWords.map((word, idx) => {
                const staggerDelay = idx * 0.08;
                const wordOpacity = reducedMotion
                  ? 1
                  : Math.min(Math.max((scrollFraction - 0.15 - staggerDelay) * 3, 0.25), 1);
                const wordTranslateY = reducedMotion
                  ? 0
                  : Math.max((1 - (scrollFraction - 0.15 - staggerDelay) * 2.5) * 30, 0);

                return (
                  <span
                    key={`w1-${idx}`}
                    className="inline-block transition-transform duration-100 ease-out"
                    style={{
                      opacity: wordOpacity,
                      transform: `translate3d(0, ${wordTranslateY}px, 0)`
                    }}
                  >
                    {word}
                  </span>
                );
              })}
            </div>

            <div className="flex flex-wrap gap-x-4 sm:gap-x-6 gap-y-2 text-[#B56A3A]">
              {secondSentenceWords.map((word, idx) => {
                const staggerDelay = (idx + 4) * 0.08;
                const wordOpacity = reducedMotion
                  ? 1
                  : Math.min(Math.max((scrollFraction - 0.15 - staggerDelay) * 3, 0.25), 1);
                const wordTranslateY = reducedMotion
                  ? 0
                  : Math.max((1 - (scrollFraction - 0.15 - staggerDelay) * 2.5) * 30, 0);

                return (
                  <span
                    key={`w2-${idx}`}
                    className="inline-block transition-transform duration-100 ease-out italic font-serif"
                    style={{
                      opacity: wordOpacity,
                      transform: `translate3d(0, ${wordTranslateY}px, 0)`
                    }}
                  >
                    {word}
                  </span>
                );
              })}
            </div>
          </div>
        </div>

        {/* Grid of Core Engineering Tenets */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12 border-t border-[#CFC5B8]">
          <div className="p-6 border border-[#CFC5B8] bg-[#FFFDF9] space-y-4 hover:border-[#24211D] transition-colors">
            <div className="flex items-center justify-between font-mono text-xs text-[#81776C]">
              <span>TENET 01</span>
              <Layers className="w-4 h-4 text-[#B56A3A]" />
            </div>
            <h3 className="font-sans font-bold text-lg text-[#24211D] uppercase">
              Radical Minimalism
            </h3>
            <p className="text-sm text-[#81776C] leading-relaxed">
              We eliminate decorative excess and synthetic fluff. Every line of code, HTML element, and database query must justify its footprint in latency and maintenance cost.
            </p>
            <div className="font-mono text-[11px] text-[#24211D] pt-2 border-t border-[#CFC5B8]/40">
              ZERO-SLOP PROMISE // NO MARKETING GIMMICKS
            </div>
          </div>

          <div className="p-6 border border-[#CFC5B8] bg-[#FFFDF9] space-y-4 hover:border-[#24211D] transition-colors">
            <div className="flex items-center justify-between font-mono text-xs text-[#81776C]">
              <span>TENET 02</span>
              <Zap className="w-4 h-4 text-[#B56A3A]" />
            </div>
            <h3 className="font-sans font-bold text-lg text-[#24211D] uppercase">
              Sub-second Speed
            </h3>
            <p className="text-sm text-[#81776C] leading-relaxed">
              Performance is a non-negotiable feature. We optimize time-to-first-byte, memoize expensive data transforms, and deliver 60fps locked rendering across devices.
            </p>
            <div className="font-mono text-[11px] text-[#24211D] pt-2 border-t border-[#CFC5B8]/40">
              LATENCY CEILING // &lt; 200MS TTFB
            </div>
          </div>

          <div className="p-6 border border-[#CFC5B8] bg-[#FFFDF9] space-y-4 hover:border-[#24211D] transition-colors">
            <div className="flex items-center justify-between font-mono text-xs text-[#81776C]">
              <span>TENET 03</span>
              <Cpu className="w-4 h-4 text-[#B56A3A]" />
            </div>
            <h3 className="font-sans font-bold text-lg text-[#24211D] uppercase">
              Architectural Durability
            </h3>
            <p className="text-sm text-[#81776C] leading-relaxed">
              We build systems that withstand real-world production. Strict type safety, deterministic testing, and isolated services that do not crumble under flash traffic.
            </p>
            <div className="font-mono text-[11px] text-[#24211D] pt-2 border-t border-[#CFC5B8]/40">
              TYPE-STRICT // AUDITED CI/CD
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
