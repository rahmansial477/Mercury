import React from 'react';
import { motion } from 'motion/react';
import { useWallet } from '../context/WalletContext';
import { Lock, ShieldCheck, FileText, ExternalLink, Key, Database, Sparkles } from 'lucide-react';

interface HeroProps {
  onLaunchDashboard: (tab?: 'vault' | 'proofs' | 'notes') => void;
  openCreateModal: () => void;
  onExploreDocs: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onLaunchDashboard }) => {
  const { connected, shortAddress, setOpenConnectModal } = useWallet();

  return (
    <section className="relative py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-[#282020] bg-[#000000]">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
        
        {/* Left Column: Headlines & Action */}
        <div className="lg:col-span-7 space-y-10">
          
          {/* Main Headline: Lock it. Prove it. Speak on it. */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-cinzel text-5xl sm:text-7xl lg:text-8xl font-normal tracking-tight text-white leading-[1.05]"
          >
            Lock it.{' '}
            <span className="italic font-serif text-[#A08E8E]">Prove it.</span>{' '}
            Speak on it.
          </motion.h1>

          {/* Vertical Accent Line + 3 Core Sentences */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
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
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
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
              className="px-8 py-3.5 bg-[#B3A9A3] hover:bg-[#C9C1BB] text-[#0A0808] font-mono text-xs font-semibold uppercase tracking-[0.18em] transition-all shadow-xl rounded-none cursor-pointer"
            >
              {connected ? `DASHBOARD (${shortAddress})` : 'CONNECT WALLET'}
            </button>
          </motion.div>

        </div>

        {/* Right Column: Floating App Preview / Screenshot Box */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5"
        >
          {/* Outer floating wrapper with smooth infinite vertical bobbing */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            className="relative p-1 bg-gradient-to-b from-[#3a2f30] via-[#1a1415] to-[#0a0808] border border-[#3e3232] shadow-[0_10px_40px_rgba(152,134,136,0.15)] group"
          >
            {/* Window Header Chrome */}
            <div className="bg-[#080606] px-4 py-3 border-b border-[#2a2020] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#5C4E4E]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#3e3232]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#282020]" />
                <span className="ml-2 font-mono text-[10px] uppercase tracking-widest text-[#988686]">
                  MERCURY VAULT TERMINAL
                </span>
              </div>
              <span className="font-mono text-[9px] uppercase tracking-wider text-emerald-400/90 bg-emerald-950/60 border border-emerald-500/40 px-2 py-0.5">
                ACTIVE :: ENCRYPTED
              </span>
            </div>

            {/* Protocol Terminal UI Window Body */}
            <div className="bg-[#050404] p-5 space-y-4 font-mono text-xs text-[#D1D0D0]">
              
              {/* Terminal Nav Header */}
              <div className="flex items-center justify-between border-b border-[#282020] pb-3 text-[11px]">
                <div className="flex items-center gap-3">
                  <span className="text-white font-bold underline decoration-[#988686] underline-offset-4 flex items-center gap-1">
                    <Lock className="w-3 h-3 text-[#988686]" /> SHELBY PROTOCOL
                  </span>
                </div>
                <span className="text-[10px] text-emerald-400 font-bold">TESTNET-4</span>
              </div>

              {/* Status Box 1: Account Context */}
              <div className="p-3 bg-[#0a0808] border border-[#2e2626] space-y-2 relative overflow-hidden">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-bold text-white tracking-wide">ACCOUNT IDENTITY</span>
                  <span className={`text-[9px] px-1.5 py-0.5 border ${connected ? 'bg-emerald-950/80 text-emerald-300 border-emerald-500/40' : 'bg-[#181414] text-[#8E8681] border-[#3e3232]'}`}>
                    {connected ? 'CONNECTED' : 'DISCONNECTED'}
                  </span>
                </div>
                <p className="text-[10px] text-[#8E8681] truncate font-mono">
                  {connected ? `Addr: ${address}` : 'No active wallet. Connect to sign and store payloads.'}
                </p>
              </div>

              {/* Status Box 2: Real Protocol Metrics */}
              <div className="p-3 bg-[#0a0808] border border-[#2e2626] space-y-2">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-bold text-white tracking-wide">PROTOCOL TELEMETRY</span>
                  <span className="text-[9px] bg-emerald-950/80 text-emerald-300 border border-emerald-500/40 px-1.5 py-0.5 flex items-center gap-1">
                    ONLINE
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-[10px] text-[#8E8681]">
                  <div>Network: <span className="text-white">Aptos Shelbynet</span></div>
                  <div>Finality: <span className="text-white">&lt;1.2s</span></div>
                  <div>Encryption: <span className="text-white">AES-GCM / SHA-256</span></div>
                  <div>Storage: <span className="text-white">Shelby Blob SDK</span></div>
                </div>
              </div>

              {/* Bottom Interactive Launch Trigger */}
              <div className="pt-1 text-center">
                <button
                  onClick={() => {
                    if (connected) {
                      onLaunchDashboard('vault');
                    } else {
                      setOpenConnectModal(true);
                    }
                  }}
                  className="w-full py-2.5 bg-[#B3A9A3] hover:bg-[#C9C1BB] text-[#0A0808] text-[10px] font-mono font-bold uppercase tracking-widest transition-colors flex items-center justify-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#0A0808]" /> {connected ? 'OPEN DASHBOARD' : 'CONNECT WALLET TO START'}
                </button>
              </div>

            </div>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
};



