// import { motion } from 'framer-motion';
// // by aniket
// export const StaggeredList = ({ children:any }) => {
//   // by aniket end
//   // export const StaggeredList = ({ children }) => {
//   const container = {
//     hidden: { opacity: 0 },
//     show: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.1
//       }
//     }
//   };
//   const item = {
//     hidden: { opacity: 0, y: 20 },
//     show: {
//       opacity: 1,
//       y: 0,
//       transition: {
//         duration: 0.6,
//         ease: "easeOut"
//       }
//     }
//   };
//   return (
//     <motion.div
//       variants={container}
//       initial="hidden"
//       animate="show"
//     >
//       {children.map((child, index) => (
//         <motion.div key={index} variants={item}>
//           {child}
//         </motion.div>
//       ))}
//     </motion.div>
//   );
// };

// by aniket
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface StaggeredListProps {
  children: ReactNode[];
}

export const StaggeredList = ({ children }: StaggeredListProps) => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div variants={container} initial="hidden" animate="show">
      {children.map((child, index) => (
        <motion.div key={index} variants={item}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
};

// by aniket end