import React from 'react';
import { motion } from 'framer-motion';
import { Rocket } from 'lucide-react';
import IDOCard from './IDOCard';
import { parseEther } from 'viem';

const mockIDOs = [
  {
    id: '1',
    name: 'DeFi Revolution Protocol',
    description: 'Next-generation DeFi protocol with AI-powered yield optimization',
    status: 'Upcoming',
    tokenPrice: '0.001',
    softCap: parseEther('50').toString(),
    hardCap: parseEther('200').toString(),
    minContribution: parseEther('0.1').toString(),
    maxContribution: parseEther('5').toString(),
    startTime: new Date(Date.now() + 86400000).toISOString(), // Tomorrow
    endTime: new Date(Date.now() + 604800000).toISOString(), // 7 days from now
    totalRaised: parseEther('25').toString(),
    participants: 150,
    tags: ['DeFi', 'AI', 'Yield'],
  },
  {
    id: '2',
    name: 'GameFi Metaverse',
    description: 'Revolutionary gaming platform with play-to-earn mechanics',
    status: 'Live',
    tokenPrice: '0.002',
    softCap: parseEther('100').toString(),
    hardCap: parseEther('500').toString(),
    minContribution: parseEther('0.2').toString(),
    maxContribution: parseEther('10').toString(),
    startTime: new Date(Date.now() - 86400000).toISOString(), // Yesterday
    endTime: new Date(Date.now() + 432000000).toISOString(), // 5 days from now
    totalRaised: parseEther('150').toString(),
    participants: 300,
    tags: ['GameFi', 'Metaverse', 'NFT'],
  }
];

const IDOSection = () => {
  return (
    <section className="mb-16">
      <h2 className="text-2xl font-bold mb-8 flex items-center">
        <Rocket className="w-5 h-5 mr-2 text-purple-500" />
        Active IDOs
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {mockIDOs.map((ido, index) => (
          <IDOCard key={ido.id} project={ido} index={index} />
        ))}
      </div>
    </section>
  );
};

export default IDOSection;