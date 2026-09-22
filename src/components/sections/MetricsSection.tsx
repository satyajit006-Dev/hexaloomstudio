import React, { useState, useEffect, useRef } from 'react';
import { STUDIO_METRICS } from '../../data/metrics';
import { StudioMetric } from '../../types';

interface MetricsSectionProps {
  reducedMotion: boolean;
}

export const MetricsSection: React.FC<MetricsSectionProps> = ({ reducedMotion }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [hasTriggered, setHasTriggered] = useState(false);
  const [counts, setCounts] = useState<{ [key: string]: number }>({
    products: 0,
    years: 0,
    technologies: 0,
    focus: 0
  });

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current || hasTriggered) return;
      const rect = sectionRef.current.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.8) {
        setHasTriggered(true);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasTriggered]);

  useEffect(() => {
    if (!hasTriggered) return;

    if (reducedMotion) {
      setCounts({
        products: 24,
        years: 8,
        technologies: 15,
        focus: 99.4
      });
      return;
    }

    // Smooth count-up animation
    const duration = 1200;
    const startTime = performance.now();

    const updateCounts = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const easeProgress = 1 - Math.pow(1 - progress, 3);

      setCounts({
        products: Math.round(24 * easeProgress),
        years: Math.round(8 * easeProgress),
        technologies: Math.round(15 * easeProgress),
        focus: Number((99.4 * easeProgress).toFixed(1))
      });

      if (progress < 1) {
        requestAnimationFrame(updateCounts);
      }
    };

    requestAnimationFrame(updateCounts);
  }, [hasTriggered, reducedMotion]);

  return (
    <section
      id="metrics"
      ref={sectionRef}
      aria-label="Scene 09 Studio Metrics"
      className="py-24 sm:py-32 border-b border-[#CFC5B8] bg-[#F5F0E8] relative"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-[#CFC5B8] pb-6 mb-16 gap-4">
          <div>
            <div className="font-mono text-xs text-[#B56A3A] tracking-wider mb-2 flex items-center gap-2">
              <span>SCENE 09</span>
              <span>//</span>
              <span>QUANTIFIABLE RECORD</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold font-sans text-[#24211D] tracking-tight">
              Studio Metrics
            </h2>
          </div>
          <div className="font-mono text-xs text-[#81776C] max-w-xs text-left sm:text-right">
            MEASURED PRODUCTION FOOTPRINT ACROSS DISTRIBUTED DEPLOYMENTS
          </div>
        </div>

        {/* 4 Large Number Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {STUDIO_METRICS.map((metric: StudioMetric) => {
            const displayValue = counts[metric.id] ?? metric.value;
            return (
              <div
                key={metric.id}
                id={`metric-box-${metric.id}`}
                className="p-8 border border-[#24211D] bg-[#FFFDF9] flex flex-col justify-between shadow-xs hover:border-[#B56A3A] transition-colors"
              >
                <div>
                  <div className="font-mono text-5xl sm:text-6xl font-bold text-[#24211D] tracking-tighter mb-2">
                    {displayValue}
                    <span className="text-[#B56A3A]">{metric.suffix}</span>
                  </div>

                  <h3 className="font-sans font-bold text-sm tracking-wider text-[#24211D] uppercase mb-4">
                    {metric.label}
                  </h3>
                </div>

                <div className="pt-4 border-t border-[#CFC5B8]/60 font-mono text-xs text-[#81776C] leading-relaxed">
                  {metric.subtext}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
