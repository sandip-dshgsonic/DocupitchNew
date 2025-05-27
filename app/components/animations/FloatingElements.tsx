'use client';

import { motion } from 'framer-motion';

export default function FloatingElements() {
  return (
    <>
      {/* Background Gradient Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-20 -left-20 w-72 h-72 bg-orange-500/30 rounded-full blur-3xl"
          animate={{
            y: [0, 50, 0],
            x: [0, 30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <motion.div
          className="absolute -bottom-20 -right-20 w-72 h-72 bg-blue-500/30 rounded-full blur-3xl"
          animate={{
            y: [0, -50, 0],
            x: [0, -30, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Floating Icons */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-10 w-12 h-12 bg-white rounded-xl shadow-lg flex items-center justify-center"
          animate={{
            y: [0, -20, 0],
            rotate: [0, 10, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          📄
        </motion.div>

        <motion.div
          className="absolute bottom-1/4 right-10 w-12 h-12 bg-white rounded-xl shadow-lg flex items-center justify-center"
          animate={{
            y: [0, 20, 0],
            rotate: [0, -10, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          🚀
        </motion.div>
      </div>
    </>
  );
}