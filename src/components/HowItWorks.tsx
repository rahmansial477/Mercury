import React from 'react';

export const HowItWorks: React.FC = () => {
  return (
    <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-[#282020] bg-[#000000]">
      
      {/* Section Header */}
      <div className="mb-12">
        <h2 className="font-cinzel text-4xl sm:text-5xl lg:text-6xl font-normal text-white tracking-tight">
          The Protocol.
        </h2>
      </div>

      {/* 4 Step Columns Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        
        {/* Step 01 */}
        <div className="space-y-3 border-l border-[#2e2626] pl-4 sm:pl-6">
          <div className="font-cinzel text-3xl font-normal text-[#8A7E7B]">
            01
          </div>
          <h3 className="font-mono text-xs font-semibold uppercase tracking-[0.15em] text-white">
            CONNECT WALLET
          </h3>
          <p className="text-xs text-[#A09892] font-light leading-relaxed">
            Authenticate your identity securely via your Web3 wallet.
          </p>
        </div>

        {/* Step 02 */}
        <div className="space-y-3 border-l border-[#2e2626] pl-4 sm:pl-6">
          <div className="font-cinzel text-3xl font-normal text-[#8A7E7B]">
            02
          </div>
          <h3 className="font-mono text-xs font-semibold uppercase tracking-[0.15em] text-white">
            CHOOSE ACTION
          </h3>
          <p className="text-xs text-[#A09892] font-light leading-relaxed">
            Select to upload a file, generate a proof, or publish a signed note.
          </p>
        </div>

        {/* Step 03 */}
        <div className="space-y-3 border-l border-[#2e2626] pl-4 sm:pl-6">
          <div className="font-cinzel text-3xl font-normal text-[#8A7E7B]">
            03
          </div>
          <h3 className="font-mono text-xs font-semibold uppercase tracking-[0.15em] text-white">
            CONFIRM TRANSACTION
          </h3>
          <p className="text-xs text-[#A09892] font-light leading-relaxed">
            Execute the cryptographic operation securely on the Shelby network.
          </p>
        </div>

        {/* Step 04 */}
        <div className="space-y-3 border-l border-[#2e2626] pl-4 sm:pl-6">
          <div className="font-cinzel text-3xl font-normal text-[#8A7E7B]">
            04
          </div>
          <h3 className="font-mono text-xs font-semibold uppercase tracking-[0.15em] text-white">
            DASHBOARD
          </h3>
          <p className="text-xs text-[#A09892] font-light leading-relaxed">
            Manage your assets, verify proofs, and review your historical legacy.
          </p>
        </div>

      </div>
    </section>
  );
};


