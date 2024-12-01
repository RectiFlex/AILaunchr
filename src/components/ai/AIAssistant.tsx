import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAIChat } from '../../lib/ai/hooks/useAIChat';
import ChatHeader from './chat/ChatHeader';
import ChatMessage from './chat/ChatMessage';
import ChatInput from './chat/ChatInput';
import ProcessingIndicator from './ProcessingIndicator';

interface AIAssistantProps {
  isOpen: boolean;
  onClose: () => void;
}

const AIAssistant: React.FC<AIAssistantProps> = ({ isOpen, onClose }) => {
  const { messages, addMessage, isProcessing } = useAIChat();

  const handleSendMessage = async (content: string) => {
    try {
      await addMessage(content);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-4 right-4 w-96 bg-zinc-900 rounded-lg shadow-xl border border-purple-900/20"
        >
          <ChatHeader onClose={onClose} />

          <div className="h-96 overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <ChatMessage key={index} message={message} />
            ))}
            {isProcessing && <ProcessingIndicator />}
          </div>

          <ChatInput onSend={handleSendMessage} isProcessing={isProcessing} />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AIAssistant;