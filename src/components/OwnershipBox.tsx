import React from 'react';
import { Key } from 'lucide-react';

export const OwnershipBox: React.FC = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10 bg-[#000000]">
      
      {/* Outer Border Box: Built on Absolute Ownership */}
      <div className="border border-[#2e2626] bg-[#000000] p-8 sm:p-12 md:p-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          
          {/* Left Column Text */}
          <div className="space-y-6">
            <h2 className="font-cinzel text-3xl sm:text-4xl lg:text-5xl font-normal text-white tracking-tight">
              Built on Absolute Ownership.
            </h2>

            <div className="space-y-4 text-xs sm:text-sm text-[#A09892] font-light leading-relaxed">
              <p>
                Mercury fundamentally shifts control from platforms back to individuals. Every piece of data is wallet-signed, ensuring immutability and providing fake-proof timestamps.
              </p>
              <p>
                You alone hold the keys. You control the narrative. The legacy you build here is cryptographically yours, forever.
              </p>
            </div>
          </div>

          {/* Right Column Key Container */}
          <div className="w-full h-full min-h-[220px] sm:min-h-[260px] border border-[#2e2626] bg-[#050404] flex items-center justify-center p-8">
            <Key className="w-10 h-10 sm:w-12 sm:h-12 text-[#5c4e4e] stroke-[1.25]" />
          </div>

        </div>
      </div>

      {/* Disclaimer Banner Box */}
      <div className="border border-[#2e2626] bg-[#050404] p-5 text-center">
        <p className="font-mono text-[10px] sm:text-xs font-semibold uppercase tracking-[0.18em] text-[#8E8681] leading-relaxed">
          MERCURY IS AN INDEPENDENT, UNOFFICIAL APPLICATION BUILT ON SHELBY'S TESTNET. IT IS NOT DEVELOPED, OPERATED, OR ENDORSED BY THE SHELBY TEAM.
        </p>
      </div>

    </section>
  );
};
