import solanaLogo from '../../assets/solana-logo.svg';

const Welcome = () => {
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
      <div>Button</div>
    </div>
  );
};

export default Welcome;
