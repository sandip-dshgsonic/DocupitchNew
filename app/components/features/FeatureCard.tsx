'use client';

import { motion } from 'framer-motion';
import { ComponentType } from 'react';
import { HeroIcon } from '../../types/hero-icon';

interface FeatureCardProps {
  feature: {
    icon: ComponentType<HeroIcon>;
    title: string;
    description: string;
  };
  index: number;
  inView: boolean;
}

export default function FeatureCard({ feature, index, inView }: FeatureCardProps) {
  const Icon = feature.icon;
  
  return (
    <motion.div
      className="bg-white p-6 rounded-xl shadow-sm"
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.2 }}
    >
      <Icon className="h-12 w-12 text-blue-600 mb-4" />
      <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
      <p className="text-gray-600">{feature.description}</p>
    </motion.div>
  );
}