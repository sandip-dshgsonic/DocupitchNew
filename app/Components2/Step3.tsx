'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from "next/navigation";

const ProductSections = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const router = useRouter();

  return (
    <div className={isDarkMode ? 'dark' : ''}>
      <section className="min-h-[90vh] md:min-h-[90vh] lg:min-h-[90vh] bg-white dark:bg-gray-900 relative overflow-hidden before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-0.5 before:bg-gray-300 dark:before:bg-gray-600 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-gray-300 dark:after:bg-gray-600">
        <div className="container mx-auto max-w-7xl px-4 py-12 md:py-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center relative">
            {/* Vertical Line */}
            <div className="hidden lg:block absolute inset-y-0 left-1/2 transform -translate-x-1/2 w-0.5 bg-gray-300 dark:bg-gray-600"></div>

            {/* Video Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="relative w-[100%] md:w-[90%] lg:w-[89%] mx-auto"
            >
              <video
                className="w-full h-auto object-cover rounded-lg shadow-lg"
                autoPlay
                loop
                muted
                playsInline
              >
                <source
                  src="https://d3x4b1wy4qlu9.cloudfront.net/media/homepage-png/share-2024.mp4"
                  type="video/mp4"
                />
                Your browser does not support the video tag.
              </video>
            </motion.div>

            {/* Text Section */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-gray-800 dark:text-white max-w-md"
            >
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 dark:text-white mb-4">
                3 — Track Engagement
              </h2>
              {/* <h3 className="text-2xl lg:text-3xl font-semibold text-gray-800 dark:text-white mb-4">
               View engagement data in one dashboard—know who’s watching, which slides they linger on, and how many times they revisit.
              </h3> */}
              <ul className="space-y-2">
                <li className="text-gray-600 dark:text-gray-400 text-base lg:text-lg leading-relaxed">
                  <span className="inline-block mr-2 text-green-500">Real-Time Analytics:</span>
                  View engagement data in one dashboard—know who’s watching, which slides they linger on, and how many times they revisit.
                </li>
                <li className="text-gray-600 dark:text-gray-400 text-base lg:text-lg leading-relaxed">
                  <span className="inline-block mr-2 text-green-500">Slide-by-Slide & Frame-by-Frame Insights: </span>
                  Identify exactly which slides or video segments capture the most attention, and which ones might need improvement.
                </li>
                <li className="text-gray-600 dark:text-gray-400 text-base lg:text-lg leading-relaxed">
                  <span className="inline-block mr-2 text-green-500"> Heatmaps & Retention Graphs:</span>
                  Get visual insights into high-engagement points, so you can double down on what resonates.
                </li>
              </ul>
              <button
                className="mt-6 px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg shadow-lg hover:bg-purple-700 transition-colors"
                onClick={() => router.push('/login')}
              >
                Start Sharing Now
              </button>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductSections;



// 'use client';

// import React, { useState } from 'react';
// import { motion } from 'framer-motion';
// import { useRouter } from 'next/navigation';

// const ProductSections = () => {
//   const [isDarkMode, setIsDarkMode] = useState(false);
//   const router = useRouter();

//   return (
//     <div className={isDarkMode ? 'dark' : ''}>
//       {/* <div className="flex flex-col w-full relative bg-white dark:bg-gray-900 before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-0.5 before:bg-gray-300 dark:before:bg-gray-700 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-gray-300 dark:after:bg-gray-700">
       
//         <section className="h-[90vh] md:h-[90vh] lg:h-[90vh] w-full bg-white dark:bg-gray-900 flex relative">
        
//           <div className="hidden lg:block absolute top-10 bottom-10 left-1/2 transform -translate-x-1/2 w-0.5 bg-gray-300 dark:bg-gray-700"></div>

         
//           <div className="w-full md:w-1/2 flex items-center justify-center p-4"> */}


// <section className="min-h-[90vh] md:min-h-[90vh] lg:min-h-[90vh] bg-white dark:bg-gray-900 relative overflow-hidden before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-0.5 before:bg-gray-300 dark:before:bg-gray-600 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-gray-300 dark:after:bg-gray-600">
//         <div className="container mx-auto max-w-7xl px-4 py-12 md:py-16">
//           <div className="grid lg:grid-cols-2 gap-12 items-center relative">
//             {/* Vertical Line */}
//             <div className="hidden lg:block absolute inset-y-0 left-1/2 transform -translate-x-1/2 w-0.5 bg-gray-300 dark:bg-gray-600"></div>
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.8 }}
//               className="relative w-[90%] md:w-[90%] lg:w-[80%] h-auto"
//             >
//               <video
//                 className="w-full h-auto object-cover rounded-lg shadow-lg"
//                 autoPlay
//                 loop
//                 muted
//                 playsInline
//               >
//                 <source
//                   src="https://d3x4b1wy4qlu9.cloudfront.net/media/homepage-png/share-2024.mp4"
//                   type="video/mp4"
//                 />
//                 Your browser does not support the video tag.
//               </video>
//             </motion.div>
//           </div>

//           {/* Text Section */}
//           <div className="w-full md:w-1/2 flex items-center px-8 md:px-12">
//             <motion.div
//               initial={{ opacity: 0, x: 20 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ duration: 0.8 }}
//               className="max-w-md"
//             >
//               <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 dark:text-white mb-4">
//                 3 — Share
//               </h2>
//               <h3 className="text-2xl lg:text-3xl font-semibold text-gray-800 dark:text-white mb-4">
//                 Convince anyone, from anywhere
//               </h3>
//               <ul className="space-y-2">
//                 <li className="text-gray-600 dark:text-gray-400 text-base lg:text-lg leading-relaxed">
//                   <span className="inline-block mr-2 text-green-500">✔</span>
//                   Share your presentation with a live link.
//                 </li>
//                 <li className="text-gray-600 dark:text-gray-400 text-base lg:text-lg leading-relaxed">
//                   <span className="inline-block mr-2 text-green-500">✔</span>
//                   Gather decks, links, and files in pitch rooms.
//                 </li>
//                 <li className="text-gray-600 dark:text-gray-400 text-base lg:text-lg leading-relaxed">
//                   <span className="inline-block mr-2 text-green-500">✔</span>
//                   Present with notes, a timer, and other aids.
//                 </li>
//               </ul>
//               <button
//                 className="mt-6 px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg shadow-lg hover:bg-purple-700 transition-colors"
//                 onClick={() => router.push('/login')}
//               >
//                 Start Sharing now
//               </button>
//             </motion.div>
//             </div>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default ProductSections;
