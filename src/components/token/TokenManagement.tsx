import React from 'react';
import { motion } from 'framer-motion';
import { Coins, BarChart3, Lock, Users, Settings } from 'lucide-react';
import Button from '../ui/Button';
import { useCurrentProject } from '../../lib/hooks/useCurrentProject';

const TokenManagement = () => {
  const { currentProject } = useCurrentProject();
  const token = currentProject?.tokenConfig;
  const tokenomics = currentProject?.tokenomics;

  if (!token) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Token Overview */}
      <div className="bg-zinc-900/50 rounded-2xl p-6 border border-purple-900/20">
        <h2 className="text-xl font-bold mb-6 flex items-center">
          <Coins className="w-5 h-5 mr-2 text-purple-500" />
          Token Overview
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 bg-black/30 rounded-lg">
            <div className="text-sm text-gray-400">Token Name</div>
            <div className="text-lg font-bold">{token.name}</div>
          </div>
          <div className="p-4 bg-black/30 rounded-lg">
            <div className="text-sm text-gray-400">Symbol</div>
            <div className="text-lg font-bold">{token.symbol}</div>
          </div>
          <div className="p-4 bg-black/30 rounded-lg">
            <div className="text-sm text-gray-400">Total Supply</div>
            <div className="text-lg font-bold">{token.initialSupply}</div>
          </div>
        </div>
      </div>

      {/* Token Features */}
      <div className="bg-zinc-900/50 rounded-2xl p-6 border border-purple-900/20">
        <h2 className="text-xl font-bold mb-6 flex items-center">
          <Settings className="w-5 h-5 mr-2 text-purple-500" />
          Token Features
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {Object.entries(token.features).map(([feature, enabled]) => (
            <div
              key={feature}
              className={`p-4 rounded-lg flex items-center space-x-2 ${
                enabled ? 'bg-purple-900/20 text-purple-400' : 'bg-black/30 text-gray-400'
              }`}
            >
              <div className={`w-2 h-2 rounded-full ${enabled ? 'bg-purple-500' : 'bg-gray-600'}`} />
              <span className="capitalize">{feature}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Tokenomics */}
      {tokenomics && (
        <div className="bg-zinc-900/50 rounded-2xl p-6 border border-purple-900/20">
          <h2 className="text-xl font-bold mb-6 flex items-center">
            <BarChart3 className="w-5 h-5 mr-2 text-purple-500" />
            Token Distribution
          </h2>
          <div className="space-y-4">
            {tokenomics.allocations.map((allocation, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-black/30 rounded-lg">
                <div>
                  <div className="font-medium">{allocation.category}</div>
                  <div className="text-sm text-gray-400">
                    Lock Period: {allocation.lockPeriod} months
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-purple-400">{allocation.percentage}%</div>
                  <div className="text-sm text-gray-400">
                    {(Number(tokenomics.totalSupply) * allocation.percentage / 100).toLocaleString()} tokens
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Button variant="outline" className="flex items-center justify-center">
          <Lock className="w-4 h-4 mr-2" />
          Manage Vesting
        </Button>
        <Button variant="outline" className="flex items-center justify-center">
          <Users className="w-4 h-4 mr-2" />
          Token Holders
        </Button>
      </div>
    </motion.div>
  );
};

export default TokenManagement;