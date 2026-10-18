import React from 'react';

interface BrandLogoProps {
  variant?: 'header' | 'footer' | 'hero' | 'mark-only';
  inverted?: boolean;
  className?: string;
}

export const ZrMonogram: React.FC<{ size?: number; className?: string; strokeColor?: string }> = ({
  size = 28,
  className = '',
  strokeColor = 'currentColor',
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 ${className}`}
      aria-label="ZR Interlocking Monogram"
    >
      {/* Outer subtle shield/circle border hairline */}
      <circle
        cx="50"
        cy="50"
        r="46"
        stroke={strokeColor}
        strokeWidth="1.5"
        strokeOpacity="0.4"
      />
      <circle
        cx="50"
        cy="50"
        r="43"
        stroke="#9A6A3A"
        strokeWidth="0.75"
        strokeOpacity="0.3"
      />

      {/* Interlocking 'Z' and 'R' Monogram paths */}
      {/* Letter Z */}
      <path
        d="M27 34H58L34 66H65"
        stroke={strokeColor}
        strokeWidth="3.2"
        strokeLinecap="square"
        strokeLinejoin="miter"
      />
      
      {/* Letter R interlocking through Z's diagonal */}
      {/* R vertical stem */}
      <path
        d="M44 34V66"
        stroke={strokeColor}
        strokeWidth="3.2"
        strokeLinecap="square"
      />
      {/* R top bowl */}
      <path
        d="M44 34H62C68.6274 34 74 38.0294 74 43C74 47.9706 68.6274 52 62 52H44"
        stroke={strokeColor}
        strokeWidth="3.2"
        strokeLinecap="square"
      />
      {/* R leg extending downward to right */}
      <path
        d="M56 52L72 66"
        stroke={strokeColor}
        strokeWidth="3.2"
        strokeLinecap="square"
      />
      
      {/* Subtle bronze deboss pin detail */}
      <circle cx="50" cy="50" r="1.5" fill="#9A6A3A" />
    </svg>
  );
};

export const BrandLogo: React.FC<BrandLogoProps> = ({
  variant = 'header',
  inverted = false,
  className = '',
}) => {
  const textColor = inverted ? 'text-[#F4EFE7]' : 'text-[#241A15]';

  if (variant === 'mark-only') {
    return <ZrMonogram size={32} className={className} strokeColor={inverted ? '#F4EFE7' : '#241A15'} />;
  }

  if (variant === 'header') {
    return (
      <div className={`flex items-center gap-2.5 ${textColor} select-none ${className}`}>
        <ZrMonogram size={26} strokeColor={inverted ? '#F4EFE7' : '#241A15'} />
        <span className="font-serif-luxury text-2xl font-semibold tracking-[0.14em] uppercase leading-none">
          ZEVRAN
        </span>
      </div>
    );
  }

  if (variant === 'footer') {
    return (
      <div className={`flex flex-col gap-2 ${textColor} ${className}`}>
        <div className="flex items-center gap-3">
          <ZrMonogram size={34} strokeColor={inverted ? '#F4EFE7' : '#241A15'} />
          <span className="font-serif-luxury text-3xl font-semibold tracking-[0.16em] uppercase">
            ZEVRAN
          </span>
        </div>
        <p className="text-[10px] tracking-[0.24em] uppercase text-[#9A6A3A] font-medium pl-1">
          Made to Become Yours.
        </p>
      </div>
    );
  }

  // Hero variant
  return (
    <div className={`flex flex-col items-center text-center gap-3 ${textColor} ${className}`}>
      <ZrMonogram size={48} strokeColor={inverted ? '#F4EFE7' : '#241A15'} />
      <span className="font-serif-luxury text-4xl md:text-5xl font-semibold tracking-[0.18em] uppercase leading-none">
        ZEVRAN
      </span>
      <span className="text-xs uppercase tracking-tagline text-[#9A6A3A] font-medium">
        Made to Become Yours
      </span>
    </div>
  );
};
