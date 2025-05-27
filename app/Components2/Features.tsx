// 'use client';

// import { motion } from 'framer-motion';
// import { useInView } from 'react-intersection-observer';
// import { features } from '../data/features';
// import { UserGroupIcon, TemplateIcon, CloudIcon } from '@heroicons/react/24/outline';

// export default function Features() {
//   const [ref, inView] = useInView({
//     triggerOnce: true,
//     threshold: 0.1,
//   });

//   return (
//     <section id="features" className="section-padding bg-gray-50 dark:bg-gray-900">
//       <div className="max-w-7xl mx-auto">
//         <div className="text-center mb-16">
//           <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-4">
//             Why Choose Docupitch?
//           </h2>
//         </div>

//         <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-8">
//           {features.map((feature, index) => (
//             <motion.div
//               key={feature.title}
//               className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 ease-in-out"
//               initial={{ opacity: 0, y: 20 }}
//               animate={inView ? { opacity: 1, y: 0 } : {}}
//               transition={{ duration: 0.5, delay: index * 0.2 }}
//             >
//               {feature.icon && (
//                 <feature.icon className="h-12 w-12 text-blue-600 dark:text-blue-400 mb-4" />
//               )}
//               <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
//                 {feature.title}
//               </h3>
//               <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }


'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useRef } from 'react';
import { features } from '../data/features';
import {
  DocumentDuplicateIcon,
  UserGroupIcon,
  // TemplateIcon,
  CloudIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';

// Enhanced Document Flow Animation
const DocumentFlowBackground = () => {
  const containerRef = useRef(null);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none"
      style={{ zIndex: 0 }}
    >
      {Array.from({ length: 15 }).map((_, index) => (
        <motion.div
          key={index}
          className="absolute"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, 100, 0],
            x: [0, Math.random() * 100 - 50, 0],
            rotate: [0, Math.random() * 30 - 15, 0],
          }}
          transition={{
            duration: 15 + Math.random() * 10,
            repeat: Infinity,
            delay: index * 0.3,
            ease: 'linear',
          }}
        >
          <motion.div
            className="relative w-40 h-48 bg-gradient-to-br from-white/95 to-white/80 dark:from-gray-800/95 dark:to-gray-900/80 rounded-lg shadow-2xl p-4 backdrop-blur-sm border border-white/20 dark:border-gray-700/20"
            style={{
              transform: 'perspective(1000px) rotateX(10deg)',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            }}
          >
            <DocumentDuplicateIcon className="w-8 h-8 text-blue-500 dark:text-blue-400 mb-3" />
            <div className="space-y-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="h-2 bg-gradient-to-r from-blue-500/30 to-purple-500/30 dark:from-blue-400/30 dark:to-purple-400/30 rounded-full"
                  style={{ width: `${Math.random() * 40 + 60}%` }}
                  initial={{ opacity: 0.5 }}
                  animate={{ opacity: [0.5, 0.8, 0.5] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                />
              ))}
            </div>
            <motion.div
              className="absolute -top-1 -right-1 w-6 h-6 text-yellow-400"
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
            >
              <SparklesIcon />
            </motion.div>
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
};

export default function Features() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section
      id="features"
      className="relative bg-gradient-to-br from-gray-50 via-gray-100 to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 overflow-hidden py-10"
    >
      {/* Enhanced background with multiple layers */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      <DocumentFlowBackground />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/50 to-white/80 dark:via-gray-900/50 dark:to-gray-900/80" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-3xl md:text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 mb-6">
            Why Choose DocuPitch Over DocuSign?n
          </h2>
          <p className="text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
            Transform and close fundraising with our Powerful features
          </p>
        </motion.div>

        <div
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className="relative group"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl blur-lg opacity-20 group-hover:opacity-30 transition-opacity" />
              <div className="relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm p-6 rounded-xl shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300">
                {feature.icon && (
                  <div className="mb-6 transform group-hover:scale-110 transition-transform">
                    <feature.icon className="h-12 w-12 text-blue-600 dark:text-blue-400" />
                  </div>
                )}
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  {feature.title}
                </h3>
                <p className="text-lg text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}


