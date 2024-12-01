import React from 'react';
import { motion } from 'framer-motion';
import { Box, Database, Code2, Cpu, Shield, Zap } from 'lucide-react';

const icons = [Box, Database, Code2, Cpu, Shield, Zap];

const FloatingElements = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {icons.map((Icon, index) => (
        <motion.div
          key={index}
          className="absolute"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            scale: 0,
            rotate: 0
          }}
          animate={{
            y: [0, -50, 0],
            scale: [1, 1.2, 1],
            rotate: [0, 360],
            z: [0, 50, 0]
          }}
          transition={{
            duration: 8 + Math.random() * 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: index * 0.5
          }}
          style={{
            perspective: "1000px",
            transformStyle: "preserve-3d"
          }}
        >
          <div className="relative">
            <Icon className="w-12 h-12 text-purple-500/30" />
            <motion.div
              className="absolute inset-0"
              animate={{
                opacity: [0.3, 0.6, 0.3],
                scale: [1, 1.2, 1]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              style={{
                background: "radial-gradient(circle, rgba(147, 51, 234, 0.2) 0%, transparent 70%)",
                filter: "blur(8px)"
              }}
            />
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingElements;