import React from 'react';
import { useLocation } from 'react-router-dom';
import { useCurrentProject } from '../lib/hooks/useCurrentProject';

const ProjectContext = () => {
  const location = useLocation();
  const { currentProject } = useCurrentProject();

  // Update page title based on current project
  React.useEffect(() => {
    if (currentProject) {
      document.title = `${currentProject.name} - AI Launchpad`;
    } else {
      document.title = 'AI Launchpad';
    }
  }, [currentProject]);

  // Add project context to window for AI assistance
  React.useEffect(() => {
    if (currentProject) {
      (window as any).currentProject = {
        id: currentProject.id,
        name: currentProject.name,
        type: currentProject.type,
        progress: currentProject.progress,
        completedSteps: currentProject.completedSteps,
      };
    } else {
      (window as any).currentProject = null;
    }
  }, [currentProject, location.pathname]);

  return null;
};

export default ProjectContext;