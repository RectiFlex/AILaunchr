```typescript
import React from 'react';
import { motion } from 'framer-motion';
import { Loader } from 'lucide-react';

interface AIProgressProps {
  message: string;
  progress?: number;
}

const AIProgress = ({ message, progress }: AIProgressProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center p-6 space-y-4"
    >
      <div className="relative">
        <Loader className="w-8 h-8 text-purple-500 animate-spin" />
        {progress !== undefined && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xs font-medium">{Math.round(progress)}%</span>
          </div>
        )}
      </div>
      <p className="text-gray-400 text-center">{message}</p>
    </motion.div>
  );
};

export default AIProgress;
```