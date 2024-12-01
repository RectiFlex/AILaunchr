import React from 'react';
import { Send } from 'lucide-react';
import Button from '../ui/Button';

interface MessageInputProps {
  input: string;
  onChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  isProcessing: boolean;
}

const MessageInput: React.FC<MessageInputProps> = ({
  input,
  onChange,
  onSubmit,
  isProcessing
}) => {
  return (
    <form onSubmit={onSubmit} className="p-4 border-t border-purple-900/20">
      <div className="flex space-x-2">
        <input
          type="text"
          value={input}
          onChange={(e) => onChange(e.target.value)}
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

export default MessageInput;