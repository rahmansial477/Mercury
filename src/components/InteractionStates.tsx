import React, { useState } from 'react';
import { Shield, Key, ArrowRight, Lock, CheckCircle2, Sliders } from 'lucide-react';

export const InteractionStates: React.FC = () => {
  const [decryptionKey, setDecryptionKey] = useState('0x8FC...4a2B');
  const [isFocused, setIsFocused] = useState(true);
  const [hashVerified, setHashVerified] = useState(false);
  const [isOnChain, setIsOnChain] = useState(true);

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto border-b border-[#282020] bg-[#000000]">
      {/* Header */}
      <div className="max-w-3xl mb-16 space-y-4">
        <h2 className="font-cinzel text-5xl sm:text-6xl font-normal text-white tracking-wide leading-tight">
          Interaction
        </h2>
        <h2 className="font-cinzel italic text-5xl sm:text-6xl font-normal text-[#B0AAA4] tracking-wide leading-tight">
          States
        </h2>
        <p className="text-sm sm:text-base text-[#A8A29E] font-light leading-relaxed max-w-2xl pt-2">
          Observing the transitional states of cryptographic interfaces. The architecture responds with subtle luminescence and precise structural shifts, maintaining absolute solemnity.
        </p>
      </div>

      {/* Cards Grid: Standard Protocol vs The Vault */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
        
        {/* Box 1: Standard Protocol (DORMANT) */}
        <div className="bg-[#050404] border border-[#221c1c] p-8 relative flex flex-col justify-between group transition-all duration-300">
          <div className="flex items-center justify-between mb-8">
            <div className="w-10 h-10 border border-[#2e2626] flex items-center justify-center text-[#887E78]">
              <Shield className="w-4 h-4 stroke-[1.5]" />
            </div>
            <span className="px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] border border-[#2a2222] text-[#6e6662] bg-[#0a0808]">
              DORMANT
            </span>
          </div>

          <div className="space-y-3 mb-12">
            <h3 className="font-cinzel text-2xl font-normal text-white tracking-wide">
              Standard Protocol
            </h3>
            <p className="text-xs sm:text-sm text-[#8E8781] font-light leading-relaxed">
              The default state of verified data enclaves. Structure is defined by low-contrast borders and deep blacks.
            </p>
          </div>

          <div>
            <div className="w-full h-[1px] bg-[#1a1414] mb-4" />
            <div className="flex items-center justify-between text-[11px] font-mono tracking-[0.2em] text-[#78706B] group-hover:text-white transition-colors cursor-pointer">
              <span>ACCESS LOG</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>

        {/* Box 2: The Vault (ACTIVE) */}
        <div className="bg-[#0b0808] border border-[#4a3a3a] p-8 relative flex flex-col justify-between shadow-[0_0_30px_rgba(152,134,134,0.06)] group transition-all duration-300 hover:border-[#7A6464]">
          <div className="flex items-center justify-between mb-8">
            <div className="w-10 h-10 border border-[#5C4E4E] flex items-center justify-center text-[#D1D0D0] bg-[#120e0e]">
              <Key className="w-4 h-4 stroke-[1.5]" />
            </div>
            <span className="px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] border border-[#6E5A5A] text-[#E0DCD6] bg-[#181212]">
              ACTIVE
            </span>
          </div>

          <div className="space-y-3 mb-12">
            <h3 className="font-cinzel text-2xl font-normal text-white tracking-wide">
              The Vault
            </h3>
            <p className="text-xs sm:text-sm text-[#A8A29E] font-light leading-relaxed">
              Cryptographic storage engaging structural lift. Note the muted mauve shift and subtle luminous containment field.
            </p>
          </div>

          <div>
            <div className="w-full h-[1px] bg-[#2e2424] mb-4" />
            <div className="flex items-center justify-between text-[11px] font-mono tracking-[0.2em] text-[#E5E3DF] cursor-pointer">
              <span>INITIATE EXTRACTION</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>

      </div>

      {/* Divider */}
      <div className="w-full h-[1px] bg-[#282020] mb-16" />

      {/* Input & Selection Dynamics Section */}
      <div className="space-y-10">
        <h3 className="font-cinzel text-2xl font-normal text-white tracking-wide">
          Input & Selection Dynamics
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-end">
          
          {/* Item 1: Decryption Key Input */}
          <div className="space-y-3">
            <label className="block font-mono text-[11px] uppercase tracking-[0.2em] text-[#78706B]">
              DECRYPTION KEY
            </label>
            <div className="relative">
              <input
                type="text"
                value={decryptionKey}
                onChange={(e) => setDecryptionKey(e.target.value)}
                onFocus={() => setIsFocused(true)}
                className="w-full bg-[#050404] border-b border-[#786666] focus:border-white text-white font-mono text-sm py-2 px-1 outline-none transition-colors"
              />
            </div>
            <span className="block font-mono text-[10px] text-[#605854]">
              {isFocused ? 'Focused State' : 'Default Input'}
            </span>
          </div>

          {/* Item 2: Verify Hash Toggle */}
          <div className="space-y-3">
            <button
              onClick={() => setHashVerified(!hashVerified)}
              className={`px-5 py-2.5 border font-mono text-xs uppercase tracking-[0.15em] flex items-center justify-center gap-2 transition-all ${
                hashVerified 
                  ? 'bg-[#1c1616] border-[#8C7676] text-white' 
                  : 'bg-[#0a0808] border-[#3E3434] hover:border-[#705E5E] text-[#D1D0D0]'
              }`}
            >
              <span className="text-[#887E78]">{hashVerified ? '[ ✓ ]' : '[ / ]'}</span>
              <span>VERIFY HASH</span>
            </button>
            <span className="block font-mono text-[10px] text-[#605854]">
              Hovered Toggle
            </span>
          </div>

          {/* Item 3: On-Chain Status */}
          <div className="space-y-3">
            <button
              onClick={() => setIsOnChain(!isOnChain)}
              className={`px-5 py-2.5 border font-mono text-xs uppercase tracking-[0.15em] flex items-center justify-center gap-2 transition-all ${
                isOnChain 
                  ? 'bg-[#120d0d] border-[#5E4C4C] text-[#E5E3DF]' 
                  : 'bg-[#050404] border-[#282020] text-[#706864]'
              }`}
            >
              <span className={isOnChain ? 'text-emerald-400' : 'text-[#504844]'}>
                {isOnChain ? '▢' : '⬡'}
              </span>
              <span>{isOnChain ? 'ON-CHAIN' : 'OFF-CHAIN'}</span>
            </button>
            <span className="block font-mono text-[10px] text-[#605854]">
              Active Status
            </span>
          </div>

        </div>
      </div>

    </section>
  );
};
