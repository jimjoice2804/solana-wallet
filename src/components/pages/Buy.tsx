import { useAirdrop } from '@/hooks/useAirDrop';
import { useWallet } from '@/hooks/useWallet';
import { useState } from 'react';

const Buy = () => {
  const { publicKey } = useWallet();
  const { makeTransaction, err, loading } = useAirdrop();

  // Default selection to 1 SOL
  const [amount, setAmount] = useState<number>(1);
  const airdropAmount = [0.5, 1, 2, 5];

  if (err) return <div className="p-5 text-red-400 text-center">{err}</div>;
  if (!publicKey)
    return (
      <div className="p-5 text-white/50 text-center">
        Please connect or create a wallet first.
      </div>
    );

  return (
    <div className="h-full flex flex-col px-5 pt-8 pb-5">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-white text-3xl font-bold mb-2">Get Devnet SOL</h1>
        <p className="text-white/50 text-sm">
          Request testnet funds for development and testing. Maximum 5 SOL per
          request.
        </p>
      </div>

      {loading ? (
        <div className="flex-1 flex flex-col items-center justify-center space-y-4">
          <div className="w-12 h-12 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin"></div>
          <span className="text-white/60 text-sm animate-pulse">
            Requesting Airdrop...
          </span>
        </div>
      ) : (
        <div className="flex-1 flex flex-col justify-between">
          {/* Amount Selection Grid */}
          <div className="grid grid-cols-2 gap-4">
            {airdropAmount.map((value, index) => {
              const isSelected = amount === value;
              return (
                <button
                  key={index}
                  onClick={() => setAmount(value)}
                  className={`
                    py-6 rounded-2xl text-lg font-bold transition-all duration-200
                    ${
                      isSelected
                        ? 'bg-purple-500/20 text-white border-2 border-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.3)]'
                        : 'bg-white/5 text-white/60 border-2 border-transparent hover:bg-white/10 hover:text-white'
                    }
                  `}
                >
                  {value} SOL
                </button>
              );
            })}
          </div>

          {/* Action Button */}
          <button
            onClick={() => makeTransaction(publicKey, amount)}
            className="w-full py-4 mt-8 rounded-2xl bg-linear-to-r from-purple-500 to-pink-500 text-white font-bold text-lg hover:opacity-90 active:scale-[0.98] transition-all shadow-[0_0_20px_rgba(168,85,247,0.4)]"
          >
            Request Airdrop
          </button>
        </div>
      )}
    </div>
  );
};

export default Buy;
