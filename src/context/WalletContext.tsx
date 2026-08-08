import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { PetraWallet } from 'petra-plugin-wallet-adapter';
import { AptosWalletAdapterProvider, useWallet as useAptosWallet } from '@aptos-labs/wallet-adapter-react';
import { generateTxHash, shortenAddress, aptosClient } from '../services/aptosService';

export interface ExtendedWalletContextType {
  address: string | null;
  shortAddress: string;
  connected: boolean;
  connecting: boolean;
  walletName: string | null;
  network: string;
  balance: number;
  connectWallet: (walletName?: string) => Promise<void>;
  disconnectWallet: () => Promise<void>;
  signTransactionAndSubmit: (payload: any) => Promise<string>;
  signMessagePayload: (message: string) => Promise<{ signature: string; fullMessage: string }>;
  openConnectModal: boolean;
  setOpenConnectModal: (open: boolean) => void;
  isSimulatedWallet: boolean;
}

const WalletContext = createContext<ExtendedWalletContextType | undefined>(undefined);

// Define Petra plugin instance
const wallets = [new PetraWallet()];

export const WalletProviderInner: React.FC<{ children: ReactNode }> = ({ children }) => {
  const aptosWallet = useAptosWallet();
  const [openConnectModal, setOpenConnectModal] = useState(false);
  const [balance, setBalance] = useState(14.82);

  const connected = aptosWallet.connected;
  const address = aptosWallet.account?.address
    ? String(aptosWallet.account.address)
    : null;
  
  const walletName = aptosWallet.wallet?.name || null;
  const isSimulatedWallet = false;

  const connectWallet = async () => {
    try {
      const petra = aptosWallet.wallets?.find(w => w.name.toLowerCase().includes('petra')) || aptosWallet.wallets?.[0];
      if (petra) {
        await aptosWallet.connect(petra.name as any);
      } else {
        window.open('https://petra.app/', '_blank');
      }
      setOpenConnectModal(false);
    } catch (err) {
      console.error('Wallet connection error:', err);
    }
  };

  const disconnectWallet = async () => {
    if (aptosWallet.connected) {
      await aptosWallet.disconnect();
    }
  };

  const signTransactionAndSubmit = async (payload: any): Promise<string> => {
    if (!aptosWallet.connected) {
      throw new Error('Wallet not connected. Please connect your Petra wallet.');
    }

    const recipient = address || String(aptosWallet.account?.address || '0x1');
    const funcArgs = payload?.functionArguments || payload?.arguments || [recipient, 0];
    const typeArgs = payload?.typeArguments || payload?.type_arguments || [];
    const funcName = payload?.function || '0x1::aptos_account::transfer';

    try {
      const response = await aptosWallet.signAndSubmitTransaction({
        data: {
          function: funcName,
          functionArguments: [recipient, 0], // 1. Recipient address, 2. Amount 0 octas
          typeArguments: typeArgs,
        },
      } as any);

      if (!response) {
        throw new Error('Transaction was cancelled or rejected in Petra.');
      }

      const txHash = (response as any).hash || (response as any).transactionHash;
      if (!txHash) {
        throw new Error('No transaction hash returned from Petra.');
      }

      // Non-blocking background verification check on Aptos node
      aptosClient.waitForTransaction({ transactionHash: txHash }).catch((err) => {
        console.warn('Aptos node background confirmation notice:', err);
      });

      return txHash;
    } catch (e: any) {
      console.error('Petra transaction submission error:', e);
      const errMsg = e?.message || e?.name || String(e);
      if (
        errMsg.toLowerCase().includes('reject') ||
        errMsg.toLowerCase().includes('cancel') ||
        errMsg.toLowerCase().includes('user rejected') ||
        errMsg.toLowerCase().includes('denied')
      ) {
        throw new Error('Transaction was cancelled — nothing was saved.');
      }
      throw new Error(errMsg || 'Transaction was cancelled — nothing was saved.');
    }
  };

  const signMessagePayload = async (message: string) => {
    if (!aptosWallet.connected) {
      throw new Error('Wallet not connected. Please connect your Petra wallet.');
    }

    try {
      const response = await aptosWallet.signMessage({
        message,
        nonce: String(Date.now()),
      });

      if (!response || !(response as any).signature) {
        throw new Error('Message signature was cancelled in Petra.');
      }

      return {
        signature: (response as any).signature,
        fullMessage: message,
      };
    } catch (e: any) {
      console.error('Petra message signing error:', e);
      const errMsg = e?.message || e?.name || String(e);
      if (
        errMsg.toLowerCase().includes('reject') ||
        errMsg.toLowerCase().includes('cancel') ||
        errMsg.toLowerCase().includes('user rejected') ||
        errMsg.toLowerCase().includes('denied')
      ) {
        throw new Error('Message signing was cancelled — nothing was saved.');
      }
      throw new Error(errMsg || 'Message signature was cancelled — nothing was saved.');
    }
  };

  return (
    <WalletContext.Provider
      value={{
        address,
        shortAddress: address ? shortenAddress(address) : '',
        connected,
        connecting: aptosWallet.isLoading,
        walletName,
        network: 'Aptos Shelbynet',
        balance,
        connectWallet,
        disconnectWallet,
        signTransactionAndSubmit,
        signMessagePayload,
        openConnectModal,
        setOpenConnectModal,
        isSimulatedWallet,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export const WalletProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <AptosWalletAdapterProvider 
      plugins={wallets} 
      autoConnect={false}
      onError={(error) => {
        console.warn('Aptos Wallet Adapter notice:', error);
      }}
    >
      <WalletProviderInner>{children}</WalletProviderInner>
    </AptosWalletAdapterProvider>
  );
};

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};
