import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';
import Button from './ui/Button';
import { useAuthStore } from '../lib/store/useAuthStore';

const ApplyForm = () => {
  const [formData, setFormData] = useState({
    projectName: '',
    projectType: '',
    description: '',
    teamSize: '',
    email: '',
  });

  const setApproved = useAuthStore((state) => state.setApproved);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, this would send the application to a backend
    // For demo purposes, we'll just set approved to true
    setApproved(true);
    alert('Application submitted successfully! You now have access to the platform.');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto p-6 bg-zinc-900/50 rounded-2xl border border-purple-900/20"
    >
      <h2 className="text-2xl font-bold mb-6">Apply for Platform Access</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm text-gray-400">Project Name</label>
          <input
            type="text"
            required
            className="w-full bg-black/30 rounded-lg p-3 text-gray-300 border border-purple-900/20"
            value={formData.projectName}
            onChange={(e) => setFormData({ ...formData, projectName: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm text-gray-400">Project Type</label>
          <select
            required
            className="w-full bg-black/30 rounded-lg p-3 text-gray-300 border border-purple-900/20"
            value={formData.projectType}
            onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
          >
            <option value="">Select project type</option>
            <option value="defi">DeFi Protocol</option>
            <option value="nft">NFT Platform</option>
            <option value="gamefi">GameFi</option>
            <option value="dao">DAO</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-sm text-gray-400">Project Description</label>
          <textarea
            required
            className="w-full h-32 bg-black/30 rounded-lg p-3 text-gray-300 border border-purple-900/20"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm text-gray-400">Team Size</label>
            <input
              type="number"
              required
              className="w-full bg-black/30 rounded-lg p-3 text-gray-300 border border-purple-900/20"
              value={formData.teamSize}
              onChange={(e) => setFormData({ ...formData, teamSize: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm text-gray-400">Contact Email</label>
            <input
              type="email"
              required
              className="w-full bg-black/30 rounded-lg p-3 text-gray-300 border border-purple-900/20"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>
        </div>

        <Button type="submit" variant="primary" className="w-full">
          Submit Application
          <Send className="w-4 h-4 ml-2" />
        </Button>
      </form>
    </motion.div>
  );
};

export default ApplyForm;