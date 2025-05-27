
// import { motion } from 'framer-motion';
// import { useInView } from 'react-intersection-observer';
// export const TextReveal = ({ children, delay = 0 }) => {
//   const [ref, inView] = useInView({
//     triggerOnce: true,
//     threshold: 0.2
//   });
//   const variants = {
//     hidden: { y: 100, opacity: 0 },
//     visible: {
//       y: 0,
//       opacity: 1,
//       transition: {
//         duration: 0.8,
//         ease: [0.25, 0.1, 0, 1],
//         delay
//       }
//     }
//   };
//   return (
//     <motion.div
//       ref={ref}
//       initial="hidden"
//       animate={inView ? "visible" : "hidden"}
//       variants={variants}
//     >
//       {children}
//     </motion.div>
//   );
// };

// by aniket
import { ReactNode } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

interface TextRevealProps {
  children: ReactNode;
  delay?: number;
}

export const TextReveal = ({ children, delay = 0 }: TextRevealProps) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const variants = {
    hidden: { y: 100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.1, 0, 1],
        delay,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={variants}
    >
      {children}
    </motion.div>
  );
};

// by aniket end