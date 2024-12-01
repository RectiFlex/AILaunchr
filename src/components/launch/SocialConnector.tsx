import React from 'react';
import { motion } from 'framer-motion';
import { Users, Twitter, MessageCircle } from 'lucide-react';
import { useSocialStore } from '../../lib/store/useSocialStore';
import Button from '../ui/Button';

const SocialConnector = () => {
  const { stats, connectPlatform, disconnectPlatform } = useSocialStore();

  const handleConnect = (platform: 'twitter' | 'discord' | 'telegram') => {
    // In a real implementation, this would handle OAuth flow
    connectPlatform(platform);
  };

  const handleDisconnect = (platform: 'twitter' | 'discord' | 'telegram') => {
    disconnectPlatform(platform);
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="bg-zinc-900/50 rounded-2xl p-6 border border-purple-900/20"
    >
      <h2 className="text-xl font-bold mb-6 flex items-center">
        <Users className="w-5 h-5 mr-2 text-purple-500" />
        Community Setup
      </h2>
      <div className="space-y-4">
        {[
          { platform: 'twitter', icon: Twitter, stats: stats.twitter },
          { platform: 'discord', icon: Users, stats: stats.discord },
          { platform: 'telegram', icon: MessageCircle, stats: stats.telegram }
        ].map(({ platform, icon: Icon, stats }) => (
          <div
            key={platform}
            className="flex items-center justify-between p-4 bg-black/30 rounded-lg"
          >
            <div className="flex items-center space-x-3">
              <Icon className="w-4 h-4 text-purple-500" />
              <span className="capitalize">{platform}</span>
            </div>
            <div className="flex items-center space-x-4">
              {stats.connected && (
                <div className="text-sm text-gray-400">
                  {platform === 'twitter' ? `${stats.followers} followers` : `${stats.members} members`}
                </div>
              )}
              <Button
                variant={stats.connected ? 'outline' : 'primary'}
                size="sm"
                onClick={() => stats.connected ? handleDisconnect(platform as any) : handleConnect(platform as any)}
              >
                {stats.connected ? 'Disconnect' : 'Connect'}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </motion.section>
  );
};

export default SocialConnector;