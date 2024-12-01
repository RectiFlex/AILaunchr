import React from 'react';
import { FileCode2 } from 'lucide-react';
import { useCurrentProject } from '../../lib/hooks/useCurrentProject';

interface ContractSelectorProps {
  onSelect: (code: string) => void;
}

const ContractSelector: React.FC<ContractSelectorProps> = ({ onSelect }) => {
  const { currentProject } = useCurrentProject();
  const contracts = currentProject?.contracts || [];

  if (contracts.length === 0) return null;

  return (
    <div className="bg-zinc-900/50 rounded-2xl p-6 border border-purple-900/20">
      <h2 className="text-xl font-bold mb-4 flex items-center">
        <FileCode2 className="w-5 h-5 mr-2 text-purple-500" />
        Project Contracts
      </h2>
      <div className="space-y-2">
        {contracts.map((contract) => (
          <button
            key={contract.id}
            onClick={() => onSelect(contract.code)}
            className="w-full text-left p-3 rounded-lg hover:bg-purple-900/20 transition-colors flex items-center justify-between"
          >
            <span>{contract.name}</span>
            <span className="text-sm text-gray-400">
              {new Date(contract.createdAt).toLocaleDateString()}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ContractSelector;