import React from 'react';
import { ChevronRight } from 'lucide-react';

interface ResourceLinkProps {
  label: string;
  onClick?: () => void;
}

const ResourceLink = ({ label, onClick }: ResourceLinkProps) => {
  return (
    <button
      onClick={onClick}
      className="w-full text-left p-3 rounded-lg hover:bg-purple-900/20 transition-colors text-gray-300 hover:text-white flex items-center justify-between"
    >
      {label}
      <ChevronRight className="w-4 h-4" />
    </button>
  );
};

export default ResourceLink;