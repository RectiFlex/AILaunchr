import React from 'react';
import { Loader } from 'lucide-react';

const ProcessingIndicator: React.FC = () => {
  return (
    <div className="flex justify-start">
      <div className="bg-zinc-800 rounded-lg p-3 flex items-center space-x-2">
        <Loader className="w-4 h-4 animate-spin" />
        <span>Processing...</span>
      </div>
    </div>
  );
};

export default ProcessingIndicator;