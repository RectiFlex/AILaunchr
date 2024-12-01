```typescript
import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, CheckCircle, Info } from 'lucide-react';

interface AIFeedbackProps {
  type: 'success' | 'warning' | 'info';
  message: string;
  details?: string[];
}

const AIFeedback = ({ type, message, details }: AIFeedbackProps) => {
  const icons = {
    success: CheckCircle,
    warning: AlertTriangle,
    info: Info
  };

  const colors = {
    success: 'text-green-500 bg-green-900/20 border-green-500/20',
    warning: 'text-yellow-500 bg-yellow-900/20 border-yellow-500/20',
    info: 'text-blue-500 bg-blue-900/20 border-blue-500/20'
  };

  const Icon = icons[type];

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`rounded-lg p-4 ${colors[type]} border`}
    >
      <div className="flex items-start space-x-3">
        <Icon className="w-5 h-5 mt-0.5" />
        <div>
          <p className="font-medium">{message}</p>
          {details && details.length > 0 && (
            <ul className="mt-2 space-y-1 text-sm">
              {details.map((detail, index) => (
                <li key={index}>{detail}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default AIFeedback;
```