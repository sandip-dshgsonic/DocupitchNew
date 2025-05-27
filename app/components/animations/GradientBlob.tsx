'use client';

import { motion } from 'framer-motion';

export default function GradientBlob() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div
        className="absolute -top-1/2 -left-1/2 w-full h-full"
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        <div className="w-full h-full bg-gradient-conic from-orange-500/20 via-blue-500/20 to-purple-500/20 blur-3xl" />
      </motion.div>
    </div>
  );
}