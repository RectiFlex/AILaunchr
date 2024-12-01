import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface SocialStats {
  twitter: {
    followers: number;
    engagement: number;
    connected: boolean;
  };
  discord: {
    members: number;
    active: number;
    connected: boolean;
  };
  telegram: {
    members: number;
    active: number;
    connected: boolean;
  };
}

interface SocialState {
  stats: SocialStats;
  updateStats: (platform: keyof SocialStats, stats: Partial<SocialStats[keyof SocialStats]>) => void;
  connectPlatform: (platform: keyof SocialStats) => void;
  disconnectPlatform: (platform: keyof SocialStats) => void;
}

export const useSocialStore = create<SocialState>()(
  persist(
    (set) => ({
      stats: {
        twitter: {
          followers: 0,
          engagement: 0,
          connected: false,
        },
        discord: {
          members: 0,
          active: 0,
          connected: false,
        },
        telegram: {
          members: 0,
          active: 0,
          connected: false,
        },
      },
      updateStats: (platform, stats) =>
        set((state) => ({
          stats: {
            ...state.stats,
            [platform]: {
              ...state.stats[platform],
              ...stats,
            },
          },
        })),
      connectPlatform: (platform) =>
        set((state) => ({
          stats: {
            ...state.stats,
            [platform]: {
              ...state.stats[platform],
              connected: true,
            },
          },
        })),
      disconnectPlatform: (platform) =>
        set((state) => ({
          stats: {
            ...state.stats,
            [platform]: {
              ...state.stats[platform],
              connected: false,
            },
          },
        })),
    }),
    {
      name: 'social-storage',
    }
  )
);