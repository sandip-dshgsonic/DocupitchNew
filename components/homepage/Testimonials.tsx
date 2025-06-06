'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import TestimonialCard from './testimonials/TestimonialCard';
import { testimonials } from '../data/testimonials';

export default function Testimonials() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="section-padding bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="heading-lg mb-4 pt-8">What Our Users Are Sayinge</h2>
        </div>

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 pb-4 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={testimonial.name}
              testimonial={testimonial}
              index={index}
              inView={inView}
            />
          ))}
        </div>
      </div>
    </section>
  );
}