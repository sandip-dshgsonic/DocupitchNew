'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import HowItWorksStep from './howitworks/HowItWorksStep';
import { steps } from '../data/steps';

export default function HowItWorks() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="section-padding bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 pt-8">
              How DocuPitch Works
            </h2>
            <p className="text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
              Transform your document workflow in three simple steps
            </p>
          </motion.div>
        </div>

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 pb-4 gap-12">
          {steps.map((step, index) => (
            <HowItWorksStep
              key={step.number}
              step={step}
              index={index}
              inView={inView}
            />
          ))}
        </div>
      </div>
    </section>
  );
}