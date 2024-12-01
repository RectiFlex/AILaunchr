```typescript
import { useAIContext } from '../AIProvider';
import { useCurrentProject } from '../../hooks/useCurrentProject';
import { generatePrompt, parseAIResponse } from '../helpers';
import type { AITokenomicsResult } from '../types';

export const useTokenomicsAI = () => {
  const { complete, isProcessing } = useAIContext();
  const { currentProject, markStepComplete } = useCurrentProject();

  const analyzeTokenomics = async (tokenomics: any): Promise<AITokenomicsResult> => {
    if (!currentProject) throw new Error('No project selected');

    const prompt = generatePrompt('TOKENOMICS_ANALYSIS', {
      tokenomics: JSON.stringify(tokenomics),
      projectContext: currentProject
    });

    const result = await complete(prompt);
    const analysis = parseAIResponse(result);

    markStepComplete('Tokenomics Analysis', 'document');
    return analysis;
  };

  return {
    analyzeTokenomics,
    isProcessing
  };
};
```