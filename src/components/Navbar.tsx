import React from 'react';
import { Logo } from './Logo';
import { useWallet } from '../context/WalletContext';
import { useVault } from '../context/VaultContext';
import { Plus, Wallet, Lock, ShieldCheck, FileText, ChevronRight, Menu, X, BookOpen, Layers } from 'lucide-react';

interface NavbarProps {
  currentView: 'home' | 'dashboard' | 'docs';
  setCurrentView: (view: 'home' | 'dashboard' | 'docs') => void;
  openCreateModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentView, setCurrentView, openCreateModal }) => {
  const { connected, shortAddress, setOpenConnectModal, walletName } = useWallet();
  const { setActiveTab } = useVault();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const handleNavClick = (view: 'home' | 'dashboard' | 'docs', tab?: 'vault' | 'proofs' | 'notes') => {
    setCurrentView(view);
    if (tab) {
      setActiveTab(tab);
    }
    setMobileMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-40 w-full bg-black/90 backdrop-blur-xl border-b border-[#5C4E4E]/40 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Logo */}
        <button 
          onClick={() => handleNavClick('home')}
          className="focus:outline-none flex items-center gap-2 group text-left"
        >
          <Logo size={36} showText={true} />
        </button>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-1 sm:gap-2 px-3 py-1.5 rounded-full bg-[#121010] border border-[#5C4E4E]/50">
          <button
            onClick={() => handleNavClick('dashboard', 'vault')}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider transition-all flex items-center gap-2 ${
              currentView === 'dashboard'
                ? 'bg-[#5C4E4E] text-white border border-[#988686]'
                : 'text-[#D1D0D0] hover:text-white hover:bg-[#5C4E4E]/30'
            }`}
          >
            <Lock className="w-3.5 h-3.5 text-[#988686]" />
            <span>Vault</span>
          </button>

          <button
            onClick={() => handleNavClick('dashboard', 'proofs')}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider transition-all flex items-center gap-2 ${
              currentView === 'dashboard'
                ? 'bg-[#5C4E4E] text-white border border-[#988686]'
                : 'text-[#D1D0D0] hover:text-white hover:bg-[#5C4E4E]/30'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5 text-[#988686]" />
            <span>Proofs</span>
          </button>

          <button
            onClick={() => handleNavClick('dashboard', 'notes')}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider transition-all flex items-center gap-2 ${
              currentView === 'dashboard'
                ? 'bg-[#5C4E4E] text-white border border-[#988686]'
                : 'text-[#D1D0D0] hover:text-white hover:bg-[#5C4E4E]/30'
            }`}
          >
            <FileText className="w-3.5 h-3.5 text-[#988686]" />
            <span>Notes</span>
          </button>

          <button
            onClick={() => {
              if (currentView !== 'home') setCurrentView('home');
              setTimeout(() => {
                const el = document.getElementById('how-it-works');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }, 100);
            }}
            className="px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider text-[#D1D0D0] hover:text-white hover:bg-[#5C4E4E]/30 transition-all"
          >
            <span>How it Works</span>
          </button>

          <button
            onClick={() => handleNavClick('docs')}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider transition-all flex items-center gap-1.5 ${
              currentView === 'docs'
                ? 'bg-[#5C4E4E] text-white border border-[#988686]'
                : 'text-[#D1D0D0] hover:text-white hover:bg-[#5C4E4E]/30'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5 text-[#988686]" />
            <span>Docs</span>
          </button>
        </div>

        {/* Action Buttons: Create Entry + Wallet Connect */}
        <div className="hidden md:flex items-center gap-3">
          {/* Create Entry Trigger */}
          <button
            onClick={openCreateModal}
            className="px-4 py-2 rounded-xl gothic-btn text-xs font-bold tracking-wider uppercase flex items-center gap-2 shadow-lg shadow-[#988686]/10"
          >
            <Plus className="w-4 h-4 text-[#988686]" />
            <span>Create Entry</span>
          </button>

          {/* Wallet Connect Pill */}
          <button
            onClick={() => setOpenConnectModal(true)}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-medium flex items-center gap-2 transition-all border ${
              connected
                ? 'bg-[#181414] border-[#988686] text-white hover:bg-[#251f1f]'
                : 'gothic-btn-outline'
            }`}
          >
            <Wallet className={`w-4 h-4 ${connected ? 'text-[#988686]' : 'text-[#D1D0D0]'}`} />
            <span>{connected ? shortAddress : 'Connect Wallet'}</span>
            {connected && <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />}
          </button>
        </div>

        {/* Mobile menu toggle */}
        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={openCreateModal}
            className="p-2 rounded-lg bg-[#5C4E4E] text-white border border-[#988686]"
          >
            <Plus className="w-5 h-5" />
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-[#D1D0D0] hover:text-white hover:bg-[#5C4E4E]/40"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0c0b0b] border-b border-[#5C4E4E] px-4 pt-3 pb-6 space-y-3 animate-fadeIn">
          <button
            onClick={() => handleNavClick('dashboard', 'vault')}
            className="w-full text-left py-2.5 px-3 rounded-lg text-sm text-[#D1D0D0] hover:bg-[#5C4E4E]/30 flex items-center gap-3"
          >
            <Lock className="w-4 h-4 text-[#988686]" />
            <span>Time-Locked Vault</span>
          </button>
          <button
            onClick={() => handleNavClick('dashboard', 'proofs')}
            className="w-full text-left py-2.5 px-3 rounded-lg text-sm text-[#D1D0D0] hover:bg-[#5C4E4E]/30 flex items-center gap-3"
          >
            <ShieldCheck className="w-4 h-4 text-[#988686]" />
            <span>Proof of Creation</span>
          </button>
          <button
            onClick={() => handleNavClick('dashboard', 'notes')}
            className="w-full text-left py-2.5 px-3 rounded-lg text-sm text-[#D1D0D0] hover:bg-[#5C4E4E]/30 flex items-center gap-3"
          >
            <FileText className="w-4 h-4 text-[#988686]" />
            <span>Anonymous Notes</span>
          </button>
          <button
            onClick={() => handleNavClick('docs')}
            className="w-full text-left py-2.5 px-3 rounded-lg text-sm text-[#D1D0D0] hover:bg-[#5C4E4E]/30 flex items-center gap-3"
          >
            <BookOpen className="w-4 h-4 text-[#988686]" />
            <span>Documentation</span>
          </button>
          <div className="pt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setOpenConnectModal(true);
              }}
              className="w-full py-3 rounded-xl gothic-btn text-xs font-bold uppercase font-mono flex items-center justify-center gap-2"
            >
              <Wallet className="w-4 h-4 text-[#988686]" />
              <span>{connected ? shortAddress : 'Connect Aptos Wallet'}</span>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};
