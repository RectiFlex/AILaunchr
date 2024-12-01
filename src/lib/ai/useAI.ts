import { useCallback } from "react";
import { useCompletion } from "ai/react";
import { useCurrentProject } from "../hooks/useCurrentProject";

export const useAI = () => {
  const { currentProject } = useCurrentProject();

  const { complete: rawComplete, completion, isLoading } = useCompletion({
    api: '/api/ai/completion',
  });

  const complete = useCallback(async (prompt: string) => {
    const projectContext = currentProject ? {
      name: currentProject.name,
      type: currentProject.type,
      tokenConfig: currentProject.tokenConfig,
      tokenomics: currentProject.tokenomics,
      completedSteps: currentProject.completedSteps,
    } : null;

    return rawComplete(JSON.stringify({
      prompt,
      projectContext,
    }));
  }, [currentProject, rawComplete]);

  return {
    complete,
    completion,
    isLoading,
  };
};