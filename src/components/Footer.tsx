import React from 'react';
import { Logo } from './Logo';
import { ExternalLink, Github, FileText, Globe } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#000000] border-t border-[#5C4E4E]/60 pt-16 pb-12 px-4 sm:px-6 lg:px-8 text-[#D1D0D0] relative z-10">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Main Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
          
          {/* Left: Logo + Tagline */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center">
              <Logo size={34} showText={true} />
            </div>
            <p className="font-cinzel italic text-base text-[#988686] tracking-wide font-light">
              "Lock it Prove it Speak on it"
            </p>
            <p className="text-xs text-[#8E8681] max-w-sm font-light leading-relaxed">
              Decentralized cryptographic vault, verifiable proofs, and wallet-signed anonymous broadcasts on Shelby.
            </p>
          </div>

          {/* Middle: Protocol Links */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="font-mono text-xs uppercase tracking-[0.2em] text-[#988686] font-semibold">
              Shelby Protocol
            </h4>
            <div className="grid grid-cols-2 gap-3 text-xs font-mono tracking-wider">
              <a 
                href="https://docs.shelby.xyz" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-1.5 text-[#D1D0D0] hover:text-white transition-colors group"
              >
                <FileText className="w-3.5 h-3.5 text-[#988686] group-hover:text-white transition-colors" />
                <span>Docs</span>
                <ExternalLink className="w-2.5 h-2.5 text-[#5C4E4E] group-hover:text-[#988686] transition-colors" />
              </a>

              <a 
                href="https://github.com/shelby" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-1.5 text-[#D1D0D0] hover:text-white transition-colors group"
              >
                <Github className="w-3.5 h-3.5 text-[#988686] group-hover:text-white transition-colors" />
                <span>GitHub</span>
                <ExternalLink className="w-2.5 h-2.5 text-[#5C4E4E] group-hover:text-[#988686] transition-colors" />
              </a>

              <a 
                href="https://discord.gg/shelbyserves" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-1.5 text-[#D1D0D0] hover:text-white transition-colors group"
              >
                <svg className="w-3.5 h-3.5 fill-[#988686] group-hover:fill-white transition-colors" viewBox="0 0 24 24">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128c.126-.093.252-.19.372-.287a.075.075 0 0 1 .078-.01c3.927 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .079.009c.12.098.245.195.372.288a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.893.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
                </svg>
                <span>Discord</span>
                <ExternalLink className="w-2.5 h-2.5 text-[#5C4E4E] group-hover:text-[#988686] transition-colors" />
              </a>

              <a 
                href="https://x.com/shelbyserves" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-1.5 text-[#D1D0D0] hover:text-white transition-colors group"
              >
                <span className="font-sans font-bold text-[#988686] text-xs group-hover:text-white transition-colors">𝕏</span>
                <span>X / Twitter</span>
                <ExternalLink className="w-2.5 h-2.5 text-[#5C4E4E] group-hover:text-[#988686] transition-colors" />
              </a>
            </div>
          </div>

          {/* Right: Builder Info */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="font-mono text-xs uppercase tracking-[0.2em] text-[#988686] font-semibold">
              Developer
            </h4>
            <div className="space-y-2">
              <p className="text-xs text-[#D1D0D0] font-medium">
                Built by <span className="text-white font-semibold underline decoration-[#988686]/50 underline-offset-4">Rahman</span>
              </p>
              <div className="flex items-center gap-4 text-xs font-mono">
                <a 
                  href="https://github.com/rahmansial477" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center gap-1 text-[#8E8681] hover:text-white transition-colors group"
                >
                  <Github className="w-3.5 h-3.5 text-[#988686] group-hover:text-white transition-colors" />
                  <span>GitHub</span>
                </a>
                <a 
                  href="https://x.com/rahmansial47" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center gap-1 text-[#8E8681] hover:text-white transition-colors group"
                >
                  <span className="font-sans font-bold text-[#988686] group-hover:text-white transition-colors">𝕏</span>
                  <span>@rahmansial47</span>
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Divider */}
        <div className="w-full h-[1px] bg-[#282020]" />

        {/* Bottom Strip */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] font-mono text-[#8E8681]">
          
          {/* Protocol & Explorer Links */}
          <div className="flex flex-wrap items-center gap-6">
            <a 
              href="https://shelby.xyz" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center gap-1.5 text-[#D1D0D0] hover:text-white transition-colors"
            >
              <Globe className="w-3.5 h-3.5 text-[#988686]" />
              <span>Built on Shelby Protocol (shelby.xyz)</span>
            </a>

            <a 
              href="https://explorer.aptoslabs.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center gap-1.5 text-[#8E8681] hover:text-[#D1D0D0] transition-colors"
            >
              <span>Aptos Explorer</span>
              <ExternalLink className="w-2.5 h-2.5 text-[#5C4E4E]" />
            </a>
          </div>

          {/* Copyright */}
          <div>
            © {new Date().getFullYear()} MERCURY ARCHIVE. ALL RIGHTS RESERVED.
          </div>
        </div>

        {/* Independent / Unofficial Disclaimer Line */}
        <div className="pt-2 border-t border-[#181213] text-center">
          <p className="font-mono text-[10px] text-[#5C4E4E] tracking-[0.15em] uppercase">
            MERCURY IS AN INDEPENDENT, UNOFFICIAL APPLICATION BUILT ON SHELBY'S TESTNET. IT IS NOT DEVELOPED, OPERATED, OR ENDORSED BY THE SHELBY TEAM.
          </p>
        </div>

      </div>
    </footer>
  );
};


