import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CurrentProjectState {
  currentProjectId: string | null;
  setCurrentProject: (projectId: string | null) => void;
}

export const useCurrentProjectStore = create<CurrentProjectState>()(
  persist(
    (set) => ({
      currentProjectId: null,
      setCurrentProject: (projectId) => set({ currentProjectId: projectId }),
    }),
    {
      name: 'current-project-storage'
    }
  )
);