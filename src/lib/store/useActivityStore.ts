import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Activity {
  id: string;
  projectId: string;
  type: 'audit' | 'contract' | 'launch' | 'team' | 'document';
  message: string;
  timestamp: number;
  icon?: string;
}

interface ActivityState {
  activities: Activity[];
  addActivity: (activity: Activity) => void;
}

export const useActivityStore = create<ActivityState>()(
  persist(
    (set) => ({
      activities: [],
      addActivity: (activity) =>
        set((state) => ({
          activities: [activity, ...state.activities].slice(0, 50) // Keep last 50 activities
        }))
    }),
    {
      name: 'activity-storage'
    }
  )
);