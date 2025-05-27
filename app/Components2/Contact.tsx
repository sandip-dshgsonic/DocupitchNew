'use client';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import ContactForm from './contact/ContactForm';
import ContactInfo from './contact/ContactInfo';
import WaveText from './animations/WaveText';
import AnimatedGradientBorder from './animations/AnimatedGradientBorder';
import MouseSpotlight from './animations/MouseSpotlight';
import TextReveal from './animations/TextReveal';

export default function Contact() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="contact" className="relative section-padding bg-gray-50 dark:bg-gray-900">
      <MouseSpotlight />
      
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <TextReveal
              text="We'd Love to Hear From You!"
              className="text-4xl font-bold text-gray-900 dark:text-white mb-4"
            />
          </motion.div>
        </div>
        <AnimatedGradientBorder className="p-0.5 rounded-1xl">
          <motion.div
            ref={ref}
            className="bg-white dark:bg-gray-800 p-8 rounded-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <ContactInfo />
          </motion.div>
        </AnimatedGradientBorder>
      </div>
    </section>
  );
}