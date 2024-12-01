import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Bot, AlertCircle } from 'lucide-react';
import Button from '../ui/Button';
import { useCurrentProject } from '../../lib/hooks/useCurrentProject';
import { useProjectStore } from '../../lib/store/useProjectStore';
import { ContractGenerationService } from '../../lib/ai/services/ContractGenerationService';
import { v4 as uuidv4 } from 'uuid';

const TokenBuilderForm = () => {
  const { currentProject, markStepComplete } = useCurrentProject();
  const { updateProject, addContract } = useProjectStore();
  const [isGenerating, setIsGenerating] = useState(false);
  const [config, setConfig] = useState({
    name: '',
    symbol: '',
    initialSupply: '',
    features: {
      mintable: false,
      burnable: false,
      pausable: false,
      staking: false,
      governance: false,
      deflation: false,
    }
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentProject) return;

    setIsGenerating(true);
    try {
      // Generate contract using AI
      const contractCode = await ContractGenerationService.generateContract(config);
      
      // Analyze the generated contract
      const analysis = await ContractGenerationService.analyzeContract(contractCode);
      
      // Create new contract
      const contract = {
        id: uuidv4(),
        name: config.name,
        code: contractCode,
        createdAt: new Date().toISOString(),
        verified: false,
        audited: false,
      };

      // Update project with token configuration and add contract
      updateProject(currentProject.id, { 
        tokenConfig: config,
        contracts: [...(currentProject.contracts || []), contract]
      });

      markStepComplete('Token Configuration', 'contract');

      // Reset form
      setConfig({
        name: '',
        symbol: '',
        initialSupply: '',
        features: {
          mintable: false,
          burnable: false,
          pausable: false,
          staking: false,
          governance: false,
          deflation: false,
        }
      });
    } catch (error) {
      console.error('Error generating token:', error);
      alert('Failed to generate token contract. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  if (!currentProject) {
    return (
      <div className="flex items-center justify-center p-6 bg-black/30 rounded-lg border border-yellow-500/20">
        <AlertCircle className="w-5 h-5 text-yellow-500 mr-2" />
        <span className="text-yellow-500">Please select a project first</span>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="bg-zinc-900/50 rounded-2xl p-6 border border-purple-900/20"
    >
      <h2 className="text-xl font-bold mb-6 flex items-center">
        <Bot className="w-5 h-5 mr-2 text-purple-500" />
        Token Configuration
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm text-gray-400">Token Name</label>
            <input
              type="text"
              required
              placeholder="e.g., My Awesome Token"
              value={config.name}
              onChange={(e) => setConfig({ ...config, name: e.target.value })}
              className="w-full bg-black/30 rounded-lg p-3 text-gray-300 border border-purple-900/20 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm text-gray-400">Token Symbol</label>
            <input
              type="text"
              required
              placeholder="e.g., MTK"
              value={config.symbol}
              onChange={(e) => setConfig({ ...config, symbol: e.target.value })}
              className="w-full bg-black/30 rounded-lg p-3 text-gray-300 border border-purple-900/20 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm text-gray-400">Initial Supply</label>
          <div className="relative">
            <input
              type="number"
              required
              min="0"
              step="1"
              placeholder="1000000"
              value={config.initialSupply}
              onChange={(e) => setConfig({ ...config, initialSupply: e.target.value })}
              className="w-full bg-black/30 rounded-lg p-3 text-gray-300 border border-purple-900/20 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
              Tokens
            </span>
          </div>
        </div>

        <div className="space-y-4">
          <label className="text-sm text-gray-400">Token Features</label>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {Object.entries(config.features).map(([feature, enabled]) => (
              <label
                key={feature}
                className="flex items-center space-x-2 p-3 bg-black/30 rounded-lg cursor-pointer hover:bg-purple-900/20 transition-colors"
              >
                <input
                  type="checkbox"
                  checked={enabled}
                  onChange={() => setConfig({
                    ...config,
                    features: {
                      ...config.features,
                      [feature]: !enabled
                    }
                  })}
                  className="form-checkbox text-purple-500 rounded border-purple-900/20"
                />
                <span className="text-gray-300 capitalize">{feature}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="pt-4">
          <Button 
            type="submit" 
            variant="primary" 
            className="w-full"
            disabled={isGenerating}
          >
            {isGenerating ? 'Generating Smart Contract...' : 'Generate Smart Contract'}
          </Button>
        </div>
      </form>
    </motion.div>
  );
};

export default TokenBuilderForm;