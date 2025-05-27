'use client';

import { motion, useScroll, useTransform } from 'framer-motion';

export default function ParallaxBackground() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, 300]);
  const y2 = useTransform(scrollY, [0, 1000], [0, -300]);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Animated Shapes */}
      <motion.div
        className="absolute top-1/4 -left-20 w-96 h-96 bg-gradient-to-r from-orange-400/20 to-pink-400/20 
                   rounded-full blur-3xl mix-blend-multiply"
        style={{ y: y1 }}
      />
      <motion.div
        className="absolute bottom-1/4 -right-20 w-96 h-96 bg-gradient-to-r from-blue-400/20 to-purple-400/20 
                   rounded-full blur-3xl mix-blend-multiply"
        style={{ y: y2 }}
      />
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[length:50px_50px]" />
    </div>
  );
}