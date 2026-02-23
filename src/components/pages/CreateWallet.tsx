import { useWallet } from '@/hooks/useWallet';
import { useCopyToClipboard } from '@/hooks/useCopyToClipboard';
import Button from '../ui/Button';

const CreateWallet = () => {
  const { copied, copy } = useCopyToClipboard();
  const { mnemonic } = useWallet();

  if (mnemonic === null) {
    console.log('mnemonic is null ');
    return;
  }
  const words = mnemonic.split(' ');

  return (
    <>
      <div className="flex flex-col justify-center items-center h-full w-full">
        <div className="flex flex-col justify-center items-center gap-5">
          <h1 className="font-bold text-4xl text-transparent bg-clip-text bg-linear-to-r from-cyan-300 to-purple-300">
            Secret Phase
          </h1>
          <div className="text-lg text-center">
            Write down these 12 words in order and keep them safe. Do not share
            them with anyone. This is the only way to recover your wallet.
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3 p-5 m-5 bg-white/5 border border-white/10 rounded-2xl shadow-inner backdrop-blur-sm w-full max-w-sm">
          {words.map((word, index) => {
            return (
              <div className="">
                <div
                  key={index}
                  className="bg-black/20 border border-white/5 rounded-xl py-3 px-2 text-center text-sm font-medium text-white/90 shadow-sm"
                >
                  <span className="text-white/40 text-xs mr-2">
                    {index + 1}
                  </span>
                  {word}
                </div>
              </div>
            );
          })}
        </div>
        <div>
          {
            <Button
              style="mt-2 px-6 py-2 rounded-xl bg-white/10 border border-white/20 text-sm text-white hover:bg-white/20 transition-colors"
              onClick={() => copy(mnemonic)}
            >
              {copied ? 'Copied!' : 'Copy Seed Phrase'}
            </Button>
          }
        </div>
      </div>
    </>
  );
};

export default CreateWallet;
