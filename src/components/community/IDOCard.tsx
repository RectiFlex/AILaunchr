import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Users, Coins, Timer, ArrowUpRight } from 'lucide-react';
import Button from '../ui/Button';
import { formatEther, parseEther } from 'viem';
import { useContractWrite } from 'wagmi';

interface IDOCardProps {
  project: {
    id: string;
    name: string;
    description: string;
    image?: string;
    status: string;
    tokenPrice: string;
    softCap: string;
    hardCap: string;
    minContribution: string;
    maxContribution: string;
    startTime: string;
    endTime: string;
    totalRaised: string;
    participants: number;
    tags?: string[];
  };
  index: number;
}

const IDOCard = ({ project, index }: IDOCardProps) => {
  const progress = (Number(project.totalRaised) / Number(project.hardCap)) * 100;
  const timeLeft = new Date(project.endTime).getTime() - Date.now();
  const isLive = timeLeft > 0 && Date.now() >= new Date(project.startTime).getTime();

  const { write: participate } = useContractWrite({
    // In a real implementation, this would be the actual IDO contract
    address: '0x...',
    abi: [],
    functionName: 'participate',
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-zinc-900/50 rounded-xl border border-purple-900/20 overflow-hidden hover:border-purple-600/50 transition-colors"
    >
      <div className="relative">
        <img
          src={project.image || 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=400&h=300'}
          alt={project.name}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-4 right-4">
          <span className={`px-3 py-1 rounded-full text-sm ${
            isLive ? 'bg-green-600' : 'bg-purple-600'
          }`}>
            {isLive ? 'Live' : project.status}
          </span>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2">{project.name}</h3>
        <p className="text-gray-400 mb-4">{project.description}</p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags?.map((tag, tagIndex) => (
            <span
              key={tagIndex}
              className="px-2 py-1 rounded-md bg-purple-900/30 text-purple-400 text-sm"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="space-y-4 mb-6">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-400">Progress</span>
            <span className="font-bold">{progress.toFixed(2)}%</span>
          </div>
          <div className="h-2 bg-zinc-800 rounded-full">
            <div
              className="h-2 bg-purple-500 rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex items-center justify-between text-sm text-gray-400">
            <span>{formatEther(BigInt(project.totalRaised))} ETH raised</span>
            <span>{formatEther(BigInt(project.hardCap))} ETH goal</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="p-3 bg-black/30 rounded-lg">
            <div className="text-sm text-gray-400">Token Price</div>
            <div className="font-bold">{project.tokenPrice} ETH</div>
          </div>
          <div className="p-3 bg-black/30 rounded-lg">
            <div className="text-sm text-gray-400">Min/Max</div>
            <div className="font-bold">
              {formatEther(BigInt(project.minContribution))}/{formatEther(BigInt(project.maxContribution))} ETH
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between text-sm text-gray-400 mb-6">
          <div className="flex items-center">
            <Timer className="w-4 h-4 mr-1" />
            {timeLeft > 0 ? `${Math.ceil(timeLeft / (1000 * 60 * 60 * 24))} days left` : 'Ended'}
          </div>
          <div className="flex items-center">
            <Users className="w-4 h-4 mr-1" />
            {project.participants} participants
          </div>
          <div className="flex items-center">
            <Coins className="w-4 h-4 mr-1" />
            Min. {formatEther(BigInt(project.minContribution))} ETH
          </div>
        </div>

        <Button
          variant="primary"
          className="w-full"
          disabled={!isLive}
          onClick={() => participate()}
        >
          {isLive ? 'Participate in IDO' : 'Coming Soon'}
          <ArrowUpRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </motion.div>
  );
};

export default IDOCard;