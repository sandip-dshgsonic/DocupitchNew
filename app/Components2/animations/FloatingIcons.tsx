'use client';

import { motion } from 'framer-motion';
import { DocumentIcon, CloudArrowUpIcon, UserGroupIcon } from '@heroicons/react/24/outline';

export default function FloatingIcons() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Document Icon */}
      <motion.div
        className="absolute top-1/4 left-[10%]"
        animate={{
          y: [0, -20, 0],
          rotate: [0, -5, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <DocumentIcon className="w-12 h-12 text-orange-500/30" />
      </motion.div>

      {/* Cloud Icon */}
      <motion.div
        className="absolute top-1/3 right-[15%]"
        animate={{
          y: [0, 20, 0],
          rotate: [0, 5, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      >
        <CloudArrowUpIcon className="w-16 h-16 text-blue-500/30" />
      </motion.div>

      {/* Users Icon */}
      <motion.div
        className="absolute bottom-1/4 left-[20%]"
        animate={{
          y: [0, 15, 0],
          rotate: [0, -3, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
      >
        <UserGroupIcon className="w-14 h-14 text-green-500/30" />
      </motion.div>
    </div>
  );
}