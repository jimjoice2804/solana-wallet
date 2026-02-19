import { createContext, } from 'react';
import { type WalletContextType } from '@/types/WalletContextType';

export const WalletContext = createContext<WalletContextType | null>(null);

