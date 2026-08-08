import React, { useState, useEffect } from 'react';
import { useVault } from '../context/VaultContext';
import { useWallet } from '../context/WalletContext';
import { 
  Lock, Unlock, ShieldCheck, FileText, Search, Plus, ExternalLink, 
  Clock, Key, Eye, EyeOff, CheckCircle2, Heart, Copy, Trash2, AlertTriangle, Filter, Sparkles, Database, Loader2 
} from 'lucide-react';
import { getAptosExplorerUrl, shortenAddress, formatDate, getCountdown, buildProofTransferPayload } from '../services/aptosService';

interface DashboardProps {
  openCreateModal: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ openCreateModal }) => {
  const { 
    vaultItems, proofItems, anonymousNotes, 
    activeTab, setActiveTab, unlockVaultItem, deleteVaultItem, deleteProofItem, deleteAnonymousNote, likeNote 
  } = useVault();
  
  const { connected, address, setOpenConnectModal, signTransactionAndSubmit } = useWallet();

  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [revealedContent, setRevealedContent] = useState<Record<string, string>>({});
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [unlockError, setUnlockError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [actionNotice, setActionNotice] = useState<{
    type: 'loading' | 'success' | 'error';
    message: string;
  } | null>(null);

  // Tick countdown timer every second
  const [, setTick] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => setTick(t => t + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleUnlockClick = async (itemId: string) => {
    setUnlockError(null);
    const res = await unlockVaultItem(itemId);
    if (res.success && res.content) {
      setRevealedContent(prev => ({ ...prev, [itemId]: res.content! }));
    } else if (res.error) {
      setUnlockError(res.error);
      setTimeout(() => setUnlockError(null), 5000);
    }
  };

  const handleDeleteEntry = async (type: 'vault' | 'proof' | 'note', id: string, title: string) => {
    if (!connected || !address) {
      setOpenConnectModal(true);
      return;
    }

    setDeletingId(id);
    setActionNotice({
      type: 'loading',
      message: `Waiting for Petra transaction approval to delete "${title}" on-chain...`,
    });

    try {
      const payload = buildProofTransferPayload(address);
      const txHash = await signTransactionAndSubmit(payload);

      // Delete item ONLY after transaction is approved in Petra & confirmed on-chain
      if (type === 'vault') {
        deleteVaultItem(id);
      } else if (type === 'proof') {
        deleteProofItem(id);
      } else if (type === 'note') {
        deleteAnonymousNote(id);
      }

      setActionNotice({
        type: 'success',
        message: `Entry "${title}" deleted on-chain (Tx: ${shortenAddress(txHash, 6, 4)}).`,
      });
      setTimeout(() => setActionNotice(null), 5000);
    } catch (err: any) {
      console.error('Delete transaction error:', err);
      const rawMsg = err?.message || 'Deletion cancelled — nothing was deleted.';
      const isCancelled =
        rawMsg.toLowerCase().includes('cancel') ||
        rawMsg.toLowerCase().includes('reject') ||
        rawMsg.toLowerCase().includes('denied') ||
        rawMsg.toLowerCase().includes('user rejected');

      setActionNotice({
        type: 'error',
        message: isCancelled ? 'Deletion cancelled — nothing was deleted.' : rawMsg,
      });
      setTimeout(() => setActionNotice(null), 6000);
    } finally {
      setDeletingId(null);
    }
  };

  const categories = ['All', 'Financial', 'Engineering', 'Credentials', 'Infrastructure', 'Philosophy'];

  // Strictly filter entries belonging to the currently connected wallet address
  const userVaultItems = vaultItems.filter(item => 
    address && item.ownerAddress?.toLowerCase() === address.toLowerCase()
  );
  const userProofItems = proofItems.filter(item => 
    address && item.ownerAddress?.toLowerCase() === address.toLowerCase()
  );
  const userNotes = anonymousNotes.filter(item => 
    address && item.ownerAddress?.toLowerCase() === address.toLowerCase()
  );

  // Filter items based on active tab, search, and category
  const filteredVault = userVaultItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(search.toLowerCase()) || 
                          item.category.toLowerCase().includes(search.toLowerCase());
    const matchesCat = selectedCategory === 'All' || item.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  const filteredProofs = userProofItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(search.toLowerCase()) || 
                          item.payloadHash.toLowerCase().includes(search.toLowerCase());
    const matchesCat = selectedCategory === 'All' || item.tags.includes(selectedCategory);
    return matchesSearch && matchesCat;
  });

  const filteredNotes = userNotes.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(search.toLowerCase()) || 
                          item.content.toLowerCase().includes(search.toLowerCase());
    const matchesCat = selectedCategory === 'All' || item.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      
      {/* Dashboard Top Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 pb-6 border-b border-[#5C4E4E]/40">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-mono text-[#988686] uppercase tracking-widest mb-1">
            <Database className="w-3.5 h-3.5" />
            <span>Shelby Protocol Vault Terminal</span>
          </div>
          <h1 className="font-cinzel text-3xl sm:text-4xl font-extrabold text-white">
            On-Chain Vault Dashboard
          </h1>
        </div>

        {/* Create Entry Button */}
        <div className="flex items-center gap-3">
          <button
            onClick={openCreateModal}
            className="px-6 py-3 rounded-xl gothic-btn font-cinzel font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-xl"
          >
            <Plus className="w-4 h-4 text-[#988686]" />
            <span>Create New Entry</span>
          </button>
        </div>
      </div>

      {/* Action Status Notice (Deletion / Petra Confirmation) */}
      {actionNotice && (
        <div
          className={`p-4 rounded-xl border text-xs sm:text-sm flex items-center gap-3 animate-fadeIn shadow-xl ${
            actionNotice.type === 'loading'
              ? 'bg-amber-950/80 border-amber-500/60 text-amber-200'
              : actionNotice.type === 'success'
              ? 'bg-emerald-950/80 border-emerald-500/60 text-emerald-200'
              : 'bg-red-950/80 border-red-500/60 text-red-200'
          }`}
        >
          {actionNotice.type === 'loading' ? (
            <Loader2 className="w-5 h-5 text-amber-400 animate-spin shrink-0" />
          ) : actionNotice.type === 'success' ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          ) : (
            <AlertTriangle className="w-5 h-5 text-red-400 shrink-0" />
          )}
          <span className="font-mono">{actionNotice.message}</span>
        </div>
      )}

      {/* Unlock Error Toast Notification */}
      {unlockError && (
        <div className="p-4 rounded-xl bg-red-950/80 border border-red-500/60 text-red-200 text-xs sm:text-sm flex items-center gap-3 animate-fadeIn">
          <AlertTriangle className="w-5 h-5 text-red-400 shrink-0" />
          <span>{unlockError}</span>
        </div>
      )}

      {/* Tabs Navigation Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        
        {/* Main 3 Tabs */}
        <div className="inline-flex p-1.5 rounded-2xl bg-[#121010] border border-[#5C4E4E]/60 max-w-md w-full sm:w-auto">
          <button
            onClick={() => setActiveTab('vault')}
            className={`flex-1 sm:flex-none px-5 py-2.5 rounded-xl text-xs font-bold tracking-wider transition-all flex items-center justify-center gap-2 ${
              activeTab === 'vault'
                ? 'gothic-card-active text-white'
                : 'text-[#D1D0D0]/80 hover:text-white'
            }`}
          >
            <Lock className="w-4 h-4 text-[#988686]" />
            <span>Vault ({userVaultItems.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('proofs')}
            className={`flex-1 sm:flex-none px-5 py-2.5 rounded-xl text-xs font-bold tracking-wider transition-all flex items-center justify-center gap-2 ${
              activeTab === 'proofs'
                ? 'gothic-card-active text-white'
                : 'text-[#D1D0D0]/80 hover:text-white'
            }`}
          >
            <ShieldCheck className="w-4 h-4 text-[#988686]" />
            <span>Proofs ({userProofItems.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('notes')}
            className={`flex-1 sm:flex-none px-5 py-2.5 rounded-xl text-xs font-bold tracking-wider transition-all flex items-center justify-center gap-2 ${
              activeTab === 'notes'
                ? 'gothic-card-active text-white'
                : 'text-[#D1D0D0]/80 hover:text-white'
            }`}
          >
            <FileText className="w-4 h-4 text-[#988686]" />
            <span>Notes ({userNotes.length})</span>
          </button>
        </div>

        {/* Search Input & Category Filter */}
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="w-4 h-4 text-[#988686] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search title or hash..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#121010] border border-[#5C4E4E]/50 focus:border-[#988686] text-xs text-white placeholder-[#5C4E4E] focus:outline-none transition-colors"
            />
          </div>
        </div>

      </div>

      {/* Category Pills Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        <span className="text-xs font-mono text-[#988686] mr-2 flex items-center gap-1">
          <Filter className="w-3.5 h-3.5" /> Filter:
        </span>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1 rounded-full text-[11px] font-mono transition-colors shrink-0 ${
              selectedCategory === cat
                ? 'bg-[#988686] text-black font-semibold'
                : 'bg-[#181414] text-[#D1D0D0] hover:bg-[#5C4E4E]/40 border border-[#5C4E4E]/40'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Wallet Gating for Vault, Proofs, and Notes */}
      {!connected ? (
        <div className="p-12 sm:p-20 rounded-2xl bg-[#050404] border border-[#2e2626] text-center space-y-6 my-8 max-w-2xl mx-auto shadow-2xl">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-[#120f10] border border-[#5C4E4E]/60 flex items-center justify-center text-[#988686]">
            <Lock className="w-8 h-8 stroke-[1.5]" />
          </div>
          <div className="space-y-3">
            <h3 className="font-cinzel text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Connect your wallet to view this
            </h3>
            <p className="text-xs sm:text-sm text-[#A09892] max-w-md mx-auto leading-relaxed">
              Access to the {activeTab === 'vault' ? 'Encrypted Vault' : activeTab === 'proofs' ? 'Creation Proofs' : 'Verified Notes'} requires authenticating your digital identity on Shelby Protocol.
            </p>
          </div>
          <button
            onClick={() => setOpenConnectModal(true)}
            className="px-8 py-3.5 bg-[#B3A9A3] hover:bg-[#FFFFFF] text-[#0A0808] font-mono text-xs font-semibold uppercase tracking-[0.18em] transition-all shadow-xl rounded-none"
          >
            CONNECT WALLET
          </button>
        </div>
      ) : (
        <>
          {/* TAB 1: VAULT ITEMS (TIME LOCK) */}
          {activeTab === 'vault' && (
            <div className="space-y-6">
          {filteredVault.length === 0 ? (
            /* Empty State */
            <div className="p-16 rounded-2xl gothic-card border border-[#5C4E4E]/50 text-center space-y-4">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-[#181414] border border-[#5C4E4E] flex items-center justify-center text-[#988686]">
                <Lock className="w-8 h-8" />
              </div>
              <h3 className="font-cinzel text-xl font-bold text-white">No Vault Entries Found</h3>
              <p className="text-xs text-[#D1D0D0]/80 max-w-md mx-auto">
                No time-locked secrets match your current search or filter parameters. Create a new encrypted vault entry to get started.
              </p>
              <button
                onClick={openCreateModal}
                className="px-6 py-2.5 rounded-xl gothic-btn font-cinzel text-xs font-bold uppercase tracking-wider inline-flex items-center gap-2"
              >
                <Plus className="w-4 h-4 text-[#988686]" /> Create Vault Item
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredVault.map(item => {
                const countdown = getCountdown(item.unlockTimestamp);
                const isUnlocked = item.isUnlocked || countdown.isExpired;
                const isRevealed = Boolean(revealedContent[item.id]);

                return (
                  <div
                    key={item.id}
                    className={`gothic-card rounded-2xl p-6 border flex flex-col justify-between space-y-5 relative overflow-hidden group ${
                      isUnlocked ? 'border-[#988686]/60' : 'border-[#5C4E4E]/60'
                    }`}
                  >
                    {/* Top Status & Category Badge */}
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-0.5 rounded-md bg-[#181414] border border-[#5C4E4E]/60 text-[10px] font-mono text-[#988686] uppercase tracking-wider">
                        {item.category}
                      </span>

                      {/* Lock Status Badge */}
                      <span
                        className={`px-3 py-1 rounded-full text-[11px] font-mono font-bold tracking-wider flex items-center gap-1.5 border ${
                          isUnlocked
                            ? 'bg-emerald-950/60 border-emerald-500/50 text-emerald-400'
                            : 'bg-red-950/60 border-red-500/40 text-red-300'
                        }`}
                      >
                        {isUnlocked ? (
                          <>
                            <Unlock className="w-3 h-3" /> UNLOCKED
                          </>
                        ) : (
                          <>
                            <Lock className="w-3 h-3" /> LOCKED
                          </>
                        )}
                      </span>
                    </div>

                    {/* Title */}
                    <div>
                      <h3 className="font-cinzel text-lg font-bold text-white group-hover:text-[#988686] transition-colors leading-snug">
                        {item.title}
                      </h3>
                      {item.fileName && (
                        <p className="text-xs font-mono text-[#988686] mt-1 flex items-center gap-1.5">
                          <Database className="w-3 h-3" /> {item.fileName} ({item.fileSize})
                        </p>
                      )}
                    </div>

                    {/* Payload Body Box (Obfuscated or Revealed) */}
                    <div className="p-4 rounded-xl bg-[#0a0909] border border-[#5C4E4E]/40 font-mono text-xs text-[#D1D0D0] relative min-h-[90px] flex flex-col justify-center">
                      {isUnlocked ? (
                        isRevealed ? (
                          <div className="text-emerald-300 break-all leading-relaxed">
                            {revealedContent[item.id] || item.content}
                          </div>
                        ) : (
                          <div className="text-[#D1D0D0]/80 space-y-2">
                            <p className="text-[11px] text-[#988686]">Decryption trigger ready on Shelbynet.</p>
                            <button
                              onClick={() => handleUnlockClick(item.id)}
                              className="w-full py-2 rounded-lg bg-[#5C4E4E] hover:bg-[#988686] text-white hover:text-black font-sans text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
                            >
                              <Eye className="w-3.5 h-3.5" /> Reveal Decrypted Payload
                            </button>
                          </div>
                        )
                      ) : (
                        <div className="text-center py-2 space-y-2">
                          <div className="text-red-400/80 font-mono text-xs tracking-widest blur-[2px]">
                            ••••••••••••••••••••••••••••••••
                          </div>
                          <div className="text-[11px] font-mono text-[#988686] flex items-center justify-center gap-1.5">
                            <Clock className="w-3.5 h-3.5" />
                            Unlocks in: {countdown.days}d {countdown.hours}h {countdown.minutes}m {countdown.seconds}s
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Meta Timestamps */}
                    <div className="space-y-1 pt-2 text-[11px] font-mono text-[#D1D0D0]/60 border-t border-[#5C4E4E]/30">
                      <div className="flex items-center justify-between">
                        <span>Created:</span>
                        <span>{formatDate(item.createdTimestamp)}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Unlock Target:</span>
                        <span className="text-[#988686]">{formatDate(item.unlockTimestamp)}</span>
                      </div>
                      <div className="flex items-center justify-between pt-1">
                        <span>Shelby Blob ID:</span>
                        <span className="text-white font-mono">{shortenAddress(item.shelbyBlobId, 12, 4)}</span>
                      </div>
                    </div>

                    {/* Card Actions */}
                    <div className="flex items-center justify-between gap-2 pt-2">
                      <a
                        href={getAptosExplorerUrl(item.txHash)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-[#988686] hover:text-white flex items-center gap-1 transition-colors font-mono"
                      >
                        <ExternalLink className="w-3.5 h-3.5" /> Explorer Tx
                      </a>

                      <button
                        onClick={() => handleDeleteEntry('vault', item.id, item.title)}
                        disabled={deletingId === item.id}
                        className="p-1.5 rounded-lg text-red-400/70 hover:text-red-400 hover:bg-red-950/40 disabled:opacity-50 transition-colors"
                        title="Delete vault entry (requires Petra signature)"
                      >
                        {deletingId === item.id ? (
                          <Loader2 className="w-4 h-4 animate-spin text-amber-400" />
                        ) : (
                          <Trash2 className="w-4 h-4" />
                        )}
                      </button>
                    </div>

                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* TAB 2: PROOFS (PROOF OF CREATION) */}
      {activeTab === 'proofs' && (
        <div className="space-y-6">
          {filteredProofs.length === 0 ? (
            <div className="p-16 rounded-2xl gothic-card border border-[#5C4E4E]/50 text-center space-y-4">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-[#181414] border border-[#5C4E4E] flex items-center justify-center text-[#988686]">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <h3 className="font-cinzel text-xl font-bold text-white">No Creation Proofs Found</h3>
              <p className="text-xs text-[#D1D0D0]/80 max-w-md mx-auto">
                No timestamped proof entries match your current search parameters. Create a new proof to certify document ownership on Aptos.
              </p>
              <button
                onClick={openCreateModal}
                className="px-6 py-2.5 rounded-xl gothic-btn font-cinzel text-xs font-bold uppercase tracking-wider inline-flex items-center gap-2"
              >
                <Plus className="w-4 h-4 text-[#988686]" /> Create Proof Entry
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredProofs.map(proof => (
                <div
                  key={proof.id}
                  className="gothic-card rounded-2xl p-6 border border-[#5C4E4E]/60 hover:border-[#988686] flex flex-col md:flex-row md:items-center justify-between gap-6 transition-all"
                >
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="px-3 py-1 rounded-full bg-[#181414] border border-[#988686]/50 text-[11px] font-mono text-emerald-400 font-semibold flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Verified On-Chain
                      </span>
                      {proof.tags.map(t => (
                        <span key={t} className="px-2.5 py-0.5 rounded bg-[#5C4E4E]/30 text-[10px] font-mono text-[#D1D0D0]">
                          #{t}
                        </span>
                      ))}
                    </div>

                    <h3 className="font-cinzel text-xl font-bold text-white">{proof.title}</h3>
                    <p className="text-xs text-[#D1D0D0]/80 max-w-2xl leading-relaxed">{proof.description}</p>

                    <div className="p-3 rounded-xl bg-[#0a0909] border border-[#5C4E4E]/40 font-mono text-xs space-y-1">
                      <div className="flex items-center justify-between text-[#988686]">
                        <span>SHA-256 Payload Hash:</span>
                        <button
                          onClick={() => handleCopy(proof.payloadHash, proof.id)}
                          className="hover:text-white flex items-center gap-1 text-[11px]"
                        >
                          <Copy className="w-3 h-3" />
                          {copiedId === proof.id ? 'Copied Hash' : 'Copy'}
                        </button>
                      </div>
                      <div className="text-white break-all text-[11px] font-mono">{proof.payloadHash}</div>
                    </div>
                  </div>

                  {/* Proof Meta & Verification Button */}
                  <div className="md:w-64 shrink-0 space-y-3 p-4 rounded-xl bg-[#121010] border border-[#5C4E4E]/30 font-mono text-xs">
                    <div className="flex items-center justify-between text-[#D1D0D0]/80">
                      <span>Aptos Block:</span>
                      <span className="text-white font-bold">#{proof.blockHeight.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between text-[#D1D0D0]/80">
                      <span>Timestamp:</span>
                      <span>{formatDate(proof.createdTimestamp)}</span>
                    </div>
                    <div className="flex items-center justify-between text-[#D1D0D0]/80">
                      <span>Tx Hash:</span>
                      <span className="text-[#988686]">{shortenAddress(proof.txHash, 6, 4)}</span>
                    </div>

                    <div className="flex items-center gap-2 pt-1 border-t border-[#5C4E4E]/30">
                      <a
                        href={getAptosExplorerUrl(proof.txHash)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 py-2 rounded-lg gothic-btn text-center text-xs font-sans font-bold flex items-center justify-center gap-2 transition-colors"
                      >
                        <ExternalLink className="w-3.5 h-3.5" /> Explorer
                      </a>

                      <button
                        onClick={() => handleDeleteEntry('proof', proof.id, proof.title)}
                        disabled={deletingId === proof.id}
                        className="p-2 rounded-lg border border-red-500/30 text-red-400/70 hover:text-red-400 hover:bg-red-950/40 disabled:opacity-50 transition-colors shrink-0"
                        title="Delete proof entry (requires Petra signature)"
                      >
                        {deletingId === proof.id ? (
                          <Loader2 className="w-4 h-4 animate-spin text-amber-400" />
                        ) : (
                          <Trash2 className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>

                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 3: NOTES (VERIFIED ANONYMOUS NOTES) */}
      {activeTab === 'notes' && (
        <div className="space-y-6">
          {filteredNotes.length === 0 ? (
            <div className="p-16 rounded-2xl gothic-card border border-[#5C4E4E]/50 text-center space-y-4">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-[#181414] border border-[#5C4E4E] flex items-center justify-center text-[#988686]">
                <FileText className="w-8 h-8" />
              </div>
              <h3 className="font-cinzel text-xl font-bold text-white">No Anonymous Notes Found</h3>
              <p className="text-xs text-[#D1D0D0]/80 max-w-md mx-auto">
                No signed anonymous notes match your search filters. Be the first to publish a verified anonymous statement.
              </p>
              <button
                onClick={openCreateModal}
                className="px-6 py-2.5 rounded-xl gothic-btn font-cinzel text-xs font-bold uppercase tracking-wider inline-flex items-center gap-2"
              >
                <Plus className="w-4 h-4 text-[#988686]" /> Publish Note
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredNotes.map(note => (
                <div
                  key={note.id}
                  className="gothic-card rounded-2xl p-6 border border-[#5C4E4E]/60 hover:border-[#988686] flex flex-col justify-between space-y-5 transition-all"
                >
                  <div className="space-y-3">
                    {/* Header Badge */}
                    <div className="flex items-center justify-between">
                      <span className="px-3 py-1 rounded-full bg-[#181414] border border-[#988686]/60 text-[11px] font-mono text-[#988686] font-semibold flex items-center gap-1.5">
                        <Key className="w-3.5 h-3.5" /> Verified Wallet Signature
                      </span>
                      <span className="text-[11px] font-mono text-[#D1D0D0]/60">
                        {formatDate(note.createdTimestamp)}
                      </span>
                    </div>

                    <h3 className="font-cinzel text-xl font-bold text-white">{note.title}</h3>
                    
                    <p className="text-xs sm:text-sm text-[#D1D0D0] leading-relaxed italic bg-[#0a0909] p-4 rounded-xl border border-[#5C4E4E]/30">
                      "{note.content}"
                    </p>
                  </div>

                  {/* Note Footer: Author status & Signature preview */}
                  <div className="pt-3 border-t border-[#5C4E4E]/30 space-y-3">
                    <div className="flex items-center justify-between text-xs font-mono text-[#988686]">
                      <span className="flex items-center gap-1">
                        Author: <strong className="text-white">Anonymous Creator</strong>
                      </span>
                      <span>Category: {note.category}</span>
                    </div>

                    <div className="p-2.5 rounded-lg bg-[#121010] border border-[#5C4E4E]/40 font-mono text-[10px] text-[#D1D0D0]/80 flex items-center justify-between gap-2">
                      <span className="truncate">Sig: {note.signature}</span>
                      <button
                        onClick={() => handleCopy(note.signature, note.id)}
                        className="hover:text-white text-[#988686] shrink-0"
                      >
                        {copiedId === note.id ? 'Copied' : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>

                    {/* Upvote/Like & Delete Actions */}
                    <div className="flex items-center justify-between pt-1">
                      <button
                        onClick={() => likeNote(note.id)}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#181414] hover:bg-[#5C4E4E]/40 border border-[#5C4E4E]/40 text-xs font-mono text-[#D1D0D0] hover:text-white transition-colors"
                      >
                        <Heart className="w-3.5 h-3.5 text-red-400 fill-red-400/20" />
                        <span>Upvote ({note.likes})</span>
                      </button>

                      <div className="flex items-center gap-3">
                        {note.txHash && (
                          <a
                            href={getAptosExplorerUrl(note.txHash)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs font-mono text-[#988686] hover:text-white flex items-center gap-1"
                          >
                            <ExternalLink className="w-3.5 h-3.5" /> On-Chain
                          </a>
                        )}

                        <button
                          onClick={() => handleDeleteEntry('note', note.id, note.title)}
                          disabled={deletingId === note.id}
                          className="p-1.5 rounded-lg text-red-400/70 hover:text-red-400 hover:bg-red-950/40 disabled:opacity-50 transition-colors"
                          title="Delete note (requires Petra signature)"
                        >
                          {deletingId === note.id ? (
                            <Loader2 className="w-4 h-4 animate-spin text-amber-400" />
                          ) : (
                            <Trash2 className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </div>

                  </div>

                </div>
              ))}
            </div>
          )}
        </div>
      )}
        </>
      )}

    </div>
  );
};
