import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  isApproved: boolean;
  approvedWallets: string[];
  setApproved: (status: boolean) => void;
  addApprovedWallet: (wallet: string) => void;
  checkWalletApproval: (wallet: string) => boolean;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      isApproved: false,
      approvedWallets: [
        '0x9b1368A29E0b2824094A0faACdb67010E79a316f'.toLowerCase()
      ],
      setApproved: (status) => set({ isApproved: status }),
      addApprovedWallet: (wallet) => 
        set((state) => ({
          approvedWallets: [...state.approvedWallets, wallet.toLowerCase()]
        })),
      checkWalletApproval: (wallet) => {
        if (!wallet) return false;
        const state = get();
        return state.approvedWallets.includes(wallet.toLowerCase());
      },
    }),
    {
      name: 'auth-storage',
      version: 1,
    }
  )
);