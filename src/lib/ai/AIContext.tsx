import React, { createContext, useContext, useState } from 'react';
import type { AIContextType, AIResponse } from './types';
import { useCurrentProject } from '../hooks/useCurrentProject';
import { AIService } from './services/AIService';

const AIContext = createContext<AIContextType | null>(null);

export const AIProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const { currentProject } = useCurrentProject();

  const sendMessage = async (message: string): Promise<string> => {
    setIsProcessing(true);
    try {
      const response = await AIService.sendMessage(message);
      return response.message;
    } finally {
      setIsProcessing(false);
    }
  };

  const generateContract = async (requirements: string): Promise<string> => {
    setIsProcessing(true);
    try {
      const response = await AIService.generateContract(requirements);
      return response.data?.code || '';
    } finally {
      setIsProcessing(false);
    }
  };

  const analyzeCode = async (code: string) => {
    setIsProcessing(true);
    try {
      const response = await AIService.analyzeCode(code);
      return {
        vulnerabilities: response.data?.vulnerabilities || [],
        optimizations: response.data?.optimizations || [],
        score: response.data?.score || 0
      };
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <AIContext.Provider
      value={{
        isProcessing,
        sendMessage,
        generateContract,
        analyzeCode
      }}
    >
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