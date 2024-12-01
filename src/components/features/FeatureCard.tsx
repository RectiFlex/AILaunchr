import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  index: number;
}

const FeatureCard = ({ icon: Icon, title, description, index }: FeatureCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.02 }}
      className="p-6 rounded-2xl bg-gradient-to-br from-purple-900/50 to-transparent border border-purple-800/50 hover:border-purple-600/50 transition-all group relative overflow-hidden"
    >
      {/* Glowing background effect */}
      <div className="absolute inset-0 bg-gradient-radial from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Icon with animation */}
      <div className="relative">
        <div className="text-purple-500 mb-4 transform group-hover:scale-110 transition-transform duration-300">
          <Icon className="w-8 h-8" />
        </div>
        
        {/* Content */}
        <h3 className="text-xl font-semibold text-white mb-2 relative z-10">
          {title}
        </h3>
        <p className="text-gray-400 relative z-10">
          {description}
        </p>
      </div>

      {/* Hover effect lines */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
        <div className="absolute top-0 left-0 w-px h-full bg-gradient-to-b from-transparent via-purple-500/50 to-transparent" />
        <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-transparent via-purple-500/50 to-transparent" />
      </div>
    </motion.div>
  );
};

export default FeatureCard;