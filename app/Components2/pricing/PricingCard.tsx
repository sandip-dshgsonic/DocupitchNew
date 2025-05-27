'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { CheckIcon } from '@heroicons/react/24/solid';
import { SparklesIcon } from '@heroicons/react/24/outline';
import { useAnimationConfig } from '../../hooks/useAnimationConfig';

interface PricingCardProps {
  plan: {
    name: string;
    price: string;
    period: string;
    description?: string;
    features: string[];
    cta: string;
    highlighted: boolean;
  };
  index: number;
  inView: boolean;
}

export default function PricingCard({ plan, index, inView }: PricingCardProps) {
  const router = useRouter();
  const { isMounted, isReducedMotion } = useAnimationConfig();

  const handleCtaClick = () => {
    if (plan.cta === 'Contact Sales') {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    } else {
      router.push('/login');
    }
  };

  // Return static version during SSR or when animations are reduced
  if (!isMounted || isReducedMotion) {
    return (
      <div className={`relative h-full ${plan.highlighted ? 'scale-105' : ''}`}>
        <div className={`h-full rounded-2xl ${
          plan.highlighted
            ? 'bg-gradient-to-br from-orange-500 to-pink-600 text-white'
            : 'bg-white dark:bg-gray-800'
        }`}>
          <PricingCardContent plan={plan} onCtaClick={handleCtaClick} />
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      className="relative h-full"
    >
      <div className={`absolute -inset-[1px] rounded-2xl ${
        plan.highlighted 
          ? 'bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 opacity-100'
          : 'bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 opacity-50 group-hover:opacity-100'
      }`} />
      <div className={`relative h-full rounded-2xl ${
        plan.highlighted
          ? 'bg-gradient-to-br from-orange-500 to-pink-600 text-white'
          : 'bg-white dark:bg-gray-800'
      }`}>
        <PricingCardContent plan={plan} onCtaClick={handleCtaClick} />
      </div>
    </motion.div>
  );
}

function PricingCardContent({ plan, onCtaClick }: { plan: PricingCardProps['plan']; onCtaClick: () => void }) {
  return (
    <div className="flex flex-col h-full p-8">
      {plan.highlighted && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <motion.div
            className="flex items-center gap-1 bg-white px-4 py-1 rounded-full text-sm font-semibold shadow-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <SparklesIcon className="w-4 h-4 text-orange-500" />
            <span className="bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
              Most Popular
            </span>
          </motion.div>
        </div>
      )}

      <div className="text-center mb-8">
        <h3 className={`text-2xl font-bold mb-2 ${
          plan.highlighted ? 'text-white' : 'text-gray-900 dark:text-white'
        }`}>
          {plan.name}
        </h3>
        {/* <p className={`text-sm mb-4 ${
          plan.highlighted ? 'text-white/90' : 'text-gray-600 dark:text-gray-300'
        }`}>
          {plan.description}
        </p> */}
        {/* by aniket */}
        <p className={`text-sm mb-4 ${plan.highlighted ? 'text-white/90' : 'text-gray-600 dark:text-gray-300'}`}>
  {plan.description && plan.description}
</p>
        {/* by aniket end */}
        <div className="flex items-baseline justify-center gap-2">
          <span className="text-5xl font-bold">{plan.price}</span>
          <span className="text-lg opacity-80">{plan.period}</span>
        </div>
      </div>

      <ul className="space-y-4 mb-8 flex-grow">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-center gap-3">
            <div className={`flex-shrink-0 rounded-full p-1 ${
              plan.highlighted ? 'bg-white/20' : 'bg-orange-100 dark:bg-orange-900/20'
            }`}>
              <CheckIcon className={`w-4 h-4 ${
                plan.highlighted ? 'text-white' : 'text-orange-600 dark:text-orange-400'
              }`} />
            </div>
            <span className={plan.highlighted ? 'text-white' : 'text-gray-600 dark:text-gray-300'}>
              {feature}
            </span>
          </li>
        ))}
      </ul>

      <motion.button
        onClick={onCtaClick}
        className={`w-full py-4 rounded-xl font-semibold text-sm ${
          plan.highlighted
            ? 'bg-white text-orange-600 hover:bg-orange-50'
            : 'bg-gradient-to-r from-orange-500 to-pink-500 text-white hover:opacity-90'
        } shadow-xl`}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {plan.cta}
      </motion.button>
    </div>
  );
}

// 'use client';

// import { motion } from 'framer-motion';
// import { CheckIcon } from '@heroicons/react/24/solid';
// import { SparklesIcon } from '@heroicons/react/24/outline';
// import { useAnimationConfig } from '../../hooks/useAnimationConfig';

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
//   const { isMounted, isReducedMotion } = useAnimationConfig();

