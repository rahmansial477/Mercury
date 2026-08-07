export type EntryType = 'timelock' | 'proof' | 'note';

export interface VaultItem {
  id: string;
  title: string;
  type: 'file' | 'secret_message' | 'document';
  fileName?: string;
  fileSize?: string;
  fileType?: string;
  content: string; // Payload string or Base64 / secret text
  category: string;
  createdTimestamp: number;
  unlockTimestamp: number; // Date.now() timestamp
  ownerAddress: string;
  txHash: string;
  shelbyBlobId: string;
  isUnlocked: boolean;
  notes?: string;
}

export interface ProofItem {
  id: string;
  title: string;
  description: string;
  payloadHash: string; // SHA-256 fingerprint / Shelby Hash
  fileName?: string;
  fileSize?: string;
  createdTimestamp: number;
  blockHeight: number;
  ownerAddress: string;
  txHash: string;
  shelbyBlobId: string;
  verified: boolean;
  tags: string[];
}

export interface AnonymousNote {
  id: string;
  title: string;
  content: string;
  createdTimestamp: number;
  signature: string; // Cryptographic wallet signature
  txHash?: string;
  shelbyBlobId: string;
  verified: boolean;
  likes: number;
  category: string;
}

export interface WalletState {
  address: string | null;
  publicKey: string | null;
  connected: boolean;
  connecting: boolean;
  network: string;
  balance: number; // APT balance
  walletName: string | null;
}

export interface ShelbyConfig {
  network: 'testnet' | 'mainnet' | 'devnet';
  nodeUrl: string;
  faucetUrl?: string;
}
