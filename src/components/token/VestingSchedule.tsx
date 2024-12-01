import React from 'react';
import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';
import Button from '../ui/Button';

const VestingSchedule = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="bg-zinc-900/50 rounded-2xl p-6 border border-purple-900/20"
    >
      <h2 className="text-xl font-bold mb-6 flex items-center">
        <Clock className="w-5 h-5 mr-2 text-purple-500" />
        Vesting Schedule
      </h2>
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm text-gray-400">Initial Release (%)</label>
            <input
              type="number"
              className="w-full bg-black/30 rounded-lg p-2 text-gray-300 border border-purple-900/20"
              placeholder="10"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm text-gray-400">Vesting Period (months)</label>
            <input
              type="number"
              className="w-full bg-black/30 rounded-lg p-2 text-gray-300 border border-purple-900/20"
              placeholder="12"
            />
          </div>
        </div>
        <Button variant="primary" className="w-full">Generate Vesting Contract</Button>
      </div>
    </motion.section>
  );
};

export default VestingSchedule;