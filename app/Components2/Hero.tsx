"use client";

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import TextReveal from './animations/TextReveal';
import GradientBlob from './animations/GradientBlob';
import FloatingIcons from './animations/FloatingIcons';
import MouseSpotlight from './animations/MouseSpotlight';

export default function Hero() {
  const router = useRouter();

  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: 0.8
      }
    }
  };

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Video Background with subtle blur */}
      <div
        className="absolute top-0 left-0 w-full h-full"
        style={{ backgroundColor: '#fdf0d7', opacity: 0.95 }}
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover filter blur-sm"
        >
          <source 
            src="https://videos.pexels.com/video-files/4464847/4464847-sd_640_360_25fps.mp4" 
            type="video/mp4" 
          />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Overlay with reduced opacity */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/20" />

      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 md:px-8">
        <div className="text-center max-w-4xl mx-auto">
        <motion.div
  initial={{ opacity: 0, y: -20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8 }}
>
  
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-12 leading-tight">
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-pink-200">
          Pitch Smarter2,
        </span>
        <span className="text-[#d8dada] dark:text-[#d8dada]">Track Engagement,</span>
<span className="text-[#d8dada] dark:text-[#d8dada]"> and Accelerate Funding</span>

      </h1>
 
</motion.div>


{/* <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-3xl lg:text-5xl font-extrabold text-[#fefefe] mb-12"

          >
          <span className="text-orange-500">Pitch Smarter</span>,Track Engagement, and Accelerate Funding
          </motion.div> */}

<motion.p
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ delay: 0.5, duration: 1 }}
  className="text-lg md:text-xl text-[purple] mb-10 font-bold"
>
   and analyze their PDF or video pitch decks—gain real-time insights and close funding faster.
</motion.p>


          <motion.div
            variants={buttonVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <button
              onClick={() => router.push('/login')}
              className="rounded- bg-[#F97316] px-12 py-3 text-white hover:shadow-[0px_0px_75px_rgba(0,0,0,0.6)] "style={{borderRadius:'8px'}}
            >
              Speed Up Fundraising
            </button>
            
            <button
              onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-12 py-3 bg-white/10 backdrop-blur-sm border border-white/30 rounded-lg 
                       text-white font-semibold text-lg transform transition-all duration-300 
                       hover:scale-105 hover:bg-white/20 hover:shadow-lg"
            >
              Discover DocuPitchhhhh
            </button>
          </motion.div>
        </div>
      </div>

      {/* Additional visual elements */}
      <GradientBlob />
      <FloatingIcons />
      <MouseSpotlight />
    </div>
  );
}



// 'use client';
// import { motion } from 'framer-motion';
// import { useRouter } from 'next/navigation';
// import WaveText from './animations/WaveText';
// import TextReveal from './animations/TextReveal';
// import FloatingIcons from './animations/FloatingIcons';
// import GradientBlob from './animations/GradientBlob';
// import InteractiveCard from './animations/InteractiveCards';
// import FloatingElements from './animations/FloatingElements';
// import GlowingButton from './animations/GlowingButton';
// import InteractiveBackground from './animations/InteractiveBackground';
// import ParallaxBackground from './animations/ParallaxBackground';
// import AnimatedGradientBorder from './animations/AnimatedGradientBorder';
// import MouseSpotlight from './animations/MouseSpotlight';
// export default function Hero() {
//   const router = useRouter();
//   const handleGetStarted = () => {
//     router.push('/login');
//   };
//   const handleLearnMore = () => {
//     document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
//   };
//   // Animation variants for the buttons
//   const leftButtonVariants = {
//     hidden: { x: -1000, opacity: 0 },
//     visible: { 
//       x: 0, 
//       opacity: 1,
//       transition: {
//         type: "spring",
//         duration: 1,
//         bounce: 0.3,
//         delay: 1  // 1 second delay
//       }
//     }
//   };
//   const rightButtonVariants = {
//     hidden: { x: 1000, opacity: 0 },
//     visible: { 
//       x: 0, 
//       opacity: 1,
//       transition: {
//         type: "spring",
//         duration: 1,
//         bounce: 0.3,
//         delay: 1  // 1 second delay
//       }
//     }
//   };
//   return (
//     <section
//       className="pt-24 md:pt-32 pb-16 md:pb-50 relative bg-cover bg-center"
//       style={{
//         backgroundImage: 'url(/images/upload_docs.jpg)',
//         backgroundBlendMode: 'overlay',
//         backgroundColor: 'rgba(0, 0, 0, 0.6)',
//       }}
//     >
//       {/* Glow Effect */}
//       <div className="absolute inset-0 bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 opacity-20 blur-2xl"></div>
//       <InteractiveBackground />
//       <GradientBlob />
//       <FloatingIcons />
//       <ParallaxBackground />
//       <MouseSpotlight />
//       <div className="relative z-10 text-4xl md:text-5xl lg:text-7xl font-extrabold text-white mb-6">
//         <div className="text-center">
//           <TextReveal
//             text="Transform Your Document Experience"
//             className="text-4xl md:text-5xl lg:text-7xl font-extrabold text-transparent bg-clip-text 
//                       bg-gradient-to-r from-orange-600 via-pink-600 to-purple-600 mb-6"
//           />
//           <motion.p
//             className="text-lg md:text-xl text-gray-200 mb-10 max-w-3xl mx-auto px-4"
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8, delay: 0.5 }}
//           >
//             Experience seamless document collaboration and presentation with our cutting-edge platform.
//           </motion.p>
//           <InteractiveCard>
//             <div className="flex flex-col sm:flex-row justify-center gap-4 p-6">
//               <motion.div
//                 variants={leftButtonVariants}
//                 initial="hidden"
//                 animate="visible"
//                 onClick={() => router.push('/login')}
//                 className="rounded-lg bg-orange-500 text-white px-8 py-3 text-center shadow-lg font-bold text-lg cursor-pointer"
//                 whileHover={{ scale: 1.1 }}
//                 transition={{ duration: 0.3 }}
//               >
//                 <div className="feature-card">Get Started</div>
//               </motion.div>
//               <motion.button
//                 variants={rightButtonVariants}
//                 initial="hidden"
//                 animate="visible"
//                 onClick={() =>
//                   document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })
//                 }
//                 className="bg-white dark:bg-gray-800 text-orange-600 dark:text-orange-400 border-2
//                            border-orange-500 px-8 py-3 rounded-lg font-semibold text-lg shadow-lg
//                            hover:shadow-orange-500/30 transition-all duration-300"
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//               >
//                 Learn More
//               </motion.button>
//             </div>
//           </InteractiveCard>
//         </div>
//       </div>
//     </section>
//   );
// }



