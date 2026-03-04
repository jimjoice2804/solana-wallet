import { useState } from 'react';
import Button from '@components/ui/Button';
import { decryptPrivateKey } from '@/utils/cryptoService';
import { Navigate, useNavigate } from 'react-router-dom';
import { useWallet } from '@/hooks/useWallet';
import { Keypair } from '@solana/web3.js';

const UnlockWallet = () => {
  const [password, setPassword] = useState('');
  const [err, setErr] = useState<string | null>(null);
  const { unlock } = useWallet();
  const navigate = useNavigate();
  const encryptedPackage = localStorage.getItem('encryptedKey');
  if (encryptedPackage == null) return <Navigate to="/import" />;
  if (err) return <div>{err}</div>;
  return (
    <div className="flex flex-col items-center justify-center p-6 w-full h-full">
      <div className="p-8 w-full max-w-sm flex flex-col items-center gap-6 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl">
        {/* Header Section */}
        <div className="text-center space-y-2">
          <div className="mx-auto w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4 border border-white/10 shadow-inner">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-8 h-8 text-white/70"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Unlock Wallet
          </h2>
          <p className="text-sm text-white/60">
            Enter your password to continue
          </p>
        </div>

        {/* Input Form */}
        <div className="w-full space-y-4">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setErr(null); // Clear error when they start typing again
            }}
            className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/40 outline-none focus:border-white/40 focus:bg-white/10 transition-all font-mono tracking-widest"
          />

          {/* Error Message */}
          {err && (
            <div className="text-red-400 text-sm text-center bg-red-400/10 py-2 px-3 rounded-lg border border-red-400/20">
              {err}
            </div>
          )}

          <Button
            onClick={async () => {
              try {
                const U8Arraykeypair = await decryptPrivateKey(
                  encryptedPackage,
                  password,
                );
                const keypair = Keypair.fromSecretKey(U8Arraykeypair);
                unlock(keypair);
                navigate('/send');
              } catch (error) {
                setErr(error instanceof Error ? error.message : String(error));
                console.error(error);
              }
            }}
            style="w-full px-6 py-3 rounded-xl bg-white/10 border border-white/20 text-white font-semibold hover:bg-white/20 hover:scale-[1.02] active:scale-[0.98] transition-all mt-2 shadow-lg"
          >
            Unlock
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UnlockWallet;
