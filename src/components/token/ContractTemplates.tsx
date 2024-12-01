import React from 'react';
import { motion } from 'framer-motion';
import { FileCode2, Shield, Copy, Eye } from 'lucide-react';
import Button from '../ui/Button';

const templates = [
  {
    name: 'SIMPLE ERC20 TOKEN',
    description: 'Basic ERC20 token with fixed supply',
    audited: true,
    code: `// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.10;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract FixedToken is ERC20 {
    constructor(
        string memory name,
        string memory symbol,
        uint256 totalSupply
    ) payable ERC20(name, symbol) {
        _mint(msg.sender, totalSupply);
    }
}`
  },
  {
    name: 'MINTABLE TOKEN',
    description: 'ERC20 token with minting capability',
    audited: true,
    code: `// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.10;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MintableToken is ERC20, Ownable {
    constructor(
        string memory name,
        string memory symbol,
        uint256 initialSupply
    ) payable ERC20(name, symbol) {
        _mint(msg.sender, initialSupply);
    }

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }
}`
  }
];

const ContractTemplates = () => {
  const [selectedTemplate, setSelectedTemplate] = React.useState<number | null>(null);

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-zinc-900/50 rounded-2xl p-6 border border-purple-900/20"
    >
      <h2 className="text-xl font-bold mb-6 flex items-center">
        <FileCode2 className="w-5 h-5 mr-2 text-purple-500" />
        Contract Templates
      </h2>

      <div className="space-y-6">
        {templates.map((template, index) => (
          <div
            key={index}
            className="bg-black/30 rounded-lg overflow-hidden border border-purple-900/20"
          >
            <div className="p-4 flex items-center justify-between">
              <div>
                <div className="flex items-center space-x-2">
                  <h3 className="font-semibold">{template.name}</h3>
                  {template.audited && (
                    <span className="px-2 py-1 text-xs rounded-full bg-green-900/50 text-green-400 flex items-center">
                      <Shield className="w-3 h-3 mr-1" />
                      Audited
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-400">{template.description}</p>
              </div>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleCopy(template.code)}
                >
                  <Copy className="w-4 h-4 mr-1" />
                  Copy
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedTemplate(selectedTemplate === index ? null : index)}
                >
                  <Eye className="w-4 h-4 mr-1" />
                  {selectedTemplate === index ? 'Hide' : 'View'}
                </Button>
              </div>
            </div>
            {selectedTemplate === index && (
              <div className="p-4 bg-black/50 border-t border-purple-900/20">
                <pre className="text-sm overflow-x-auto">
                  <code className="text-gray-300">{template.code}</code>
                </pre>
              </div>
            )}
          </div>
        ))}
      </div>
    </motion.section>
  );
};

export default ContractTemplates;