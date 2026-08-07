import React from 'react';
import { motion } from 'motion/react';
import { Lock, ShieldCheck, FileText, Clock, Key, ShieldAlert, Cpu, ExternalLink } from 'lucide-react';

interface FeaturesProps {
  onSelectFeature: (tab: 'vault' | 'proofs' | 'notes') => void;
}

export const Features: React.FC<FeaturesProps> = ({ onSelectFeature }) => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-[#5C4E4E]/30">
      
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
        <div className="inline-block font-mono text-xs text-[#988686] uppercase tracking-[0.3em]">
          CORE ARCHITECTURE PRIMITIVES
        </div>
        <h2 className="font-cinzel text-3xl sm:text-5xl font-extrabold text-white">
          Three Pillars of Cryptographic Trust
        </h2>
        <p className="text-sm sm:text-base text-[#D1D0D0]/80 font-normal">
          Mercury leverages Shelby Protocol's decentralized blob storage engine combined with Aptos Smart Contract execution to deliver zero-trust privacy primitives.
        </p>
      </div>

      {/* Feature Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Card 1: Time Lock Vault */}
        <motion.div
          whileHover={{ y: -6 }}
          transition={{ duration: 0.25 }}
          onClick={() => onSelectFeature('vault')}
          className="gothic-card rounded-2xl p-8 cursor-pointer relative overflow-hidden group flex flex-col justify-between border border-[#5C4E4E]/60 hover:border-[#988686]"
        >
          <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
            <Lock className="w-32 h-32 text-[#988686]" />
          </div>

          <div>
            <div className="w-14 h-14 rounded-xl bg-[#1f1b1b] border border-[#988686]/40 flex items-center justify-center text-[#988686] group-hover:bg-[#988686] group-hover:text-black transition-all mb-6">
              <Lock className="w-7 h-7" />
            </div>

            <div className="text-xs font-mono text-[#988686] uppercase tracking-widest mb-1">
              PRIMITIVE I • ENCRYPTION
            </div>
            <h3 className="font-cinzel text-2xl font-bold text-white group-hover:text-[#988686] transition-colors mb-3">
              Time Lock Vault
            </h3>
            <p className="text-xs sm:text-sm text-[#D1D0D0]/80 leading-relaxed mb-6">
              Seal sensitive files, code backups, and secret keys behind future time triggers. Payload decryption is mathematically blocked until the specified unlock date is reached on Shelbynet.
            </p>
          </div>

          <div className="pt-4 border-t border-[#5C4E4E]/40 flex items-center justify-between text-xs font-mono text-[#988686]">
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" /> Enforced by Clock
            </span>
            <span className="group-hover:translate-x-1 transition-transform">Explore Vault →</span>
          </div>
        </motion.div>

        {/* Card 2: Proof of Creation */}
        <motion.div
          whileHover={{ y: -6 }}
          transition={{ duration: 0.25 }}
          onClick={() => onSelectFeature('proofs')}
          className="gothic-card rounded-2xl p-8 cursor-pointer relative overflow-hidden group flex flex-col justify-between border border-[#5C4E4E]/60 hover:border-[#988686]"
        >
          <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
            <ShieldCheck className="w-32 h-32 text-[#988686]" />
          </div>

          <div>
            <div className="w-14 h-14 rounded-xl bg-[#1f1b1b] border border-[#988686]/40 flex items-center justify-center text-[#988686] group-hover:bg-[#988686] group-hover:text-black transition-all mb-6">
              <ShieldCheck className="w-7 h-7" />
            </div>

            <div className="text-xs font-mono text-[#988686] uppercase tracking-widest mb-1">
              PRIMITIVE II • IMMUTABILITY
            </div>
            <h3 className="font-cinzel text-2xl font-bold text-white group-hover:text-[#988686] transition-colors mb-3">
              Proof of Creation
            </h3>
            <p className="text-xs sm:text-sm text-[#D1D0D0]/80 leading-relaxed mb-6">
              Certify file hashes, whitepapers, and intellectual property on the Aptos ledger. Receive verifiable timestamp certificates linked directly to Shelby blob merkle roots.
            </p>
          </div>

          <div className="pt-4 border-t border-[#5C4E4E]/40 flex items-center justify-between text-xs font-mono text-[#988686]">
            <span className="flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5" /> Aptos Block Height
            </span>
            <span className="group-hover:translate-x-1 transition-transform">View Proofs →</span>
          </div>
        </motion.div>

        {/* Card 3: Anonymous Notes */}
        <motion.div
          whileHover={{ y: -6 }}
          transition={{ duration: 0.25 }}
          onClick={() => onSelectFeature('notes')}
          className="gothic-card rounded-2xl p-8 cursor-pointer relative overflow-hidden group flex flex-col justify-between border border-[#5C4E4E]/60 hover:border-[#988686]"
        >
          <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
            <FileText className="w-32 h-32 text-[#988686]" />
          </div>

          <div>
            <div className="w-14 h-14 rounded-xl bg-[#1f1b1b] border border-[#988686]/40 flex items-center justify-center text-[#988686] group-hover:bg-[#988686] group-hover:text-black transition-all mb-6">
              <FileText className="w-7 h-7" />
            </div>

            <div className="text-xs font-mono text-[#988686] uppercase tracking-widest mb-1">
              PRIMITIVE III • SIGNED ANONYMITY
            </div>
            <h3 className="font-cinzel text-2xl font-bold text-white group-hover:text-[#988686] transition-colors mb-3">
              Verified Anonymous Notes
            </h3>
            <p className="text-xs sm:text-sm text-[#D1D0D0]/80 leading-relaxed mb-6">
              Publish wallet-signed statements without exposing your public address. Readers can verify cryptographic validity while author identity remains completely shielded.
            </p>
          </div>

          <div className="pt-4 border-t border-[#5C4E4E]/40 flex items-center justify-between text-xs font-mono text-[#988686]">
            <span className="flex items-center gap-1.5">
              <Key className="w-3.5 h-3.5" /> Wallet Signature Check
            </span>
            <span className="group-hover:translate-x-1 transition-transform">Read Notes →</span>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
