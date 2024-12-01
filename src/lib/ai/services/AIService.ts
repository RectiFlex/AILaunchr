import type { AIResponse } from '../types';
import { formatAIPrompt, parseAIResponse } from '../helpers';

const API_URL = '/api/ai';

export class AIService {
  static async sendMessage(message: string): Promise<AIResponse> {
    const response = await fetch(`${API_URL}/completion`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: message })
    });

    if (!response.ok) {
      throw new Error('Failed to send message');
    }

    const data = await response.json();
    return parseAIResponse(data);
  }

  static async generateContract(requirements: string): Promise<AIResponse> {
    const response = await fetch(`${API_URL}/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'contract', requirements })
    });

    if (!response.ok) {
      throw new Error('Failed to generate contract');
    }

    const data = await response.json();
    return parseAIResponse(data);
  }

  static async analyzeCode(code: string): Promise<AIResponse> {
    const response = await fetch(`${API_URL}/analyze`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code })
    });

    if (!response.ok) {
      throw new Error('Failed to analyze code');
    }

    const data = await response.json();
    return parseAIResponse(data);
  }
}