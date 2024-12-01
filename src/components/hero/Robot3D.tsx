import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const Robot3D = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  const rotateX = useTransform(y, [-300, 300], [15, -15]);
  const rotateY = useTransform(x, [-300, 300], [-15, 15]);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const { clientX, clientY } = event;
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      
      mouseX.set(clientX - centerX);
      mouseY.set(clientY - centerY);
      setMousePosition({ x: clientX, y: clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      className="relative w-64 h-64 mx-auto"
      style={{
        rotateX,
        rotateY,
        perspective: 1000,
        transformStyle: 'preserve-3d'
      }}
    >
      {/* Robot Head Base */}
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", duration: 1.5 }}
      >
        <div className="relative w-full h-full">
          {/* Main Head Structure */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-b from-zinc-800 to-zinc-900 rounded-2xl"
            style={{ 
              transformStyle: 'preserve-3d',
              boxShadow: '0 0 30px rgba(147, 51, 234, 0.3)',
              border: '2px solid rgba(147, 51, 234, 0.5)'
            }}
          >
            {/* Robot Eyes */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-32 flex justify-between">
              <motion.div
                className="w-12 h-12 rounded-full bg-purple-600"
                style={{
                  boxShadow: '0 0 20px rgba(147, 51, 234, 0.8)',
                  background: 'radial-gradient(circle at center, #9333ea 0%, #4c1d95 100%)'
                }}
                animate={{
                  boxShadow: [
                    '0 0 20px rgba(147, 51, 234, 0.8)',
                    '0 0 40px rgba(147, 51, 234, 0.8)',
                    '0 0 20px rgba(147, 51, 234, 0.8)'
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <motion.div
                className="w-12 h-12 rounded-full bg-purple-600"
                style={{
                  boxShadow: '0 0 20px rgba(147, 51, 234, 0.8)',
                  background: 'radial-gradient(circle at center, #9333ea 0%, #4c1d95 100%)'
                }}
                animate={{
                  boxShadow: [
                    '0 0 20px rgba(147, 51, 234, 0.8)',
                    '0 0 40px rgba(147, 51, 234, 0.8)',
                    '0 0 20px rgba(147, 51, 234, 0.8)'
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              />
            </div>

            {/* Face Plate Details */}
            <div className="absolute inset-0 overflow-hidden">
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute h-px w-full"
                  style={{
                    top: `${(i + 1) * 12}%`,
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

            {/* Mechanical Details */}
            <div className="absolute inset-x-0 bottom-8 flex justify-center gap-4">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-4 h-4 rounded-full bg-purple-700"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 1, 0.5]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.3
                  }}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Holographic Field */}
      <motion.div
        className="absolute -inset-12"
        style={{
          background: 'radial-gradient(circle, rgba(147,51,234,0.1) 0%, rgba(147,51,234,0) 70%)',
          filter: 'blur(20px)',
          zIndex: -1
        }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </motion.div>
  );
};

export default Robot3D;