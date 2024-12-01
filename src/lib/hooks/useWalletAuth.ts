import { useEffect } from 'react';
import { useAccount } from 'wagmi';
import { useAuthStore } from '../store/useAuthStore';

export const useWalletAuth = () => {
  const { address, isConnected } = useAccount();
  const { checkWalletApproval, setApproved } = useAuthStore();

  useEffect(() => {
    if (isConnected && address) {
      const isWalletApproved = checkWalletApproval(address);
      setApproved(isWalletApproved);
    } else {
      setApproved(false);
    }
  }, [address, isConnected, checkWalletApproval, setApproved]);

  return {
    isApproved: isConnected && address ? checkWalletApproval(address) : false,
    address,
    isConnected
  };
};