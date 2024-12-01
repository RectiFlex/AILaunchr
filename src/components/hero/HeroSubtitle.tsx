import React from 'react';
import { motion } from 'framer-motion';

const HeroSubtitle = () => {
  const words = [
    'Join our exclusive community of innovative blockchain startups.',
    'Apply now to access our AI-powered launchpad platform.'
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto"
    >
      {words.map((word, index) => (
        <motion.p
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 + index * 0.2 }}
          className="mb-2"
        >
          {word}
        </motion.p>
      ))}
    </motion.div>
  );
};

export default HeroSubtitle;