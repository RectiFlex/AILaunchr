```typescript
import { useAIContext } from '../AIProvider';
import { useCurrentProject } from '../../hooks/useCurrentProject';
import { generatePrompt, parseAIResponse } from '../helpers';
import type { AIWhitepaperResult } from '../types';

export const useWhitepaperAI = () => {
  const { generateWhitepaper, isProcessing } = useAIContext();
  const { currentProject, markStepComplete } = useCurrentProject();

  const generateWhitepaperContent = async (projectInfo: string): Promise<AIWhitepaperResult> => {
    if (!currentProject) throw new Error('No project selected');

    const prompt = generatePrompt('WHITEPAPER_GENERATION', {
      projectName: currentProject.name,
      projectInfo,
      tokenomics: currentProject.tokenomics,
      projectContext: currentProject
    });

    const result = await generateWhitepaper(prompt);
    const whitepaper = parseAIResponse(result);

    markStepComplete('Whitepaper Generation', 'document');
    return whitepaper;
  };

  return {
    generateWhitepaperContent,
    isProcessing
  };
};
```