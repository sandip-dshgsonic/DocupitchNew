'use client';

import { motion } from 'framer-motion';

interface GlowingButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
}

export default function GlowingButton({ onClick, children, className = '' }: GlowingButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      className={`relative overflow-hidden group ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-orange-600 opacity-75 
                    group-hover:opacity-100 transition-opacity duration-300" />
      <div className="absolute -inset-px bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 
                    rounded-lg blur opacity-75 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="relative bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-3 rounded-lg">
        {children}
      </div>
    </motion.button>
  );
}

// 'use client';

// import { motion } from 'framer-motion';

// interface GlowingButtonProps {
//   onClick: () => void;
//   children: React.ReactNode;
//   className?: string;
// }

// export default function GlowingButton({ onClick, children, className = '' }: GlowingButtonProps) {
//   return (
//     <motion.button
//       onClick={onClick}
//       className={`relative overflow-hidden group ${className}`}
//       whileHover={{ scale: 1.05 }}
//       whileTap={{ scale: 0.95 }}
//     >
//       <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-orange-600 opacity-75 
//                     group-hover:opacity-100 transition-opacity duration-300" />
//       <div className="absolute -inset-px bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 
//                     rounded-lg blur opacity-75 group-hover:opacity-100 transition-opacity duration-300" />
//       <div className="relative bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-3 rounded-lg">
//         {children}
//       </div>
//     </motion.button>
//   );
// }