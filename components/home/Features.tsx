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
//     <section id="features" className="section-padding bg-gray-50">
//       <div className="max-w-7xl mx-auto">
//         <div className="text-center mb-16">
//           <h2 className="heading-lg mb-4">Why Choose DocuPitch?</h2>
//         </div>

//         <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-8">
//           {features.map((feature, index) => (
//             <motion.div
//               key={feature.title}
//               className="bg-white p-6 rounded-xl shadow-sm"
//               initial={{ opacity: 0, y: 20 }}
//               animate={inView ? { opacity: 1, y: 0 } : {}}
//               transition={{ duration: 0.5, delay: index * 0.2 }}
//             >
//               {feature.icon && <feature.icon className="h-12 w-12 text-blue-600 mb-4" />}
//               <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
//               <p className="text-gray-600">{feature.description}</p>
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
import { features } from '../data/features';
// import { UserGroupIcon, TemplateIcon, CloudIcon } from '@heroicons/react/24/outline';

export default function Features() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="features" className="section-padding bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-4">
            Why Choose DocuPitch?
          </h2>
        </div>

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm transition-all"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              {feature.icon && <feature.icon className="h-12 w-12 text-blue-600 dark:text-blue-400 mb-4" />}
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
