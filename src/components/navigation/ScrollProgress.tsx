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
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="relative flex items-center justify-end">
      {/* Tooltip visible only on hover / focus */}
      <span
        role="tooltip"
        id={`scene-tooltip-${item.id}`}
        className={`absolute right-6 px-2.5 py-1 rounded bg-[#24211D] text-[#FFFDF9] font-mono text-xs whitespace-nowrap shadow-md pointer-events-none transition-all duration-150 z-50 ${
          isHovered
            ? 'opacity-100 translate-x-0'
            : 'opacity-0 translate-x-2'
        }`}
      >
        <span className="text-[#B56A3A] font-bold mr-1.5">{item.sceneNumber}</span>
        <span>{item.label}</span>
      </span>

      <button
        id={`scene-nav-dot-${item.id}`}
        onClick={() => onJumpToScene(item.id)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onFocus={() => setIsHovered(true)}
        onBlur={() => setIsHovered(false)}
        className="p-1.5 rounded-full focus:outline-none focus-visible:ring-1 focus-visible:ring-[#B56A3A]"
        title={`Scene ${item.sceneNumber}: ${item.label}`}
        aria-label={`Jump to Scene ${item.sceneNumber}: ${item.label}`}
      >
        {/* Dot indicator */}
        <span
          className={`block rounded-full transition-all duration-200 ${
            isActive
              ? 'w-2.5 h-2.5 bg-[#B56A3A] ring-2 ring-[#B56A3A]/40 scale-125'
              : 'w-2 h-2 bg-[#CFC5B8] hover:bg-[#24211D] hover:scale-110'
          }`}
        />
      </button>
    </div>
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

      {/* Right side floating scene tracker (Desktop) with safe margin from viewport edge */}
      <aside
        aria-label="Scene navigation"
        style={{ marginLeft: '1000000000px' }}
        className="fixed right-8 xl:right-10 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-center pointer-events-auto bg-[#FFFDF9]/90 backdrop-blur-sm border border-[#CFC5B8]/80 py-3 px-1.5 rounded-full shadow-xs ml-[1000000000px]"
      >
        <nav className="flex flex-col items-center gap-1.5" aria-label="Quick scene jumper">
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
