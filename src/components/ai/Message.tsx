import React from 'react';
import { motion } from 'framer-motion';

interface MessageProps {
  role: 'user' | 'assistant';
  content: string;
}

const Message: React.FC<MessageProps> = ({ role, content }) => {
  return (
    <div className={role === 'user' ? 'flex justify-end' : 'flex justify-start'}>
      <div
        className={`max-w-[80%] rounded-lg p-3 ${
          role === 'user'
            ? 'bg-purple-600 text-white'
            : 'bg-zinc-800 text-gray-300'
        }`}
      >
        {content}
      </div>
    </div>
  );
};

export default Message;