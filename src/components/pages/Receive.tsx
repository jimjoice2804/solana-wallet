import { useCopyToClipboard } from '@/hooks/useCopyToClipboard';
import { useWallet } from '@/hooks/useWallet';
import { QRCodeSVG } from 'qrcode.react';
import { useEffect, useState } from 'react';

const Receive = () => {
  const { publicKey } = useWallet();
  const { copy, error, copied } = useCopyToClipboard();
  const [firstKey, setFirstKey] = useState('');
  const [lastKey, setLastKey] = useState('');
  useEffect(() => {
    if (!publicKey) return;
    function convertPublicKey(publicAddress: string) {
      let first = '';
      let last = '';
      for (let i = 0; i < 4; i++) {
        first += publicAddress[i];
        last += publicAddress[publicAddress.length - 4 + i];
      }
      setFirstKey(first);
      setLastKey(last);
    }
    convertPublicKey(publicKey);
  }, [publicKey]);
  if (error) return <div>{error}</div>;
  if (!publicKey) return <div>Np Public Key found !!!</div>;

  return (
    <div className="h-full flex flex-col px-5 pt-8 gap-6">
      {/* Page Title */}
      <span className="text-white font-semibold text-lg">Receive SOL</span>

      {/* QR Code Card */}
      <div className="flex flex-col items-center justify-center bg-white/5 border border-white/10 rounded-3xl py-8 gap-4">
        <div className="p-4 bg-white rounded-2xl">
          <QRCodeSVG value={publicKey} size={200} />
        </div>
        <span className="text-white/40 text-xs">Scan to receive SOL</span>
      </div>

      {/* Public Key Display */}
      <div className="flex items-center justify-between bg-white/5 border border-white/10 rounded-2xl px-4 py-3">
        <span className="text-white/60 text-xs font-mono truncate max-w-[80%]">
          {firstKey}....{lastKey}
        </span>
        {/* Copy button placeholder */}
        <button
          className="text-white/40 hover:text-white text-xs ml-2 transition-colors"
          onClick={() => copy(publicKey)}
          disabled={copied}
        >
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
    </div>
  );
};

export default Receive;
