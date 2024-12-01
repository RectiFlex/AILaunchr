import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PieChart, DollarSign, AlertCircle } from 'lucide-react';
import Button from '../ui/Button';
import { useCurrentProject } from '../../lib/hooks/useCurrentProject';

interface TokenAllocation {
  category: string;
  percentage: number;
  lockPeriod: number;
}

const TokenomicsBuilder = () => {
  const { currentProject, markStepComplete, updateProjectDetails } = useCurrentProject();
  const [allocations, setAllocations] = useState<TokenAllocation[]>([
    { category: 'Public Sale', percentage: 30, lockPeriod: 0 },
    { category: 'Team', percentage: 20, lockPeriod: 12 },
    { category: 'Development', percentage: 15, lockPeriod: 6 },
    { category: 'Marketing', percentage: 15, lockPeriod: 3 },
    { category: 'Liquidity', percentage: 10, lockPeriod: 24 },
    { category: 'Advisors', percentage: 10, lockPeriod: 12 }
  ]);

  const totalPercentage = allocations.reduce((sum, item) => sum + item.percentage, 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentProject) return;

    const tokenomicsData = {
      allocations,
      totalSupply: currentProject.tokenConfig?.initialSupply || '100000000',
      timestamp: Date.now()
    };

    updateProjectDetails({
      tokenomics: tokenomicsData,
      completedSteps: [...(currentProject.completedSteps || []), 'Tokenomics']
    });

    markStepComplete('Tokenomics Configuration', 'document');
  };

  const handleAllocationChange = (index: number, field: keyof TokenAllocation, value: number) => {
    const newAllocations = [...allocations];
    newAllocations[index] = { ...newAllocations[index], [field]: value };
    setAllocations(newAllocations);
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
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="bg-zinc-900/50 rounded-2xl p-6 border border-purple-900/20"
    >
      <h2 className="text-xl font-bold mb-6 flex items-center">
        <PieChart className="w-5 h-5 mr-2 text-purple-500" />
        Tokenomics Configuration
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          {allocations.map((allocation, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-black/30 rounded-lg">
              <div className="space-y-2">
                <label className="text-sm text-gray-400">Category</label>
                <input
                  type="text"
                  value={allocation.category}
                  onChange={(e) => {
                    const newAllocations = [...allocations];
                    newAllocations[index].category = e.target.value;
                    setAllocations(newAllocations);
                  }}
                  className="w-full bg-black/30 rounded-lg p-2 text-gray-300 border border-purple-900/20"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-gray-400">Percentage (%)</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={allocation.percentage}
                  onChange={(e) => handleAllocationChange(index, 'percentage', Number(e.target.value))}
                  className="w-full bg-black/30 rounded-lg p-2 text-gray-300 border border-purple-900/20"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-gray-400">Lock Period (months)</label>
                <input
                  type="number"
                  min="0"
                  value={allocation.lockPeriod}
                  onChange={(e) => handleAllocationChange(index, 'lockPeriod', Number(e.target.value))}
                  className="w-full bg-black/30 rounded-lg p-2 text-gray-300 border border-purple-900/20"
                />
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between p-4 bg-purple-900/20 rounded-lg">
          <div className="flex items-center">
            <DollarSign className="w-5 h-5 text-purple-500 mr-2" />
            <span className="text-sm">Total Allocation:</span>
          </div>
          <span className={`font-bold ${totalPercentage === 100 ? 'text-green-500' : 'text-red-500'}`}>
            {totalPercentage}%
          </span>
        </div>

        <Button
          type="submit"
          variant="primary"
          className="w-full"
          disabled={totalPercentage !== 100}
        >
          Save Tokenomics Configuration
        </Button>
      </form>
    </motion.section>
  );
};

export default TokenomicsBuilder;