import { useState } from 'react';
import type { AIMessage } from '../types';
import { useAIContext } from '../AIContext';

export const useAIChat = () => {
  const [messages, setMessages] = useState<AIMessage[]>([]);
  const { isProcessing, sendMessage } = useAIContext();

  const addMessage = async (content: string) => {
    const userMessage: AIMessage = { role: 'user', content };
    setMessages(prev => [...prev, userMessage]);

    try {
      const response = await sendMessage(content);
      const assistantMessage: AIMessage = { role: 'assistant', content: response };
      setMessages(prev => [...prev, assistantMessage]);
      return response;
    } catch (error) {
      const errorMessage: AIMessage = {
        role: 'assistant',
        content: 'Sorry, I encountered an error processing your request.'
      };
      setMessages(prev => [...prev, errorMessage]);
      throw error;
    }
  };

  const clearMessages = () => setMessages([]);

  return {
    messages,
    addMessage,
    clearMessages,
    isProcessing
  };
};