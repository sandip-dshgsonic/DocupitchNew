'use client';

import { motion } from 'framer-motion';

interface WaveTextProps {
  text: string;
  className?: string;
}

export default function WaveText({ text, className = '' }: WaveTextProps) {
  return (
    <div className={className}>
      {text.split('').map((char, index) => (
        <motion.span
          key={index}
          className="inline-block"
          animate={{
            y: [0, -10, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            delay: index * 0.1,
            ease: "easeInOut"
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </div>
  );
}