// 'use client';

// import { motion } from 'framer-motion';
// import { useRouter } from 'next/navigation';
// import GradientBlob from './animations/GradientBlob';
// import FloatingIcons from './animations/FloatingIcons';
// import MouseSpotlight from './animations/MouseSpotlight';
// import TextReveal from './animations/TextReveal';

// export default function Hero() {
//   const router = useRouter();

//   const buttonVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: {
//         duration: 0.6,
//         delay: 0.8,
//       },
//     },
//   };

//   return (
//     <div className="relative min-h-screen h-[170vh] w-full overflow-hidden">
//       {/* Video Background */}
//       <div className="absolute top-0 left-0 w-full h-full">
//         <video
//           autoPlay
//           muted
//           loop
//           playsInline
//           className="absolute top-0 left-0 w-full h-full object-cover"
//         >
//           <source
//             src="https://videos.pexels.com/video-files/852295/852295-hd_1920_1080_30fps.mp4"
//             type="video/mp4"
//           />
//           Your browser does not support the video tag.
//         </video>
//         {/* Overlay */}
//         <div className="absolute top-0 left-0 w-full h-full bg-black/50" />
//       </div>

//       {/* Content */}
//       <div className="relative z-40 flex flex-col items-center justify-start pt-32 h-full px-4 md:px-8">
//         <div className="text-center max-w-5xl mx-auto">
//           <motion.div
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8 }}
//           >
//             <TextReveal
//               text="Transform Your Document Experience"
//               className="text-4xl md:text-5xl lg:text-7xl font-extrabold text-transparent bg-clip-text 
//                         bg-gradient-to-r from-orange-400 via-pink-400 to-purple-400 mb-6"
//             />
//           </motion.div>

//           <motion.p
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.5, duration: 0.8 }}
//             className="text-lg md:text-xl text-gray-200 mb-10"
//           >
//             Experience seamless document collaboration and presentation with our cutting-edge platform.
//           </motion.p>

//           <motion.div
//             variants={buttonVariants}
//             initial="hidden"
//             animate="visible"
//             className="flex flex-col sm:flex-row gap-4 justify-center mb-46"
//           >
//             <button
//               onClick={() => router.push('/login')}
//               className="px-8 py-3 bg-gradient-to-r from-orange-500 to-pink-500 rounded-lg 
//                        text-white font-semibold text-lg transform transition-all duration-300 
//                        hover:scale-105 hover:shadow-lg hover:shadow-orange-500/30"
//             >
//               Get Started
//             </button>

//             <button
//               onClick={() =>
//                 document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })
//               }
//               className="px-8 py-3 bg-white/10 backdrop-blur-sm border border-white/30 rounded-lg 
//                        text-white font-semibold text-lg transform transition-all duration-300 
//                        hover:scale-105 hover:bg-white/20 hover:shadow-lg"
//             >
//               Learn More
//             </button>
//           </motion.div>

//           {/* Video Section */}
          // <motion.div
          //   initial={{ opacity: 0, y: 20 }}
          //   animate={{ opacity: 1, y: 0 }}
          //   transition={{ delay: 1, duration: 0.8 }}
          //   className="mt-40 w-full max-w-5xl mx-auto rounded-lg overflow-hidden"
          // >
          //   <video
          //     autoPlay
          //     muted
          //     loop
          //     playsInline
          //     className="w-full h-auto aspect-video object-cover rounded-lg"
          //   >
          //     <source
          //       src="https://d3x4b1wy4qlu9.cloudfront.net/videos/hero/hero-analyze.mp4"
          //       type="video/mp4"
          //     />
          //     Your browser does not support the video tag.
          //   </video>
          // </motion.div>
//         </div>
        
//       </div>

//       {/* Additional visual elements */}
//       <GradientBlob />
//       <FloatingIcons />
//       <MouseSpotlight />
//     </div>
//   );
// }