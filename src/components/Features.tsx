import React from 'react';
import { motion } from 'framer-motion';
import FeatureGrid from './features/FeatureGrid';

const Features = () => {
  return (
    <section className="py-24 bg-black">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-white mb-4">
            Comprehensive Launch Platform
          </h2>
          <p className="text-gray-400 text-xl max-w-2xl mx-auto">
            Everything you need to build, launch, and grow your blockchain project,
            powered by cutting-edge AI technology.
          </p>
        </motion.div>
        <FeatureGrid />
      </div>
    </section>
  );
};

export default Features;