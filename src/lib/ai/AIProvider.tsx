import React, { createContext, useContext, useState } from 'react';
import { useAI } from './useAI';

interface AIContextType {
  generateSmartContract: (requirements: string) => Promise<string>;
  analyzeContract: (code: string) => Promise<{
    vulnerabilities: string[];
    suggestions: string[];
    score: number;
  }>;
  generateWhitepaper: (projectInfo: string) => Promise<string>;
  optimizeGas: (code: string) => Promise<{
    optimizedCode: string;
    savings: string;
  }>;
  isProcessing: boolean;
}

const AIContext = createContext<AIContextType | null>(null);

export const AIProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { complete, isLoading } = useAI();
  const [isProcessing, setIsProcessing] = useState(false);

  const generateSmartContract = async (requirements: string) => {
    setIsProcessing(true);
    try {
      const result = await complete(`Generate a secure ERC20 smart contract with the following requirements: ${requirements}`);
      return result || '';
    } finally {
      setIsProcessing(false);
    }
  };

  const analyzeContract = async (code: string) => {
    setIsProcessing(true);
    try {
      const result = await complete(`Analyze this smart contract for security vulnerabilities and optimization opportunities: ${code}`);
      const analysis = JSON.parse(result || '{}');
      return {
        vulnerabilities: analysis.vulnerabilities || [],
        suggestions: analysis.suggestions || [],
        score: analysis.score || 0,
      };
    } finally {
      setIsProcessing(false);
    }
  };

  const generateWhitepaper = async (projectInfo: string) => {
    setIsProcessing(true);
    try {
      const result = await complete(`Generate a comprehensive whitepaper for this blockchain project: ${projectInfo}`);
      return result || '';
    } finally {
      setIsProcessing(false);
    }
  };

  const optimizeGas = async (code: string) => {
    setIsProcessing(true);
    try {
      const result = await complete(`Optimize this smart contract for gas efficiency: ${code}`);
      const optimization = JSON.parse(result || '{}');
      return {
        optimizedCode: optimization.code || code,
        savings: optimization.savings || '0%',
      };
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <AIContext.Provider value={{
      generateSmartContract,
      analyzeContract,
      generateWhitepaper,
      optimizeGas,
      isProcessing: isProcessing || isLoading,
    }}>
      {children}
    </AIContext.Provider>
  );
};

export const useAIContext = () => {
  const context = useContext(AIContext);
  if (!context) {
    throw new Error('useAIContext must be used within an AIProvider');
  }
  return context;
};