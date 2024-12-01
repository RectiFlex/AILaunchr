import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface TokenConfig {
  name: string;
  symbol: string;
  initialSupply: string;
  features: {
    mintable: boolean;
    burnable: boolean;
    pausable: boolean;
    staking: boolean;
    governance: boolean;
    deflation: boolean;
  };
}

export interface Contract {
  id: string;
  name: string;
  code: string;
  address?: string;
  createdAt: string;
  verified: boolean;
  audited: boolean;
}

export interface Project {
  id: string;
  name: string;
  type: string;
  status: string;
  progress: number;
  completedSteps: string[];
  tokenConfig?: TokenConfig;
  tokenomics?: {
    allocations: Array<{
      category: string;
      percentage: number;
      lockPeriod: number;
    }>;
    totalSupply: string;
    timestamp: number;
  };
  contracts: Contract[];
  contractAddress?: string;
  auditStatus?: string;
  securityScore?: number;
  teamMembers?: string[];
  launchDate?: string;
  chain?: string;
}

interface ProjectState {
  projects: Project[];
  addProject: (project: Project) => void;
  updateProject: (id: string, updates: Partial<Project>) => void;
  updateProjectProgress: (id: string) => void;
  addContract: (projectId: string, contract: Contract) => void;
  removeContract: (projectId: string, contractId: string) => void;
}

export const useProjectStore = create<ProjectState>()(
  persist(
    (set) => ({
      projects: [],
      addProject: (project) =>
        set((state) => ({
          projects: [...state.projects, { ...project, contracts: [] }]
        })),
      updateProject: (id, updates) =>
        set((state) => ({
          projects: state.projects.map((project) =>
            project.id === id ? { ...project, ...updates } : project
          )
        })),
      updateProjectProgress: (id) =>
        set((state) => ({
          projects: state.projects.map((project) => {
            if (project.id === id) {
              const totalSteps = 10;
              const progress = (project.completedSteps.length / totalSteps) * 100;
              return { ...project, progress };
            }
            return project;
          })
        })),
      addContract: (projectId, contract) =>
        set((state) => ({
          projects: state.projects.map((project) =>
            project.id === projectId
              ? { ...project, contracts: [...(project.contracts || []), contract] }
              : project
          )
        })),
      removeContract: (projectId, contractId) =>
        set((state) => ({
          projects: state.projects.map((project) =>
            project.id === projectId
              ? {
                  ...project,
                  contracts: project.contracts.filter((c) => c.id !== contractId)
                }
              : project
          )
        }))
    }),
    {
      name: 'project-storage'
    }
  )
);