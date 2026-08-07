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
  activeTab: 'vault' | 'proofs' | 'notes';
  setActiveTab: (tab: 'vault' | 'proofs' | 'notes') => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filterCategory: string;
  setFilterCategory: (category: string) => void;
}

const VaultContext = createContext<VaultContextType | undefined>(undefined);

// Initial mock data matching Image 3 design
const INITIAL_VAULT_ITEMS: VaultItem[] = [
  {
    id: 'v_1',
    title: 'Shelby Protocol Seed Grant Allocation',
    type: 'secret_message',
    category: 'Financial',
    content: 'CONFIDENTIAL: Allocation claim phrase for 250,000 SHELBY tokens reserved for Genesis Validators. Multi-sig recovery key: 0x82f91a0c71bd902a...',
    createdTimestamp: Date.now() - 3 * 24 * 3600 * 1000,
    unlockTimestamp: Date.now() + 5 * 24 * 3600 * 1000 + 14 * 3600 * 1000, // 5d 14h in future
    ownerAddress: '0xa8f249c1b3e77810a9f145c2298e1a89c91b823e1109a908f7710c011f01d4a8',
    txHash: '0x3a91f82c0b4d7e1a90c2e8417f5291a0b3f81e90c2d109f4e8201a9b1c0d3e5f',
    shelbyBlobId: 'shelby_blob_0x9a8f21c0b4d7e1a',
    isUnlocked: false,
    notes: 'Embargoed until official Shelbynet mainnet announcement.',
  },
  {
    id: 'v_2',
    title: 'Aptos Move Contract Audit Report v2.1',
    type: 'file',
    fileName: 'aptos_shelby_vault_audit_v2.pdf',
    fileSize: '2.4 MB',
    fileType: 'application/pdf',
    category: 'Engineering',
    content: 'COMPREHENSIVE AUDIT REPORT: Shelby Protocol Move modules passed formal verification on Aptos testnet. Zero high-severity vulnerabilities found.',
    createdTimestamp: Date.now() - 7 * 24 * 3600 * 1000,
    unlockTimestamp: Date.now() - 1 * 24 * 3600 * 1000, // Expired yesterday -> Unlocked
    ownerAddress: '0xa8f249c1b3e77810a9f145c2298e1a89c91b823e1109a908f7710c011f01d4a8',
    txHash: '0x7b1c90e2f831a0d4c82b190f3e82a10b4f91c820e1d09f3e8201b9a8c7d6e5f4',
    shelbyBlobId: 'shelby_blob_0x1b7c90e2f831a0d',
    isUnlocked: true,
    notes: 'Signed off by OtterSec & Zellic audit teams.',
  },
  {
    id: 'v_3',
    title: 'Mercury Protocol Master Key Backup',
    type: 'secret_message',
    category: 'Credentials',
    content: 'ENC_PAYLOAD: 72a91b0c84d7201e9120a4f82b190c71e820a1f94b20a19c82f019a',
    createdTimestamp: Date.now() - 1 * 24 * 3600 * 1000,
    unlockTimestamp: Date.now() + 14 * 24 * 3600 * 1000, // 14d in future
    ownerAddress: '0xa8f249c1b3e77810a9f145c2298e1a89c91b823e1109a908f7710c011f01d4a8',
    txHash: '0x8f2a1b9c0d7e8f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a',
    shelbyBlobId: 'shelby_blob_0x8f2a1b9c0d7e8f1',
    isUnlocked: false,
    notes: 'Emergency protocol threshold recovery key.',
  },
];

