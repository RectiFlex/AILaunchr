import React from 'react';
import { useWalletAuth } from '../lib/hooks/useWalletAuth';

const WalletApproval = () => {
  useWalletAuth();
  return null;
};

export default WalletApproval;