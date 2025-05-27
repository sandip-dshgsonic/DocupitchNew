// 'use client';

// import { motion } from 'framer-motion';
// import Image from 'next/image';


// interface HowItWorksStepProps {
//   step: {
//     number: string;
//     title: string;
//     description: string;
//     image: string;
//   };
//   index: number;
//   inView: boolean;
// }

// export default function HowItWorksStep({ step, index, inView }: HowItWorksStepProps) {
//   return (
//     <motion.div
//       className="relative bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
//       initial={{ opacity: 0, y: 20 }}
//       animate={inView ? { opacity: 1, y: 0 } : {}}
//       transition={{ duration: 0.5, delay: index * 0.2 }}
//     >
//       <div className="mb-6">
//         <Image
//           src={step.image}
//           alt={step.title}
//           width={400}
//           height={300}
//           className="w-full h-48 object-cover rounded-lg"
//         />
//       </div>
//       <div className="absolute -top-4 left-6 bg-orange-500 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold shadow-lg">
//         {step.number}
//       </div>
//       <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">{step.title}</h3>
//       <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{step.description}</p>
//     </motion.div>
//   );
// }


'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface HowItWorksStepProps {
  step: {
    number: string;
    title: string;
    description: string;
    image: string;
  };
  index: number;
  inView: boolean;
}

export default function HowItWorksStep({ step, index, inView }: HowItWorksStepProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="relative group"
      initial={{ y: 50, opacity: 0 }}
      // animate={inView ? { y: 0, opacity: 1 } : {}}
      animate={inView ? {
        y: [0, -10, 0],
        opacity: 1
      } : {}}
      // transition={{
      //   duration: 0.5,
      //   delay: index * 0.2,
      //   ease: "easeOut"
      // }}

      transition={{
        y: {
          duration: 4,
          repeat: Infinity,
          delay: index * 0.2,
          ease: "easeInOut"
        },
        opacity: {
          duration: 0.5,
          delay: index * 0.2
        }
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Enhanced background glow effect */}
      <motion.div 
        className="absolute -inset-1  blur-xl rounded-2xl"
        animate={{
          scale: isHovered ? 1.05 : 1,
          opacity: isHovered ? 0.8 : 0.4
        }}
        transition={{ duration: 0.3 }}
      />
      
      <motion.div
        className="relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-xl shadow-xl border border-white/20 overflow-hidden"
        animate={{
          scale: isHovered ? 1.02 : 1,
          y: isHovered ? -5 : 0
        }}
      >
        {/* Step counter with enhanced animations */}
        <motion.div
          className="absolute top-4 left-4 z-20"
          animate={{
            scale: isHovered ? 1.1 : 1,
            rotate: isHovered ? 360 : 0
          }}
          transition={{
            scale: { duration: 0.3 },
            rotate: { duration: 0.8, ease: "easeInOut" }
          }}
        >
          <div className="relative">
            {/* Animated background circles */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full blur-md"
              animate={{
                scale: isHovered ? [1, 1.2, 1] : 1,
                opacity: isHovered ? [0.7, 1, 0.7] : 0.7
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <div className="relative w-12 h-12 bg-gradient-to-br from-orange-600 to-orange-600 rounded-full flex items-center justify-center shadow-lg border border-white/30">
              <span className="text-xl font-bold text-white">{step.number}</span>
            </div>
          </div>
        </motion.div>

        {/* Content container */}
        {/* <div className="p-6">

        
          <div className="relative mb-6 pt-4"> */}

<div className="relative overflow-hidden group p-6">
          
          {/* Image container with hover effects */}
          <div className="mb-6 relative rounded-lg overflow-hidden relative mb-6 pt-4">
            {/* Image with hover effects */}
            <motion.div
              className="relative rounded-lg overflow-hidden"
              animate={{
                scale: isHovered ? 1.05 : 1
              }}
              transition={{ duration: 0.4 }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-purple-500/20 z-10"
                animate={{
                  opacity: isHovered ? 1 : 0
                }}
                transition={{ duration: 0.3 }}
              />
              <Image
                src={step.image}
                alt={step.title}
                width={400}
                height={300}
                className="w-full h-48 object-cover rounded-lg"
              />
            </motion.div>
          </div>

          {/* Text content with animations */}
          <motion.h3 
            className="text-2xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 mt-2"
            animate={{
              y: isHovered ? -2 : 0,
              scale: isHovered ? 1.02 : 1
            }}
          >
            {step.title}
          </motion.h3>

          <motion.p 
            className="text-gray-700 dark:text-gray-300 leading-relaxed"
            animate={{
              opacity: isHovered ? 1 : 0.9,
              y: isHovered ? -2 : 0
            }}
          >
            {step.description}
          </motion.p>

          {/* Decorative elements */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                className="absolute bottom-4 right-4 w-24 h-24"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: 180 }}
                transition={{ duration: 0.4 }}
              >
                <div className="w-full h-full rounded-full bg-gradient-to-r from-indigo-500/10 to-purple-500/10 animate-pulse" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
}