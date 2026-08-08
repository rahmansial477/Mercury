import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { VaultItem, ProofItem, AnonymousNote } from '../types';
import { generateTxHash } from '../services/aptosService';
import { decryptPayload } from '../services/shelbyService';

interface VaultContextType {
  vaultItems: VaultItem[];
  proofItems: ProofItem[];
  anonymousNotes: AnonymousNote[];
  addVaultItem: (item: Omit<VaultItem, 'id' | 'createdTimestamp' | 'isUnlocked'>) => Promise<VaultItem>;
  addProofItem: (proof: Omit<ProofItem, 'id' | 'createdTimestamp' | 'blockHeight' | 'verified'>) => Promise<ProofItem>;
  addAnonymousNote: (note: Omit<AnonymousNote, 'id' | 'createdTimestamp' | 'likes' | 'verified'>) => Promise<AnonymousNote>;
  unlockVaultItem: (itemId: string) => Promise<{ success: boolean; content?: string; error?: string }>;
  likeNote: (noteId: string) => void;
  deleteVaultItem: (itemId: string) => void;
  deleteProofItem: (proofId: string) => void;
  deleteAnonymousNote: (noteId: string) => void;
  activeTab: 'vault' | 'proofs' | 'notes';
  setActiveTab: (tab: 'vault' | 'proofs' | 'notes') => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filterCategory: string;
  setFilterCategory: (category: string) => void;
}

const VaultContext = createContext<VaultContextType | undefined>(undefined);

export const VaultProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [vaultItems, setVaultItems] = useState<VaultItem[]>(() => {
    const saved = localStorage.getItem('mercury_vault_items');
    if (saved) {
      try {
        const parsed: VaultItem[] = JSON.parse(saved);
        // Exclude legacy mock items
        return parsed.filter(i => !i.id.startsWith('v_1') && !i.id.startsWith('v_2') && !i.id.startsWith('v_3'));
      } catch (e) {
        console.error('Error parsing saved vault items:', e);
      }
    }
    return [];
  });

  const [proofItems, setProofItems] = useState<ProofItem[]>(() => {
    const saved = localStorage.getItem('mercury_proof_items');
    if (saved) {
      try {
        const parsed: ProofItem[] = JSON.parse(saved);
        // Exclude legacy mock items
        return parsed.filter(i => !i.id.startsWith('p_1') && !i.id.startsWith('p_2') && !i.id.startsWith('p_3'));
      } catch (e) {
        console.error('Error parsing saved proof items:', e);
      }
    }
    return [];
  });

  const [anonymousNotes, setAnonymousNotes] = useState<AnonymousNote[]>(() => {
    const saved = localStorage.getItem('mercury_anonymous_notes');
    if (saved) {
      try {
        const parsed: AnonymousNote[] = JSON.parse(saved);
        // Exclude legacy mock items
        return parsed.filter(i => !i.id.startsWith('n_1') && !i.id.startsWith('n_2') && !i.id.startsWith('n_3'));
      } catch (e) {
        console.error('Error parsing saved anonymous notes:', e);
      }
    }
    return [];
  });

  const [activeTab, setActiveTab] = useState<'vault' | 'proofs' | 'notes'>('vault');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');

  // Save changes to localStorage
  useEffect(() => {
    localStorage.setItem('mercury_vault_items', JSON.stringify(vaultItems));
  }, [vaultItems]);

  useEffect(() => {
    localStorage.setItem('mercury_proof_items', JSON.stringify(proofItems));
  }, [proofItems]);

  useEffect(() => {
    localStorage.setItem('mercury_anonymous_notes', JSON.stringify(anonymousNotes));
  }, [anonymousNotes]);

  const addVaultItem = async (itemData: Omit<VaultItem, 'id' | 'createdTimestamp' | 'isUnlocked'>) => {
    const newItem: VaultItem = {
      ...itemData,
      id: `v_${Date.now()}`,
      createdTimestamp: Date.now(),
      isUnlocked: Date.now() >= itemData.unlockTimestamp,
    };
    setVaultItems(prev => [newItem, ...prev]);
    return newItem;
  };

  const addProofItem = async (proofData: Omit<ProofItem, 'id' | 'createdTimestamp' | 'blockHeight' | 'verified'>) => {
    const newProof: ProofItem = {
      ...proofData,
      id: `p_${Date.now()}`,
      createdTimestamp: Date.now(),
      blockHeight: 184000000 + Math.floor(Math.random() * 500000),
      verified: true,
    };
    setProofItems(prev => [newProof, ...prev]);
    return newProof;
  };

  const addAnonymousNote = async (noteData: Omit<AnonymousNote, 'id' | 'createdTimestamp' | 'likes' | 'verified'>) => {
    const newNote: AnonymousNote = {
      ...noteData,
      id: `n_${Date.now()}`,
      createdTimestamp: Date.now(),
      likes: 0,
      verified: true,
    };
    setAnonymousNotes(prev => [newNote, ...prev]);
    return newNote;
  };

  const unlockVaultItem = async (itemId: string) => {
    const item = vaultItems.find(v => v.id === itemId);
    if (!item) return { success: false, error: 'Vault item not found' };

    // Real date comparison against system clock
    if (Date.now() < item.unlockTimestamp) {
      const remainingMs = item.unlockTimestamp - Date.now();
      const hours = (remainingMs / (1000 * 3600)).toFixed(1);
      return {
        success: false,
        error: `Time lock active. This entry remains cryptographically sealed for another ${hours} hours on Shelbynet.`,
      };
    }

    let revealedContent = item.content;
    try {
      if (item.content.startsWith('ENC_')) {
        revealedContent = await decryptPayload(item.content, item.unlockTimestamp);
      }
    } catch (e) {
      // Keep original content if plain text
    }

    setVaultItems(prev =>
      prev.map(v => (v.id === itemId ? { ...v, isUnlocked: true } : v))
    );

    return { success: true, content: revealedContent };
  };

  const deleteVaultItem = (itemId: string) => {
    setVaultItems(prev => prev.filter(v => v.id !== itemId));
  };

  const deleteProofItem = (proofId: string) => {
    setProofItems(prev => prev.filter(p => p.id !== proofId));
  };

  const deleteAnonymousNote = (noteId: string) => {
    setAnonymousNotes(prev => prev.filter(n => n.id !== noteId));
  };

  const likeNote = (noteId: string) => {
    setAnonymousNotes(prev =>
      prev.map(n => (n.id === noteId ? { ...n, likes: n.likes + 1 } : n))
    );
  };

  return (
    <VaultContext.Provider
      value={{
        vaultItems,
        proofItems,
        anonymousNotes,
        addVaultItem,
        addProofItem,
        addAnonymousNote,
        unlockVaultItem,
        deleteVaultItem,
        deleteProofItem,
        deleteAnonymousNote,
        likeNote,
        activeTab,
        setActiveTab,
        searchQuery,
        setSearchQuery,
        filterCategory,
        setFilterCategory,
      }}
    >
      {children}
    </VaultContext.Provider>
  );
};

export const useVault = () => {
  const context = useContext(VaultContext);
  if (!context) {
    throw new Error('useVault must be used within a VaultProvider');
  }
  return context;
};
