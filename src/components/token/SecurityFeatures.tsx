import React from 'react';
import { motion } from 'framer-motion';
import { Shield } from 'lucide-react';

const SecurityFeatures = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="bg-zinc-900/50 rounded-2xl p-6 border border-purple-900/20"
    >
      <h2 className="text-xl font-bold mb-6 flex items-center">
        <Shield className="w-5 h-5 mr-2 text-purple-500" />
        Security Features
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          'Anti-whale Mechanism',
          'Liquidity Lock',
          'Ownership Renouncement',
          'Trading Limits'
        ].map((feature, index) => (
          <label
            key={index}
            className="flex items-center space-x-2 p-3 bg-black/30 rounded-lg cursor-pointer hover:bg-purple-900/20 transition-colors"
          >
            <input type="checkbox" className="form-checkbox text-purple-500" />
            <span className="text-gray-300">{feature}</span>
          </label>
        ))}
      </div>
    </motion.section>
  );
};

export default SecurityFeatures;