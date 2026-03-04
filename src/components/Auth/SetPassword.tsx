import { useState } from 'react';
import Button from '@components/ui/Button';
import { useWallet } from '@/hooks/useWallet';
import { encryptPrivateKey } from '@/utils/cryptoService';
import { useNavigate } from 'react-router-dom';

export const SetPassword = () => {
  const { wallet } = useWallet();
  const navigate = useNavigate();
  const [password, setPassword] = useState<string | null>(null);
  const privateKey = wallet?.secretKey;
  if (!privateKey) return <div>No Private key is found</div>;

  return (
    <>
      <div>
        <input
          placeholder="Set your Password"
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          className="bg-white/5 border border-white/20 rounded-xl px-4 py-3 
text-white placeholder-white/40 w-full outline-none
focus:border-white/40 focus:bg-white/10 transition-all
"
          maxLength={16}
        />
        <div>
          <Button
            onClick={async () => {
              if (password == null) return console.error('password is null');
              const encrypted = await encryptPrivateKey(privateKey, password);
              localStorage.setItem('encryptedKey', encrypted);
              navigate('/dashboard');
            }}
            style="mt-4 w-full px-6 py-3 rounded-xl bg-white/20 border border-white/30
text-white font-semibold hover:bg-white/30 transition-colors
"
          >
            Confirm Password
          </Button>
        </div>
      </div>
    </>
  );
};
