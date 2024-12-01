import React from 'react';
import { motion } from 'framer-motion';
import { Network } from 'lucide-react';

const chains = [
  { id: 'ethereum', name: 'Ethereum', icon: '⟠' },
  { id: 'bsc', name: 'BNB Chain', icon: '⛓️' },
  { id: 'polygon', name: 'Polygon', icon: '⬡' },
  { id: 'arbitrum', name: 'Arbitrum', icon: '🔷' },
  { id: 'optimism', name: 'Optimism', icon: '🔴' },
  { id: 'avalanche', name: 'Avalanche', icon: '🔺' }
];

interface BlockchainSelectorProps {
  selectedChain: string;
  onSelect: (chainId: string) => void;
}

const BlockchainSelector: React.FC<BlockchainSelectorProps> = ({ selectedChain, onSelect }) => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="bg-zinc-900/50 rounded-2xl p-6 border border-purple-900/20"
    >
      <h2 className="text-xl font-bold mb-6 flex items-center">
        <Network className="w-5 h-5 mr-2 text-purple-500" />
        Select Blockchain
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {chains.map((chain) => (
          <button
            key={chain.id}
            onClick={() => onSelect(chain.id)}
            className={`p-4 rounded-lg border transition-colors ${
              selectedChain === chain.id
                ? 'border-purple-500 bg-purple-900/20'
                : 'border-purple-900/20 bg-black/30 hover:bg-purple-900/10'
            }`}
          >
            <div className="text-2xl mb-2">{chain.icon}</div>
            <div className="font-medium">{chain.name}</div>
          </button>
        ))}
      </div>
    </motion.section>
  );
};

export default BlockchainSelector;