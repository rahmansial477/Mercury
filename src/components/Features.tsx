import React from 'react';
import { motion } from 'motion/react';
import { Lock, ShieldCheck, FileEdit } from 'lucide-react';

interface FeaturesProps {
  onSelectFeature: (tab: 'vault' | 'proofs' | 'notes') => void;
}

export const Features: React.FC<FeaturesProps> = ({ onSelectFeature }) => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-[#282020] bg-[#000000]">
      
      {/* 3 Feature Cards Grid matching user screenshot */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Card 1: Vault */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          whileHover={{ y: -6 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          onClick={() => onSelectFeature('vault')}
          className="bg-[#050404] p-8 sm:p-10 rounded-none cursor-pointer flex flex-col justify-between border border-[#2e2626] mercury-hover-card group"
        >
          <div className="space-y-6">
            <div className="w-10 h-10 border border-[#3e3232] group-hover:border-[#7A686A] flex items-center justify-center text-[#D1C9C1] bg-[#080606] transition-colors">
              <Lock className="w-5 h-5 stroke-[1.5]" />
            </div>

            <h3 className="font-cinzel text-3xl font-normal text-white tracking-wide">
              Vault
            </h3>

            <p className="text-xs sm:text-sm text-[#A09892] font-light leading-relaxed">
              A highly secure, decentralized repository for your most sensitive assets. Files are encrypted and stored across a distributed network, rendering them immune to tampering or centralized censorship. Access is exclusively gated by your cryptographic keys.
            </p>
          </div>
        </motion.div>

        {/* Card 2: Proofs */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          whileHover={{ y: -6 }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          onClick={() => onSelectFeature('proofs')}
          className="bg-[#050404] p-8 sm:p-10 rounded-none cursor-pointer flex flex-col justify-between border border-[#2e2626] mercury-hover-card group"
        >
          <div className="space-y-6">
            <div className="w-10 h-10 border border-[#3e3232] group-hover:border-[#7A686A] flex items-center justify-center text-[#D1C9C1] bg-[#080606] transition-colors">
              <ShieldCheck className="w-5 h-5 stroke-[1.5]" />
            </div>

            <h3 className="font-cinzel text-3xl font-normal text-white tracking-wide">
              Proofs
            </h3>

            <p className="text-xs sm:text-sm text-[#A09892] font-light leading-relaxed">
              Generate unassailable cryptographic evidence of existence and ownership. By anchoring metadata to the blockchain, you create a permanent timestamp that protects intellectual property and establishes an irrefutable chain of custody. Defend your work with mathematical certainty.
            </p>
          </div>
        </motion.div>

        {/* Card 3: Notes */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          whileHover={{ y: -6 }}
          transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          onClick={() => onSelectFeature('notes')}
          className="bg-[#050404] p-8 sm:p-10 rounded-none cursor-pointer flex flex-col justify-between border border-[#2e2626] mercury-hover-card group"
        >
          <div className="space-y-6">
            <div className="w-10 h-10 border border-[#3e3232] group-hover:border-[#7A686A] flex items-center justify-center text-[#D1C9C1] bg-[#080606] transition-colors">
              <FileEdit className="w-5 h-5 stroke-[1.5]" />
            </div>

            <h3 className="font-cinzel text-3xl font-normal text-white tracking-wide">
              Notes
            </h3>

            <p className="text-xs sm:text-sm text-[#A09892] font-light leading-relaxed">
              Publish verifiable statements, directives, or commentary linked directly to your digital identity. Notes are signed and immutable, ensuring your signal cuts through the noise. Communicate with absolute authority and permanent attribution.
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  );
};



