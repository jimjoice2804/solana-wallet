import { useState } from 'react';
import InputField from '../ui/InputField';
import Button from '../ui/Button';
import { useWallet } from '@/hooks/useWallet';

const ImportWallet = () => {
  const { importFromMnemonic, importFromKey } = useWallet();
  const [showSecretInputBox, setShowSecretInputBox] = useState(true);
  const [secretPhrase, setSecretPhrase] = useState('');
  const [privateKey, setPrivateKey] = useState('');
  if (secretPhrase === null) return;

  return (
    <>
      <div className="w-full h-150 flex flex-col justify-center items-center px-6">
        {/* Header Section */}
        <div className="flex flex-col items-center gap-2 mb-8">
          <h1 className="font-bold text-4xl text-transparent bg-clip-text bg-linear-to-r from-cyan-300 to-purple-300">
            Import Wallet
          </h1>
          <p className="text-sm text-white/70 text-center px-4">
            Enter your secret phrase or private key to restore your wallet.
          </p>
        </div>

        {/* Tab Toggle (Segmented Control) */}
        <div className="flex bg-white/5 border border-white/10 rounded-xl p-1 mb-8 w-full max-w-sm">
          <button
            onClick={() => setShowSecretInputBox(true)}
            className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${
              showSecretInputBox
                ? 'bg-white/10 text-white shadow-sm'
                : 'text-white/50 hover:text-white/80'
            }`}
          >
            Secret Phrase
          </button>
          <button
            onClick={() => setShowSecretInputBox(false)}
            className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${
              !showSecretInputBox
                ? 'bg-white/10 text-white shadow-sm'
                : 'text-white/50 hover:text-white/80'
            }`}
          >
            Private Key
          </button>
        </div>

        {/* Input Fields Section */}
        <div className="w-full max-w-sm flex flex-col gap-4">
          {showSecretInputBox ? (
            <div>
              <InputField
                placeholder="Enter your 12-word Secret Phrase..."
                style="w-full min-h-[120px] p-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-white/40 text-sm resize-none outline-none focus:border-purple-400/50 focus:ring-1 focus:ring-purple-400/30 transition-all font-mono"
                value={secretPhrase}
                onChange={(e) => setSecretPhrase(e.target.value)}
              />
            </div>
          ) : (
            <div>
              <InputField
                placeholder="Enter your base58 Private Key..."
                style="w-full min-h-[120px] p-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-white/40 text-sm resize-none outline-none focus:border-purple-400/50 focus:ring-1 focus:ring-purple-400/30 transition-all font-mono break-all"
                value={privateKey}
                onChange={(e) => setPrivateKey(e.target.value)}
              />
            </div>
          )}

          {/* Import Button */}
          <Button
            style="mt-4 w-full py-4 px-6 rounded-2xl font-semibold text-white cursor-pointer bg-gradient-to-r from-green-400 to-purple-500 hover:opacity-90 transition-opacity"
            onClick={() => {
              if (showSecretInputBox) {
                importFromMnemonic(secretPhrase);
              } else {
                importFromKey(privateKey);
              }
              // navigate('/dashboard');
            }}
          >
            Import Wallet
          </Button>
        </div>
      </div>
    </>
  );
};

export default ImportWallet;
