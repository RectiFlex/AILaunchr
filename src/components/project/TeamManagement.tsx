import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Plus, X } from 'lucide-react';
import Button from '../ui/Button';
import { useCurrentProject } from '../../lib/hooks/useCurrentProject';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  wallet?: string;
}

const TeamManagement = () => {
  const { currentProject, updateProjectDetails } = useCurrentProject();
  const [isAddingMember, setIsAddingMember] = useState(false);
  const [newMember, setNewMember] = useState({ name: '', role: '', wallet: '' });

  const handleAddMember = () => {
    if (!currentProject || !newMember.name || !newMember.role) return;

    const member: TeamMember = {
      id: Date.now().toString(),
      name: newMember.name,
      role: newMember.role,
      wallet: newMember.wallet
    };

    const updatedMembers = [...(currentProject.teamMembers || []), member];
    updateProjectDetails({ teamMembers: updatedMembers });
    setNewMember({ name: '', role: '', wallet: '' });
    setIsAddingMember(false);
  };

  const handleRemoveMember = (id: string) => {
    if (!currentProject) return;
    const updatedMembers = currentProject.teamMembers?.filter(m => m.id !== id) || [];
    updateProjectDetails({ teamMembers: updatedMembers });
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="bg-zinc-900/50 rounded-2xl p-6 border border-purple-900/20"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold flex items-center">
          <Users className="w-5 h-5 mr-2 text-purple-500" />
          Team Management
        </h2>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsAddingMember(true)}
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Member
        </Button>
      </div>

      <div className="space-y-4">
        {isAddingMember && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 bg-black/30 rounded-lg border border-purple-900/20"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <input
                type="text"
                placeholder="Name"
                value={newMember.name}
                onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
                className="bg-black/30 rounded-lg p-2 text-gray-300 border border-purple-900/20"
              />
              <input
                type="text"
                placeholder="Role"
                value={newMember.role}
                onChange={(e) => setNewMember({ ...newMember, role: e.target.value })}
                className="bg-black/30 rounded-lg p-2 text-gray-300 border border-purple-900/20"
              />
              <input
                type="text"
                placeholder="Wallet Address (Optional)"
                value={newMember.wallet}
                onChange={(e) => setNewMember({ ...newMember, wallet: e.target.value })}
                className="bg-black/30 rounded-lg p-2 text-gray-300 border border-purple-900/20"
              />
            </div>
            <div className="flex justify-end space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsAddingMember(false)}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={handleAddMember}
                disabled={!newMember.name || !newMember.role}
              >
                Add Member
              </Button>
            </div>
          </motion.div>
        )}

        {currentProject?.teamMembers?.map((member) => (
          <div
            key={member.id}
            className="flex items-center justify-between p-4 bg-black/30 rounded-lg hover:bg-purple-900/20 transition-colors"
          >
            <div>
              <h3 className="font-semibold">{member.name}</h3>
              <p className="text-sm text-gray-400">{member.role}</p>
              {member.wallet && (
                <p className="text-xs text-gray-500 mt-1">{member.wallet}</p>
              )}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleRemoveMember(member.id)}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        ))}

        {(!currentProject?.teamMembers || currentProject.teamMembers.length === 0) && !isAddingMember && (
          <div className="text-center py-8 text-gray-400">
            No team members added yet. Click "Add Member" to get started.
          </div>
        )}
      </div>
    </motion.section>
  );
};

export default TeamManagement;