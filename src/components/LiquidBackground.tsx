import React from 'react';

export const LiquidBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-25">
      {/* Animated Liquid Mercury Flow Wave SVG */}
      <svg
        className="absolute -top-[20%] -left-[20%] w-[140%] h-[140%] animate-liquid-flow transform-gpu"
        viewBox="0 0 1000 1000"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <defs>
          {/* Liquid Metallic Gradient */}
          <radialGradient id="liquidGrad1" cx="30%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#7A686A" stopOpacity="0.3" />
            <stop offset="40%" stopColor="#35292B" stopOpacity="0.2" />
            <stop offset="80%" stopColor="#120E0F" stopOpacity="0.05" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0" />
          </radialGradient>

          <radialGradient id="liquidGrad2" cx="70%" cy="60%" r="60%">
            <stop offset="0%" stopColor="#8A787A" stopOpacity="0.25" />
            <stop offset="50%" stopColor="#2A2022" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0" />
          </radialGradient>

          {/* Organic Liquid Noise Filter */}
          <filter id="mercuryTurbulence" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence type="fractalNoise" baseFrequency="0.008 0.012" numOctaves="3" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="60" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>

        {/* Ambient Liquid Flow Blobs */}
        <g filter="url(#mercuryTurbulence)">
          <path
            d="M 150 200 C 350 100, 650 300, 850 180 C 950 350, 750 650, 800 850 C 550 950, 250 750, 100 800 C 50 550, 200 350, 150 200 Z"
            fill="url(#liquidGrad1)"
          />
          <path
            d="M 300 100 C 600 50, 800 250, 900 450 C 700 700, 500 850, 250 800 C 100 650, 150 350, 300 100 Z"
            fill="url(#liquidGrad2)"
          />
        </g>
      </svg>

      {/* Subtle Specular Highlights Layer */}
      <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-radial from-[#7A686A]/10 via-transparent to-transparent blur-3xl animate-pulse" />
    </div>
  );
};
