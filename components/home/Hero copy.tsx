// 'use client';

// import { motion } from 'framer-motion';
// import { useRouter } from 'next/navigation';

// export default function Hero() {
//   const router = useRouter();

//   const handleGetStarted = () => {
//     router.push('/login');
//   };

//   const handleLearnMore = () => {
//     document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
//   };

//   return (
//     <section className="pt-24 md:pt-32 pb-16 md:pb-20 bg-gradient-to-br from-orange-500 to-orange-600">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="text-center">
//           <motion.h1 
//             className="text-3xl md:text-4xl lg:text-6xl font-bold text-white mb-4 md:mb-6"
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8 }}
//           >
//             Transform the Way You Pitch Documents
//           </motion.h1>
          
//           <motion.p 
//             className="text-lg md:text-xl text-orange-100 mb-8 md:mb-10 max-w-3xl mx-auto px-4"
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8, delay: 0.2 }}
//           >
//             Streamline your workflow with DocuPitch, the ultimate tool for seamless document collaboration and professional presentations.
//           </motion.p>
          
//           <motion.div 
//             className="flex flex-col sm:flex-row justify-center gap-4 px-4"
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8, delay: 0.4 }}
//           >
//             <button 
//               onClick={handleGetStarted}
//               className="bg-white text-orange-600 px-6 md:px-8 py-3 md:py-4 rounded-lg font-semibold 
//                        hover:bg-orange-50 transition-all duration-300 shadow-md hover:shadow-lg
//                        w-full sm:w-auto"
//             >
//               Get Started
//             </button>
//             <button 
//               onClick={handleLearnMore}
//               className="border-2 border-white text-white px-6 md:px-8 py-3 md:py-4 rounded-lg 
//                        font-semibold hover:bg-white/10 transition-all duration-300
//                        w-full sm:w-auto"
//             >
//               Learn More
//             </button>
//           </motion.div>
//         </div>
//       </div>
//     </section>
//   );
// }


'use client';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

export default function Hero() {
  const router = useRouter();

  const handleGetStarted = () => {
    router.push('/login');
  };

  const handleLearnMore = () => {
    document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      className="pt-24 md:pt-32 pb-16 md:pb-20 relative bg-cover bg-center"
      style={{ backgroundImage: 'url(/images/upload_docs.jpg)' }}
    >
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">
          <motion.h1
            className="text-4xl md:text-5xl lg:text-7xl font-extrabold text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Transform Your Presentations with Ease
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl text-gray-300 mb-10 max-w-3xl mx-auto px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Seamlessly collaborate, pitch, and share documents with DocuPitch—the ultimate tool for professionals.
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row justify-center gap-4 px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <button
              onClick={handleGetStarted}
              className="bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold
                        hover:bg-orange-700 transition-all duration-300 shadow-lg
                        w-full sm:w-auto"
            >
              Get Started
            </button>
            <button
              onClick={handleLearnMore}
              className="border-2 border-orange-600 text-white px-8 py-3 rounded-lg font-semibold
                        hover:bg-orange-600 hover:text-white transition-all duration-300
                        w-full sm:w-auto"
            >
              Learn More
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
