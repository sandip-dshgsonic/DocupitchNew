// 'use client';

// import { motion } from 'framer-motion';
// import { useState, useEffect } from 'react';

// export default function MouseSpotlight() {
//   const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

//   useEffect(() => {
//     const handleMouseMove = (e: MouseEvent) => {
//       setMousePosition({ x: e.clientX, y: e.clientY });
//     };

//     window.addEventListener('mousemove', handleMouseMove);
//     return () => window.removeEventListener('mousemove', handleMouseMove);
//   }, []);

//   return (
//     <div
//       className="pointer-events-none fixed inset-0 z-30 transition-opacity"
//       style={{
//         background: `radial-gradient(600px at ${mousePosition.x}px ${mousePosition.y}px, rgba(249, 115, 22, 0.05), transparent 80%)`,
//       }}
//     />
//   );
// }

'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function MouseSpotlight() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  if (!isMounted) return null;

  return (
    // <motion.div
    //   className="pointer-events-none fixed inset-0 z-30"
    //   animate={{
    //     background: `radial-gradient(600px at ${mousePosition.x}px ${mousePosition.y}px, rgba(249, 115, 22, 0.05), transparent 80%)`
    //   }}
    //   transition={{ type: "tween", ease: "backOut", duration: 0.2 }}
    // />
    <div></div>
  );
}