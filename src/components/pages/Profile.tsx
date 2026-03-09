import { useState } from 'react';
import { decryptPrivateKey } from '@/utils/cryptoService';
import { useWallet } from '@/hooks/useWallet';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [password, setPassword] = useState<string>('');
  const navigate = useNavigate();
  const { logout } = useWallet();
  const [privateKey, setPrivateKey] = useState<Uint8Array | ''>('');
  const pkge = localStorage.getItem('encryptedKey');

  return (
    <>
      {!isUnlocked ? (
        <div className="h-full w-full flex flex-col justify-center items-center gap-4">
          <div>
            {err != null && (
              <span
                className="text-red-300 text-xs font-medium h-4
"
              >
                {err}
              </span>
            )}
          </div>
          <input
            className="w-full bg-white/10 border border-white/20 rounded-full px-4 py-2 text-white text-sm placeholder:text-white/40 outline-none focus:ring-2 focus:ring-white/30
"
            placeholder="Enter the password"
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <div className="w-full">
            <button
              className="w-full py-2 rounded-full bg-white text-[#3D52A0] text-sm font-bold hover:scale-105 transition-all duration-200 shadow-md cursor-pointer"
              onClick={async () => {
                if (pkge === null) return alert('Package is null');
                try {
                  const isConfirm = await decryptPrivateKey(pkge, password);
                  if (isConfirm instanceof Uint8Array) {
                    setIsUnlocked(true);
                    setPrivateKey(isConfirm);
                  }
                } catch (err) {
                  setErr(
                    err instanceof Error
                      ? err.message
                      : 'failed to decrypt package',
                  );
                  console.error(err);
                }
              }}
            >
              Confirm
            </button>
          </div>
        </div>
      ) : (
        <div
          className="h-full w-full flex flex-col items-center gap-4 pt-4
"
        >
          <div>{privateKey}</div>
          <button
            className="hover:cursor-pointer"
            onClick={() => {
              const response = confirm('Are You sure you want to log out');
              if (response === true) {
                logout();
                navigate('/');
              }
            }}
          >
            Log out
          </button>
        </div>
      )}
    </>
  );
};

export default Profile;
