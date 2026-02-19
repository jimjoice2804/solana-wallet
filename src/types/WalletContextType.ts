import { Keypair } from "@solana/web3.js"

export interface WalletContextType {
    wallet: Keypair | null
    publicKey: string | null
    mnemonic: string | null
    balance: number
    network: 'devnet' | 'mainnet-beta'
    createWallet: () => void
    importFromMnemonic: (mnemonic: string) => void
    importFromKey: (key: string) => void
    refreshBalance: (publicKey: string) => Promise<void>
    logout: () => void
}