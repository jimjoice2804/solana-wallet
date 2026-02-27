import * as bip39 from "bip39";
import { Keypair } from "@solana/web3.js";
import { derivePath } from "ed25519-hd-key";
import bs58 from "bs58";



export const generateNewWallet = () => {
    //generate Mnemonic Key
    const mnemonic = bip39.generateMnemonic();

    //seed phrase
    const seed = bip39.mnemonicToSeedSync(mnemonic, "");

    //Hierarchical Determenestic 
    const path = "m/44'/501'/0'/0'";
    const derivedSeed = derivePath(path, seed.toString('hex')).key

    //Key pair
    const keyPair = Keypair.fromSeed(derivedSeed);

    //convert key's to base58
    const publicKey = keyPair.publicKey.toBase58();
    const privateKey = bs58.encode(keyPair.secretKey)


    return {
        keyPair,
        publicKey,
        path,
        privateKey,
        mnemonic
    }
}



export const recoverKeyFromMnemonic = (mnemonicKey: string) => {

    const seed = bip39.mnemonicToSeedSync(mnemonicKey, "");
    //HD
    const path = "m/44'/501'/0'/0'";
    const derivedSeed = derivePath(path, seed.toString('hex')).key

    //key pair
    const keypair = Keypair.fromSeed(derivedSeed);
    const publicKey = keypair.publicKey.toBase58();
    const privateKey = bs58.encode(keypair.secretKey);

    return {
        privateKey,
        publicKey,
        keypair
    }
}

export const importFromPrivateKey = (privateKey: string) => {
    const decodedKey = bs58.decode(privateKey);
    const keyPair = Keypair.fromSecretKey(decodedKey);
    const publicKey = keyPair.publicKey.toBase58();

    return {
        publicKey,
        keyPair
    }
}