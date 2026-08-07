import { Aptos, AptosConfig, Network } from '@aptos-labs/ts-sdk';

// Initialize Aptos Testnet Client
const config = new AptosConfig({ network: Network.TESTNET });
export const aptosClient = new Aptos(config);

export const APTOS_TESTNET_EXPLORER = 'https://explorer.aptoslabs.com';

/**
 * Generate a realistic 64-character hex transaction hash
 */
export function generateTxHash(): string {
  const bytes = new Uint8Array(32);
  crypto.getRandomValues(bytes);
  return '0x' + Array.from(bytes).map(b => b.toString(16).padStart(2, '0')).join('');
}

/**
 * Truncate Aptos address or Tx Hash for UI display (e.g., 0xa8f2...91b)
 */
export function shortenAddress(address: string, startChars = 6, endChars = 4): string {
  if (!address) return '';
  if (address.length <= startChars + endChars) return address;
  return `${address.substring(0, startChars)}...${address.substring(address.length - endChars)}`;
}

/**
 * Build Aptos Explorer link for a transaction hash
 */
export function getAptosExplorerUrl(txHash: string): string {
  const cleanHash = txHash.startsWith('0x') ? txHash : `0x${txHash}`;
  return `${APTOS_TESTNET_EXPLORER}/txn/${cleanHash}?network=testnet`;
}

/**
 * Format timestamp to clean readable date string
 */
export function formatDate(timestamp: number): string {
  return new Date(timestamp).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

/**
 * Compute detailed countdown object for time locks
 */
export function getCountdown(targetTimestamp: number) {
  const diff = targetTimestamp - Date.now();
  if (diff <= 0) {
    return { isExpired: true, days: 0, hours: 0, minutes: 0, seconds: 0, totalSeconds: 0 };
  }

  const seconds = Math.floor((diff / 1000) % 60);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  return {
    isExpired: false,
    days,
    hours,
    minutes,
    seconds,
    totalSeconds: Math.floor(diff / 1000),
  };
}

/**
 * Create 0x1::aptos_account::transfer transaction payload (0 APT to self as proof trigger)
 */
export function buildProofTransferPayload(senderAddress: string) {
  return {
    type: 'entry_function_payload',
    function: '0x1::aptos_account::transfer',
    type_arguments: [],
    arguments: [senderAddress, '0'], // 0 octas (0 APT) to self
  };
}
