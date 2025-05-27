// 'use client';
// import { motion } from 'framer-motion';
// import { useRouter } from 'next/navigation';
// import { CheckIcon } from '@heroicons/react/24/solid';
// import { useAnimationConfig } from '../../hooks/useAnimationConfig';
// import { Heading4 } from 'lucide-react';

// interface PricingCardProps {
//   plan: {
//     name: string;
//     price: string;
//     period: string;
//     features: string[];
//     description:string;
//     cta: string;
//     highlighted: boolean;
//   };
//   index: number;
//   inView: boolean;
// }

// export default function PricingCard({ plan, index, inView }: PricingCardProps) {
//   const router = useRouter();
//   const { isMounted, isReducedMotion } = useAnimationConfig();

//   const handleCtaClick = () => {
//     if (plan.cta === 'Contact Sales') {
//       document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
//     } else {
//       router.push('/login');
//     }
//   };

//   // For reduced motion or before mount, we use a simpler version
//   if (!isMounted || isReducedMotion) {
//     return (
//       <div className={`relative h-full ${plan.highlighted ? 'scale-105' : ''}`}>
//         <div className={`h-full rounded-2xl ${
//           plan.highlighted
//             ? 'bg-white dark:bg-gray-800 border-2 border-orange-500'
//             : 'bg-white dark:bg-gray-800'
//         }`}>
//           <PricingCardContent plan={plan} onCtaClick={handleCtaClick} />
//         </div>
//       </div>
//     );
//   }

//   // With animations
//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={inView ? { opacity: 1, y: 0 } : {}}
//       transition={{ duration: 0.5, delay: index * 0.2 }}
//       whileHover={{ y: -8, transition: { duration: 0.2 } }}
//       className="relative h-full"
//     >
//       {/* This div was causing issues with rounded corners in dark mode */}
//       <div className="absolute -inset-[1px] rounded-2xl" />
      
//       <div
//         className={`relative h-full rounded-2xl ${
//           plan.highlighted
//             ? 'text-black bg-white dark:bg-gray-800 dark:text-white border-2 border-orange-500'
//             : 'bg-white dark:bg-gray-800 dark:text-white'
//         }`}
//       >
//         <PricingCardContent plan={plan} onCtaClick={handleCtaClick} />
//       </div>
//     </motion.div>
//   );
// }

// function PricingCardContent({ plan, onCtaClick }: { plan: PricingCardProps['plan']; onCtaClick: () => void }) {
//   return (
//     <div className="flex flex-col h-full p-8 rounded-2xl"> {/* Added rounded-2xl here as well */}
//       {plan.highlighted && (
//        <div className="absolute -top-0 right-5">
//         <motion.div
//           className="flex items-center gap-1 bg-orange-500 px-4 py-1 rounded-b-md text-sm font-semibold shadow-lg"
//           initial={{ scale: 0.8, opacity: 0 }}
//           animate={{ scale: 1, opacity: 1 }}
//           transition={{ delay: 0.3 }}
//         >
//           <span className="text-white">Most Popular</span>
//         </motion.div>
//       </div>
//       )}
//       <div className="text-start mb-8">
//         <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
//           {plan.name}
//         </h3>
//          <p className="text-sm  font-light-bold mb-4 text-gray-900 dark:text-white" style={{fontStyle: 'italic'}}>
//           {plan.description}
//         </p>
//         <div className="flex items-baseline justify-start gap-2">
//           <span className="text-5xl font-bold text-gray-900 dark:text-white">{plan.price}</span>
//           <span className="text-lg opacity-80 text-gray-900 dark:text-white">{plan.period}</span>
//         </div>
//       </div>
//       <ul className="space-y-4 mb-8 flex-grow">
//         {plan.features.map((feature, i) => (
//           <motion.li
//             key={feature}
//             className="flex items-center gap-3"
//             initial={{ opacity: 0, x: -20 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ delay: 0.2 + i * 0.1 }}
//           >
//             <div className="flex-shrink-0 rounded-full p-1">
//               <CheckIcon 
//                 className="w-4 h-4 text-orange-500" 
//                 style={{fontWeight: 'bold'}} 
//               />
//             </div>
//             <span className="text-gray-600 dark:text-gray-300">
//               {feature}
//             </span>
//           </motion.li>
//         ))}
//       </ul>
//       <motion.button
//         onClick={onCtaClick}
//         className={`w-full py-4 rounded-full font-semibold text-sm transition-all duration-300
//           ${plan.highlighted
//             ? 'text-white bg-orange-500'
//             : 'text-black bg-gray-100 dark:bg-gray-700 dark:text-white'
//           } relative overflow-hidden group`}
//         whileHover={{ scale: 1.02 }}
//         whileTap={{ scale: 0.98 }}
//       >
//         <motion.div
//           className="absolute inset-0"
//           initial={{ x: '-100%', opacity: 0 }}
//           whileHover={{ x: '100%', opacity: 0.3 }}
//           transition={{ duration: 0.6 }}
//         />
//         <span className="relative z-10">{plan.cta}</span>
//       </motion.button>
//     </div>
//   );
// }


