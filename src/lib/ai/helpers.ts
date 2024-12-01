import type { AIResponse } from './types';

export const formatAIPrompt = (template: string, variables: Record<string, any>): string => {
  return template.replace(
    /\{\{(\w+)\}\}/g,
    (match, key) => variables[key]?.toString() || match
  );
};

export const parseAIResponse = (response: string): AIResponse => {
  try {
    return JSON.parse(response);
  } catch (error) {
    return {
      message: 'Failed to parse AI response',
      type: 'error',
      data: response
    };
  }
};

export const sanitizeCode = (code: string): string => {
  return code
    .replace(/```[a-z]*\n/g, '')
    .replace(/```/g, '')
    .trim();
};