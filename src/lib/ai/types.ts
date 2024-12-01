export interface AIMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface AIContextType {
  isProcessing: boolean;
  sendMessage: (message: string) => Promise<string>;
  generateContract: (requirements: string) => Promise<string>;
  analyzeCode: (code: string) => Promise<{
    vulnerabilities: string[];
    suggestions: string[];
  }>;
}

export interface AIResponse {
  message: string;
  type: 'success' | 'error';
  data?: any;
}