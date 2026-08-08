import React, { useState } from 'react';
import { useVault } from '../context/VaultContext';
import { useWallet } from '../context/WalletContext';
import { calculateSHA256, encryptPayload, commitToShelbyProtocol } from '../services/shelbyService';
import { buildProofTransferPayload, shortenAddress, getAptosExplorerUrl } from '../services/aptosService';
import { 
  X, Lock, ShieldCheck, FileText, UploadCloud, Calendar, Clock, Sparkles, 
  CheckCircle2, Loader2, ArrowRight, AlertCircle, File, Check, ExternalLink 
} from 'lucide-react';

interface CreateEntryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreateEntryModal: React.FC<CreateEntryModalProps> = ({ isOpen, onClose }) => {
  const { addVaultItem, addProofItem, addAnonymousNote, setActiveTab } = useVault();
  const { connected, address, setOpenConnectModal, signTransactionAndSubmit, signMessagePayload } = useWallet();

  const [selectedType, setSelectedType] = useState<'timelock' | 'proof' | 'note'>('timelock');
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Financial');
  const [payloadMode, setPayloadMode] = useState<'text' | 'file'>('text');
  const [textSecret, setTextSecret] = useState('');
  const [file, setFile] = useState<File | null>(null);
  
  // Time lock specific settings
  const [lockPreset, setLockPreset] = useState<'1d' | '7d' | '30d' | 'custom'>('7d');
  const [customUnlockDate, setCustomUnlockDate] = useState('');

  // Note/Proof specific
  const [description, setDescription] = useState('');

