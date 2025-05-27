// 'use client';

// import { motion, useMotionValue, useTransform } from 'framer-motion';
// import { useRef } from 'react';

// interface InteractiveCardProps {
//   children: React.ReactNode;
// }

// export default function InteractiveCard({ children }: InteractiveCardProps) {
//   const ref = useRef<HTMLDivElement>(null);
//   const x = useMotionValue(0);
//   const y = useMotionValue(0);

//   const rotateX = useTransform(y, [-100, 100], [30, -30]);
//   const rotateY = useTransform(x, [-100, 100], [-30, 30]);

//   const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
//     if (!ref.current) return;

//     const rect = ref.current.getBoundingClientRect();
//     const centerX = rect.left + rect.width / 2;
//     const centerY = rect.top + rect.height / 2;

//     x.set(event.clientX - centerX);
//     y.set(event.clientY - centerY);
//   };

//   const handleMouseLeave = () => {
//     x.set(0);
//     y.set(0);
//   };

//   return (
//     <motion.div
//       ref={ref}
//       onMouseMove={handleMouseMove}
//       onMouseLeave={handleMouseLeave}
//       style={{
//         perspective: 1000,
//         transformStyle: "preserve-3d"
//       }}
//       className="relative"
//     >
//       <motion.div
//         style={{
//           rotateX,
//           rotateY,
//         }}
//         className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-xl transition-all duration-200"
//       >
//         {children}
//       </motion.div>
//     </motion.div>
//   );
// }




'use client';

import { motion, useMotionValue, useTransform } from 'framer-motion';
import { useRef } from 'react';

interface InteractiveCardProps {
  children: React.ReactNode;
}

export default function InteractiveCard({ children }: InteractiveCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-100, 100], [30, -30]);
  const rotateY = useTransform(x, [-100, 100], [-30, 30]);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    x.set(event.clientX - centerX);
    y.set(event.clientY - centerY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: 1000,
        transformStyle: "preserve-3d",
      }}
      className="relative"
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
        }}
        className="bg-transparent rounded-xl p-6 transition-all duration-200"
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
