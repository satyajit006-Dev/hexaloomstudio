import React, { useEffect, useState } from 'react';

interface ScrollProgressProps {
  currentScene: string;
  onJumpToScene: (id: string) => void;
}

export const ScrollProgress: React.FC<ScrollProgressProps> = () => {
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
    /* Top persistent scroll progress bar */
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
  );
};
