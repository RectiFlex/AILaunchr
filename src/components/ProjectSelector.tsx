import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, FolderKanban } from 'lucide-react';
import { useProjectStore } from '../lib/store/useProjectStore';
import { useCurrentProject } from '../lib/hooks/useCurrentProject';

const ProjectSelector = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const projects = useProjectStore((state) => state.projects);
  const { currentProject, setCurrentProject } = useCurrentProject();

  if (projects.length === 0) {
    return null;
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-zinc-900/50 hover:bg-purple-900/20 transition-colors border border-purple-900/20"
      >
        <FolderKanban className="w-4 h-4 text-purple-500" />
        <span className="text-sm truncate max-w-[150px]">
          {currentProject?.name || 'Select Project'}
        </span>
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute z-50 mt-2 w-56 rounded-lg bg-zinc-900 border border-purple-900/20 shadow-lg py-1"
          >
            {projects.map((project) => (
              <button
                key={project.id}
                onClick={() => {
                  setCurrentProject(project.id);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-4 py-2 text-sm hover:bg-purple-900/20 transition-colors flex items-center space-x-2 ${
                  currentProject?.id === project.id ? 'text-purple-500' : 'text-gray-300'
                }`}
              >
                <FolderKanban className="w-4 h-4" />
                <span className="truncate">{project.name}</span>
              </button>
            ))}
          </motion.div>
        </>
      )}
    </div>
  );
};

export default ProjectSelector;