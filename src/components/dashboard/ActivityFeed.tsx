import React from 'react';
import { motion } from 'framer-motion';
import { useActivityStore } from '../../lib/store/useActivityStore';
import ActivityItem from './ActivityItem';
import { Shield, FileText, Rocket, Users } from 'lucide-react';

const getActivityIcon = (type: string) => {
  switch (type) {
    case 'audit':
      return <Shield className="w-4 h-4" />;
    case 'document':
      return <FileText className="w-4 h-4" />;
    case 'launch':
      return <Rocket className="w-4 h-4" />;
    case 'team':
      return <Users className="w-4 h-4" />;
    default:
      return <FileText className="w-4 h-4" />;
  }
};

const formatTime = (timestamp: number) => {
  const now = Date.now();
  const diff = now - timestamp;
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) return `${days} days ago`;
  if (hours > 0) return `${hours} hours ago`;
  if (minutes > 0) return `${minutes} minutes ago`;
  return 'Just now';
};

const ActivityFeed = () => {
  const activities = useActivityStore((state) => state.activities);

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="bg-zinc-900/50 rounded-2xl p-6 border border-purple-900/20"
    >
      <h2 className="text-2xl font-bold mb-6">Recent Activity</h2>
      <div className="space-y-4">
        {activities.length === 0 ? (
          <div className="text-center py-4 text-gray-400">
            No recent activity
          </div>
        ) : (
          activities.slice(0, 5).map((activity) => (
            <ActivityItem
              key={activity.id}
              icon={getActivityIcon(activity.type)}
              message={activity.message}
              time={formatTime(activity.timestamp)}
            />
          ))
        )}
      </div>
    </motion.section>
  );
};

export default ActivityFeed;