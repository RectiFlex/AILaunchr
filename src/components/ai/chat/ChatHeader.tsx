import React from 'react';
import { Bot, X } from 'lucide-react';

interface ChatHeaderProps {
  onClose: () => void;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ onClose }) => {
  return (
    <div className="flex items-center justify-between p-4 border-b border-purple-900/20">
      <div className="flex items-center space-x-2">
        <Bot className="w-5 h-5 text-purple-500" />
        <span className="font-semibold">AI Assistant</span>
      </div>
      <button onClick={onClose} className="text-gray-400 hover:text-white">
        <X className="w-5 h-5" />
      </button>
    </div>
  );
};

export default ChatHeader;