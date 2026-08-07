import React from 'react';

interface LogoProps {
  className?: string;
  size?: number;
  showText?: boolean;
  variant?: 'mercury' | 'liquid_gothic';
}

export const Logo: React.FC<LogoProps> = ({ 
  className = '', 
  size = 32, 
  showText = true,
  variant = 'mercury'
}) => {
  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      <div className="relative flex items-center justify-center group shrink-0">
        {/* Glow backdrop on hover */}
        <div 
          className="absolute inset-0 rounded-2xl bg-[#988686] blur-md opacity-20 group-hover:opacity-60 transition-opacity duration-300"
        />
        
        <svg
          width={size}
          height={size}
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="relative transform transition-transform duration-300 group-hover:scale-105 drop-shadow-lg"
        >
          <defs>
            {/* Background container dark radial gradient */}
            <radialGradient id="logoBgGrad" cx="50%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#28282e" />
              <stop offset="55%" stopColor="#121215" />
              <stop offset="100%" stopColor="#050507" />
            </radialGradient>

            {/* Main Liquid Metallic 3D Body Gradient */}
            <linearGradient id="liquidMetal3D" x1="15%" y1="10%" x2="85%" y2="90%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="18%" stopColor="#b0b0b8" />
              <stop offset="38%" stopColor="#303036" />
              <stop offset="58%" stopColor="#0a0a0d" />
              <stop offset="78%" stopColor="#222228" />
              <stop offset="92%" stopColor="#888894" />
              <stop offset="100%" stopColor="#d0d0d8" />
            </linearGradient>

            {/* Chrome Specular Shine Gradient */}
            <linearGradient id="chromeShine" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
              <stop offset="30%" stopColor="#FFFFFF" stopOpacity="0.3" />
              <stop offset="70%" stopColor="#000000" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.6" />
            </linearGradient>

            {/* Dark Deep Shadow */}
            <filter id="gothicEmblemShadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="6" stdDeviation="5" floodColor="#000000" floodOpacity="0.9" />
            </filter>
          </defs>

          {/* Rounded Dark Square Card Background */}
          <rect width="100" height="100" rx="22" fill="url(#logoBgGrad)" stroke="#3a3434" strokeWidth="1.5" />
          
          {/* Subtle Inner Card Border Highlight */}
          <rect x="1" y="1" width="98" height="98" rx="21" fill="none" stroke="#FFFFFF" strokeOpacity="0.08" strokeWidth="1" />

          {/* Group for Emblem with Shadow */}
          <g filter="url(#gothicEmblemShadow)">
            
            {/* --- TOP SPIRE / CROWN DIAMOND --- */}
            {/* Outer Diamond Spire */}
            <path
              d="M 50 11 C 51 16, 54.5 22, 55 25 C 53.5 27.5, 51.5 29.5, 50 31.5 C 48.5 29.5, 46.5 27.5, 45 25 C 45.5 22, 49 16, 50 11 Z
                 M 50 18 C 48.8 21, 48.5 23.5, 50 26.5 C 51.5 23.5, 51.2 21, 50 18 Z"
              fill="url(#liquidMetal3D)"
              stroke="#0a0a0d"
              strokeWidth="0.75"
              fillRule="evenodd"
            />
            {/* Top Spire Specular Highlight */}
            <path
              d="M 50 12.5 C 50.5 16, 53 21, 53.5 24 C 52.5 25.5, 51.2 27, 50 28"
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="1.2"
              strokeLinecap="round"
              opacity="0.8"
            />

            {/* --- LIQUID GOTHIC M MAIN EMBLEM --- */}
            {/* Compound Path: Outer Liquid M Body minus Inner Hollow Loop Eyes */}
            <path
              d="
                M 50 35 
                C 45 32, 39 26, 36 24 
                C 30 22, 23 38, 25 52 
                C 27 65, 36 71, 42 63 
                C 46 57, 46 49, 50 52 
                C 54 49, 54 57, 58 63 
                C 64 71, 73 65, 75 52 
                C 77 38, 70 22, 64 24 
                C 61 26, 55 32, 50 35 Z
                
                M 39 33 
                C 36 36, 33 46, 36 53 
                C 39 58, 43 54, 43 47 
                C 43 40, 41 33, 39 33 Z
                
                M 61 33 
                C 59 33, 57 40, 57 47 
                C 57 54, 61 58, 64 53 
                C 67 46, 64 36, 61 33 Z
              "
              fill="url(#liquidMetal3D)"
              stroke="#070709"
              strokeWidth="1"
              fillRule="evenodd"
            />

            {/* --- LIQUID GLOSS SPECULAR HIGHLIGHTS & REFLECTIONS --- */}
            {/* Left Horn Shiny Liquid Ridge */}
            <path
              d="M 36.5 25 C 32 23, 26 36, 27.5 48 C 28.5 56, 32 62, 36 63.5"
              fill="none"
              stroke="url(#chromeShine)"
              strokeWidth="2"
              strokeLinecap="round"
            />

            {/* Right Horn Shiny Liquid Ridge */}
            <path
              d="M 63.5 25 C 68 23, 74 36, 72.5 48 C 71.5 56, 68 62, 64 63.5"
              fill="none"
              stroke="url(#chromeShine)"
              strokeWidth="2"
              strokeLinecap="round"
            />

            {/* Central Downward Beak Highlight */}
            <path
              d="M 47 48 C 48.5 50, 49.5 51.5, 50 52 C 50.5 51.5, 51.5 50, 53 48"
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="1.5"
              strokeLinecap="round"
              opacity="0.9"
            />

            {/* Left Bulbous Teardrop Gloss Droplet Spot */}
            <ellipse
              cx="33"
              cy="58"
              rx="3"
              ry="5"
              transform="rotate(-25 33 58)"
              fill="#FFFFFF"
              opacity="0.85"
            />

            {/* Right Bulbous Teardrop Gloss Droplet Spot */}
            <ellipse
              cx="67"
              cy="58"
              rx="3"
              ry="5"
              transform="rotate(25 67 58)"
              fill="#FFFFFF"
              opacity="0.85"
            />

            {/* Top Center V-Shine Arc */}
            <path
              d="M 44 32 C 47 30, 50 33, 50 34.5 C 50 33, 53 30, 56 32"
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="1"
              opacity="0.75"
            />
          </g>
        </svg>
      </div>

      {showText && (
        <div className="flex flex-col">
          {variant === 'liquid_gothic' ? (
            <span className="font-cinzel text-xl sm:text-2xl font-normal tracking-[0.2em] text-[#E0E0E0] group-hover:text-white transition-colors uppercase">
              LIQUID GOTHIC
            </span>
          ) : (
            <>
              <span className="font-cinzel text-xl sm:text-2xl font-bold tracking-[0.2em] text-[#D1D0D0] group-hover:text-white transition-colors">
                MERCURY
              </span>
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#988686] font-mono -mt-1">
                Shelby Protocol
              </span>
            </>
          )}
        </div>
      )}
    </div>
  );
};

