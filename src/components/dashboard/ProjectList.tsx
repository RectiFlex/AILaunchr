import React from 'react';
import { motion } from 'framer-motion';
import { useProjectStore } from '../../lib/store/useProjectStore';
import ProjectCard from './ProjectCard';

const ProjectList = () => {
  const projects = useProjectStore((state) => state.projects);

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-zinc-900/50 rounded-2xl p-6 border border-purple-900/20"
    >
      <div className="space-y-4">
        {projects.length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            No projects yet. Create your first project to get started!
          </div>
        ) : (
          projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))
        )}
      </div>
    </motion.section>
  );
};

export default ProjectList;