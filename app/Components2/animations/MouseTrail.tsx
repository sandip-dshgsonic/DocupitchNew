'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function MouseTrail() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <motion.div
      className="fixed w-6 h-6 pointer-events-none z-50"
      animate={{ x: mousePosition.x - 12, y: mousePosition.y - 12 }}
      transition={{ type: "spring", damping: 30, stiffness: 200 }}
    >
      <div className="w-full h-full bg-orange-500 rounded-full opacity-20 blur-sm" />
    </motion.div>
  );
}