import React from 'react';
import { motion } from 'framer-motion';

interface QuickActionProps {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}

const QuickAction = ({ icon, label, onClick }: QuickActionProps) => {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="p-4 bg-black/30 rounded-xl hover:bg-purple-900/20 transition-colors flex flex-col items-center justify-center space-y-2 w-full"
    >
      <div className="text-purple-500">{icon}</div>
      <span className="text-sm">{label}</span>
    </motion.button>
  );
};

export default QuickAction;