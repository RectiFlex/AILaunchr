import { AIService } from './AIService';
import { CONTRACT_PROMPTS } from '../prompts';
import { formatAIPrompt } from '../helpers';
import type { TokenConfig } from '../../store/useProjectStore';

export class ContractGenerationService {
  static async generateContract(config: TokenConfig): Promise<string> {
    const prompt = formatAIPrompt(CONTRACT_PROMPTS.TOKEN_GENERATION, {
      name: config.name,
      symbol: config.symbol,
      initialSupply: config.initialSupply,
      features: JSON.stringify(config.features)
    });

    const response = await AIService.sendMessage(prompt);
    return response.data?.code || '';
  }

  static async analyzeContract(code: string) {
    const prompt = formatAIPrompt(CONTRACT_PROMPTS.CONTRACT_ANALYSIS, { code });
    const response = await AIService.sendMessage(prompt);
    return response.data || {
      vulnerabilities: [],
      suggestions: [],
      score: 0
    };
  }

  static async optimizeContract(code: string) {
    const prompt = formatAIPrompt(CONTRACT_PROMPTS.CONTRACT_OPTIMIZATION, { code });
    const response = await AIService.sendMessage(prompt);
    return response.data?.optimizedCode || code;
  }
}