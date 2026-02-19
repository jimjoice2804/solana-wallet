import { WalletContext } from "@/context/walletContext";
import { useContext } from "react";

export const useWallet = () => {
    const ctx = useContext(WalletContext);
    if (!ctx) { throw new Error("WalletProvider is missing") }
    return ctx;
}