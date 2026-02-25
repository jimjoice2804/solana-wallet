import { useState } from 'react';
import InputField from '../ui/InputField';
import Button from '../ui/Button';
import { useTransaction } from '@/hooks/useTransaction';
import { useWallet } from '@/hooks/useWallet';

const Send = () => {
  const { wallet } = useWallet();
  const { isLoading, error, SOLTransaction } = useTransaction();
  const [toAddress, setToAddress] = useState('');
  const [amount, setAmount] = useState<number>(0);
  if (wallet === null) return <div>No KeyPair found</div>;
  if (error) return <div>{error}</div>;
  return (
    <>
      {isLoading ? (
        <div>Loading....</div>
      ) : (
        <div>
          <div>
            <div>
              <div>
                <InputField
                  value={toAddress}
                  placeholder="Place SOL Address"
                  onChange={(e) => setToAddress(e.target.value)}
                  style="w-full p-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-white/40 text-sm resize-none outline-none focus:border-purple-400/50 focus:ring-1 focus:ring-purple-400/30 transition-all font-mono
"
                />
              </div>
              <div>
                <InputField
                  value={amount}
                  placeholder="Enter The Amount"
                  onChange={(e) => {
                    if (isNaN(Number(e.target.value))) {
                      alert('Only Number is Accepted You Idiot!');
                      setAmount(amount);
                    } else {
                      setAmount(Number(e.target.value));
                    }
                  }}
                  style="w-full p-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-white/40 text-sm outline-none focus:border-green-400/50 focus:ring-1 focus:ring-green-400/30 transition-all
"
                />
              </div>
              <div>
                <Button
                  onClick={() => {
                    if (!toAddress || amount === 0)
                      return alert(
                        "No Address is found or amount can't be zero",
                      );
                    SOLTransaction(wallet, toAddress, Number(amount));
                  }}
                  style="w-full p-4 mt-4 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold text-lg hover:opacity-90 transition-all hover:shadow-[0_0_20px_rgba(168,85,247,0.4)] active:scale-[0.98]"
                >
                  Send
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Send;
