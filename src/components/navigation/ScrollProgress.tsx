import React, { useEffect, useState, useRef } from 'react';
import { SITE_CONFIG } from '../../data/siteConfig';

interface ScrollProgressProps {
  currentScene: string;
  onJumpToScene: (id: string) => void;
}

interface SceneNavItemProps {
  item: { id: string; sceneNumber: string; label: string };
  isActive: boolean;
  onJumpToScene: (id: string) => void;
}

const SceneNavDotItem: React.FC<SceneNavItemProps> = ({
  item,
  isActive,
  onJumpToScene
}) => {
  const [isSpanVisible, setIsSpanVisible] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (isActive) {
      setIsSpanVisible(true);
      timerRef.current = setTimeout(() => {
        setIsSpanVisible(false);
      }, 2000);
    } else {
      setIsSpanVisible(false);
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isActive]);

  const handleMouseEnter = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setIsSpanVisible(true);
    timerRef.current = setTimeout(() => {
      setIsSpanVisible(false);
    }, 2000);
  };

  const handleMouseLeave = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setIsSpanVisible(false);
  };

  return (
    <button
      id={`scene-nav-dot-${item.id}`}
      onClick={() => onJumpToScene(item.id)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="group flex items-center gap-2.5 py-0.5 focus:outline-none focus-visible:ring-1 focus-visible:ring-[#B56A3A]"
      title={`Scene ${item.sceneNumber}: ${item.label}`}
      aria-label={`Jump to Scene ${item.sceneNumber}: ${item.label}`}
    >
      {/* Floating label visible for 2s then blending to invisible slowly */}
      <span
        className={`font-mono text-[10px] tracking-wider uppercase transition-all ease-out ${
          isActive ? 'text-[#B56A3A] font-semibold' : 'text-[#81776C]'
        } ${
          isSpanVisible
            ? 'opacity-100 translate-x-0 duration-200'
            : 'opacity-0 -translate-x-2 duration-700 pointer-events-none'
        }`}
      >
        {item.sceneNumber} {item.label}
      </span>

      {/* Dot indicator */}
      <span
        className={`block rounded-full transition-all duration-200 ${
          isActive
            ? 'w-2.5 h-2.5 bg-[#B56A3A] ring-2 ring-[#B56A3A]/30 scale-110'
            : 'w-1.5 h-1.5 bg-[#CFC5B8] group-hover:bg-[#24211D]'
        }`}
      />
    </button>
  );
};

export const ScrollProgress: React.FC<ScrollProgressProps> = ({
  currentScene,
  onJumpToScene
}) => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
      const height =
        document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
      setScrollProgress(Math.min(Math.max(scrolled, 0), 100));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Top persistent scroll progress bar */}
      <div
        id="global-scroll-track"
        className="fixed top-0 left-0 right-0 h-[3px] bg-[#CFC5B8]/40 z-50 pointer-events-none"
      >
        <div
          id="global-scroll-thumb"
          className="h-full bg-[#B56A3A] transition-[width] duration-75 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Right side floating scene tracker (Desktop) */}
      <aside
        aria-label="Scene navigation"
        className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-end gap-3.5 pointer-events-auto"
      >
        <div className="font-mono text-[10px] tracking-widest text-[#81776C] rotate-90 origin-right translate-x-3 mb-4">
          SCENE_INDEX
        </div>

        <nav className="flex flex-col items-end gap-2.5">
          {SITE_CONFIG.navItems.map((item) => (
            <SceneNavDotItem
              key={item.id}
              item={item}
              isActive={currentScene === item.id}
              onJumpToScene={onJumpToScene}
            />
          ))}
        </nav>
      </aside>
    </>
  );
};
