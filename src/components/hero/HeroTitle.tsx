import React from 'react';
import { motion } from 'framer-motion';

const HeroTitle = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="relative"
    >
      <motion.h1
        className="text-6xl md:text-7xl font-bold mb-6 relative z-10"
        style={{
          background: "linear-gradient(to right, #e879f9, #9333ea, #4f46e5)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundSize: "200% 200%"
        }}
        animate={{
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        Launch Your Web3 Future
      </motion.h1>

      {/* Glowing effect */}
      <motion.div
        className="absolute inset-0 blur-3xl"
        style={{
          background: "linear-gradient(to right, rgba(232, 121, 249, 0.3), rgba(147, 51, 234, 0.3), rgba(79, 70, 229, 0.3))",
          filter: "blur(40px)",
          opacity: 0.5,
          zIndex: 0
        }}
        animate={{
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </motion.div>
  );
};

export default HeroTitle;