import React from 'react';
import { motion } from 'framer-motion';
import { FileCode2, ExternalLink, Copy, Trash2 } from 'lucide-react';
import Button from '../ui/Button';
import { useCurrentProject } from '../../lib/hooks/useCurrentProject';

interface StoredContract {
  id: string;
  name: string;
  address?: string;
  code: string;
  createdAt: string;
}

const StoredContracts = () => {
  const { currentProject } = useCurrentProject();
  const [selectedContract, setSelectedContract] = React.useState<string | null>(null);

  // In a real app, this would come from your storage
  const contracts: StoredContract[] = currentProject?.contracts || [];

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
  };

  const handleDelete = (id: string) => {
    // Implement delete functionality
    console.log('Delete contract:', id);
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-zinc-900/50 rounded-2xl p-6 border border-purple-900/20"
    >
      <h2 className="text-xl font-bold mb-6 flex items-center">
        <FileCode2 className="w-5 h-5 mr-2 text-purple-500" />
        Your Smart Contracts
      </h2>

      {contracts.length === 0 ? (
        <div className="text-center py-8 text-gray-400">
          No contracts created yet. Use the token builder or templates to create your first contract.
        </div>
      ) : (
        <div className="space-y-4">
          {contracts.map((contract) => (
            <div
              key={contract.id}
              className="bg-black/30 rounded-lg p-4 border border-purple-900/20"
            >
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h3 className="font-semibold">{contract.name}</h3>
                  <p className="text-sm text-gray-400">Created {new Date(contract.createdAt).toLocaleDateString()}</p>
                </div>
                <div className="flex space-x-2">
                  {contract.address && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => window.open(`https://etherscan.io/address/${contract.address}`, '_blank')}
                    >
                      <ExternalLink className="w-4 h-4 mr-1" />
                      View
                    </Button>
                  )}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleCopy(contract.code)}
                  >
                    <Copy className="w-4 h-4 mr-1" />
                    Copy
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(contract.id)}
                  >
                    <Trash2 className="w-4 h-4 mr-1" />
                    Delete
                  </Button>
                </div>
              </div>
              {selectedContract === contract.id && (
                <pre className="mt-4 p-4 bg-black/50 rounded-lg overflow-x-auto">
                  <code className="text-sm text-gray-300">{contract.code}</code>
                </pre>
              )}
            </div>
          ))}
        </div>
      )}
    </motion.section>
  );
};

export default StoredContracts;