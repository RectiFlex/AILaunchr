import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Globe, Rocket, Users, Star, ArrowUpRight, Calendar, Coins } from 'lucide-react';
import Button from '../components/ui/Button';
import AdvertiseModal from '../components/community/AdvertiseModal';
import IDOSection from '../components/community/IDOSection';
import { useProjectStore } from '../lib/store/useProjectStore';

const Community = () => {
  const [isAdvertiseModalOpen, setIsAdvertiseModalOpen] = useState(false);
  const projects = useProjectStore((state) => state.projects);
  const featuredProjects = projects.filter(p => p.isFeatured);
  const regularProjects = projects.filter(p => !p.isFeatured);

  return (
    <div className="pt-24 min-h-screen bg-gradient-to-b from-black to-purple-900/20">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-6xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-16">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-bold mb-6"
            >
              Discover Innovative Projects
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-gray-400 mb-8"
            >
              Explore and participate in the latest blockchain projects powered by AI
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-wrap justify-center gap-4"
            >
              <Button variant="primary" onClick={() => setIsAdvertiseModalOpen(true)}>
                <Rocket className="w-4 h-4 mr-2" />
                Advertise Your Launch
              </Button>
            </motion.div>
          </div>

          {/* IDO Section */}
          <IDOSection />

          {/* Featured Projects */}
          {featuredProjects.length > 0 && (
            <section className="mb-16">
              <h2 className="text-2xl font-bold mb-8 flex items-center">
                <Star className="w-5 h-5 mr-2 text-yellow-500" />
                Featured Launches
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* ... Featured Projects Content ... */}
              </div>
            </section>
          )}

          {/* Regular Projects */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* ... Regular Projects Content ... */}
          </div>
        </motion.div>
      </div>

      <AdvertiseModal
        isOpen={isAdvertiseModalOpen}
        onClose={() => setIsAdvertiseModalOpen(false)}
      />
    </div>
  );
};

export default Community;