import React, { useEffect, useState } from 'react';

interface CustomCursorProps {
  reducedMotion: boolean;
}

export const CustomCursor: React.FC<CustomCursorProps> = ({ reducedMotion }) => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Detect touch device
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouchDevice(true);
      return;
    }

    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.closest('button') ||
          target.closest('a') ||
          target.closest('input') ||
          target.closest('textarea') ||
          target.closest('select') ||
          target.closest('[data-interactive="true"]'))
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    const onMouseLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [isVisible]);

  if (isTouchDevice || reducedMotion || !isVisible) {
    return null;
  }

  return (
    <>
      {/* Precision center dot */}
      <div
        className="pointer-events-none fixed z-50 rounded-full transition-transform duration-75 ease-out"
        style={{
          transform: `translate3d(${position.x}px, ${position.y}px, 0) translate(-50%, -50%)`,
          width: '6px',
          height: '6px',
          backgroundColor: isHovered ? '#B56A3A' : '#24211D'
        }}
      />
      {/* Outer subtle ring that expands on interactive elements */}
      <div
        className="pointer-events-none fixed z-50 rounded-full transition-all duration-200 ease-out"
        style={{
          transform: `translate3d(${position.x}px, ${position.y}px, 0) translate(-50%, -50%)`,
          width: isHovered ? '44px' : '22px',
          height: isHovered ? '44px' : '22px',
          border: `1.5px solid ${isHovered ? 'rgba(181, 106, 58, 0.65)' : 'rgba(36, 33, 29, 0.25)'}`,
          backgroundColor: isHovered ? 'rgba(181, 106, 58, 0.08)' : 'transparent'
        }}
      />
    </>
  );
};
