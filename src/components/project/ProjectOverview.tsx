import React from 'react';
import { motion } from 'framer-motion';
import { Target, Calendar, Users, Rocket } from 'lucide-react';
import { useCurrentProject } from '../../lib/hooks/useCurrentProject';

const projectTypes = [
  { value: 'defi', label: 'DeFi Protocol' },
  { value: 'dex', label: 'Decentralized Exchange' },
  { value: 'lending', label: 'Lending Platform' },
  { value: 'yield', label: 'Yield Farming' },
  { value: 'nft', label: 'NFT Platform' },
  { value: 'nft-marketplace', label: 'NFT Marketplace' },
  { value: 'gamefi', label: 'GameFi' },
  { value: 'metaverse', label: 'Metaverse' },
  { value: 'dao', label: 'DAO' },
  { value: 'social', label: 'Social Platform' },
  { value: 'oracle', label: 'Oracle Service' },
  { value: 'bridge', label: 'Cross-chain Bridge' },
  { value: 'privacy', label: 'Privacy Solution' },
  { value: 'infrastructure', label: 'Infrastructure' },
  { value: 'launchpad', label: 'Token Launchpad' },
  { value: 'insurance', label: 'DeFi Insurance' },
  { value: 'derivatives', label: 'Derivatives Platform' },
  { value: 'payments', label: 'Payment Solution' },
  { value: 'identity', label: 'Identity & KYC' },
  { value: 'other', label: 'Other' }
];

const ProjectOverview = () => {
  const { currentProject, updateProjectDetails } = useCurrentProject();

  const handleInputChange = (field: string, value: string) => {
    if (!currentProject) return;
    updateProjectDetails({ [field]: value });
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="bg-zinc-900/50 rounded-2xl p-6 border border-purple-900/20"
    >
      <h2 className="text-xl font-bold mb-6 flex items-center">
        <Target className="w-5 h-5 mr-2 text-purple-500" />
        Project Overview
      </h2>
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm text-gray-400">Project Name</label>
            <input
              type="text"
              value={currentProject?.name || ''}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className="w-full bg-black/30 rounded-lg p-2 text-gray-300 border border-purple-900/20"
              placeholder="Enter project name"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm text-gray-400">Project Type</label>
            <select
              value={currentProject?.type || ''}
              onChange={(e) => handleInputChange('type', e.target.value)}
              className="w-full bg-black/30 rounded-lg p-2 text-gray-300 border border-purple-900/20"
            >
              <option value="">Select project type</option>
              {projectTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm text-gray-400">Project Description</label>
          <textarea
            value={currentProject?.description || ''}
            onChange={(e) => handleInputChange('description', e.target.value)}
            className="w-full h-32 bg-black/30 rounded-lg p-4 text-gray-300 placeholder-gray-500 border border-purple-900/20"
            placeholder="Describe your project..."
          />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 bg-black/30 rounded-lg">
            <div className="flex items-center text-purple-500 mb-2">
              <Calendar className="w-4 h-4 mr-2" />
              <span className="text-sm">Start Date</span>
            </div>
            <div className="font-semibold">
              {currentProject?.startDate ? new Date(currentProject.startDate).toLocaleDateString() : 'Not set'}
            </div>
          </div>
          <div className="p-4 bg-black/30 rounded-lg">
            <div className="flex items-center text-purple-500 mb-2">
              <Users className="w-4 h-4 mr-2" />
              <span className="text-sm">Team Size</span>
            </div>
            <div className="font-semibold">
              {currentProject?.teamMembers?.length || 0} Members
            </div>
          </div>
          <div className="p-4 bg-black/30 rounded-lg">
            <div className="flex items-center text-purple-500 mb-2">
              <Target className="w-4 h-4 mr-2" />
              <span className="text-sm">Progress</span>
            </div>
            <div className="font-semibold">
              {currentProject?.progress || 0}%
            </div>
          </div>
          <div className="p-4 bg-black/30 rounded-lg">
            <div className="flex items-center text-purple-500 mb-2">
              <Rocket className="w-4 h-4 mr-2" />
              <span className="text-sm">Status</span>
            </div>
            <div className="font-semibold capitalize">
              {currentProject?.status || 'Planning'}
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default ProjectOverview;