import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAccount } from 'wagmi';
import { Navigate } from 'react-router-dom';
import { Rocket, Shield, Code, Zap } from 'lucide-react';
import Button from '../components/ui/Button';
import ProjectList from '../components/dashboard/ProjectList';
import ActivityFeed from '../components/dashboard/ActivityFeed';
import QuickAction from '../components/dashboard/QuickAction';
import ResourceLinks from '../components/dashboard/ResourceLinks';
import NewProjectModal from '../components/dashboard/NewProjectModal';

const Dashboard = () => {
  const { isConnected } = useAccount();
  const [isNewProjectModalOpen, setIsNewProjectModalOpen] = useState(false);

  if (!isConnected) {
    return <Navigate to="/" />;
  }

  const handleQuickAction = (action: string) => {
    switch (action) {
      case 'deploy':
        window.location.href = '/launch';
        break;
      case 'audit':
        window.location.href = '/smart-contract-auditor';
        break;
      case 'code':
        window.location.href = '/token-builder';
        break;
      case 'optimize':
        window.location.href = '/project-manager';
        break;
    }
  };

  return (
    <div className="pt-24 min-h-screen bg-gradient-to-b from-black to-purple-900/20">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Projects Section */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Your Projects</h2>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setIsNewProjectModalOpen(true)}
              >
                New Project
              </Button>
            </div>
            
            <ProjectList />
            <ActivityFeed />
          </div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-8"
          >
            {/* Quick Actions */}
            <section className="bg-zinc-900/50 rounded-2xl p-6 border border-purple-900/20">
              <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: <Rocket className="w-5 h-5" />, label: 'Deploy', action: 'deploy' },
                  { icon: <Shield className="w-5 h-5" />, label: 'Audit', action: 'audit' },
                  { icon: <Code className="w-5 h-5" />, label: 'Code', action: 'code' },
                  { icon: <Zap className="w-5 h-5" />, label: 'Optimize', action: 'optimize' },
                ].map((item, index) => (
                  <QuickAction
                    key={index}
                    icon={item.icon}
                    label={item.label}
                    onClick={() => handleQuickAction(item.action)}
                  />
                ))}
              </div>
            </section>

            <ResourceLinks />
          </motion.div>
        </div>
      </div>

      <NewProjectModal
        isOpen={isNewProjectModalOpen}
        onClose={() => setIsNewProjectModalOpen(false)}
      />
    </div>
  );
};

export default Dashboard;