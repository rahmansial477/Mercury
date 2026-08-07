import React from 'react';
import { Logo } from './Logo';
import { ExternalLink, ShieldAlert, Heart, Github, Twitter, Disc as Discord, ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#000000] border-t border-[#5C4E4E]/40 pt-16 pb-12 px-4 sm:px-6 lg:px-8 text-[#D1D0D0]">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          
          {/* Column 1: Logo & Mission */}
          <div className="md:col-span-5 space-y-4">
            <Logo size={36} showText={true} />
            <p className="text-xs sm:text-sm text-[#D1D0D0]/80 max-w-sm leading-relaxed">
              Wallet-signed time-locked vaults, proof of creation certificates, and verified anonymous notes powered by Shelby Protocol on the Aptos blockchain.
            </p>
            <div className="pt-2 flex items-center gap-2 font-mono text-xs text-[#988686]">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Shelbynet Testnet v1.8 • Active</span>
            </div>
          </div>

          {/* Column 2: Shelby Protocol Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="font-cinzel text-sm font-bold text-white uppercase tracking-wider">
              Shelby Protocol
            </h4>
            <ul className="space-y-2 text-xs font-mono text-[#D1D0D0]/80">
              <li>
                <a
                  href="https://shelby.xyz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#988686] transition-colors inline-flex items-center gap-1.5"
                >
                  <span>shelby.xyz</span>
                  <ExternalLink className="w-3 h-3 text-[#5C4E4E]" />
                </a>
              </li>
              <li>
                <a
                  href="https://docs.shelby.xyz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#988686] transition-colors inline-flex items-center gap-1.5"
                >
                  <span>docs.shelby.xyz</span>
                  <ExternalLink className="w-3 h-3 text-[#5C4E4E]" />
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/shelby"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#988686] transition-colors inline-flex items-center gap-1.5"
                >
                  <span>github.com/shelby</span>
                  <ExternalLink className="w-3 h-3 text-[#5C4E4E]" />
                </a>
              </li>
              <li>
                <a
                  href="https://discord.gg/shelbyserves"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#988686] transition-colors inline-flex items-center gap-1.5"
                >
                  <span>discord.gg/shelbyserves</span>
                  <ExternalLink className="w-3 h-3 text-[#5C4E4E]" />
                </a>
              </li>
              <li>
                <a
                  href="https://x.com/shelbyserves"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#988686] transition-colors inline-flex items-center gap-1.5"
                >
                  <span>x.com/shelbyserves</span>
                  <ExternalLink className="w-3 h-3 text-[#5C4E4E]" />
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Explorer & Network */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="font-cinzel text-sm font-bold text-white uppercase tracking-wider">
              Network
            </h4>
            <ul className="space-y-2 text-xs font-mono text-[#D1D0D0]/80">
              <li>
                <a
                  href="https://explorer.aptoslabs.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#988686] transition-colors inline-flex items-center gap-1.5"
                >
                  <span>Aptos Explorer</span>
                  <ExternalLink className="w-3 h-3 text-[#5C4E4E]" />
                </a>
              </li>
              <li className="text-[#988686]">Shelbynet Testnet</li>
              <li className="text-[#988686]">Petra Wallet Ready</li>
            </ul>
          </div>

          {/* Column 4: Builder Credits */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="font-cinzel text-sm font-bold text-white uppercase tracking-wider">
              Builder
            </h4>
            <ul className="space-y-2 text-xs font-mono text-[#D1D0D0]/80">
              <li className="text-white font-semibold">Rahman</li>
              <li>
                <a
                  href="https://github.com/rahmansial477"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#988686] transition-colors inline-flex items-center gap-1.5"
                >
                  <span>github.com/rahmansial477</span>
                  <ExternalLink className="w-3 h-3 text-[#5C4E4E]" />
                </a>
              </li>
              <li>
                <a
                  href="https://x.com/rahmansial477"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#988686] transition-colors inline-flex items-center gap-1.5"
                >
                  <span>x.com/rahmansial477</span>
                  <ExternalLink className="w-3 h-3 text-[#5C4E4E]" />
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Mandatory Project Disclaimer Box */}
        <div className="p-4 rounded-xl bg-[#0c0b0b] border border-[#5C4E4E]/40 text-center space-y-1">
          <p className="text-xs font-mono text-[#988686] font-semibold">
            Independent, unofficial project built on Shelby Protocol. Not affiliated with the Shelby team.
          </p>
          <p className="text-[11px] text-[#D1D0D0]/60 font-mono">
            Designed with Gothic Noir aesthetic • Powered by Aptos Blockchain & Shelby Storage SDK
          </p>
        </div>

      </div>
    </footer>
  );
};
