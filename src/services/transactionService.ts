import { LAMPORTS_PER_SOL, Transaction, sendAndConfirmTransaction, PublicKey, SystemProgram, Keypair } from "@solana/web3.js";
import { getConnection } from "@/services/connectionService";

export const sendSOL = async (fromPrivateKey: Keypair, toAddress: string, amount: number) => {
    const connection = getConnection();

    const toPubKey = new PublicKey(toAddress)
    const fromKey = fromPrivateKey.publicKey;

    const transaction = new Transaction().add(
        SystemProgram.transfer({
            fromPubkey: fromKey,
            toPubkey: toPubKey,
            lamports: amount * LAMPORTS_PER_SOL,
        })
    )

    const signature = await sendAndConfirmTransaction(
        connection,
        transaction,
        [fromPrivateKey]
    )

    console.log("Transaction Signature", signature)
    return signature;
}