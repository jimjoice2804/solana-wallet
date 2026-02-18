import { LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import { getConnection } from "@/services/connectionService";


export const getBalance = async (publicKey: string) => {
    const connection = getConnection()
    const balance = await connection.getBalance(new PublicKey(publicKey));
    const SOLbalance = balance / LAMPORTS_PER_SOL;

    return {
        SOLbalance
    }
}