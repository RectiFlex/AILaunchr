import { useEffect } from 'react';
import { useProjectStore } from '../lib/store/useProjectStore';
import { useActivityStore } from '../lib/store/useActivityStore';
import { v4 as uuidv4 } from 'uuid';

export const useProjectProgress = (projectId: string) => {
  const { updateProject, updateProjectProgress } = useProjectStore();
  const { addActivity } = useActivityStore();

  const markStepComplete = (step: string) => {
    const project = useProjectStore.getState().projects.find(p => p.id === projectId);
    if (!project) return;

    const updatedSteps = [...new Set([...project.completedSteps, step])];
    updateProject(projectId, { completedSteps: updatedSteps });
    updateProjectProgress(projectId);

    addActivity({
      id: uuidv4(),
      projectId,
      type: 'document',
      message: `Completed step: ${step}`,
      timestamp: Date.now()
    });
  };

  const updateAuditStatus = (status: string, score: number) => {
    updateProject(projectId, { auditStatus: status, securityScore: score });
    addActivity({
      id: uuidv4(),
      projectId,
      type: 'audit',
      message: `Security audit completed with score: ${score}`,
      timestamp: Date.now()
    });
  };

  const updateContractAddress = (address: string) => {
    updateProject(projectId, { contractAddress: address });
    addActivity({
      id: uuidv4(),
      projectId,
      type: 'contract',
      message: `Smart contract deployed at: ${address}`,
      timestamp: Date.now()
    });
  };

  return {
    markStepComplete,
    updateAuditStatus,
    updateContractAddress
  };
};