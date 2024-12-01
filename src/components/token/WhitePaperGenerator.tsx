import React from 'react';
import { motion } from 'framer-motion';
import { FileText } from 'lucide-react';
import Button from '../ui/Button';

const WhitePaperGenerator = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="bg-zinc-900/50 rounded-2xl p-6 border border-purple-900/20"
    >
      <h2 className="text-xl font-bold mb-6 flex items-center">
        <FileText className="w-5 h-5 mr-2 text-purple-500" />
        White Paper Generator
      </h2>
      <div className="space-y-4">
        <textarea
          className="w-full h-32 bg-black/30 rounded-lg p-4 text-gray-300 placeholder-gray-500 border border-purple-900/20 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors"
          placeholder="Describe your project's vision, tokenomics, and use cases..."
        />
        <Button variant="primary" className="w-full">Generate White Paper</Button>
      </div>
    </motion.section>
  );
};

export default WhitePaperGenerator;