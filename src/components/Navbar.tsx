import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useWeb3Modal } from '@web3modal/wagmi/react';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  Rocket, 
  FileCode2, 
  Shield, 
  FolderKanban, 
  Globe 
} from 'lucide-react';
import Button from './ui/Button';
import { useWalletAuth } from '../lib/hooks/useWalletAuth';
import ProjectSelector from './ProjectSelector';

const Navbar = () => {
  const { open } = useWeb3Modal();
  const location = useLocation();
  const { isConnected, isApproved } = useWalletAuth();

  const protectedNavItems = [
    { path: '/dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
    { path: '/token-builder', label: 'Token Builder', icon: <FileCode2 className="w-4 h-4" /> },
    { path: '/smart-contract-auditor', label: 'Auditor', icon: <Shield className="w-4 h-4" /> },
    { path: '/project-manager', label: 'Project', icon: <FolderKanban className="w-4 h-4" /> },
    { path: '/launch', label: 'Launch', icon: <Rocket className="w-4 h-4" /> },
  ];

  const publicNavItems = [
    { path: '/community', label: 'Community', icon: <Globe className="w-4 h-4" /> },
  ];

  const navItems = isConnected && isApproved ? [...protectedNavItems, ...publicNavItems] : publicNavItems;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-lg border-b border-purple-900/20">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center space-x-4">
            <Link to="/" className="flex items-center space-x-2">
              <Rocket className="w-8 h-8 text-purple-500" />
              <span className="text-xl font-bold">AI Launchpad</span>
            </Link>
            {isConnected && isApproved && <ProjectSelector />}
          </div>

          <div className="flex items-center space-x-8">
            <div className="hidden md:flex items-center space-x-4">
              {navItems.map((item) => (
                <motion.div
                  key={item.path}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  <Link
                    to={item.path}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                      location.pathname === item.path
                        ? 'text-purple-500 bg-purple-900/20'
                        : 'text-gray-400 hover:text-purple-400 hover:bg-purple-900/10'
                    }`}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </Link>
                </motion.div>
              ))}
            </div>
            <Button 
              variant="primary"
              onClick={() => open()}
            >
              {isConnected ? 'Connected' : 'Connect Wallet'}
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;