const INITIAL_PROOF_ITEMS: ProofItem[] = [
  {
    id: 'p_1',
    title: 'Shelby SDK Alpha Release Fingerprint',
    description: 'Cryptographic SHA-256 fingerprint certifying the binary checksum of @shelby-protocol/sdk v0.4.2 compiled on Aptos testnet.',
    payloadHash: '0x9f8a210b4c8d1e70a92f81023c91e0a82b41f901c2309f4a810b2c3d4e5f6a7b',
    fileName: 'shelby_sdk_v0.4.2_release.tar.gz',
    fileSize: '14.8 MB',
    createdTimestamp: Date.now() - 2 * 24 * 3600 * 1000,
    blockHeight: 184209102,
    ownerAddress: '0xa8f249c1b3e77810a9f145c2298e1a89c91b823e1109a908f7710c011f01d4a8',
    txHash: '0x4a91b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1',
    shelbyBlobId: 'shelby_blob_0x4a91b2c3d4e5f6a',
    verified: true,
    tags: ['SDK', 'Release', 'Aptos'],
  },
  {
    id: 'p_2',
    title: 'Mercury Architecture Whitepaper v1.0',
    description: 'Proof of authorship and original timestamp commitment for Mercury decentralized vault design document.',
    payloadHash: '0x3c81f90a2b4d1e80c92f10b4a81c20e91a0b3f820c19d82e10a9b8c7d6e5f4a3',
    fileName: 'mercury_whitepaper_v1.pdf',
    fileSize: '1.2 MB',
    createdTimestamp: Date.now() - 10 * 24 * 3600 * 1000,
    blockHeight: 183901245,
    ownerAddress: '0xa8f249c1b3e77810a9f145c2298e1a89c91b823e1109a908f7710c011f01d4a8',
    txHash: '0x9b0a1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b',
    shelbyBlobId: 'shelby_blob_0x9b0a1c2d3e4f5a6',
    verified: true,
    tags: ['Whitepaper', 'Design', 'Copyright'],
  },
  {
    id: 'p_3',
    title: 'Cryptographic Proof of Solvency - Q3',
    description: 'Merkle root commitment proving 100% reserve backing on Shelby Protocol storage network.',
    payloadHash: '0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b',
    createdTimestamp: Date.now() - 15 * 24 * 3600 * 1000,
    blockHeight: 183120498,
    ownerAddress: '0xa8f249c1b3e77810a9f145c2298e1a89c91b823e1109a908f7710c011f01d4a8',
    txHash: '0x5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d',
    shelbyBlobId: 'shelby_blob_0x5c6d7e8f9a0b1c2',
    verified: true,
    tags: ['Solvency', 'Audit', 'Merkle'],
  },
];

const INITIAL_ANONYMOUS_NOTES: AnonymousNote[] = [
  {
    id: 'n_1',
    title: 'Shelby Protocol Node Quorum Benchmark',
    content: 'Shelby Protocol node operator quorum achieved on testnet-4. Zero-knowledge verifiable storage yields <15ms response times across 64 global validator regions.',
    createdTimestamp: Date.now() - 2 * 3600 * 1000,
    signature: '0x8f2a1b9c0d7e8f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c',
    txHash: '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
    shelbyBlobId: 'shelby_blob_0x1234567890abcde',
    verified: true,
    likes: 42,
    category: 'Infrastructure',
  },
  {
    id: 'n_2',
    title: 'The Philosophy of Time-Locked Payloads',
    content: 'Time-locked vaults are the fundamental cryptographic primitive for decentralized inheritance, embargoed journalism, and automated smart contract disclosures without intermediary trust.',
    createdTimestamp: Date.now() - 14 * 3600 * 1000,
    signature: '0x3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f',
    txHash: '0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890',
    shelbyBlobId: 'shelby_blob_0xabcdef123456789',
    verified: true,
    likes: 29,
    category: 'Philosophy',
  },
  {
    id: 'n_3',
    title: 'Aptos Parallel Execution Scale Note',
    content: 'Block-STM parallel execution engine on Aptos processes 10,000+ commitment transactions per second with full deterministic state finality.',
    createdTimestamp: Date.now() - 28 * 3600 * 1000,
    signature: '0x7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b',
    txHash: '0x90abcdef1234567890abcdef1234567890abcdef1234567890abcdef12345678',
    shelbyBlobId: 'shelby_blob_0x90abcdef1234567',
    verified: true,
    likes: 18,
    category: 'Tech Specs',
  },
];

export const VaultProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [vaultItems, setVaultItems] = useState<VaultItem[]>(() => {
    const saved = localStorage.getItem('mercury_vault_items');
    return saved ? JSON.parse(saved) : INITIAL_VAULT_ITEMS;
  });

  const [proofItems, setProofItems] = useState<ProofItem[]>(() => {
    const saved = localStorage.getItem('mercury_proof_items');
    return saved ? JSON.parse(saved) : INITIAL_PROOF_ITEMS;
  });

  const [anonymousNotes, setAnonymousNotes] = useState<AnonymousNote[]>(() => {
    const saved = localStorage.getItem('mercury_anonymous_notes');
    return saved ? JSON.parse(saved) : INITIAL_ANONYMOUS_NOTES;
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
