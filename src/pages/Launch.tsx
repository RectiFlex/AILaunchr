import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Rocket } from 'lucide-react';
import Button from '../components/ui/Button';
import LaunchRequirements from '../components/launch/LaunchRequirements';
import BlockchainSelector from '../components/launch/BlockchainSelector';
import SocialConnector from '../components/launch/SocialConnector';
import Analytics from '../components/launch/Analytics';
import { useCurrentProject } from '../lib/hooks/useCurrentProject';
import { useProjectStore } from '../lib/store/useProjectStore';

const Launch = () => {
  const [selectedChain, setSelectedChain] = useState('ethereum');
  const { currentProject, markStepComplete } = useCurrentProject();
  const { updateProject } = useProjectStore();

  const handleLaunch = async () => {
    if (!currentProject) return;

    try {
      // Update project status
      updateProject(currentProject.id, {
        status: 'Live',
        launchDate: new Date().toISOString(),
        chain: selectedChain,
      });

      // Mark launch step as complete
      markStepComplete('Project Launch', 'launch');

      // Show success message
      alert('Project successfully launched! Your project is now live on the community page.');
    } catch (error) {
      console.error('Launch failed:', error);
      alert('Failed to launch project. Please try again.');
    }
  };

  const isLaunchReady = currentProject?.completedSteps?.includes('Smart Contract Audit') &&
                        currentProject?.completedSteps?.includes('KYC Verification');

  return (
    <div className="pt-24 min-h-screen bg-gradient-to-b from-black to-purple-900/20">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-4">Launch Your Project</h1>
            <p className="text-gray-400">Deploy your project and connect with the community</p>
          </div>

          <div className="grid gap-8">
            <LaunchRequirements />
            <BlockchainSelector selectedChain={selectedChain} onSelect={setSelectedChain} />
            <SocialConnector />
            <Analytics />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex justify-center"
            >
              <Button
                variant="primary"
                size="lg"
                className="w-full md:w-auto"
                onClick={handleLaunch}
                disabled={!isLaunchReady}
              >
                <Rocket className="w-5 h-5 mr-2" />
                {isLaunchReady ? 'Launch Project' : 'Complete Requirements to Launch'}
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Launch;