import React, { useState } from 'react';
import { Send } from 'lucide-react';
import Button from '../../ui/Button';

interface ChatInputProps {
  onSend: (message: string) => void;
  isProcessing: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSend, isProcessing }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isProcessing) return;
    
    onSend(input.trim());
    setInput('');
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border-t border-purple-900/20">
      <div className="flex space-x-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask me anything..."
          className="flex-1 bg-black/30 rounded-lg p-2 text-gray-300 border border-purple-900/20 focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
        />
        <Button type="submit" disabled={isProcessing || !input.trim()}>
          <Send className="w-4 h-4" />
        </Button>
      </div>
    </form>
  );
};

export default ChatInput;