import { createContext, useState, type ReactNode } from 'react';
import { type WalletContextType } from '@/types/WalletContextType';
import {
  generateNewWallet,
  recoverKeyFromMnemonic,
  importFromPrivateKey,
} from '@/services/walletService';
import { Keypair } from '@solana/web3.js';
import { getBalance } from '@/services/balanceService';

const WalletContext = createContext<WalletContextType | null>(null);

export const WalletProvider = ({ children }: { children: ReactNode }) => {
  const [wallet, setWallet] = useState<Keypair | null>(null);
  const [publicKey, setPublicKey] = useState<string | null>(null);
  const [mnemonic, setMnemonic] = useState<string | null>(null);
  const [balance, setBalance] = useState<number>(0);
  const [network] = useState<'devnet' | 'mainnet-beta'>('devnet');

  const createWallet = () => {
    const { keyPair, mnemonic, publicKey } = generateNewWallet();
    setPublicKey(publicKey);
    setMnemonic(mnemonic);
    setWallet(keyPair);
  };

  const importFromMnemonic = (mnemonicKey: string) => {
    const { keypair, publicKey } = recoverKeyFromMnemonic(mnemonicKey);
    setWallet(keypair);
    setPublicKey(publicKey);
  };

  const importFromKey = (privateKey: string) => {
    const { publicKey, keyPair } = importFromPrivateKey(privateKey);
    setPublicKey(publicKey);
    setWallet(keyPair);
  };

  const refreshBalance = async (publicKey: string) => {
    const { SOLbalance } = await getBalance(publicKey);
    setBalance(SOLbalance);
  };

  const logout = () => {
    setWallet(null);
    setPublicKey(null);
    setMnemonic(null);
    setBalance(0);
  };

  return (
    <WalletContext.Provider
      value={{
        wallet,
        publicKey,
        mnemonic,
        balance,
        network,
        createWallet,
        importFromMnemonic,
        importFromKey,
        refreshBalance,
        logout,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};