  // Submission Progress States
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStep, setSubmitStep] = useState<string>('');
  const [successTx, setSuccessTx] = useState<{ txHash: string; shelbyBlobId: string } | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const getUnlockTimestamp = (): number => {
    const now = Date.now();
    if (lockPreset === '1d') return now + 1 * 24 * 3600 * 1000;
    if (lockPreset === '7d') return now + 7 * 24 * 3600 * 1000;
    if (lockPreset === '30d') return now + 30 * 24 * 3600 * 1000;
    if (customUnlockDate) return new Date(customUnlockDate).getTime();
    return now + 7 * 24 * 3600 * 1000;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!connected) {
      setOpenConnectModal(true);
      return;
    }

    if (!title.trim()) {
      setErrorMessage('Please enter an entry title.');
      return;
    }

    if (payloadMode === 'text' && !textSecret.trim()) {
      setErrorMessage('Please enter text content or secret payload.');
      return;
    }

    if (payloadMode === 'file' && !file) {
      setErrorMessage('Please upload or select a file.');
      return;
    }

    setIsSubmitting(true);
    setSuccessTx(null);

    try {
      // Step 1: Prepare Payload & Calculate Fingerprint
      setSubmitStep('1/3 Cryptographic Hashing & Client Encryption...');
      const rawPayload = payloadMode === 'text' ? textSecret : file ? await file.text() : '';
      const payloadHash = await calculateSHA256(rawPayload);

      // Step 2: Commit Payload to Shelby Protocol Storage Network
      setSubmitStep('2/3 Writing Payload to Shelby Protocol Network...');
      const unlockTime = getUnlockTimestamp();
      const shelbyCommit = await commitToShelbyProtocol({
        title,
        type: selectedType,
        payloadHash,
        ownerAddress: address!,
        unlockTimestamp: unlockTime,
      });

      // Step 3: Aptos Ledger Settlement Transaction
      setSubmitStep('3/3 Signing Transaction & Aptos Ledger Settlement...');
      const transferPayload = buildProofTransferPayload(address!);
      const txHash = await signTransactionAndSubmit(transferPayload);

      // Save Entry to Vault Context
      if (selectedType === 'timelock') {
        const encryptedContent = await encryptPayload(rawPayload, unlockTime);
        await addVaultItem({
          title,
          type: payloadMode === 'file' ? 'file' : 'secret_message',
          fileName: file?.name,
          fileSize: file ? `${(file.size / 1024).toFixed(1)} KB` : undefined,
          fileType: file?.type,
          content: encryptedContent,
          category,
          unlockTimestamp: unlockTime,
          ownerAddress: address!,
          txHash,
          shelbyBlobId: shelbyCommit.shelbyBlobId,
          notes: description || 'Time locked on Shelby Protocol.',
        });
        setActiveTab('vault');
      } else if (selectedType === 'proof') {
        await addProofItem({
          title,
          description: description || 'Certified on Aptos ledger via Shelby Protocol.',
          payloadHash,
          fileName: file?.name,
          fileSize: file ? `${(file.size / 1024).toFixed(1)} KB` : undefined,
          ownerAddress: address!,
          txHash,
          shelbyBlobId: shelbyCommit.shelbyBlobId,
          tags: [category, 'Aptos'],
        });
        setActiveTab('proofs');
      } else if (selectedType === 'note') {
        const sigResult = await signMessagePayload(rawPayload);
        await addAnonymousNote({
          title,
          content: rawPayload,
          signature: sigResult.signature,
          txHash,
          shelbyBlobId: shelbyCommit.shelbyBlobId,
          category,
          ownerAddress: address!,
        });
        setActiveTab('notes');
      }

      setSuccessTx({ txHash, shelbyBlobId: shelbyCommit.shelbyBlobId });
      setIsSubmitting(false);

    } catch (err: any) {
      console.error('Commit error:', err);
      setErrorMessage(err.message || 'An error occurred while signing transaction.');
      setIsSubmitting(false);
    }
  };

  const handleDone = () => {
    setIsSubmitting(false);
    setSuccessTx(null);
    setTitle('');
    setTextSecret('');
    setFile(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn overflow-y-auto">
      <div 
        className="relative w-full max-w-2xl gothic-card rounded-2xl p-6 sm:p-8 border border-[#5C4E4E] shadow-2xl overflow-hidden my-8"
        onClick={e => e.stopPropagation()}
      >
        
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#5C4E4E]/50">
          <div>
            <div className="inline-flex items-center gap-1.5 text-[11px] font-mono text-[#988686] uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5" /> Shelby Protocol Commit Flow
            </div>
            <h2 className="font-cinzel text-xl sm:text-2xl font-bold text-white">Create New On-Chain Entry</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#D1D0D0] hover:text-white hover:bg-[#5C4E4E]/40 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* SUCCESS CONFIRMATION SCREEN */}
        {successTx ? (
          <div className="py-8 text-center space-y-6 animate-fadeIn">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-emerald-950/80 border border-emerald-500/50 flex items-center justify-center text-emerald-400 shadow-xl">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div className="space-y-2">
              <h3 className="font-cinzel text-2xl font-bold text-white">Entry Successfully Committed</h3>
              <p className="text-xs text-[#D1D0D0]/80 max-w-md mx-auto">
                Your payload is cryptographically sealed and written to Shelby Protocol storage network with Aptos ledger proof.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#0a0909] border border-[#5C4E4E]/50 max-w-md mx-auto text-left font-mono text-xs space-y-2">
              <div className="flex justify-between text-[#988686]">
                <span>Shelby Blob ID:</span>
                <span className="text-white">{shortenAddress(successTx.shelbyBlobId, 12, 4)}</span>
              </div>
              <div className="flex justify-between text-[#988686]">
                <span>Aptos Tx Hash:</span>
                <span className="text-emerald-400">{shortenAddress(successTx.txHash, 8, 6)}</span>
              </div>
            </div>

            <div className="flex items-center justify-center gap-4 pt-2">
              <a
                href={getAptosExplorerUrl(successTx.txHash)}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-xl gothic-btn-outline text-xs font-mono font-bold flex items-center gap-2"
              >
                <ExternalLink className="w-3.5 h-3.5" /> Explorer Proof
              </a>
              <button
                onClick={handleDone}
                className="px-6 py-2.5 rounded-xl gothic-btn font-cinzel text-xs font-bold uppercase tracking-wider"
              >
                View in Dashboard
              </button>
            </div>
          </div>
        ) : (
          /* REGULAR FORM SCREEN */
          <form onSubmit={handleSubmit} className="py-6 space-y-6">

            {/* Error Banner */}
            {errorMessage && (
              <div className="p-3 rounded-xl bg-red-950/80 border border-red-500/60 text-red-200 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* STEP 1: Select Entry Type (3 Selectable Cards - Image 4) */}
            <div className="space-y-2">
              <label className="text-xs font-mono text-[#988686] uppercase tracking-wider">
                1. Select Cryptographic Primitive
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                
                {/* Option A: Time Lock Vault */}
                <div
                  onClick={() => setSelectedType('timelock')}
                  className={`p-4 rounded-xl border cursor-pointer transition-all flex flex-col justify-between ${
                    selectedType === 'timelock'
                      ? 'bg-[#1e1a1a] border-[#988686] shadow-lg shadow-[#988686]/10'
                      : 'bg-[#121010] border-[#5C4E4E]/40 hover:border-[#5C4E4E]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <Lock className={`w-5 h-5 ${selectedType === 'timelock' ? 'text-[#988686]' : 'text-[#D1D0D0]'}`} />
                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${selectedType === 'timelock' ? 'border-[#988686] bg-[#988686]' : 'border-[#5C4E4E]'}`}>
                      {selectedType === 'timelock' && <Check className="w-3 h-3 text-black stroke-[3]" />}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-cinzel text-sm font-bold text-white">Time Lock Vault</h4>
                    <p className="text-[11px] text-[#D1D0D0]/70 mt-1 leading-snug">
                      Seal file/secret until future unlock date.
                    </p>
                  </div>
                </div>

                {/* Option B: Proof of Creation */}
                <div
                  onClick={() => setSelectedType('proof')}
                  className={`p-4 rounded-xl border cursor-pointer transition-all flex flex-col justify-between ${
                    selectedType === 'proof'
                      ? 'bg-[#1e1a1a] border-[#988686] shadow-lg shadow-[#988686]/10'
                      : 'bg-[#121010] border-[#5C4E4E]/40 hover:border-[#5C4E4E]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <ShieldCheck className={`w-5 h-5 ${selectedType === 'proof' ? 'text-[#988686]' : 'text-[#D1D0D0]'}`} />
                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${selectedType === 'proof' ? 'border-[#988686] bg-[#988686]' : 'border-[#5C4E4E]'}`}>
                      {selectedType === 'proof' && <Check className="w-3 h-3 text-black stroke-[3]" />}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-cinzel text-sm font-bold text-white">Proof of Creation</h4>
                    <p className="text-[11px] text-[#D1D0D0]/70 mt-1 leading-snug">
                      Timestamp document SHA-256 on Aptos ledger.
                    </p>
                  </div>
                </div>

                {/* Option C: Anonymous Note */}
                <div
                  onClick={() => setSelectedType('note')}
                  className={`p-4 rounded-xl border cursor-pointer transition-all flex flex-col justify-between ${
                    selectedType === 'note'
                      ? 'bg-[#1e1a1a] border-[#988686] shadow-lg shadow-[#988686]/10'
                      : 'bg-[#121010] border-[#5C4E4E]/40 hover:border-[#5C4E4E]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <FileText className={`w-5 h-5 ${selectedType === 'note' ? 'text-[#988686]' : 'text-[#D1D0D0]'}`} />
                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${selectedType === 'note' ? 'border-[#988686] bg-[#988686]' : 'border-[#5C4E4E]'}`}>
                      {selectedType === 'note' && <Check className="w-3 h-3 text-black stroke-[3]" />}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-cinzel text-sm font-bold text-white">Anonymous Note</h4>
                    <p className="text-[11px] text-[#D1D0D0]/70 mt-1 leading-snug">
                      Publish wallet-signed note with hidden author.
                    </p>
                  </div>
                </div>

              </div>
            </div>

            {/* STEP 2: Title & Category */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-2 space-y-1.5">
                <label className="text-xs font-mono text-[#988686]">Entry Title *</label>
                <input
                  type="text"
                  placeholder="e.g. Master Key Recovery / Seed Grant"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#121010] border border-[#5C4E4E]/50 focus:border-[#988686] text-xs text-white placeholder-[#5C4E4E] focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono text-[#988686]">Category</label>
                <select
                  value={category}
                  onChange={e => setCategory(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#121010] border border-[#5C4E4E]/50 focus:border-[#988686] text-xs text-white focus:outline-none"
                >
                  <option value="Financial">Financial</option>
                  <option value="Engineering">Engineering</option>
                  <option value="Credentials">Credentials</option>
                  <option value="Infrastructure">Infrastructure</option>
                  <option value="Philosophy">Philosophy</option>
                </select>
              </div>
            </div>

            {/* TIME LOCK SPECIFIC UNLOCK DATE SELECTOR */}
            {selectedType === 'timelock' && (
              <div className="space-y-2 p-4 rounded-xl bg-[#121010] border border-[#5C4E4E]/40">
                <label className="text-xs font-mono text-[#988686] flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" /> Enforced Unlock Date Trigger
                </label>
                <div className="grid grid-cols-4 gap-2">
                  <button
                    type="button"
                    onClick={() => setLockPreset('1d')}
                    className={`py-2 rounded-lg text-xs font-mono transition-colors ${
                      lockPreset === '1d' ? 'bg-[#988686] text-black font-bold' : 'bg-[#181414] text-[#D1D0D0] hover:bg-[#5C4E4E]/30'
                    }`}
                  >
                    24 Hours
                  </button>
                  <button
                    type="button"
                    onClick={() => setLockPreset('7d')}
                    className={`py-2 rounded-lg text-xs font-mono transition-colors ${
                      lockPreset === '7d' ? 'bg-[#988686] text-black font-bold' : 'bg-[#181414] text-[#D1D0D0] hover:bg-[#5C4E4E]/30'
                    }`}
                  >
                    7 Days
                  </button>
                  <button
                    type="button"
                    onClick={() => setLockPreset('30d')}
                    className={`py-2 rounded-lg text-xs font-mono transition-colors ${
                      lockPreset === '30d' ? 'bg-[#988686] text-black font-bold' : 'bg-[#181414] text-[#D1D0D0] hover:bg-[#5C4E4E]/30'
                    }`}
                  >
                    30 Days
                  </button>
                  <button
                    type="button"
                    onClick={() => setLockPreset('custom')}
                    className={`py-2 rounded-lg text-xs font-mono transition-colors ${
                      lockPreset === 'custom' ? 'bg-[#988686] text-black font-bold' : 'bg-[#181414] text-[#D1D0D0] hover:bg-[#5C4E4E]/30'
                    }`}
                  >
                    Custom
                  </button>
                </div>

                {lockPreset === 'custom' && (
                  <div className="pt-2">
                    <input
                      type="datetime-local"
                      value={customUnlockDate}
                      onChange={e => setCustomUnlockDate(e.target.value)}
                      className="w-full px-4 py-2 rounded-xl bg-[#0a0909] border border-[#5C4E4E] text-xs text-white"
                    />
                  </div>
                )}
              </div>
            )}

            {/* PAYLOAD MODE: Secret Text vs File Upload */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-mono text-[#988686]">Payload Content</label>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setPayloadMode('text')}
                    className={`px-3 py-1 rounded-md text-[11px] font-mono ${
                      payloadMode === 'text' ? 'bg-[#5C4E4E] text-white' : 'text-[#D1D0D0]/60'
                    }`}
                  >
                    Text / Message
                  </button>
                  <button
                    type="button"
                    onClick={() => setPayloadMode('file')}
                    className={`px-3 py-1 rounded-md text-[11px] font-mono ${
                      payloadMode === 'file' ? 'bg-[#5C4E4E] text-white' : 'text-[#D1D0D0]/60'
                    }`}
                  >
                    File Upload
                  </button>
                </div>
              </div>

              {payloadMode === 'text' ? (
                <textarea
                  rows={4}
                  placeholder="Enter sensitive payload, secret notes, whitepaper text, or key phrase..."
                  value={textSecret}
                  onChange={e => setTextSecret(e.target.value)}
                  className="w-full p-4 rounded-xl bg-[#121010] border border-[#5C4E4E]/50 focus:border-[#988686] text-xs text-white placeholder-[#5C4E4E] focus:outline-none font-mono"
                />
              ) : (
                <div className="p-8 rounded-xl bg-[#121010] border-2 border-dashed border-[#5C4E4E]/60 hover:border-[#988686] text-center space-y-3 transition-colors relative">
                  <input
                    type="file"
                    onChange={handleFileChange}
                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                  />
                  <UploadCloud className="w-10 h-10 mx-auto text-[#988686]" />
                  <div>
                    <p className="text-xs font-semibold text-white">
                      {file ? file.name : 'Click or Drag & Drop File Here'}
                    </p>
                    <p className="text-[11px] text-[#988686] font-mono mt-1">
                      {file ? `${(file.size / 1024).toFixed(1)} KB` : 'Supports PDF, TXT, JSON, PNG, ZIP'}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Additional Description */}
            <div className="space-y-1.5">
              <label className="text-xs font-mono text-[#988686]">Optional Notes / Memo</label>
              <input
                type="text"
                placeholder="Additional notes visible with this proof"
                value={description}
                onChange={e => setDescription(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-[#121010] border border-[#5C4E4E]/50 focus:border-[#988686] text-xs text-white placeholder-[#5C4E4E] focus:outline-none"
              />
            </div>

            {/* Modal Actions */}
            <div className="pt-4 border-t border-[#5C4E4E]/40 flex items-center justify-between">
              <span className="text-[11px] font-mono text-[#988686]">
                Target: Aptos Shelbynet
              </span>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  disabled={isSubmitting}
                  className="px-5 py-2.5 rounded-xl gothic-btn-outline text-xs"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2.5 rounded-xl gothic-btn font-cinzel text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-xl disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-[#988686]" />
                      <span>{submitStep || 'Processing...'}</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 text-[#988686]" />
                      <span>Sign & Commit On-Chain</span>
                    </>
                  )}
                </button>
              </div>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};
