import React from 'react';
import { Key } from 'lucide-react';

export const OwnershipBox: React.FC = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10 bg-[#000000]">
      
      {/* Outer Border Box: Built on Absolute Ownership */}
      <div className="border border-[#5C4E4E] bg-[#0A0808] p-8 sm:p-12 md:p-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          
          {/* Left Column Text */}
          <div className="space-y-6">
            <h2 className="font-cinzel text-3xl sm:text-4xl lg:text-5xl font-normal text-white tracking-tight">
              Built on Absolute Ownership.
            </h2>

            <div className="space-y-4 text-sm sm:text-base text-[#D1D0D0] font-normal leading-relaxed">
              <p>
                Mercury fundamentally shifts control from platforms back to individuals. Every piece of data is wallet-signed, ensuring immutability and providing fake-proof timestamps.
              </p>
              <p>
                You alone hold the keys. You control the narrative. The legacy you build here is cryptographically yours, forever.
              </p>
            </div>
          </div>

          {/* Right Column Key Container */}
          <div className="w-full h-full min-h-[220px] sm:min-h-[260px] border border-[#5C4E4E] bg-[#120F10] flex items-center justify-center p-8">
            <Key className="w-12 h-12 sm:w-14 sm:h-14 text-[#988686] stroke-[1.5]" />
          </div>

        </div>
      </div>

      {/* Disclaimer Banner Box */}
      <div className="border border-[#988686]/70 bg-[#1F1819] p-6 text-center shadow-xl">
        <p className="font-mono text-xs sm:text-sm font-semibold uppercase tracking-[0.16em] text-[#D1D0D0] leading-relaxed">
          <span className="text-[#988686] font-bold mr-2">NOTICE ::</span>
          MERCURY IS AN INDEPENDENT, UNOFFICIAL APPLICATION BUILT ON SHELBY'S TESTNET. IT IS NOT DEVELOPED, OPERATED, OR ENDORSED BY THE SHELBY TEAM.
        </p>
      </div>

    </section>
  );
};
