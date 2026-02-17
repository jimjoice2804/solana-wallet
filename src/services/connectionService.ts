import { Connection, clusterApiUrl, type Cluster } from "@solana/web3.js";



export const getConnection = (network: Cluster = 'devnet') => {
    const connection = new Connection(clusterApiUrl(network), "confirmed");
    return connection;
}