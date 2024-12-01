import React from 'react';
import { motion } from 'framer-motion';
import type { AIMessage } from '../../../lib/ai/types';

interface ChatMessageProps {
  message: AIMessage;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.role === 'user';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
    >
      <div
        className={`max-w-[80%] rounded-lg p-3 ${
          isUser
            ? 'bg-purple-600 text-white'
            : 'bg-zinc-800 text-gray-300'
        }`}
      >
        {message.content}
      </div>
    </motion.div>
  );
};

export default ChatMessage;