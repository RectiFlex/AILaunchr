import React from 'react';
import { 
  Bot, 
  Code2, 
  Shield, 
  Zap,
  FileCode2,
  FileText,
  FolderKanban,
  Rocket,
  Users,
  Lock,
  BarChart3,
  Globe,
  Coins,
  Brain,
  Network,
  Layers
} from 'lucide-react';
import FeatureCard from './FeatureCard';

const features = [
  {
    icon: Bot,
    title: 'AI Token Generator',
    description: 'Create custom tokens with advanced features using AI-powered smart contract generation'
  },
  {
    icon: Brain,
    title: 'AI Contract Analysis',
    description: 'Deep learning algorithms analyze and optimize your smart contracts for security and efficiency'
  },
  {
    icon: Shield,
    title: 'Advanced Security',
    description: 'Automated vulnerability detection and real-time security monitoring with AI-powered threat detection'
  },
  {
    icon: Network,
    title: 'Multi-Chain Support',
    description: 'Deploy across multiple blockchains with automated compatibility checks and cross-chain integration'
  },
  {
    icon: FileCode2,
    title: 'Custom Token Features',
    description: 'Implement advanced tokenomics with anti-whale mechanisms, vesting schedules, and staking capabilities'
  },
  {
    icon: Lock,
    title: 'Automated Compliance',
    description: 'Built-in regulatory compliance checks and automated KYC/AML integration'
  },
  {
    icon: Layers,
    title: 'Smart Contract Templates',
    description: 'Pre-audited, customizable templates for various token standards and DeFi protocols'
  },
  {
    icon: FileText,
    title: 'AI Documentation',
    description: 'Auto-generate comprehensive documentation, white papers, and technical specifications'
  },
  {
    icon: FolderKanban,
    title: 'Project Management',
    description: 'Integrated tools for team collaboration, task tracking, and milestone management'
  },
  {
    icon: Users,
    title: 'Community Tools',
    description: 'Built-in social features, governance mechanisms, and community engagement analytics'
  },
  {
    icon: BarChart3,
    title: 'Analytics Dashboard',
    description: 'Real-time metrics, market analysis, and predictive analytics for your token'
  },
  {
    icon: Coins,
    title: 'Token Economics',
    description: 'Advanced tokenomics modeling with AI-powered market simulation and analysis'
  },
  {
    icon: Rocket,
    title: 'Launch Automation',
    description: 'Streamlined deployment process with automated liquidity management and listing'
  },
  {
    icon: Globe,
    title: 'IDO Platform',
    description: 'Integrated platform for token sales with KYC, vesting, and distribution automation'
  },
  {
    icon: Zap,
    title: 'Gas Optimization',
    description: 'AI-powered contract optimization for minimal gas consumption and maximum efficiency'
  },
  {
    icon: Code2,
    title: 'Developer Tools',
    description: 'Comprehensive SDK, API access, and integration tools for developers'
  }
];

const FeatureGrid = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {features.map((feature, index) => (
        <FeatureCard
          key={index}
          icon={feature.icon}
          title={feature.title}
          description={feature.description}
          index={index}
        />
      ))}
    </div>
  );
};

export default FeatureGrid;