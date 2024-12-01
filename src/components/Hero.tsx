import React from 'react';
import { motion } from 'framer-motion';
import HeroBackground from './hero/HeroBackground';
import HeroTitle from './hero/HeroTitle';
import HeroSubtitle from './hero/HeroSubtitle';
import HeroActions from './hero/HeroActions';
import Robot3D from './hero/Robot3D';
import FloatingElements from './hero/FloatingElements';

const Hero = () => {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-black to-purple-900 overflow-hidden">
      <FloatingElements />
      <HeroBackground />
      
      <div className="relative container mx-auto px-6 pt-32 pb-24">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-center"
        >
          <div className="mb-12">
            <Robot3D />
          </div>

          <motion.div
            className="relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <HeroTitle />
            <HeroSubtitle />
            <HeroActions />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;