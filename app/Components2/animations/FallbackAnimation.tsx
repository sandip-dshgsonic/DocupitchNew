'use client';

import { motion } from 'framer-motion';

interface FallbackAnimationProps {
  className?: string;
}

export default function FallbackAnimation({ className = '' }: FallbackAnimationProps) {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <motion.div
        className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full"
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "linear"
        }}
      />
    </div>
  );
}