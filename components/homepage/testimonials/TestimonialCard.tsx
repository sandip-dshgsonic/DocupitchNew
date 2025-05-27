'use client';

import { motion } from 'framer-motion';

interface TestimonialCardProps {
  testimonial: {
    name: string;
    role: string;
    quote: string;
    image: string;
  };
  index: number;
  inView: boolean;
}

export default function TestimonialCard({ testimonial, index, inView }: TestimonialCardProps) {
  return (
    <motion.div
      className="bg-white p-6 rounded-xl shadow-sm"
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.2 }}
    >
      <div className="flex items-center mb-4">
        <div className="w-12 h-12 rounded-full bg-gray-200 mr-4" />
        <div>
          <h3 className="font-semibold">{testimonial.name}</h3>
          <p className="text-gray-600 text-sm">{testimonial.role}</p>
        </div>
      </div>
      <p className="text-gray-600 italic">&ldquo;{testimonial.quote}&rdquo;</p>
    </motion.div>
  );
}