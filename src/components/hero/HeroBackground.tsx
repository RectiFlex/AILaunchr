import React from 'react';
import { motion } from 'framer-motion';

const HeroBackground = () => {
  return (
    <>
      <motion.div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(circle at center, rgba(147, 51, 234, 0.2) 0%, transparent 70%)',
          filter: 'blur(100px)',
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <div className="absolute inset-0 overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-px w-full"
            style={{
              top: `${(i + 1) * 20}%`,
              background: 'linear-gradient(90deg, transparent 0%, rgba(147, 51, 234, 0.3) 50%, transparent 100%)',
              opacity: 0.5
            }}
            animate={{
              opacity: [0.3, 0.7, 0.3],
              scaleX: [0.8, 1, 0.8]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.2
            }}
          />
        ))}
      </div>

      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(147, 51, 234, 0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(147, 51, 234, 0.1) 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
          perspective: '1000px',
          transform: 'rotateX(60deg) scale(2)',
          opacity: 0.3,
          animation: 'grid-move 20s linear infinite'
        }}
      />

      <style>
        {`
          @keyframes grid-move {
            0% {
              transform: rotateX(60deg) translateY(0) scale(2);
            }
            100% {
              transform: rotateX(60deg) translateY(-40px) scale(2);
            }
          }
        `}
      </style>
    </>
  );
};

export default HeroBackground;