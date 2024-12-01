import { useProjectStore } from '../store/useProjectStore';
import { useCurrentProjectStore } from '../store/useCurrentProjectStore';
import { useActivityStore } from '../store/useActivityStore';
import { v4 as uuidv4 } from 'uuid';
import type { Project } from '../store/useProjectStore';

export const useCurrentProject = () => {
  const currentProjectId = useCurrentProjectStore((state) => state.currentProjectId);
  const setCurrentProject = useCurrentProjectStore((state) => state.setCurrentProject);
  const projects = useProjectStore((state) => state.projects);
  const { addActivity } = useActivityStore();
  const { updateProject, updateProjectProgress } = useProjectStore();

  const currentProject = projects.find(p => p.id === currentProjectId);

  const markStepComplete = (step: string, type: 'audit' | 'contract' | 'launch' | 'team' | 'document') => {
    if (!currentProjectId) return;

    const updatedSteps = [...new Set([...(currentProject?.completedSteps || []), step])];
    updateProject(currentProjectId, { completedSteps: updatedSteps });
    updateProjectProgress(currentProjectId);

    addActivity({
      id: uuidv4(),
      projectId: currentProjectId,
      type,
      message: `Completed step: ${step}`,
      timestamp: Date.now()
    });
  };

  const updateProjectDetails = (updates: Partial<Project>) => {
    if (!currentProjectId) return;
    updateProject(currentProjectId, updates);
  };

  return {
    currentProject,
    setCurrentProject,
    markStepComplete,
    updateProjectDetails,
  };
};