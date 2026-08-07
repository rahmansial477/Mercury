import React, { useState } from 'react';
import { BookOpen, Terminal, ShieldCheck, Lock, Key, Cpu, ExternalLink, Code2, Layers, Check, Copy } from 'lucide-react';

export const DocsView: React.FC = () => {
  const [activeSection, setActiveSection] = useState<'overview' | 'shelby' | 'aptos' | 'code'>('overview');
  const [copiedCode, setCopiedCode] = useState(false);

  const sampleCode = `import { ShelbyClient } from "@shelby-protocol/sdk";
import { Aptos, AptosConfig, Network } from "@aptos-labs/ts-sdk";

// Initialize Shelby Protocol Testnet Client
const shelby = new ShelbyClient({
  network: "testnet"
});

// 1. Commit encrypted payload blob
const blob = await shelby.uploadAndCommit({
  payload: new TextEncoder().encode("CONFIDENTIAL_MERCURY_PAYLOAD"),
  lockUntilTimestamp: Math.floor(Date.now() / 1000) + 604800 // 7 days
});

// 2. Settlement on Aptos Ledger
const aptos = new Aptos(new AptosConfig({ network: Network.TESTNET }));
const txHash = await wallet.signAndSubmitTransaction({
  data: {
    function: "0x1::aptos_account::transfer",
    type_arguments: [],
    arguments: [account.address, "0"]
  }
});

console.log("Blob Created:", blob.id);
console.log("Verified Tx Hash:", txHash);`;

  const copyCode = () => {
    navigator.clipboard.writeText(sampleCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
      
      {/* Docs Header */}
      <div className="border-b border-[#5C4E4E]/40 pb-6">
        <div className="inline-flex items-center gap-2 text-xs font-mono text-[#988686] uppercase tracking-widest mb-1">
          <BookOpen className="w-3.5 h-3.5" /> Documentation & Technical Specs
        </div>
        <h1 className="font-cinzel text-3xl sm:text-5xl font-extrabold text-white">
          Mercury Protocol Specifications
        </h1>
        <p className="text-sm text-[#D1D0D0]/80 mt-2 max-w-3xl">
          Complete guide to time-locked vaults, proof of creation timestamps, and wallet-signed anonymous notes built on Shelby Protocol and Aptos blockchain.
        </p>
      </div>

      {/* Docs Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Sidebar Links */}
        <div className="lg:col-span-3 space-y-2">
          <button
            onClick={() => setActiveSection('overview')}
            className={`w-full text-left px-4 py-3 rounded-xl font-mono text-xs transition-colors flex items-center gap-2.5 ${
              activeSection === 'overview'
                ? 'bg-[#5C4E4E] text-white border border-[#988686]'
                : 'bg-[#121010] text-[#D1D0D0] hover:bg-[#181414]'
            }`}
          >
            <Layers className="w-4 h-4 text-[#988686]" />
            <span>1. Architecture Overview</span>
          </button>

          <button
            onClick={() => setActiveSection('shelby')}
            className={`w-full text-left px-4 py-3 rounded-xl font-mono text-xs transition-colors flex items-center gap-2.5 ${
              activeSection === 'shelby'
                ? 'bg-[#5C4E4E] text-white border border-[#988686]'
                : 'bg-[#121010] text-[#D1D0D0] hover:bg-[#181414]'
            }`}
          >
            <Lock className="w-4 h-4 text-[#988686]" />
            <span>2. Shelby Protocol Blobs</span>
          </button>

          <button
            onClick={() => setActiveSection('aptos')}
            className={`w-full text-left px-4 py-3 rounded-xl font-mono text-xs transition-colors flex items-center gap-2.5 ${
              activeSection === 'aptos'
                ? 'bg-[#5C4E4E] text-white border border-[#988686]'
                : 'bg-[#121010] text-[#D1D0D0] hover:bg-[#181414]'
            }`}
          >
            <Cpu className="w-4 h-4 text-[#988686]" />
            <span>3. Aptos Settlement</span>
          </button>

          <button
            onClick={() => setActiveSection('code')}
            className={`w-full text-left px-4 py-3 rounded-xl font-mono text-xs transition-colors flex items-center gap-2.5 ${
              activeSection === 'code'
                ? 'bg-[#5C4E4E] text-white border border-[#988686]'
                : 'bg-[#121010] text-[#D1D0D0] hover:bg-[#181414]'
            }`}
          >
            <Code2 className="w-4 h-4 text-[#988686]" />
            <span>4. Developer Integration SDK</span>
          </button>
        </div>

        {/* Main Content Area */}
        <div className="lg:col-span-9 space-y-8">
          
          {activeSection === 'overview' && (
            <div className="gothic-card rounded-2xl p-8 border border-[#5C4E4E] space-y-6">
              <h2 className="font-cinzel text-2xl font-bold text-white">System Architecture & Core Mechanics</h2>
              <p className="text-sm text-[#D1D0D0] leading-relaxed">
                Mercury is designed as a zero-trust cryptographic vault built on Aptos blockchain and Shelby Protocol. It combines high-throughput decentralized blob storage with deterministic on-chain smart contract clock verification.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-[#0a0909] border border-[#5C4E4E]/40 space-y-2">
                  <h4 className="font-cinzel text-sm font-bold text-white flex items-center gap-2">
                    <Lock className="w-4 h-4 text-[#988686]" /> Time Lock Vaults
                  </h4>
                  <p className="text-xs text-[#D1D0D0]/80 leading-relaxed">
                    Client-side symmetric key sealing combined with Shelby blob lock metadata. Unlocking requires real clock verification after the designated block timestamp.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#0a0909] border border-[#5C4E4E]/40 space-y-2">
                  <h4 className="font-cinzel text-sm font-bold text-white flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#988686]" /> Proof of Creation
                  </h4>
                  <p className="text-xs text-[#D1D0D0]/80 leading-relaxed">
                    Calculates immutable SHA-256 fingerprints of documents or binaries. Commits fingerprints to Aptos ledger block heights with verifiable explorer links.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'shelby' && (
            <div className="gothic-card rounded-2xl p-8 border border-[#5C4E4E] space-y-6">
              <h2 className="font-cinzel text-2xl font-bold text-white">Shelby Protocol Blob Storage</h2>
              <p className="text-sm text-[#D1D0D0] leading-relaxed">
                Shelby Protocol provides high-density, zero-knowledge verifiable storage blobs (<code className="text-[#988686]">shelby_blob_0x...</code>). Every uploaded payload generates a Merkle tree root that is verified across decentralized storage nodes on Shelbynet.
              </p>

              <div className="p-4 rounded-xl bg-[#0a0909] border border-[#5C4E4E]/40 font-mono text-xs space-y-2 text-[#D1D0D0]">
                <div className="text-[#988686]">Shelby Blob ID Structure:</div>
                <div className="text-white">shelby_blob_0x4a91b2c3d4e5f6a7b8c9d0e1f2a3b4c5</div>
                <div className="text-[11px] text-[#D1D0D0]/60 mt-1">
                  Merkle Root: 0x9f8a...31b | Encryption Status: Sealed | Storage Network: Shelbynet Testnet-4
                </div>
              </div>
            </div>
          )}

          {activeSection === 'aptos' && (
            <div className="gothic-card rounded-2xl p-8 border border-[#5C4E4E] space-y-6">
              <h2 className="font-cinzel text-2xl font-bold text-white">Aptos On-Chain Settlement</h2>
              <p className="text-sm text-[#D1D0D0] leading-relaxed">
                Every vault commitment triggers an entry function payload on Aptos (<code className="text-[#988686]">0x1::aptos_account::transfer</code> with 0 APT to self), committing the cryptographic proof on-chain with deterministic block timestamp and sequence number.
              </p>

              <div className="pt-2">
                <a
                  href="https://explorer.aptoslabs.com/?network=testnet"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl gothic-btn font-cinzel text-xs font-bold uppercase tracking-wider"
                >
                  <ExternalLink className="w-4 h-4" /> Open Aptos Explorer
                </a>
              </div>
            </div>
          )}

          {activeSection === 'code' && (
            <div className="gothic-card rounded-2xl p-8 border border-[#5C4E4E] space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="font-cinzel text-2xl font-bold text-white">Developer Integration SDK</h2>
                <button
                  onClick={copyCode}
                  className="px-3 py-1.5 rounded bg-[#5C4E4E]/40 hover:bg-[#988686] text-white hover:text-black font-mono text-xs flex items-center gap-1.5 transition-colors"
                >
                  {copiedCode ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedCode ? 'Copied' : 'Copy Snippet'}</span>
                </button>
              </div>

              <div className="p-5 rounded-xl bg-[#0a0909] border border-[#5C4E4E]/50 font-mono text-xs text-[#D1D0D0] overflow-x-auto leading-relaxed">
                <pre><code>{sampleCode}</code></pre>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
