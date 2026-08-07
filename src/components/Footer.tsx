import React from 'react';
import { Logo } from './Logo';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#000000] border-t border-[#282020] py-10 px-4 sm:px-6 lg:px-8 text-[#A8A29E]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Left: MERCURY Logo */}
        <div className="flex items-center">
          <Logo size={28} showText={true} />
        </div>

        {/* Center: Copyright Notice */}
        <div className="font-mono text-[11px] tracking-[0.15em] text-[#78726E] text-center uppercase">
          © 2024 MERCURY. SECURED BY SHELBY PROTOCOL.
        </div>

        {/* Right: Quick Links */}
        <div className="flex items-center gap-6 font-mono text-[11px] tracking-[0.15em] uppercase text-[#78726E]">
          <a href="#docs" className="hover:text-white transition-colors">
            DOCUMENTATION
          </a>
          <a href="#privacy" className="hover:text-white transition-colors">
            PRIVACY
          </a>
          <a href="#security" className="hover:text-white transition-colors">
            SECURITY
          </a>
          <a href="#terminal" className="hover:text-white transition-colors">
            TERMINAL
          </a>
        </div>

      </div>
    </footer>
  );
};

