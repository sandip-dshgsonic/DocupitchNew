// 'use client';

// import { motion } from 'framer-motion';
// import { CheckIcon } from '@heroicons/react/24/solid';

// interface PricingCardProps {
//   plan: {
//     name: string;
//     price: string;
//     period: string;
//     features: string[];
//     cta: string;
//     highlighted: boolean;
//   };
//   index: number;
//   inView: boolean;
// }

// export default function PricingCard({ plan, index, inView }: PricingCardProps) {
//   return (
//     <motion.div
//       className={`rounded-xl p-8 ${
//         plan.highlighted
//           ? 'bg-blue-600 text-white shadow-xl scale-105'
//           : 'bg-white border border-gray-200'
//       }`}
//       initial={{ opacity: 0, y: 20 }}
//       animate={inView ? { opacity: 1, y: 0 } : {}}
//       transition={{ duration: 0.5, delay: index * 0.2 }}
//     >
//       <h3 className="text-2xl font-bold mb-4">{plan.name}</h3>
//       <div className="mb-6">
//         <span className="text-4xl font-bold">{plan.price}</span>
//         <span className="text-sm opacity-80">{plan.period}</span>
//       </div>
//       <ul className="space-y-4 mb-8">
//         {plan.features.map((feature) => (
//           <li key={feature} className="flex items-center">
//             <CheckIcon className={`h-5 w-5 mr-2 ${
//               plan.highlighted ? 'text-white' : 'text-blue-600'
//             }`} />
//             {feature}
//           </li>
//         ))}
//       </ul>
//       <button
//         className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors duration-300 ${
//           plan.highlighted
//             ? 'bg-white text-blue-600 hover:bg-blue-50'
//             : 'bg-blue-600 text-white hover:bg-blue-700'
//         }`}
//       >
//         {plan.cta}
//       </button>
//     </motion.div>
//   );
// }

'use client';

import { motion } from 'framer-motion';
// import { CheckIcon } from '@heroicons/react/24/solid';
import { CheckIcon } from '@heroicons/react/24/solid';

interface PricingCardProps {
  plan: {
    name: string;
    price: string;
    period: string;
    features: string[];
    cta: string;
    highlighted: boolean;
  };
  index: number;
  inView: boolean;
}

export default function PricingCard({ plan, index, inView }: PricingCardProps) {
  return (
    <motion.div
      className={`rounded-xl p-8 flex flex-col h-full ${
        plan.highlighted
          ? 'bg-blue-600 text-white shadow-xl scale-105'
          : 'bg-white border border-gray-200'
      }`}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.2 }}
    >
      <h3 className="text-2xl font-bold mb-4">{plan.name}</h3>
      <div className="mb-6">
        <span className="text-4xl font-bold">{plan.price}</span>
        <span className="text-sm opacity-80">{plan.period}</span>
      </div>
      <ul className="space-y-4 mb-8 flex-grow">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-center">
            <CheckIcon className={`h-5 w-5 mr-2 flex-shrink-0 ${
              plan.highlighted ? 'text-white' : 'text-blue-600'
            }`} />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      <button
        className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors duration-300 ${
          plan.highlighted
            ? 'bg-white text-blue-600 hover:bg-blue-50'
            : 'bg-blue-600 text-white hover:bg-blue-700'
        }`}
      >
        {plan.cta}
      </button>
    </motion.div>
  );
}