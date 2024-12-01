import React from 'react';
import { motion } from 'framer-motion';
import { useCurrentProjectStore } from '../../lib/store/useCurrentProjectStore';
import { Project } from '../../lib/store/useProjectStore';

interface ProjectCardProps {
  project: Project;
  index: number;
}

const ProjectCard = ({ project, index }: ProjectCardProps) => {
  const { currentProjectId, setCurrentProject } = useCurrentProjectStore();
  const isSelected = currentProjectId === project.id;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      onClick={() => setCurrentProject(project.id)}
      className={`bg-black/50 rounded-xl p-4 hover:bg-purple-900/10 transition-colors cursor-pointer ${
        isSelected ? 'border-2 border-purple-500' : ''
      }`}
    >
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-semibold">{project.name}</h3>
          <p className="text-sm text-gray-400">{project.type}</p>
        </div>
        <div className="text-right">
          <div className="text-purple-500">{project.status}</div>
          <div className="text-sm text-gray-400">{project.progress}% Complete</div>
        </div>
      </div>
      <div className="mt-3 bg-zinc-800 rounded-full h-2">
        <div
          className="bg-purple-500 rounded-full h-2"
          style={{ width: `${project.progress}%` }}
        />
      </div>
    </motion.div>
  );
};

export default ProjectCard;