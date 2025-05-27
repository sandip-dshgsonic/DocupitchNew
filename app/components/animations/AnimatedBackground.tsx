'use client';

import { motion } from 'framer-motion';

export default function AnimatedBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Gradient Orbs */}
        <motion.div
          className="absolute top-0 left-0 w-[500px] h-[500px] bg-orange-400/30 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-400/30 rounded-full blur-3xl"
          animate={{
            x: [0, -100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.03] to-transparent 
                      [mask-image:linear-gradient(to_bottom,transparent,white,transparent)]">
          <div className="absolute inset-0 backdrop-blur-[1px] bg-grid-white/[0.02]" />
        </div>
      </motion.div>
    </div>
  );
}