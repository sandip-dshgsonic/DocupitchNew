'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import ContactForm from './contact/ContactForm';
import ContactInfo from './contact/ContactInfo';

export default function Contact() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="contact" className="section-padding bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="heading-lg mb-4 pt-8">We&apos;d Love to Hear From You!</h2>
        </div>

        <motion.div
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-2 gap-12"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <ContactInfo />

          {/* <ContactForm /> */}
        </motion.div>
      </div>
    </section>
  );
}