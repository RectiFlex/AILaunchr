import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Users, Lock, Globe } from 'lucide-react';
import { useCurrentProject } from '../../lib/hooks/useCurrentProject';

const LaunchRequirements = () => {
  const { currentProject } = useCurrentProject();
  const completedSteps = currentProject?.completedSteps || [];

  const requirements = [
    {
      label: 'Smart Contract Audit',
      status: completedSteps.includes('Smart Contract Audit') ? 'Completed' : 'Pending',
      icon: Shield,
      step: 'Smart Contract Audit'
    },
    {
      label: 'KYC Verification',
      status: completedSteps.includes('KYC Verification') ? 'Completed' : 'Pending',
      icon: Users,
      step: 'KYC Verification'
    },
    {
      label: 'Liquidity Lock',
      status: completedSteps.includes('Liquidity Lock') ? 'Completed' : 'Not Started',
      icon: Lock,
      step: 'Liquidity Lock'
    },
    {
      label: 'Marketing Materials',
      status: completedSteps.includes('Marketing Materials') ? 'Completed' : 'In Progress',
      icon: Globe,
      step: 'Marketing Materials'
    }
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="bg-zinc-900/50 rounded-2xl p-6 border border-purple-900/20"
    >
      <h2 className="text-xl font-bold mb-6 flex items-center">
        <Shield className="w-5 h-5 mr-2 text-purple-500" />
        Launch Requirements
      </h2>
      <div className="space-y-4">
        {requirements.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-4 bg-black/30 rounded-lg"
          >
            <div className="flex items-center space-x-3">
              <div className="text-purple-500">
                <item.icon className="w-4 h-4" />
              </div>
              <span>{item.label}</span>
            </div>
            <span className={`text-sm ${
              item.status === 'Completed' ? 'text-green-500' :
              item.status === 'In Progress' ? 'text-yellow-500' :
              item.status === 'Pending' ? 'text-purple-500' :
              'text-gray-400'
            }`}>{item.status}</span>
          </div>
        ))}
      </div>
    </motion.section>
  );
};

export default LaunchRequirements;