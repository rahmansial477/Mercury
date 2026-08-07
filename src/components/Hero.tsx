import React from 'react';
import { motion } from 'motion/react';
import { Lock, ShieldCheck, FileText, ArrowRight, Sparkles, Database, Terminal, Shield } from 'lucide-react';

interface HeroProps {
  onLaunchDashboard: (tab?: 'vault' | 'proofs' | 'notes') => void;
  openCreateModal: () => void;
  onExploreDocs: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onLaunchDashboard, openCreateModal, onExploreDocs }) => {
  return (
    <section className="relative min-h-[85vh] flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 py-16 sm:py-24 overflow-hidden border-b border-[#5C4E4E]/30">
      
      {/* Background Animated Gradient Radial Blobs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-[#988686]/20 via-[#5C4E4E]/15 to-transparent rounded-full blur-3xl pointer-events-none animate-ambient" />
      <div className="absolute bottom-10 right-10 w-[350px] h-[350px] bg-[#5C4E4E]/20 rounded-full blur-3xl pointer-events-none" />

      {/* Grid Pattern Overlay */}
      <div 
        className="absolute inset-0 bg-[linear-gradient(to_right,#5C4E4E15_1px,transparent_1px),linear-gradient(to_bottom,#5C4E4E15_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" 
      />

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto text-center space-y-8">
        
        {/* Protocol Badge */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#121010] border border-[#988686]/40 text-xs font-mono text-[#D1D0D0] shadow-xl"
        >
          <span className="w-2 h-2 rounded-full bg-[#988686] animate-ping" />
          <span className="text-[#988686] font-semibold">POWERED BY SHELBY PROTOCOL</span>
          <span className="text-[#5C4E4E]">|</span>
          <span>APTOS TESTNET</span>
        </motion.div>

        {/* Hero Headline */}
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-cinzel text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.15]"
        >
          Wallet-Signed <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFFFFF] via-[#D1D0D0] to-[#988686]">On-Chain Vaults</span> & Cryptographic Proofs
        </motion.h1>

        {/* Subtitle */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-3xl mx-auto text-base sm:text-lg lg:text-xl text-[#D1D0D0]/80 font-normal leading-relaxed"
        >
          Mercury cryptographically seals sensitive payloads, certifies document ownership timestamps, and publishes wallet-signed anonymous notes backed by the Shelby Protocol storage engine on the Aptos ledger.
        </motion.p>

        {/* Call to Action Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
        >
          <button
            onClick={() => onLaunchDashboard('vault')}
            className="w-full sm:w-auto px-8 py-4 rounded-xl gothic-btn font-cinzel font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-3 shadow-2xl group"
          >
            <Lock className="w-4 h-4 text-[#988686] group-hover:text-black transition-colors" />
            <span>Launch Vault</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={openCreateModal}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#1a1717] hover:bg-[#252020] border border-[#988686]/60 text-white font-cinzel font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-3 transition-all"
          >
            <Sparkles className="w-4 h-4 text-[#988686]" />
            <span>Create Entry</span>
          </button>

          <button
            onClick={onExploreDocs}
            className="w-full sm:w-auto px-8 py-4 rounded-xl gothic-btn-outline font-mono text-xs uppercase tracking-wider flex items-center justify-center gap-2"
          >
            <Terminal className="w-4 h-4 text-[#988686]" />
            <span>View Docs</span>
          </button>
        </motion.div>

        {/* Real-time Protocol Metrics Bar */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="pt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto"
        >
          <div className="p-4 rounded-2xl gothic-card border border-[#5C4E4E]/50 text-left">
            <div className="text-[11px] font-mono text-[#988686] uppercase tracking-widest flex items-center gap-1.5">
              <Database className="w-3.5 h-3.5" /> Total Vault Payload
            </div>
            <div className="font-cinzel text-xl sm:text-2xl font-bold text-white mt-1">128.4 TB</div>
            <div className="text-[10px] text-[#D1D0D0]/60 font-mono mt-0.5">Stored via Shelby SDK</div>
          </div>

          <div className="p-4 rounded-2xl gothic-card border border-[#5C4E4E]/50 text-left">
            <div className="text-[11px] font-mono text-[#988686] uppercase tracking-widest flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5" /> Proofs Minted
            </div>
            <div className="font-cinzel text-xl sm:text-2xl font-bold text-white mt-1">18,429</div>
            <div className="text-[10px] text-[#D1D0D0]/60 font-mono mt-0.5">Aptos Ledger Timestamped</div>
          </div>

          <div className="p-4 rounded-2xl gothic-card border border-[#5C4E4E]/50 text-left">
            <div className="text-[11px] font-mono text-[#988686] uppercase tracking-widest flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5" /> Verified Notes
            </div>
            <div className="font-cinzel text-xl sm:text-2xl font-bold text-white mt-1">3,104</div>
            <div className="text-[10px] text-[#D1D0D0]/60 font-mono mt-0.5">Signed Cryptographically</div>
          </div>

          <div className="p-4 rounded-2xl gothic-card border border-[#5C4E4E]/50 text-left">
            <div className="text-[11px] font-mono text-[#988686] uppercase tracking-widest flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5" /> Shelbynet Status
            </div>
            <div className="font-cinzel text-xl sm:text-2xl font-bold text-emerald-400 mt-1 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              100% Active
            </div>
            <div className="text-[10px] text-[#D1D0D0]/60 font-mono mt-0.5">Aptos Testnet Network</div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