//   // Return early during SSR or if reduced motion is preferred
//   if (!isMounted || isReducedMotion) {
//     return (
//       <div className={`relative h-full rounded-2xl ${
//         plan.highlighted ? 'scale-105' : ''
//       }`}>
//         <div className={`h-full rounded-2xl ${
//           plan.highlighted
//             ? 'bg-gradient-to-br from-orange-500 to-pink-600 text-white'
//             : 'bg-white dark:bg-gray-800'
//         }`}>
//           <PricingCardContent plan={plan} />
//         </div>
//       </div>
//     );
//   }

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={inView ? { opacity: 1, y: 0 } : {}}
//       transition={{ duration: 0.5, delay: index * 0.2 }}
//       whileHover={{ y: -8, transition: { duration: 0.2 } }}
//       className="relative h-full"
//     >
//       {/* Glow Effect */}
//       <div className={`absolute -inset-[1px] rounded-2xl transition-all duration-300
//         ${plan.highlighted 
//           ? 'bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 opacity-100'
//           : 'bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 opacity-50 group-hover:opacity-100'
//         }`}
//       />

//       {/* Card Content */}
//       <div className={`relative h-full rounded-2xl ${
//         plan.highlighted
//           ? 'bg-gradient-to-br from-orange-500 to-pink-600 text-white'
//           : 'bg-white dark:bg-gray-800'
//       }`}>
//         <PricingCardContent plan={plan} />
//       </div>
//     </motion.div>
//   );
// }

// function PricingCardContent({ plan }: { plan: PricingCardProps['plan'] }) {
//   return (
//     <div className="flex flex-col h-full p-8">
//       {/* Popular Badge */}
//       {plan.highlighted && (
//         <div className="absolute -top-4 left-1/2 -translate-x-1/2">
//           <motion.div
//             className="flex items-center gap-1 bg-white px-4 py-1 rounded-full text-sm font-semibold shadow-lg"
//             initial={{ scale: 0.8, opacity: 0 }}
//             animate={{ scale: 1, opacity: 1 }}
//             transition={{ delay: 0.3 }}
//           >
//             <SparklesIcon className="w-4 h-4 text-orange-500" />
//             <span className="bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
//               Most Popular
//             </span>
//           </motion.div>
//         </div>
//       )}

//       {/* Plan Header */}
//       <div className="text-center mb-8">
//         <h3 className={`text-2xl font-bold mb-4 ${
//           plan.highlighted ? 'text-white' : 'text-gray-900 dark:text-white'
//         }`}>
//           {plan.name}
//         </h3>
//         <div className="flex items-baseline justify-center gap-2">
//           <span className="text-5xl font-bold">{plan.price}</span>
//           <span className="text-lg opacity-80">{plan.period}</span>
//         </div>
//       </div>

//       {/* Features List */}
//       <ul className="space-y-4 mb-8 flex-grow">
//         {plan.features.map((feature, i) => (
//           <motion.li
//             key={feature}
//             className="flex items-center gap-3"
//             initial={{ opacity: 0, x: -20 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ delay: 0.2 + i * 0.1 }}
//           >
//             <div className={`flex-shrink-0 rounded-full p-1 ${
//               plan.highlighted ? 'bg-white/20' : 'bg-orange-100 dark:bg-orange-900/20'
//             }`}>
//               <CheckIcon className={`w-4 h-4 ${
//                 plan.highlighted ? 'text-white' : 'text-orange-600 dark:text-orange-400'
//               }`} />
//             </div>
//             <span className={plan.highlighted ? 'text-white' : 'text-gray-600 dark:text-gray-300'}>
//               {feature}
//             </span>
//           </motion.li>
//         ))}
//       </ul>

//       {/* CTA Button */}
//       <motion.button
//         className={`w-full py-4 rounded-xl font-semibold text-sm transition-all duration-300
//           ${plan.highlighted
//             ? 'bg-white text-orange-600 hover:bg-orange-50'
//             : 'bg-gradient-to-r from-orange-500 to-pink-500 text-white hover:opacity-90'
//           } relative overflow-hidden group shadow-xl`}
//         whileHover={{ scale: 1.02 }}
//         whileTap={{ scale: 0.98 }}
//       >
//         <motion.div
//           className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/50 to-white/0"
//           initial={{ x: '-100%', opacity: 0 }}
//           whileHover={{ x: '100%', opacity: 0.3 }}
//           transition={{ duration: 0.6 }}
//         />
//         <span className="relative z-10">{plan.cta}</span>
//       </motion.button>
//     </div>
//   );
// }