'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function InteractiveBackground() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-50 to-orange-100 dark:from-gray-900 dark:to-gray-800" />

      {/* Interactive Gradient Follow */}
      <motion.div
        className="pointer-events-none absolute -inset-px bg-gradient-to-r from-orange-400/20 to-orange-600/20 blur-3xl"
        animate={{
          x: mousePosition.x * 0.1,
          y: mousePosition.y * 0.1,
        }}
        transition={{
          type: "spring",
          damping: 50,
          stiffness: 200
        }}
      />

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-grid-white/[0.02] [mask-image:linear-gradient(to_bottom,transparent,white,transparent)]" />
    </div>
  );
}