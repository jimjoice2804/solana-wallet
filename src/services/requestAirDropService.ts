import { getConnection } from "@/services/connectionService";
import { LAMPORTS_PER_SOL, type PublicKey } from "@solana/web3.js";

export const requestAirdrop = async (publicKey: PublicKey, airDropAmount: number) => {
    try {

        const connection = getConnection();
        const sign = await connection.requestAirdrop(publicKey, airDropAmount * LAMPORTS_PER_SOL)

        const latestBlock = await connection.getLatestBlockhash()

        const confirmTransaction = await connection.confirmTransaction({
            blockhash: latestBlock.blockhash,
            lastValidBlockHeight: latestBlock.lastValidBlockHeight,
            signature: sign
        }
        )

        if (confirmTransaction.value.err == null) {
            return sign;
        } else {
            throw new Error("Failed to Confirm Transaction!!!")
        }
    } catch (error) {
        console.error("AirDrop Failed!!", error)
        throw error;
    }
}