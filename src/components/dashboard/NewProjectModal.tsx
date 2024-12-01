import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import Button from '../ui/Button';
import { useProjectStore } from '../../lib/store/useProjectStore';
import { useActivityStore } from '../../lib/store/useActivityStore';

interface NewProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const NewProjectModal = ({ isOpen, onClose }: NewProjectModalProps) => {
  const [formData, setFormData] = useState({
    name: '',
    type: 'defi',
    description: ''
  });

  const { addProject } = useProjectStore();
  const { addActivity } = useActivityStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const projectId = uuidv4();
    
    addProject({
      id: projectId,
      name: formData.name,
      type: formData.type,
      status: 'In Progress',
      progress: 0,
      completedSteps: [],
    });

    addActivity({
      id: uuidv4(),
      projectId,
      type: 'document',
      message: `Created new project: ${formData.name}`,
      timestamp: Date.now()
    });

    onClose();
    setFormData({ name: '', type: 'defi', description: '' });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-zinc-900 rounded-2xl p-6 w-full max-w-md border border-purple-900/20"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">New Project</h2>
              <button onClick={onClose} className="text-gray-400 hover:text-white">
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm text-gray-400">Project Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-black/30 rounded-lg p-3 text-gray-300 border border-purple-900/20"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm text-gray-400">Project Type</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="w-full bg-black/30 rounded-lg p-3 text-gray-300 border border-purple-900/20"
                >
                  <option value="defi">DeFi Protocol</option>
                  <option value="nft">NFT Platform</option>
                  <option value="gamefi">GameFi</option>
                  <option value="dao">DAO</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm text-gray-400">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full h-32 bg-black/30 rounded-lg p-3 text-gray-300 border border-purple-900/20"
                />
              </div>

              <div className="flex gap-4">
                <Button type="submit" variant="primary" className="flex-1">
                  Create Project
                </Button>
                <Button type="button" variant="outline" onClick={onClose}>
                  Cancel
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default NewProjectModal;