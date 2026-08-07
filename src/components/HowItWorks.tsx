import React, { useState } from 'react';
import { ShieldCheck, Lock, UploadCloud, Terminal, Copy, Check, Cpu, CheckCircle2 } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const [copiedCode, setCopiedCode] = useState(false);

  const codeSnippet = `import { ShelbyClient } from '@shelby-protocol/sdk';
import { Aptos, AptosConfig, Network } from '@aptos-labs/ts-sdk';

// 1. Initialize Shelby Protocol client for Shelbynet
const shelby = new ShelbyClient({ network: 'testnet' });

// 2. Encrypt & Upload payload to Shelby Blob storage
const blob = await shelby.uploadAndCommit({
  payload: encryptedBuffer,
  lockUntilTimestamp: 1782984000, // Future time lock
  metadata: { title: "Mercury Vault Claim" }
});

// 3. Trigger Aptos ledger settlement
const aptos = new Aptos(new AptosConfig({ network: Network.TESTNET }));
const txHash = await wallet.signAndSubmitTransaction({
  data: {
    function: "0x1::aptos_account::transfer",
    type_arguments: [],
    arguments: [account.address, "0"]
  }
});

console.log("Vault Blob Committed:", blob.id, "Tx Hash:", txHash);`;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(codeSnippet);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <section id="how-it-works" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-[#5C4E4E]/30">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
        <div className="inline-block font-mono text-xs text-[#988686] uppercase tracking-[0.3em]">
          PROTOCOL EXECUTION FLOW
        </div>
        <h2 className="font-cinzel text-3xl sm:text-5xl font-extrabold text-white">
          How Mercury Operates On-Chain
        </h2>
        <p className="text-sm sm:text-base text-[#D1D0D0]/80">
          From client-side payload encryption to Aptos ledger timestamp settlement, here is the step-by-step cryptographic protocol cycle.
        </p>
      </div>

      {/* Grid: Steps on Left, Code Snippet on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Side: 4 Steps */}
        <div className="lg:col-span-6 space-y-6">
          
          {/* Step 1 */}
          <div className="p-6 rounded-2xl gothic-card border border-[#5C4E4E]/50 flex items-start gap-4 group hover:border-[#988686]">
            <div className="w-10 h-10 rounded-xl bg-[#5C4E4E]/40 border border-[#988686]/40 flex items-center justify-center font-cinzel font-bold text-[#988686] shrink-0 text-lg group-hover:bg-[#988686] group-hover:text-black transition-colors">
              01
            </div>
            <div>
              <h3 className="font-cinzel text-lg font-bold text-white mb-1">
                Authenticate with Aptos Wallet
              </h3>
              <p className="text-xs sm:text-sm text-[#D1D0D0]/80 leading-relaxed">
                Connect via Petra or Aptos Wallet Adapter. Your public key acts as the authorization owner for vault decrypt triggers and creation proofs.
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="p-6 rounded-2xl gothic-card border border-[#5C4E4E]/50 flex items-start gap-4 group hover:border-[#988686]">
            <div className="w-10 h-10 rounded-xl bg-[#5C4E4E]/40 border border-[#988686]/40 flex items-center justify-center font-cinzel font-bold text-[#988686] shrink-0 text-lg group-hover:bg-[#988686] group-hover:text-black transition-colors">
              02
            </div>
            <div>
              <h3 className="font-cinzel text-lg font-bold text-white mb-1">
                Select Primitive & Encrypt
              </h3>
              <p className="text-xs sm:text-sm text-[#D1D0D0]/80 leading-relaxed">
                Choose Time Lock, Proof of Creation, or Anonymous Note. Files and secrets are sealed client-side before broadcast.
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="p-6 rounded-2xl gothic-card border border-[#5C4E4E]/50 flex items-start gap-4 group hover:border-[#988686]">
            <div className="w-10 h-10 rounded-xl bg-[#5C4E4E]/40 border border-[#988686]/40 flex items-center justify-center font-cinzel font-bold text-[#988686] shrink-0 text-lg group-hover:bg-[#988686] group-hover:text-black transition-colors">
              03
            </div>
            <div>
              <h3 className="font-cinzel text-lg font-bold text-white mb-1">
                Store via Shelby Protocol SDK
              </h3>
              <p className="text-xs sm:text-sm text-[#D1D0D0]/80 leading-relaxed">
                Payloads are written to Shelby storage blobs with custom Merkle tree roots, generating unique blob IDs (<code className="text-[#988686]">shelby_blob_0x...</code>).
              </p>
            </div>
          </div>

          {/* Step 4 */}
          <div className="p-6 rounded-2xl gothic-card border border-[#5C4E4E]/50 flex items-start gap-4 group hover:border-[#988686]">
            <div className="w-10 h-10 rounded-xl bg-[#5C4E4E]/40 border border-[#988686]/40 flex items-center justify-center font-cinzel font-bold text-[#988686] shrink-0 text-lg group-hover:bg-[#988686] group-hover:text-black transition-colors">
              04
            </div>
            <div>
              <h3 className="font-cinzel text-lg font-bold text-white mb-1">
                On-Chain Ledger Settlement
              </h3>
              <p className="text-xs sm:text-sm text-[#D1D0D0]/80 leading-relaxed">
                A zero-cost proof transaction (<code className="text-[#988686]">0x1::aptos_account::transfer</code>) commits the blob hash directly onto the Aptos blockchain with deterministic block timestamp.
              </p>
            </div>
          </div>

        </div>

        {/* Right Side: Code Window */}
        <div className="lg:col-span-6">
          <div className="gothic-card rounded-2xl border border-[#5C4E4E] overflow-hidden shadow-2xl">
            
            {/* Terminal Top Bar */}
            <div className="bg-[#181414] px-4 py-3 border-b border-[#5C4E4E]/60 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500/80" />
                <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                <span className="text-xs font-mono text-[#D1D0D0]/80 ml-2">shelby-vault-client.ts</span>
              </div>
              <button
                onClick={handleCopyCode}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#5C4E4E]/40 hover:bg-[#988686] text-[#D1D0D0] hover:text-black font-mono text-xs transition-colors"
              >
                {copiedCode ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedCode ? 'Copied' : 'Copy SDK'}</span>
              </button>
            </div>

            {/* Code Body */}
            <div className="p-5 bg-[#0a0909] overflow-x-auto text-xs sm:text-sm font-mono text-[#D1D0D0] leading-relaxed">
              <pre className="text-left">
                <code>
                  {codeSnippet.split('\n').map((line, idx) => (
                    <div key={idx} className="table-row">
                      <span className="table-cell select-none text-right pr-4 text-[#5C4E4E] text-xs">
                        {idx + 1}
                      </span>
                      <span className="table-cell">
                        {line.startsWith('//') ? (
                          <span className="text-[#988686] italic">{line}</span>
                        ) : line.includes('import') || line.includes('const') || line.includes('await') || line.includes('new') ? (
                          <span className="text-white font-semibold">{line}</span>
                        ) : (
                          <span>{line}</span>
                        )}
                      </span>
                    </div>
                  ))}
                </code>
              </pre>
            </div>

            {/* Terminal Footer */}
            <div className="px-4 py-2.5 bg-[#121010] border-t border-[#5C4E4E]/40 text-[11px] font-mono text-[#988686] flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Shelbynet SDK Verified
              </span>
              <span>Aptos Testnet v1.8</span>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
