'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useEffect, useState } from 'react';
import HowItWorksStep from './howitworks/HowItWorksStep';
import { steps } from '../data/steps';
import GradientBlob from './animations/GradientBlob';
import FloatingIcons from './animations/FloatingIcons';

export default function HowItWorks() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  useEffect(() => {
    const video = document.getElementById('background-video');
    if (video) {
      video.addEventListener('loadeddata', () => setIsVideoLoaded(true));
    }
    return () => {
      if (video) {
        video.removeEventListener('loadeddata', () => setIsVideoLoaded(true));
      }
    };
  }, []);

  return (
    <section className="relative min-h-[80vh] w-full overflow-hidden"> {/* Reduced the height to 80vh */}
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full">
        <div className="absolute inset-0 bg-black/50 z-[1]" /> {/* Overlay */}
        <video
          id="background-video"
          autoPlay
          loop
          muted
          playsInline
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${isVideoLoaded ? 'opacity-100' : 'opacity-0'}`}
        >
          <source src="/images/hiw.mp4" type="video/mp4" />
          {/* <source src="https://videos.pexels.com/video-files/1350205/1350205-hd_1920_1080_30fps.mp4" type="video/mp4" /> */}
        </video>
      </div>

      {/* Content */}
      <div className="relative z-10 section-padding pt-8 pb-8"> {/* Adjusted padding */}
        <GradientBlob />
        <FloatingIcons />

        <div className="max-w-7xl mx-auto pt-8 pb-16"> {/* Adjusted padding */}
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <motion.h2
                className="text-5xl font-bold text-white mb-6 relative"
                animate={{
                  textShadow: [
                    "0 0 0px rgba(255,255,255,0)",
                    "0 0 20px rgba(255,255,255,0.7)",
                    "0 0 0px rgba(255,255,255,0)"
                  ]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                How Docupitch Works
              </motion.h2>
              <motion.p
                className="text-2xl text-gray-200 max-w-3xl mx-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
              >
                Transform your document workflow in three simple steps
              </motion.p>
            </motion.div>
          </div>

          <motion.div
            ref={ref}
            className="relative container mx-auto"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 1 }}
          >
            {/* Grid layout for steps */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 lg:gap-16">
              {steps.map((step, index) => (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.2,
                    ease: "easeOut"
                  }}
                  className="flex items-center justify-center"
                >
                  <HowItWorksStep
                    step={step}
                    index={index}
                    inView={inView}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}




// 'use client';

// import { motion } from 'framer-motion';
// import { useInView } from 'react-intersection-observer';
// import { useEffect, useState } from 'react';
// import HowItWorksStep from './howitworks/HowItWorksStep';
// import { steps } from '../data/steps';
// import GradientBlob from './animations/GradientBlob';
// import FloatingIcons from './animations/FloatingIcons';

// export default function HowItWorks() {
//   const [ref, inView] = useInView({
//     triggerOnce: true,
//     threshold: 0.1,
//   });

//   const [isVideoLoaded, setIsVideoLoaded] = useState(false);

//   useEffect(() => {
//     const video = document.getElementById('background-video');
//     if (video) {
//       video.addEventListener('loadeddata', () => setIsVideoLoaded(true));
//     }
//     return () => {
//       if (video) {
//         video.removeEventListener('loadeddata', () => setIsVideoLoaded(true));
//       }
//     };
//   }, []);

//   return (
//     <section className="relative min-h-screen w-full overflow-hidden">
//       {/* Video Background */}
//       <div className="absolute inset-0 w-full h-full">
//         <div className="absolute inset-0 bg-black/50 z-[1]" /> {/* Overlay */}
//         <video
//           id="background-video"
//           autoPlay
//           loop
//           muted
//           playsInline
//           className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${isVideoLoaded ? 'opacity-100' : 'opacity-0'}`}
//         >
//           <source src="https://videos.pexels.com/video-files/1350205/1350205-hd_1920_1080_30fps.mp4" type="video/mp4" />
//         </video>
//       </div>

//       {/* Content */}
//       <div className="relative z-10 section-padding">
//         <GradientBlob />
//         <FloatingIcons />

//         <div className="max-w-7xl mx-auto pt-16 pb-24">
//           <div className="text-center mb-16">
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={inView ? { opacity: 1, y: 0 } : {}}
//               transition={{ duration: 0.8, ease: "easeOut" }}
//             >
//               <motion.h2
//                 className="text-5xl font-bold text-white mb-6 relative"
//                 animate={{
//                   textShadow: [
//                     "0 0 0px rgba(255,255,255,0)",
//                     "0 0 20px rgba(255,255,255,0.7)",
//                     "0 0 0px rgba(255,255,255,0)"
//                   ]
//                 }}
//                 transition={{
//                   duration: 3,
//                   repeat: Infinity,
//                   ease: "easeInOut"
//                 }}
//               >
//                 How Docupitch Works
//               </motion.h2>
//               <motion.p
//                 className="text-2xl text-gray-200 max-w-3xl mx-auto"
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 transition={{ delay: 0.3, duration: 0.8 }}
//               >
//                 Transform your document workflow in three simple steps
//               </motion.p>
//             </motion.div>
//           </div>

//           <motion.div
//             ref={ref}
//             className="relative container mx-auto"
//             initial={{ opacity: 0 }}
//             animate={inView ? { opacity: 1 } : {}}
//             transition={{ duration: 1 }}
//           >
//             {/* Grid layout for steps */}
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 lg:gap-16">
//               {steps.map((step, index) => (
//                 <motion.div
//                   key={step.number}
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={inView ? { opacity: 1, y: 0 } : {}}
//                   transition={{
//                     duration: 0.5,
//                     delay: index * 0.2,
//                     ease: "easeOut"
//                   }}
//                   className="flex items-center justify-center"
//                 >
//                   <HowItWorksStep
//                     step={step}
//                     index={index}
//                     inView={inView}
//                   />
//                 </motion.div>
//               ))}
//             </div>
//           </motion.div>
//         </div>
//       </div>
//     </section>
//   );
// }
