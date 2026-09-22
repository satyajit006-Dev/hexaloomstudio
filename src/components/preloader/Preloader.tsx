import React, { useEffect, useState } from 'react';
import { HexaloomLogo } from '../brand/HexaloomLogo';

interface PreloaderProps {
  onComplete: () => void;
  reducedMotion: boolean;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete, reducedMotion }) => {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<'loading' | 'finishing' | 'done'>('loading');

  useEffect(() => {
    if (reducedMotion) {
      onComplete();
      return;
    }

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setPhase('finishing');
          setTimeout(() => {
            setPhase('done');
            onComplete();
          }, 350);
          return 100;
        }
        // Rapid increment to reach 100% in ~600ms
        const increment = Math.floor(Math.random() * 22) + 14;
        return Math.min(prev + increment, 100);
      });
    }, 60);

    return () => clearInterval(interval);
  }, [reducedMotion, onComplete]);

  if (phase === 'done') return null;

  return (
    <div
      id="preloader-overlay"
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#F5F0E8] transition-opacity duration-500 ease-out ${
        phase === 'finishing' ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="flex flex-col items-center max-w-sm px-6 text-center">
        {/* Hexaloom Studio Emblem */}
        <div className="mb-6 flex items-center justify-center">
          <HexaloomLogo size="lg" variant="emblem" />
        </div>

        <p className="font-mono text-xs uppercase tracking-widest text-[#2563EB] mb-1 font-bold">
          HEXALOOM STUDIO
        </p>

        <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#81776C] mb-4">
          CODE. DESIGN. INNOVATE.
        </p>

        <h1 className="font-serif text-lg tracking-tight text-[#24211D] mb-8 italic">
          Architectural Software Craft
        </h1>

        {/* Progress bar */}
        <div className="w-56 h-[2px] bg-[#CFC5B8] overflow-hidden relative mb-3">
          <div
            className="h-full bg-[#2563EB] transition-all duration-100 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="flex justify-between w-56 font-mono text-[11px] text-[#81776C]">
          <span>INIT_RUNTIME</span>
          <span className="text-[#24211D] font-medium">{progress}%</span>
        </div>
      </div>
    </div>
  );
};
