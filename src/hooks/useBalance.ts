import { useEffect, useState } from 'react';
import { getBalance } from '@/services/balanceService';


export const useBalance = (publicAddress: string | null) => {

    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState<number>(0)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        if (!publicAddress) return;
        const fetchBalance = async () => {
            try {
                setIsLoading(true);
                const { SOLbalance } = await getBalance(publicAddress);
                setData(SOLbalance);
            } catch (error: unknown) {
                setError(error instanceof Error ? error.message : 'failed to fetch balance')
            } finally {
                setIsLoading(false);
            }
        }

        fetchBalance();
    }, [publicAddress])


    return {
        data,
        isLoading,
        error
    }
}