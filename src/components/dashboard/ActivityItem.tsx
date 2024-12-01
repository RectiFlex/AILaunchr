import React from 'react';
import { Shield, ChevronRight } from 'lucide-react';

interface ActivityItemProps {
  icon?: React.ReactNode;
  message: string;
  time: string;
}

const ActivityItem = ({ icon = <Shield />, message, time }: ActivityItemProps) => {
  return (
    <div className="flex items-center space-x-4 text-sm text-gray-400">
      <div className="w-8 h-8 rounded-full bg-purple-900/30 flex items-center justify-center">
        <div className="w-4 h-4 text-purple-500">{icon}</div>
      </div>
      <div className="flex-1">
        {message}
        <div className="text-xs">{time}</div>
      </div>
      <ChevronRight className="w-4 h-4" />
    </div>
  );
};

export default ActivityItem;