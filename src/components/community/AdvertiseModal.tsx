import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Rocket, AlertCircle } from 'lucide-react';
import { useAccount, useBalance, useContractWrite } from 'wagmi';
import Button from '../ui/Button';
import { useProjectStore } from '../../lib/store/useProjectStore';
import { useCurrentProject } from '../../lib/hooks/useCurrentProject';

const LISTING_FEE = 0.1; // ETH

const AdvertiseModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const { address } = useAccount();
  const { currentProject } = useCurrentProject();
  const { updateProject } = useProjectStore();
  const [launchDate, setLaunchDate] = useState('');

  const { data: balance } = useBalance({
    address,
  });

  const hasEnoughBalance = balance?.value && Number(balance.value) >= LISTING_FEE;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentProject) return;

    // In a real implementation, this would handle the crypto payment
    // and update the project's featured status
    updateProject(currentProject.id, {
      isFeatured: true,
      launchDate,
    });

    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-zinc-900 rounded-2xl p-6 w-full max-w-md border border-purple-900/20"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Advertise Your Launch</h2>
              <button onClick={onClose} className="text-gray-400 hover:text-white">
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm text-gray-400">Launch Date</label>
                <input
                  type="datetime-local"
                  required
                  value={launchDate}
                  onChange={(e) => setLaunchDate(e.target.value)}
                  className="w-full bg-black/30 rounded-lg p-3 text-gray-300 border border-purple-900/20"
                />
              </div>

              <div className="p-4 bg-purple-900/20 rounded-lg space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Listing Fee</span>
                  <span className="font-bold">{LISTING_FEE} ETH</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>Your Balance</span>
                  <span>{balance?.formatted || '0'} ETH</span>
                </div>
              </div>

              {!hasEnoughBalance && (
                <div className="flex items-center p-4 bg-red-900/20 rounded-lg text-red-400">
                  <AlertCircle className="w-5 h-5 mr-2" />
                  Insufficient balance to pay listing fee
                </div>
              )}

              <div className="flex gap-4">
                <Button
                  type="submit"
                  variant="primary"
                  className="flex-1"
                  disabled={!hasEnoughBalance}
                >
                  <Rocket className="w-4 h-4 mr-2" />
                  List Project
                </Button>
                <Button type="button" variant="outline" onClick={onClose}>
                  Cancel
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default AdvertiseModal;