```typescript
import { useAIContext } from '../AIProvider';
import { useCurrentProject } from '../../hooks/useCurrentProject';
import { generatePrompt, sanitizeCode, parseAIResponse } from '../helpers';
import type { AIAnalysisResult, AIGasOptimizationResult } from '../types';

export const useSmartContractAI = () => {
  const { generateSmartContract, analyzeContract, optimizeGas, isProcessing } = useAIContext();
  const { currentProject, markStepComplete } = useCurrentProject();

  const generateContract = async (requirements: string) => {
    if (!currentProject) throw new Error('No project selected');

    const prompt = generatePrompt('TOKEN_GENERATION', {
      ...requirements,
      projectContext: currentProject
    });

    const result = await generateSmartContract(prompt);
    const code = sanitizeCode(result);

    markStepComplete('Smart Contract Generation', 'contract');
    return code;
  };

  const analyze = async (code: string): Promise<AIAnalysisResult> => {
    const prompt = generatePrompt('CONTRACT_ANALYSIS', { code });
    const result = await analyzeContract(prompt);
    return parseAIResponse(result);
  };

  const optimize = async (code: string): Promise<AIGasOptimizationResult> => {
    const prompt = generatePrompt('GAS_OPTIMIZATION', { code });
    const result = await optimizeGas(prompt);
    return parseAIResponse(result);
  };

  return {
    generateContract,
    analyze,
    optimize,
    isProcessing
  };
};
```