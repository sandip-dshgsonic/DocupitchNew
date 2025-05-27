'use client';

import { motion } from 'framer-motion';

interface CardHoverProps {
  children: React.ReactNode;
  className?: string;
}

export default function CardHover({ children, className = '' }: CardHoverProps) {
  return (
    <motion.div
      className={`relative group ${className}`}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500 to-orange-600 
                    rounded-lg blur opacity-0 group-hover:opacity-75 transition duration-500" />
      <div className="relative bg-white dark:bg-gray-800 rounded-lg">
        {children}
      </div>
    </motion.div>
  );
}