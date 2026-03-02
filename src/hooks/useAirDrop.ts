import { requestAirdrop } from "@/services/requestAirDropService";
import { PublicKey } from "@solana/web3.js";
import { useState } from "react"

export const useAirdrop = () => {
    const [data, setData] = useState<string | null>(null);
    const [err, setErr] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    async function makeTransaction(publicAddress: string, airDropAmount: number) {
        try {
            setLoading(true)
            const pubKey = new PublicKey(publicAddress)
            const value = await requestAirdrop(pubKey, airDropAmount);
            setData(value);
            setLoading(false)
        } catch (error) {
            setLoading(false)
            setErr(error instanceof Error ? error.message : "Failed to Make a Transaction")
        }
    }

    return {
        data,
        err,
        loading,
        makeTransaction
    }
}