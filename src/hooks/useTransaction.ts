import { useState } from "react";
import { sendSOL } from "@/services/transactionService";
import type { Keypair } from "@solana/web3.js";

export const useTransaction = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [data, setData] = useState<string | null>(null)

    async function SOLTransaction(fromPrivateKey: Keypair, toAddress: string, amount: number) {
        try {
            setIsLoading(true);
            const response = await sendSOL(fromPrivateKey, toAddress, amount);
            setData(response);
        } catch (error) {
            setError(error instanceof Error ? error.message : "failed to send SOL")
        } finally {
            setIsLoading(false);
        }
    }


    return {
        isLoading,
        data,
        error,
        SOLTransaction,
    }
}