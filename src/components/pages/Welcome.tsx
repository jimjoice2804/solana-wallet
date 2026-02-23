import { useWallet } from '@/hooks/useWallet';
import solanaLogo from '../../assets/solana-logo.svg';
import Button from '@components/ui/Button';
import { useNavigate } from 'react-router-dom';

const Welcome = () => {
  const navigate = useNavigate();
  const { createWallet } = useWallet();
  return (
    <div className="h-full flex flex-col items-center justify-center gap-5">
      <div>
        <img
          src={solanaLogo}
          alt="Solana Logo"
          className="w-85 h-85 drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]"
        />
      </div>
      <div className="font-bold text-5xl text-center">
        Welcome To Solana Wallet
      </div>
      <div className="flex flex-col gap-3 m-5">
        <div>
          <Button
            onClick={() => {
              createWallet();
              navigate('/create');
            }}
            style="w-full py-4 px-6 rounded-2xl font-semibold text-white cursor-pointer bg-gradient-to-r from-green-400 to-purple-500 hover:opacity-90 transition-opacity"
          >
            Create New Wallet
          </Button>
        </div>
        <div>
          <Button
            onClick={() => {
              navigate('/import');
            }}
            style="w-full py-4 px-6 rounded-2xl font-semibold text-white cursor-pointer bg-white/10 border border-white/20 hover:bg-white/20 transition-colors"
          >
            Import Existing Wallet
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
