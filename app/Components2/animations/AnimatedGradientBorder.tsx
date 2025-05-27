// 'use client';

// import { motion } from 'framer-motion';

// interface AnimatedGradientBorderProps {
//   children: React.ReactNode;
//   className?: string;
// }

// export default function AnimatedGradientBorder({ children, className = '' }: AnimatedGradientBorderProps) {
//   return (
//     <div className={`relative ${className}`}>
//       <motion.div
//         className="absolute -inset-[2px] rounded-lg bg-gradient-to-r from-orange-500 via-purple-500 to-blue-500"
//         animate={{
//           backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
//         }}
//         transition={{
//           duration: 5,
//           repeat: Infinity,
//           ease: 'linear',
//         }}
//         style={{
//           backgroundSize: '200% 200%',
//         }}
//       />
//       <div className="relative bg-white dark:bg-gray-900 rounded-lg p-[1px]">
//         {children}
//       </div>
//     </div>
//   );
// }

'use client';

import { motion } from 'framer-motion';
import { useAnimationConfig } from '../../hooks/useAnimationConfig';

interface AnimatedGradientBorderProps {
  children: React.ReactNode;
  className?: string;
  disableSSR?: boolean;
}

export default function AnimatedGradientBorder({ 
  children, 
  className = '',
  disableSSR = false 
}: AnimatedGradientBorderProps) {
  const { isMounted, isReducedMotion } = useAnimationConfig();

  // Return static version during SSR or when reduced motion is preferred
  if (!isMounted || isReducedMotion || (disableSSR && typeof window === 'undefined')) {
    return (
      <div className={`relative ${className}`}>
        <div className="absolute -inset-[2px] rounded-lg bg-gradient-to-r from-orange-500 to-purple-500" />
        <div className="relative bg-white dark:bg-gray-900 rounded-lg">
          {children}
        </div>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      <motion.div
        className="absolute -inset-[2px] rounded-lg bg-gradient-to-r from-orange-500 to-purple-500"
        initial={{ backgroundPosition: '0% 50%' }}
        animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
        transition={{
          duration: 5,
          ease: "linear",
          repeat: Infinity
        }}
        style={{ 
          backgroundSize: '200% 200%',
          willChange: 'background-position'
        }}
      />
      <div className="relative bg-white dark:bg-gray-900 rounded-lg">
        {children}
      </div>
    </div>
  );
}

// 'use client';

// import { motion } from 'framer-motion';
// import { useAnimationConfig } from '../../hooks/useAnimationConfig';

// interface AnimatedGradientBorderProps {
//   children: React.ReactNode;
//   className?: string;
//   disableSSR?: boolean;
// }

// export default function AnimatedGradientBorder({ 
//   children, 
//   className = '',
//   disableSSR = false 
// }: AnimatedGradientBorderProps) {
//   const { isMounted, isReducedMotion } = useAnimationConfig();

//   // Return static version during SSR or when reduced motion is preferred
//   if (!isMounted || isReducedMotion || (disableSSR && typeof window === 'undefined')) {
//     return (
//       <div className={`relative ${className}`}>
//         <div className="absolute -inset-[2px] rounded-lg bg-gradient-to-r from-orange-500 to-purple-500" />
//         <div className="relative bg-white dark:bg-gray-900 rounded-lg">
//           {children}
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className={`relative ${className}`}>
//       <motion.div
//         className="absolute -inset-[2px] rounded-lg bg-gradient-to-r from-orange-500 to-purple-500"
//         initial={{ backgroundPosition: '0% 50%' }}
//         animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
//         transition={{
//           duration: 5,
//           ease: "linear",
//           repeat: Infinity
//         }}
//         style={{ 
//           backgroundSize: '200% 200%',
//           willChange: 'background-position'
//         }}
//       />
//       <div className="relative bg-white dark:bg-gray-900 rounded-lg">
//         {children}
//       </div>
//     </div>
//   );
// }