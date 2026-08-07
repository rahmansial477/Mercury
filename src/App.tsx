import React, { useState } from 'react';
import { WalletProvider } from './context/WalletContext';
import { VaultProvider, useVault } from './context/VaultContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { HowItWorks } from './components/HowItWorks';
import { Dashboard } from './components/Dashboard';
import { DocsView } from './components/DocsView';
import { Footer } from './components/Footer';
import { CreateEntryModal } from './components/CreateEntryModal';
import { ConnectModal } from './components/ConnectModal';

function AppContent() {
  const [currentView, setCurrentView] = useState<'home' | 'dashboard' | 'docs'>('home');
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const { setActiveTab } = useVault();

  const handleLaunchDashboard = (tab?: 'vault' | 'proofs' | 'notes') => {
    if (tab) {
      setActiveTab(tab);
    }
    setCurrentView('dashboard');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenCreateModal = () => {
    setCreateModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#000000] text-[#D1D0D0] flex flex-col font-sans selection:bg-[#988686]/30 selection:text-white">
      {/* Navigation */}
      <Navbar
        currentView={currentView}
        setCurrentView={setCurrentView}
        openCreateModal={handleOpenCreateModal}
      />

      {/* Main View Area */}
      <main className="flex-grow">
        {currentView === 'home' && (
          <>
            <Hero
              onLaunchDashboard={handleLaunchDashboard}
              openCreateModal={handleOpenCreateModal}
              onExploreDocs={() => setCurrentView('docs')}
            />
            <Features onSelectFeature={handleLaunchDashboard} />
            <HowItWorks />
          </>
        )}

        {currentView === 'dashboard' && (
          <Dashboard openCreateModal={handleOpenCreateModal} />
        )}

        {currentView === 'docs' && (
          <DocsView />
        )}
      </main>

      {/* Footer */}
      <Footer />

      {/* Modals */}
      <CreateEntryModal
        isOpen={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
      />

      <ConnectModal />
    </div>
  );
}

export default function App() {
  return (
    <WalletProvider>
      <VaultProvider>
        <AppContent />
      </VaultProvider>
    </WalletProvider>
  );
}
