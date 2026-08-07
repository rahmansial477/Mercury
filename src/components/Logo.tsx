import React from 'react';

interface LogoProps {
  className?: string;
  size?: number;
  showText?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ className = '', size = 32, showText = true }) => {
  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      <div className="relative flex items-center justify-center group">
        {/* Glow backdrop on hover */}
        <div 
          className="absolute inset-0 rounded-full bg-[#988686] blur-md opacity-20 group-hover:opacity-50 transition-opacity duration-300"
        />
        <svg
          width={size}
          height={size}
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="relative transform transition-transform duration-300 group-hover:scale-105"
        >
          {/* Black circle background */}
          <rect width="100" height="100" rx="22" fill="#000000" stroke="#5C4E4E" strokeWidth="2" />
          
          {/* Gothic liquid drop outer contour */}
          <path
            d="M50 12 C50 12 78 40 78 62 C78 77.46 65.46 90 50 90 C34.54 90 22 77.46 22 62 C22 40 50 12 50 12 Z"
            fill="#121010"
            stroke="#988686"
            strokeWidth="3.5"
          />
          
          {/* Inner metallic dark fill */}
          <path
            d="M50 20 C50 20 70 44 70 62 C70 73.05 61.05 82 50 82 C38.95 82 30 73.05 30 62 C30 44 50 20 50 20 Z"
            fill="#5C4E4E"
            fillOpacity="0.45"
          />

          {/* Gothic liquid M sharp stroke */}
          <path
            d="M34 68 L42 44 L50 58 L58 44 L66 68"
            stroke="#D1D0D0"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Liquid droplet highlight */}
          <circle cx="50" cy="36" r="4.5" fill="#988686" />
          <circle cx="50" cy="36" r="2" fill="#FFFFFF" />
        </svg>
      </div>

      {showText && (
        <div className="flex flex-col">
          <span className="font-cinzel text-xl sm:text-2xl font-bold tracking-widest text-[#D1D0D0] group-hover:text-white transition-colors">
            MERCURY
          </span>
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#988686] font-mono -mt-1">
            Shelby Protocol
          </span>
        </div>
      )}
    </div>
  );
};
