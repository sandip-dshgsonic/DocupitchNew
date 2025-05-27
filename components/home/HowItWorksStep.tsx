'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

interface HowItWorksStepProps {
  step: {
    number: string;
    title: string;
    description: string;
    image: string;
  };
  index: number;
  inView: boolean;
}

export default function HowItWorksStep({ step, index, inView }: HowItWorksStepProps) {
  return (
    <motion.div
      className="relative bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.2 }}
    >
      <div className="mb-6">
        <Image
          src={step.image}
          alt={step.title}
          width={400}
          height={300}
          className="w-full h-48 object-cover rounded-lg"
        />
      </div>
      <div className="absolute -top-4 left-6 bg-orange-500 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold shadow-lg">
        {step.number}
      </div>
      <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">{step.title}</h3>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{step.description}</p>
    </motion.div>
  );
}