'use client';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { CheckIcon } from '@heroicons/react/24/solid';
import { useAnimationConfig } from '../../hooks/useAnimationConfig';

interface PricingCardProps {
  plan: {
    id: string;
    name: string;
    price: string;
    period: string;
    features: string[];
    description: string;
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
      // Open billing page in new tab with the plan ID
      const billingUrl = `/billing?plan=${plan.id}`;
      window.open(billingUrl, '_blank');
    }
  };

  // For reduced motion or before mount, we use a simpler version
  if (!isMounted || isReducedMotion) {
    return (
      <div className={`relative h-full ${plan.highlighted ? 'scale-105' : ''}`}>
        <div className={`h-full rounded-2xl ${
          plan.highlighted
            ? 'bg-white dark:bg-gray-800 border-2 border-orange-500'
            : 'bg-white dark:bg-gray-800'
        }`}>
          <PricingCardContent plan={plan} onCtaClick={handleCtaClick} />
        </div>
      </div>
    );
  }

  // With animations
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
      className="relative h-full"
    >
      {/* This div was causing issues with rounded corners in dark mode */}
      <div className="absolute -inset-[1px] rounded-2xl" />
      
      <div
        className={`relative h-full rounded-2xl ${
          plan.highlighted
            ? 'text-black bg-white dark:bg-gray-800 dark:text-white border-2 border-orange-500'
            : 'bg-white dark:bg-gray-800 dark:text-white'
        }`}
      >
        <PricingCardContent plan={plan} onCtaClick={handleCtaClick} />
      </div>
    </motion.div>
  );
}

function PricingCardContent({ plan, onCtaClick }: { plan: PricingCardProps['plan']; onCtaClick: () => void }) {
  return (
    <div className="flex flex-col h-full p-8 rounded-2xl"> {/* Added rounded-2xl here as well */}
      {plan.highlighted && (
       <div className="absolute -top-0 right-5">
        <motion.div
          className="flex items-center gap-1 bg-orange-500 px-4 py-1 rounded-b-md text-sm font-semibold shadow-lg"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <span className="text-white">Most Popular</span>
        </motion.div>
      </div>
      )}
      <div className="text-start mb-8">
        <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
          {plan.name}
        </h3>
         <p className="text-sm font-light mb-4 text-gray-900 dark:text-white italic">
          {plan.description}
        </p>
        <div className="flex items-baseline justify-start gap-2">
          <span className="text-5xl font-bold text-gray-900 dark:text-white">{plan.price}</span>
          <span className="text-lg opacity-80 text-gray-900 dark:text-white">{plan.period}</span>
        </div>
      </div>
      <ul className="space-y-4 mb-8 flex-grow">
        {plan.features.map((feature, i) => (
          <motion.li
            key={feature}
            className="flex items-center gap-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 + i * 0.1 }}
          >
            <div className="flex-shrink-0 rounded-full p-1">
              <CheckIcon 
                className="w-4 h-4 text-orange-500 font-bold" 
              />
            </div>
            <span className="text-gray-600 dark:text-gray-300">
              {feature}
            </span>
          </motion.li>
        ))}
      </ul>
      <motion.button
        onClick={onCtaClick}
        className={`w-full py-4 rounded-full font-semibold text-sm transition-all duration-300
          ${plan.highlighted
            ? 'text-white bg-orange-500'
            : 'text-black bg-gray-100 dark:bg-gray-700 dark:text-white'
          } relative overflow-hidden group`}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <motion.div
          className="absolute inset-0"
          initial={{ x: '-100%', opacity: 0 }}
          whileHover={{ x: '100%', opacity: 0.3 }}
          transition={{ duration: 0.6 }}
        />
        <span className="relative z-10">{plan.cta}</span>
      </motion.button>
    </div>
  );
}