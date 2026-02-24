import { useBalance } from '@/hooks/useBalance';
import { useWallet } from '@/hooks/useWallet';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { publicKey } = useWallet();
  const { isLoading, data, error } = useBalance(publicKey);
  const navigate = useNavigate();
  if (error) {
    return <div>Something Went wrong while fetching SOL</div>;
  }

  console.log(data);
  return (
    <>
      {isLoading ? (
        <div className="h-full flex items-center justify-center">
          <div className="text-white/60 text-sm animate-pulse">
            Loading wallet...
          </div>
        </div>
      ) : (
        <div className="h-full flex flex-col px-5 pt-8 gap-6">
          {/* 1. Public Key (address) */}
          <div className="flex items-center justify-between bg-white/5 border border-white/10 rounded-2xl px-4 py-3">
            <span className="text-white/60 text-xs font-mono truncate max-w-[80%]">
              {publicKey}
            </span>
            <button className="text-white/40 hover:text-white text-xs ml-2 transition-colors">
              ⎘
            </button>
          </div>

          {/* 2. Balance Card */}
          <div className="flex flex-col items-center justify-center bg-white/5 border border-white/10 rounded-3xl py-8 gap-1">
            <span className="text-white/50 text-sm">Total Balance</span>
            <span className="text-white font-bold text-4xl">{data ?? '0'}</span>
            <span className="text-white/40 text-base">SOL</span>
          </div>

          {/* 3. Action Buttons Row */}
          <div className="flex justify-around gap-3">
            {['Send', 'Receive', 'Buy'].map((action) => (
              <button
                key={action}
                className="flex-1 flex flex-col items-center gap-1 py-3 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all"
                onClick={() => navigate(`/${action.toLocaleLowerCase()}`)}
              >
                <span className="text-white text-sm font-medium">{action}</span>
              </button>
            ))}
          </div>

          {/* 4. Recent Activity */}
          <div className="flex flex-col gap-3">
            <span className="text-white/60 text-sm font-medium">
              Recent Activity
            </span>
            <div className="flex items-center justify-center py-8 text-white/30 text-sm border border-white/5 rounded-2xl">
              No transactions yet
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;
