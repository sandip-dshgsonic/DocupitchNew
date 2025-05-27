// 'use client';

// import { motion, useScroll, useTransform } from 'framer-motion';
// import { useRef, useEffect, useState } from 'react';

// interface ShowcaseProps {
//   videoUrl: string;
// }

// const DocumentShowcase = ({ videoUrl }: ShowcaseProps) => {
//   const containerRef = useRef<HTMLDivElement>(null);
//   const videoRef = useRef<HTMLVideoElement>(null);
//   const [isVideoLoaded, setIsVideoLoaded] = useState(false);
//   const { scrollYProgress } = useScroll({
//     target: containerRef,
//     offset: ['start end', 'end start'],
//   });

//   // Scroll-based transformations
//   const y = useTransform(scrollYProgress, [0, 1], ['0%', '-20%']);
//   const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.5, 1, 0.5]);
//   const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 0.9]);

//   useEffect(() => {
//     if (videoRef.current) {
//       videoRef.current.play();
//     }
//   }, []);

//   const floatingDocsAnimation = {
//     hidden: { opacity: 0, y: 20 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: {
//         duration: 1,
//         ease: 'easeOut',
//         repeat: Infinity,
//         repeatType: 'reverse',
//       },
//     },
//   };

//   return (
//     <div
//       ref={containerRef}
//       className="relative min-h-[110vh] bg-gradient-to-b from-gray-900 to-black overflow-hidden"
//     >
//       {/* Background Video */}
//       <div className="absolute inset-0 w-full h-full">
//         <video
//           ref={videoRef}
//           className="w-full h-full object-cover opacity-60"
//           loop
//           muted
//           playsInline
//           autoPlay
//           onLoadedData={() => setIsVideoLoaded(true)}
//           src={videoUrl}
//         />
//         <div className="absolute inset-0 bg-gradient-to-b from-gray-900/80 via-transparent to-gray-900/80" />
//       </div>

//       {/* Floating Document Elements */}
//       <motion.div
//         className="absolute inset-0"
//         initial="hidden"
//         animate="visible"
//         variants={{
//           visible: {
//             transition: {
//               staggerChildren: 0.3,
//             },
//           },
//         }}
//       >
//         {[...Array(6)].map((_, i) => (
//           <motion.div
//             key={i}
//             className="absolute"
//             style={{
//               left: `${Math.random() * 80 + 10}%`,
//               top: `${Math.random() * 80 + 10}%`,
//             }}
//             variants={floatingDocsAnimation}
//           >
//             <div className="w-16 h-20 bg-white/10 backdrop-blur-lg rounded-lg border border-white/30 shadow-lg" />
//           </motion.div>
//         ))}
//       </motion.div>

//       {/* Main Content */}
//       <motion.div
//         className="relative z-10 min-h-screen flex items-center justify-center px-4"
//         style={{ y, opacity, scale }}
//       >
//         <div className="max-w-4xl mx-auto text-center">
//           {/* Text Content */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 1, delay: 0.3 }}
//           >
//             <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
//               Intelligent Document Management
//             </h1>
//             <p className="text-lg text-white/80 max-w-2xl mx-auto">
//               Easily upload, organize, and share documents with top-tier security.
//               Enjoy seamless AI-powered document handling to boost productivity.
//             </p>
//           </motion.div>

//           {/* Feature Highlights */}
//           <motion.div
//             className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8"
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 1, delay: 0.5 }}
//           >
//             {[
//               { title: 'Secure Storage', description: 'State-of-the-art encryption' },
//               { title: 'Smart Search', description: 'AI-driven search capabilities' },
//               { title: 'Easy Sharing', description: 'Customizable access controls' },
//             ].map((feature, index) => (
//               <div
//                 key={index}
//                 className="p-6 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 shadow-lg hover:shadow-2xl transition duration-300"
//               >
//                 <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
//                 <p className="text-white/70">{feature.description}</p>
//               </div>
//             ))}
//           </motion.div>
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// export default DocumentShowcase;






'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

interface ShowcaseProps {
  videoUrl: string;
}

const DocumentShowcase = ({ videoUrl }: ShowcaseProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // Scroll-based transformations
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '-20%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.5, 1, 0.5]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 0.9]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  }, []);

  // const floatingDocsAnimation = {
  //   hidden: { opacity: 0, y: 20 },
  //   visible: {
  //     opacity: 1,
  //     y: 0,
  //     transition: {
  //       duration: 1,
  //       ease: 'easeOut',
  //       repeat: Infinity,
  //       repeatType: 'reverse',
  //     },
  //   },
  // };
// by aniket
  const floatingDocsAnimation = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        ease: 'easeOut',
        repeat: Infinity,
        repeatType: 'reverse',
      },
    },
  } as const;
  // by aniket end

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen bg-gradient-to-b from-gray-900 to-black overflow-hidden"
    >
      {/* Background Video */}
      <div className="absolute inset-0 w-full h-[120vh] sm:h-[140vh] md:h-[110vh]">
        <video
          ref={videoRef}
          className="w-full h-full object-cover opacity-60"
          loop
          muted
          playsInline
          autoPlay
          onLoadedData={() => setIsVideoLoaded(true)}
          src={videoUrl}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/80 via-transparent to-gray-900/80" />
      </div>

      {/* Floating Document Elements */}
      <motion.div
        className="absolute inset-0"
        initial="hidden"
        animate="visible"
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.3,
            },
          },
        }}
      >
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${Math.random() * 80 + 10}%`,
              top: `${Math.random() * 80 + 10}%`,
            }}
            variants={floatingDocsAnimation}
          >
            <div className="w-16 h-20 bg-white/10 backdrop-blur-lg rounded-lg border border-white/30 shadow-lg" />
          </motion.div>
        ))}
      </motion.div>

      {/* Main Content */}
      <motion.div
        className="relative z-10 min-h-screen flex items-center justify-center px-4"
        style={{ y, opacity, scale }}
      >
        <div className="max-w-4xl mx-auto text-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <h1 className="text-5xl sm:text-6xl font-bold text-white mb-6">
              Intelligent Document Management
            </h1>
            <p className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto">
              Easily upload, organize, and share documents with top-tier security.
              Enjoy seamless AI-powered document handling to boost productivity.
            </p>
          </motion.div>

          {/* Feature Highlights */}
          <motion.div
            className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            {[ 
              { title: 'Secure Storage', description: 'State-of-the-art encryption' },
              { title: 'Smart Search', description: 'AI-driven search capabilities' },
              { title: 'Easy Sharing', description: 'Customizable access controls' },
            ].map((feature, index) => (
              <div
                key={index}
                className="p-6 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 shadow-lg hover:shadow-2xl transition duration-300"
              >
                <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-white/70">{feature.description}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default DocumentShowcase;
