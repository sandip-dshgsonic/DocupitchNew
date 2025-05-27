// "use client";
// import { motion } from 'framer-motion';
// import { useRouter } from 'next/navigation';
// import TextReveal from './animations/TextReveal';
// import GradientBlob from './animations/GradientBlob';
// import FloatingIcons from './animations/FloatingIcons';
// import MouseSpotlight from './animations/MouseSpotlight';
// export default function Hero() {
//   const router = useRouter();
//   const buttonVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: { 
//       opacity: 1,
//       y: 0,
//       transition: {
//         duration: 0.6,
//         delay: 0.8
//       }
//     }
//   };
//   return (
//     <div className="relative h-screen w-full overflow-hidden bg-gradient-to-br from-orange-50 via-white to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900">
//       {/* Abstract Background Patterns */}
//       <div className="absolute inset-0 bg-grid-pattern opacity-5 dark:opacity-10" />
      
//       {/* Floating Circles */}
//       <div className="absolute top-20 left-20 w-64 h-64 bg-orange-200 dark:bg-orange-600/20 rounded-full blur-3xl opacity-20 animate-float" />
//       <div className="absolute bottom-20 right-20 w-96 h-96 bg-pink-200 dark:bg-pink-600/20 rounded-full blur-3xl opacity-20 animate-float-delay" />
      
//       {/* Gradient Overlay */}
//       <div className="absolute inset-0 bg-gradient-to-t from-white/80 to-transparent dark:from-gray-900/80 dark:to-transparent" />
//       <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 md:px-8">
//         <div className="text-center max-w-4xl mx-auto">
//            <motion.div
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8 }}
//           >
//             <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-12 leading-tight">
//               <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-pink-500 dark:from-orange-400 dark:to-pink-400">
//                 Pitch Smarter,
//               </span>
//               <span className="text-purple-800 dark:text-purple-200">
//                 {" "}Track Engagement,{" "}
//               </span>
//               <span className="text-purple-800 dark:text-purple-200">
//                 and Accelerate Funding
//               </span>
//             </h1>
//           </motion.div>
//           <motion.p
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.5, duration: 1 }}
//             className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-10 font-semibold"
//           >
//             A specialized platform for startups to securely share and analyze their PDF or video pitch decks—gain real-time insights and close funding faster.
//           </motion.p>
//           <motion.div
//             variants={buttonVariants}
//             initial="hidden"
//             animate="visible"
//             className="flex flex-col sm:flex-row gap-4 justify-center"
//           >
//             <button
//               onClick={() => router.push('/login')}
//               className="px-8 py-3 bg-gradient-to-r from-orange-500 to-pink-500 dark:from-orange-600 dark:to-pink-600 rounded-lg 
//                        text-white font-semibold text-lg transform transition-all duration-300 
//                        hover:scale-105 hover:shadow-lg hover:shadow-orange-500/30 dark:hover:shadow-orange-600/30"
//             >
//               Speed Up Fundraising
//             </button>
            
//           <button
//   // onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
//   onClick={() => {
//     const element = document.getElementById('features');
//     if (element) {
//       const offset = 100; // Adjust based on your navbar height
//       const top = element.getBoundingClientRect().top + window.scrollY - offset;
//       window.scrollTo({ top, behavior: 'smooth' });
//     }
//   }}
//   className="px-8 py-3 bg-transparent backdrop-blur-md border border-gradient-to-r from-orange-400 to-yellow-500 rounded-full 
//              text-orange-500 font-semibold text-lg transform transition-all duration-300 
//              hover:scale-105 hover:bg-orange-500/10 hover:text-orange-700 hover:shadow-xl"
// >
//   Discover DocuPitch
// </button>
//           </motion.div>
//         </div>
//       </div>
//       {/* Add a subtle grain texture */}
//       <div className="absolute inset-0 bg-noise opacity-[0.015] dark:opacity-[0.03] pointer-events-none" />
//       {/* Keep the existing animation components */}
//       <GradientBlob />
//       <FloatingIcons />
//       <MouseSpotlight />
//       {/* Add keyframes for floating animations */}
//       <style jsx global>{`
//         @keyframes float {
//           0%, 100% { transform: translateY(0); }
//           50% { transform: translateY(-20px); }
//         }
//         @keyframes float-delay {
//           0%, 100% { transform: translateY(0); }
//           50% { transform: translateY(-15px); }
//         }
//         .animate-float {
//           animation: float 6s ease-in-out infinite;
//         }
//         .animate-float-delay {
//           animation: float-delay 7s ease-in-out infinite;
//         }
//         .bg-grid-pattern {
//           background-image: linear-gradient(to right, #33333308 1px, transparent 1px),
//                           linear-gradient(to bottom, #33333308 1px, transparent 1px);
//           background-size: 24px 24px;
//         }
//         .bg-noise {
//           background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%' height='100%' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
//         }
//       `}</style>
//     </div>
//   );
// }


"use client";
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
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
    <div className="relative  w-full overflow-hidden bg-white dark:bg-gray-900" >
   
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 md:px-8">
        <div className="text-center max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
          <h1 className="text-4xl md:text-5xl lg:text-[80px] font-extrabold mb-12  text-center tracking-tight" style={{lineHeight: '1.5', marginTop:'150px'}} >
              <span className=" bg-clip-text text-[#F97316]" style={{ fontFamily: 'PP Pangaia' }} >
                Pitch{" "}
              </span>
              <span className="bg-clip-text dark:text-white" style={{ fontFamily: 'SF Pro Display' }}>
                Smarter{" "}
              </span>
              <span className=" bg-clip-text text-[#F97316]" style={{ fontFamily: 'PP Pangaia' }}>
                Track{" "}
              </span>
              <span className="bg-clip-text dark:text-white" style={{ fontFamily: 'SF Pro Display' }}>
                Engagement{" "}
              </span>
              <span className=" bg-clip-text text-[#F97316]" style={{ fontFamily: 'PP Pangaia' }}>
                Close{" "}
              </span>
              <span className="bg-clip-text dark:text-white" style={{ fontFamily: 'SF Pro Display' }}>
                Deals Faster{" "}
              </span>
            </h1>
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-10 font-semibold"
            style={{ fontFamily: 'SF Pro Display Light' }}
          >
            {/* A specialized platform for startups to securely share and analyze their PDF or video pitch decks—gain real-time insights and close funding faster. */}
            Securely share, track, and analyze pitch decks—gain <span className='text-[#F97316]'>funding faster insights</span>  and close deals faster.
          </motion.p>
          <motion.div
            variants={buttonVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <button
              onClick={() => router.push('/login')}
              className="px-12 py-3  transform transition-all duration-300 bg-[#F97316] 
                       hover:scale-105 hover:shadow-lg hover:shadow-orange-500/30 dark:hover:shadow-orange-600/30 text-white"
                       style={{borderRadius:'8px'}}
            >
              Speed Up Fundraising
            </button>
            
            <button
              onClick={() => {
                const element = document.getElementById('features');
                if (element) {
                  const offset = 100; // Adjust based on your navbar height
                  const top = element.getBoundingClientRect().top + window.scrollY - offset;
                  window.scrollTo({ top, behavior: 'smooth' });
                }
              }}
              className=" dark:text-white px-12 py-3  transform transition-all duration-300 
                         hover:scale-105  hover:bg-orange-500/10 hover:text-orange-700 hover:shadow-xl"
                         style={{border:'1px solid #CED4DA', borderRadius:'8px'}}
            >
              Discover DocuPitch
            </button>
          </motion.div>
        </div>
      </div>
    
    
     
    </div>
  );
}
