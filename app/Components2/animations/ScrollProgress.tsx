// 'use client';

// import { motion, useScroll, useSpring } from 'framer-motion';

// export default function ScrollProgress() {
//   const { scrollYProgress } = useScroll();
//   const scaleX = useSpring(scrollYProgress, {
//     stiffness: 100,
//     damping: 30,
//     restDelta: 0.001
//   });

//   return (
//     <motion.div
//       className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 to-orange-600 
//                 transform origin-left z-50"
//       style={{ scaleX }}
//     />
//   );
// }


'use client';

import { motion, useScroll, useSpring } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const [isVisible, setIsVisible] = useState(false);
  
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 via-orange-600 to-orange-500 
                 transform origin-left z-50"
        style={{ scaleX }}
      />

      {/* Scroll Percentage */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ 
          opacity: isVisible ? 1 : 0,
          scale: isVisible ? 1 : 0.8,
          y: isVisible ? 0 : 20
        }}
        className="fixed bottom-8 right-8 bg-white dark:bg-gray-800 rounded-full shadow-lg z-50 overflow-hidden"
      >
        {/* <motion.div
          className="w-16 h-16 flex items-center justify-center font-semibold text-sm relative"
        >
           <svg className="absolute inset-0 w-full h-full -rotate-90">
            <motion.circle
              cx="32"
              cy="32"
              r="28"
              strokeWidth="3"
              stroke="currentColor"
              fill="none"
              className="text-gray-200 dark:text-gray-700"
            />
           <motion.circle
              cx="32"
              cy="32"
              r="28"
              strokeWidth="3"
              stroke="currentColor"
              fill="none"
              className="text-orange-500"
              style={{
                pathLength: scaleX,
                strokeDasharray: "175.93 175.93",
                strokeDashoffset: 0,
              }}
            /> 
          </svg> 
           <motion.span
            className="relative z-10 text-gray-800 dark:text-white"
          >
            {Math.round(scrollYProgress.get() * 100)}%
          </motion.span>
        </motion.div> */}
      </motion.div>
    </>
  );
}