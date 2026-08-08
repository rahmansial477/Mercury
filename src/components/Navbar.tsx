import React from 'react';
import { Logo } from './Logo';
import { useWallet } from '../context/WalletContext';
import { useVault } from '../context/VaultContext';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  currentView: 'home' | 'dashboard' | 'docs';
  setCurrentView: (view: 'home' | 'dashboard' | 'docs') => void;
  openCreateModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentView, setCurrentView }) => {
  const { connected, shortAddress, setOpenConnectModal } = useWallet();
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
    <nav className="sticky top-0 z-40 w-full bg-[#000000]/95 backdrop-blur-md border-b border-[#282020] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Logo */}
        <button 
          onClick={() => handleNavClick('home')}
          className="focus:outline-none text-left flex items-center"
        >
          <Logo size={36} showText={true} />
        </button>

        {/* Center Links (HOME, VAULT, PROOFS, NOTES, PROTOCOL) */}
        <div className="hidden md:flex items-center gap-8">
          <button
            onClick={() => handleNavClick('home')}
            className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-[#D1D0D0] hover:text-white transition-colors"
          >
            HOME
          </button>

          <button
            onClick={() => handleNavClick('dashboard', 'vault')}
            className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-[#D1D0D0] hover:text-white transition-colors"
          >
            VAULT
          </button>

          <button
            onClick={() => handleNavClick('dashboard', 'proofs')}
            className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-[#D1D0D0] hover:text-white transition-colors"
          >
            PROOFS
          </button>

          <button
            onClick={() => handleNavClick('dashboard', 'notes')}
            className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-[#D1D0D0] hover:text-white transition-colors"
          >
            NOTES
          </button>

          <button
            onClick={() => {
              if (currentView !== 'home') setCurrentView('home');
              setTimeout(() => {
                const el = document.getElementById('how-it-works');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }, 100);
            }}
            className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-[#D1D0D0] hover:text-white transition-colors"
          >
            PROTOCOL
          </button>

          <button
            onClick={() => handleNavClick('docs')}
            className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-[#D1D0D0] hover:text-white transition-colors"
          >
            DOCUMENTATION
          </button>
        </div>

        {/* Right Button (CONNECT WALLET - Light Cream / Grey Pill) */}
        <div className="hidden md:flex items-center">
          <button
            onClick={() => setOpenConnectModal(true)}
            className="px-5 py-2.5 rounded-none bg-[#E0DCD6] hover:bg-[#FFFFFF] text-[#0A0808] font-mono text-xs font-semibold uppercase tracking-[0.15em] transition-all shadow-md"
          >
            {connected ? shortAddress : 'CONNECT WALLET'}
          </button>
        </div>

        {/* Mobile menu toggle */}
        <div className="md:hidden flex items-center gap-3">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#D1D0D0] hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0c0a0a] border-b border-[#3a2e2e] px-4 pt-4 pb-6 space-y-4">
          <button
            onClick={() => handleNavClick('home')}
            className="block w-full text-left py-2 font-mono text-xs uppercase tracking-[0.2em] text-[#D1D0D0] hover:text-white"
          >
            HOME
          </button>
          <button
            onClick={() => handleNavClick('dashboard', 'vault')}
            className="block w-full text-left py-2 font-mono text-xs uppercase tracking-[0.2em] text-[#D1D0D0] hover:text-white"
          >
            VAULT
          </button>
          <button
            onClick={() => handleNavClick('dashboard', 'proofs')}
            className="block w-full text-left py-2 font-mono text-xs uppercase tracking-[0.2em] text-[#D1D0D0] hover:text-white"
          >
            PROOFS
          </button>
          <button
            onClick={() => handleNavClick('dashboard', 'notes')}
            className="block w-full text-left py-2 font-mono text-xs uppercase tracking-[0.2em] text-[#D1D0D0] hover:text-white"
          >
            NOTES
          </button>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              if (currentView !== 'home') setCurrentView('home');
              setTimeout(() => {
                const el = document.getElementById('how-it-works');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }, 100);
            }}
            className="block w-full text-left py-2 font-mono text-xs uppercase tracking-[0.2em] text-[#D1D0D0] hover:text-white"
          >
            PROTOCOL
          </button>
          <button
            onClick={() => handleNavClick('docs')}
            className="block w-full text-left py-2 font-mono text-xs uppercase tracking-[0.2em] text-[#D1D0D0] hover:text-white"
          >
            DOCUMENTATION
          </button>
          <div className="pt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setOpenConnectModal(true);
              }}
              className="w-full py-3 bg-[#E0DCD6] text-[#0A0808] font-mono text-xs font-semibold uppercase tracking-[0.15em]"
            >
              {connected ? shortAddress : 'CONNECT WALLET'}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

