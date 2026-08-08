import React from 'react';
import { useWallet } from '../context/WalletContext';
import { X, ShieldCheck, Wallet, ExternalLink, CheckCircle2 } from 'lucide-react';

export const ConnectModal: React.FC = () => {
  const {
    openConnectModal,
    setOpenConnectModal,
    connectWallet,
    connected,
    walletName,
    shortAddress,
    disconnectWallet,
    isSimulatedWallet
  } = useWallet();

  if (!openConnectModal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div 
        className="relative w-full max-w-md gothic-card rounded-2xl p-6 sm:p-8 border border-[#5C4E4E] shadow-2xl overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Ambient Top Glow */}
        <div className="absolute -top-16 -left-16 w-32 h-32 bg-[#988686] rounded-full blur-3xl opacity-30 pointer-events-none" />

        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#5C4E4E]/50">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-[#5C4E4E]/30 text-[#988686] border border-[#988686]/30">
              <Wallet className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-cinzel text-lg font-bold text-white tracking-wider">Connect Aptos Wallet</h3>
              <p className="text-xs text-[#988686] font-mono">Select Shelbynet Provider</p>
            </div>
          </div>
          <button
            onClick={() => setOpenConnectModal(false)}
            className="p-1.5 rounded-lg text-[#D1D0D0] hover:text-white hover:bg-[#5C4E4E]/40 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Currently Connected State */}
        {connected ? (
          <div className="py-6 space-y-5">
            <div className="p-4 rounded-xl bg-[#1a1717] border border-[#988686]/40 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-sm font-semibold text-white">{walletName || 'Connected Wallet'}</span>
                </div>
                <p className="font-mono text-xs text-[#D1D0D0] mt-1">{shortAddress}</p>
              </div>
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            </div>

            <div className="p-3 rounded-lg bg-[#121010] border border-[#5C4E4E]/30 text-xs text-[#D1D0D0] flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-[#988686] shrink-0 mt-0.5" />
              <span>Wallet is active on Aptos Testnet (Shelbynet). Ready to sign transactions & vaults.</span>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={disconnectWallet}
                className="w-full py-2.5 rounded-xl border border-red-500/40 text-red-400 hover:bg-red-500/10 text-sm font-medium transition-colors"
              >
                Disconnect Wallet
              </button>
              <button
                onClick={() => setOpenConnectModal(false)}
                className="w-full py-2.5 rounded-xl gothic-btn text-sm font-medium"
              >
                Close Window
              </button>
            </div>
          </div>
        ) : (
          /* Connect Wallet List */
          <div className="py-5 space-y-3">
            <p className="text-xs text-[#D1D0D0]/80">
              Connect your Aptos wallet to sign time-locked vaults, mint proof hashes, and publish verified anonymous notes.
            </p>

            {/* Petra Wallet Option */}
            <button
              onClick={() => connectWallet('petra_extension')}
              className="w-full p-4 rounded-xl bg-[#141212] hover:bg-[#1f1b1b] border border-[#5C4E4E]/60 hover:border-[#988686] flex items-center justify-between group transition-all cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#988686] to-[#5C4E4E] flex items-center justify-center font-bold text-white text-xs shadow-md">
                  P
                </div>
                <div className="text-left">
                  <div className="text-sm font-semibold text-white group-hover:text-[#988686] transition-colors">
                    Petra Aptos Wallet
                  </div>
                  <div className="text-[11px] text-[#988686] font-mono">Official Extension / Plugin</div>
                </div>
              </div>
              <span className="text-xs px-2.5 py-1 rounded-md bg-[#5C4E4E]/40 text-[#D1D0D0] group-hover:bg-[#988686] group-hover:text-black font-mono transition-colors">
                Connect
              </span>
            </button>

            {/* Information Notice */}
            <div className="pt-2">
              <a
                href="https://petra.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-[#988686] hover:text-white flex items-center justify-center gap-1.5 transition-colors"
              >
                <span>Don't have Petra Wallet? Install extension</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        )}

        {/* Modal Footer */}
        <div className="pt-4 border-t border-[#5C4E4E]/40 flex items-center justify-between text-[11px] text-[#988686] font-mono">
          <span>Network: Aptos Testnet</span>
          <span>Protocol: Shelby SDK</span>
        </div>
      </div>
    </div>
  );
};
