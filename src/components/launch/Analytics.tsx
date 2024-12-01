import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, Users, MessageCircle } from 'lucide-react';
import { useSocialStore } from '../../lib/store/useSocialStore';

const Analytics = () => {
  const { stats } = useSocialStore();
  
  const totalMembers = stats.discord.members + stats.telegram.members;
  const totalEngagement = (stats.twitter.engagement + stats.discord.active + stats.telegram.active) / 3;
  
  const metrics = [
    {
      label: 'Total Community Size',
      value: totalMembers.toLocaleString(),
      change: '+25%',
      icon: Users
    },
    {
      label: 'Average Engagement',
      value: `${Math.round(totalEngagement)}%`,
      change: '+12%',
      icon: TrendingUp
    },
    {
      label: 'Social Reach',
      value: stats.twitter.followers.toLocaleString(),
      change: '+18%',
      icon: MessageCircle
    },
    {
      label: 'Growth Rate',
      value: '32%',
      change: '+5%',
      icon: BarChart3
    }
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="bg-zinc-900/50 rounded-2xl p-6 border border-purple-900/20"
    >
      <h2 className="text-xl font-bold mb-6 flex items-center">
        <BarChart3 className="w-5 h-5 mr-2 text-purple-500" />
        Analytics & Tracking
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {metrics.map((metric, index) => (
          <div
            key={index}
            className="p-4 bg-black/30 rounded-lg"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm text-gray-400">{metric.label}</div>
              <metric.icon className="w-4 h-4 text-purple-500" />
            </div>
            <div className="flex items-center justify-between">
              <div className="text-xl font-bold text-purple-500">{metric.value}</div>
              <div className="text-sm text-green-500">{metric.change}</div>
            </div>
          </div>
        ))}
      </div>
    </motion.section>
  );
};

export default Analytics;