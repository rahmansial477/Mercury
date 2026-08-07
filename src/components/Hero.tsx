import React from 'react';
import { motion } from 'motion/react';
import { useWallet } from '../context/WalletContext';

interface HeroProps {
  onLaunchDashboard: (tab?: 'vault' | 'proofs' | 'notes') => void;
  openCreateModal: () => void;
  onExploreDocs: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onLaunchDashboard }) => {
  const { connected, shortAddress, setOpenConnectModal } = useWallet();

  return (
    <section className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-[#282020] bg-[#000000]">
      <div className="max-w-4xl space-y-10">
        
        {/* Main Headline: Lock it. Prove it. Speak on it. */}
        <motion.h1 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="font-cinzel text-5xl sm:text-7xl lg:text-8xl font-normal tracking-tight text-white leading-[1.05]"
        >
          Lock it.{' '}
          <span className="italic font-serif text-[#A08E8E]">Prove it.</span>{' '}
          Speak on it.
        </motion.h1>

        {/* Vertical Accent Line + 3 Core Sentences */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="pl-5 border-l-2 border-[#3e3232] space-y-2.5"
        >
          <p className="text-sm sm:text-base text-[#D1C9C1] font-light leading-relaxed">
            Secure your sensitive files in an immutable vault.
          </p>
          <p className="text-sm sm:text-base text-[#D1C9C1] font-light leading-relaxed">
            Generate cryptographic proofs for unassailable verification.
          </p>
          <p className="text-sm sm:text-base text-[#D1C9C1] font-light leading-relaxed">
            Publish verified notes linked to your identity.
          </p>
        </motion.div>

        {/* Action Button: CONNECT WALLET */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="pt-2"
        >
          <button
            onClick={() => {
              if (connected) {
                onLaunchDashboard('vault');
              } else {
                setOpenConnectModal(true);
              }
            }}
            className="px-8 py-3.5 bg-[#B3A9A3] hover:bg-[#C9C1BB] text-[#0A0808] font-mono text-xs font-semibold uppercase tracking-[0.18em] transition-all shadow-xl rounded-none"
          >
            {connected ? `DASHBOARD (${shortAddress})` : 'CONNECT WALLET'}
          </button>
        </motion.div>

      </div>
    </section>
  );
};


