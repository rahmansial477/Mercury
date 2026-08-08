import React from 'react';

interface LogoProps {
  className?: string;
  size?: number;
  showText?: boolean;
  variant?: 'mercury' | 'liquid_gothic';
  badgeBg?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ 
  className = '', 
  size = 32, 
  showText = true,
}) => {
  return (
    <div className={`inline-flex items-center gap-3 select-none group cursor-pointer ${className}`}>
      {/* Contained Box / Frame around Logo Icon */}
      <div className="relative p-1.5 sm:p-2 rounded-xl bg-[#1D1718] border border-[#988686]/80 shadow-[0_2px_12px_rgba(0,0,0,0.7)] flex items-center justify-center shrink-0 group-hover:border-[#D1D0D0] group-hover:bg-[#2A2122] transition-all">
        <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-[#D1D0D0]/20 via-[#988686]/25 to-transparent pointer-events-none" />
        
        <svg
          width={size}
          height={size}
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="relative transform transition-transform duration-300 group-hover:scale-105"
        >
          <defs>
            {/* Outer Silhouette Black Shadow Filter */}
            <filter id="mercuryEmblemGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#000000" floodOpacity="0.8" />
            </filter>

            {/* Silver-Chrome Left Flame Gradient */}
            <linearGradient id="silverFlame" x1="10%" y1="0%" x2="90%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="25%" stopColor="#E6DFDA" />
              <stop offset="60%" stopColor="#AD9F9A" />
              <stop offset="100%" stopColor="#4A3F40" />
            </linearGradient>

            {/* Mauve-Charcoal Right Flame Gradient */}
            <linearGradient id="mauveFlame" x1="10%" y1="0%" x2="90%" y2="100%">
              <stop offset="0%" stopColor="#C4B4B5" />
              <stop offset="35%" stopColor="#7A686A" />
              <stop offset="75%" stopColor="#403335" />
              <stop offset="100%" stopColor="#1A1213" />
            </linearGradient>

            {/* Droplet Central Core Gradient */}
            <radialGradient id="dropletCore" cx="35%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="30%" stopColor="#EAE1E1" />
              <stop offset="65%" stopColor="#A89496" />
              <stop offset="100%" stopColor="#4A393B" />
            </radialGradient>

            {/* Dark Charcoal Back Shadow Flame Gradient */}
            <linearGradient id="darkBackFlame" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4A3D3E" />
              <stop offset="50%" stopColor="#2A2021" />
              <stop offset="100%" stopColor="#0F0B0C" />
            </linearGradient>
          </defs>

          <g filter="url(#mercuryEmblemGlow)">
            {/* 1. Deepest Back Dark Flame Silhouette */}
            <path
              d="M 50 95 C 44 86 16 68 14 48 C 12 32 22 18 30 10 C 26 22 30 32 36 38 C 30 26 38 12 48 4 C 42 18 48 28 54 34 C 52 22 62 12 70 8 C 66 22 72 32 78 38 C 84 26 88 38 86 52 C 84 70 56 86 50 95 Z"
              fill="url(#darkBackFlame)"
              stroke="#080607"
              strokeWidth="2.5"
              strokeLinejoin="round"
            />

            {/* 2. Outer Left Silver Swoop Flame Tendril */}
            <path
              d="M 50 95 C 42 84 18 64 20 48 C 22 36 30 26 36 20 C 30 28 32 38 38 46 C 34 52 32 60 38 68 C 42 74 48 82 50 95 Z"
              fill="url(#silverFlame)"
              stroke="#080607"
              strokeWidth="2"
              strokeLinejoin="round"
            />

            {/* 3. Main Center-Left Tall Silver Flame Tip */}
            <path
              d="M 50 95 C 46 80 34 62 38 44 C 40 34 36 22 48 4 C 40 18 44 32 50 40 C 52 46 50 56 48 66 C 46 76 48 88 50 95 Z"
              fill="url(#silverFlame)"
              stroke="#080607"
              strokeWidth="2"
              strokeLinejoin="round"
            />

            {/* 4. Right Mauve Flame Tendrils */}
            <path
              d="M 50 95 C 52 86 58 74 58 64 C 58 54 52 44 56 36 C 60 30 68 22 70 8 C 64 20 66 30 72 38 C 76 44 80 36 82 46 C 84 58 76 72 64 82 C 58 88 52 92 50 95 Z"
              fill="url(#mauveFlame)"
              stroke="#080607"
              strokeWidth="2"
              strokeLinejoin="round"
            />

            {/* 5. Inner Mauve Flame Layer behind Droplet */}
            <path
              d="M 50 90 C 52 82 60 70 60 58 C 60 48 54 40 58 32 C 60 26 66 18 68 12 C 64 22 62 30 66 38 C 68 44 70 54 66 66 C 60 78 52 86 50 90 Z"
              fill="url(#mauveFlame)"
              stroke="#080607"
              strokeWidth="1.8"
              strokeLinejoin="round"
            />

            {/* 6. Central Mercury Liquid Teardrop / Droplet */}
            <path
              d="M 50 42 C 40 50 36 60 40 70 C 44 78 54 78 58 70 C 62 60 58 50 50 42 Z"
              fill="#181213"
              stroke="#080607"
              strokeWidth="2"
            />

            {/* Main Liquid Teardrop Droplet */}
            <path
              d="M 50 45 C 42 52 38 61 42 69 C 45 75 53 75 56 69 C 60 61 56 52 50 45 Z"
              fill="url(#dropletCore)"
              stroke="#080607"
              strokeWidth="1.5"
            />

            {/* Specular Highlight Gloss Spot on Teardrop */}
            <ellipse cx="45" cy="56" rx="2" ry="4" transform="rotate(-20 45 56)" fill="#FFFFFF" opacity="0.9" />
          </g>
        </svg>
      </div>

      {showText && (
        <span className="font-cinzel text-xl sm:text-2xl font-bold tracking-[0.2em] text-[#D1D0D0] bg-gradient-to-r from-white via-[#D1D0D0] to-[#988686] bg-clip-text text-transparent group-hover:from-white group-hover:to-[#D1D0D0] transition-colors drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">
          MERCURY
        </span>
      )}
    </div>
  );
};
