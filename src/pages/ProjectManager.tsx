import React from 'react';
import { motion } from 'framer-motion';
import ProjectOverview from '../components/project/ProjectOverview';
import TeamManagement from '../components/project/TeamManagement';
import { useCurrentProject } from '../lib/hooks/useCurrentProject';

const ProjectManager = () => {
  const { currentProject } = useCurrentProject();

  if (!currentProject) {
    return (
      <div className="pt-24 min-h-screen bg-gradient-to-b from-black to-purple-900/20">
        <div className="container mx-auto px-6">
          <div className="text-center py-12">
            <h1 className="text-3xl font-bold mb-4">No Project Selected</h1>
            <p className="text-gray-400">Please select a project from the dropdown menu to manage it.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 min-h-screen bg-gradient-to-b from-black to-purple-900/20">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-4">Project Manager</h1>
            <p className="text-gray-400">Manage your project details and team members</p>
          </div>

          <div className="grid gap-8">
            <ProjectOverview />
            <TeamManagement />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProjectManager;