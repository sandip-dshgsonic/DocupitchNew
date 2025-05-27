
'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
interface VideoSectionProps {
  videoUrl: string;
  title: string;
  description: string;
  alignment?: 'left' | 'center' | 'right';
}
export const VideoSection = ({
  videoUrl,
  title,
  description,
  alignment = 'center'
}: VideoSectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], ['5%', '-5%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.5, 1, 0.5]);
  const alignmentClasses = {
    left: 'items-start text-left',
    center: 'items-center text-center',
    right: 'items-end text-right'
  };
  return (
    <div ref={sectionRef} className="relative h-screen overflow-hidden">
      {/* Video Background */}
      <motion.div
        className="absolute inset-0"
        style={{ y }}
      >
        <video
          className="w-full h-full object-cover"
          loop
          muted
          playsInline
          autoPlay
          src={videoUrl}
        />
        <div className="absolute inset-0 bg-black/30" />
      </motion.div>
      {/* Content */}
      <motion.div
        className={`relative z-10 h-full flex flex-col justify-center px-8 ${alignmentClasses[alignment]}`}
        style={{ opacity }}
      >
        <div className="max-w-2xl">
          <motion.h2
            className="text-4xl md:text-6xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {title}
          </motion.h2>
          <motion.p
            className="text-lg md:text-xl text-white/90"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {description}
          </motion.p>
        </div>
      </motion.div>
    </div>
  );
};