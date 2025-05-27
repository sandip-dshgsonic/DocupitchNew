'use client';

import { motion } from 'framer-motion';

interface GradientTextProps {
  text: string;
  className?: string;
}

export default function GradientText({ text, className = '' }: GradientTextProps) {
  return (
    <motion.span
      className={`bg-clip-text text-transparent bg-gradient-to-r from-orange-600 to-orange-400 
                 inline-block ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      {text}
    </motion.span>
  );
}