import React from 'react';

interface HexaloomLogoProps {
  variant?: 'emblem' | 'full' | 'inline' | 'stacked';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  theme?: 'dark' | 'light' | 'auto';
  showTagline?: boolean;
}

export const HexaloomLogo: React.FC<HexaloomLogoProps> = ({
  variant = 'inline',
  size = 'md',
  className = '',
  theme = 'auto',
  showTagline = true
}) => {
  // Dimension mappings for emblem
  const sizeClasses = {
    xs: 'w-6 h-6',
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-14 h-14',
    xl: 'w-20 h-20'
  };

  const textSizes = {
    xs: 'text-xs',
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-xl',
    xl: 'text-2xl'
  };

  const taglineSizes = {
    xs: 'text-[7px]',
    sm: 'text-[8px]',
    md: 'text-[9px]',
    lg: 'text-[10px]',
    xl: 'text-[11px]'
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* 3D Isometric Hexagonal Emblem (Original asset with background removed) */}
      <div className={`relative ${sizeClasses[size]} shrink-0 flex items-center justify-center`}>
        <img
          src="/assets/hexaloom-logo-trimmed.png"
          alt="Hexaloom Studio Logo"
          className="w-full h-full object-contain select-none"
          style={{
            filter: 'drop-shadow(0 2px 5px rgba(15, 23, 42, 0.3)) drop-shadow(0 1px 2px rgba(15, 23, 42, 0.2))'
          }}
          loading="eager"
          decoding="async"
        />
      </div>

      {/* Typography Lockup */}
      {variant !== 'emblem' && (
        <div className="flex flex-col select-none">
          <div className="flex items-center tracking-[0.18em] font-sans font-extrabold uppercase">
            <span
              className={`${textSizes[size]} ${
                theme === 'light' ? 'text-[#FFFDF9]' : 'text-[#24211D]'
              }`}
            >
              HE
            </span>
            <span
              className={`${textSizes[size]} text-[#38BDF8] drop-shadow-[0_0_8px_rgba(56,189,248,0.5)]`}
            >
              X
            </span>
            <span
              className={`${textSizes[size]} ${
                theme === 'light' ? 'text-[#FFFDF9]' : 'text-[#24211D]'
              }`}
            >
              ALOOM
            </span>
          </div>

          <div className="flex items-center justify-between gap-1 mt-[-2px]">
            <span
              className={`font-mono tracking-[0.35em] uppercase text-[9px] font-semibold ${
                theme === 'light' ? 'text-[#38BDF8]' : 'text-[#2563EB]'
              }`}
            >
              STUDIO
            </span>
            <div
              className={`h-[1px] flex-1 ml-1.5 ${
                theme === 'light'
                  ? 'bg-gradient-to-r from-[#38BDF8] to-transparent'
                  : 'bg-gradient-to-r from-[#2563EB] to-transparent'
              }`}
            />
          </div>

          {showTagline && (
            <div
              className={`font-mono ${taglineSizes[size]} tracking-[0.25em] text-[#81776C] uppercase mt-0.5`}
            >
              CODE. DESIGN. INNOVATE.
            </div>
          )}
        </div>
      )}
    </div>
  );
};
