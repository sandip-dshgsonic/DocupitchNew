// 'use client';
// import { motion } from 'framer-motion';
// import { useRouter } from 'next/navigation';
// import { useInView } from 'react-intersection-observer';
// import TextReveal from './animations/TextReveal';
// import ContactForm from './contact/ContactForm';
// import ContactInfo from './contact/ContactInfo';
// import WaveText from './animations/WaveText';
// import AnimatedGradientBorder from './animations/AnimatedGradientBorder';
// import MouseSpotlight from './animations/MouseSpotlight';
// export default function Contact() {
//   const router = useRouter();
//   const [ref, inView] = useInView({
//     triggerOnce: true,
//     threshold: 0.1,
//   });
//   const handleContactClick = () => {
//     router.push('/help#contact');
//   };
//   return (
//     <section id="contact" className="relative section-padding bg-white dark:bg-gray-900">
//       <MouseSpotlight />
//       <div className="max-w-7xl mx-auto">
//       {/* <div className="text-center mb-16">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={inView ? { opacity: 1, y: 0 } : {}}
//             transition={{ duration: 0.5 }}
//           >
//             <TextReveal
//               text="We'd Love to Hear From You!"
//               className="text-4xl font-bold text-gray-900 dark:text-white mb-4"
//             />
//           </motion.div>
//         </div>
//         <AnimatedGradientBorder className="p-0.5 rounded-1xl">
//           <motion.div
//             ref={ref}
//             className="grid grid-cols-1 md:grid-cols-2 gap-12 bg-white dark:bg-gray-800 p-8 rounded-xl"
//             initial={{ opacity: 0, y: 20 }}
//             animate={inView ? { opacity: 1, y: 0 } : {}}
//             transition={{ duration: 0.5 }}
//           > */}
// <ContactInfo />
//             {/* <ContactForm /> */}
//           {/* </motion.div>
//         </AnimatedGradientBorder> */}
//       </div>
//     </section>
//   );
// }

'use client';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useInView } from 'react-intersection-observer';
import TextReveal from './animations/TextReveal';
import ContactForm from './contact/ContactForm';
import ContactInfo from './contact/ContactInfo';
import WaveText from './animations/WaveText';
import AnimatedGradientBorder from './animations/AnimatedGradientBorder';
import MouseSpotlight from './animations/MouseSpotlight';

export default function Contact() {
  const router = useRouter();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const handleContactClick = () => {
    router.push('/help#contact');
  };

  return (
    <section id="contact" className="relative py-10 bg-white dark:bg-gray-900">
      <MouseSpotlight />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ContactInfo />
      </div>
    </section>
  );
}