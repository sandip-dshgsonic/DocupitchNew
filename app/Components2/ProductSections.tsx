// 'use client';

// import React from 'react';
// import { motion } from 'framer-motion';

// const ProductSections = () => {
//   return (
//     <div className="flex flex-col w-full relative before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-0.5 before:bg-gray-600 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-gray-600">
//       {/* First Section - Product Card Close-up */}
//       <section className="h-screen md:h-[80vh] lg:h-[90vh] w-full bg-[#171b23] flex relative">
//         {/* Vertical Line */}
//         <div className="hidden lg:block absolute top-10 bottom-10 left-1/2 transform -translate-x-1/2 w-0.5 bg-gray-600"></div>

//         {/* Video Section */}
//         <div className="w-full md:w-1/2 flex items-center justify-center p-4">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8 }}
//             className="relative w-full h-full"
//           >
//             <div className="relative w-full h-full">
//               <video
//                 className="w-full h-full object-cover rounded-lg shadow-xl"
//                 autoPlay
//                 loop
//                 muted
//                 playsInline
//               >
//                 <source
//                   src="https://videos.pexels.com/video-files/4167404/4167404-uhd_1440_1920_24fps.mp4"
//                   type="video/mp4"
//                 />
//                 Your browser does not support the video tag.
//               </video>
//             </div>
//           </motion.div>
//         </div>

//         {/* Text Section */}
//         <div className="w-full md:w-1/2 flex items-center px-8 md:px-16">
//           <motion.div
//             initial={{ opacity: 0, x: 20 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.8 }}
//             className="max-w-xl"
//           >
//             <h2 className="text-4xl font-bold text-white mb-6">
//               Insights that matter, delivered instantly
//             </h2>
//             <p className="text-gray-400 text-xl leading-relaxed">
//               Unlock key insights in real time with DocuPitch.{' '}
//               <span className="text-orange-500">
//                 Track reader engagement, analyze time spent on pages, and
//               </span>{' '}
//               identify what truly matters—all with instant, actionable analytics
//               to optimize your documents.
//             </p>
//           </motion.div>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default ProductSections;



// "use client";

// import React from "react";
// import { motion } from "framer-motion";

// const ProductSections = () => {
//   return (
//     <div className="flex flex-col w-full relative before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-0.5 before:bg-gray-600 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-gray-600">
//       {/* First Section - Product Card Close-up */}
//       <section className="h-screen sm:h-[95vh] md:h-[90vh] lg:h-[90vh] w-full bg-[#171b23] flex flex-col sm:flex-row relative">
//         {/* Vertical Line */}
//         <div className="hidden lg:block absolute top-10 bottom-10 left-1/2 transform -translate-x-1/2 w-0.5 bg-gray-600"></div>

//         {/* Video Section */}
//         <div className="w-full sm:w-[60%] md:w-[55%] flex items-center justify-center p-6 sm:p-8">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8 }}
//             className="relative w-[95%] sm:w-[90%] md:w-[80%] max-h-[400px] sm:max-h-[450px] md:max-h-[500px] h-auto overflow-hidden"
//           >
//             <div className="relative w-full h-full">
//               <video
//                 className="w-full h-full object-cover rounded-lg shadow-lg"
//                 autoPlay
//                 loop
//                 muted
//                 playsInline
//               >
//                 <source
//                   src="https://videos.pexels.com/video-files/4167404/4167404-uhd_1440_1920_24fps.mp4"
//                   type="video/mp4"
//                 />
//                 Your browser does not support the video tag.
//               </video>
//             </div>
//           </motion.div>
//         </div>

//         {/* Text Section */}
//         {/* <div className="w-full sm:w-[40%] md:w-[45%] flex items-center justify-center px-6 sm:px-8 mt-0 sm:mt-0">
//          */}
// <div className="w-full sm:w-[40%] md:w-[45%] flex items-center justify-center px-6 sm:px-8 mt-0 sm:mt-0">

//           <motion.div
//             initial={{ opacity: 0, x: 20 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.8 }}
//             className="max-w-xl text-center"
//           >
//             <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-1">
//               Insights that matter, delivered instantly
//             </h2>
//             <p className="text-gray-400 text-base sm:text-lg md:text-xl leading-relaxed sm:leading-relaxed">
//               Unlock key insights in real time with DocuPitch.{" "}
//               <span className="text-orange-500">
//                 Track reader engagement, analyze time spent on pages, and
//               </span>{" "}
//               identify what truly matters—all with instant, actionable analytics
//               to optimize your documents.
//             </p>
//           </motion.div>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default ProductSections;


"use client";

import React from "react";
import { motion } from "framer-motion";

const ProductSections = () => {
  return (
    <div className="flex flex-col w-full relative before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-0.5 before:bg-gray-600 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-gray-600">
      {/* First Section - Product Card Close-up */}
      <section className="min-h-screen bg-[#171b23] relative overflow-hidden">
        <div className="container mx-auto max-w-7xl px-4 py-16">
          <div className="grid lg:grid-cols-2 gap-16 items-center relative">
            {/* Vertical Line */}
            <div className="hidden lg:block absolute inset-y-0 left-1/2 transform -translate-x-1/2 w-0.5 bg-gray-600"></div>


     {/* Right Content (Video) */}
     <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0.8 }}
              transition={{ duration: 0.8 }}
              className="relative w-full h-auto"
            >
              <video
                className="w-full h-[550px] object-cover rounded-lg shadow-lg"  
                autoPlay
                loop
                muted
                playsInline
              >
                <source
                  src="https://videos.pexels.com/video-files/4167404/4167404-uhd_1440_1920_24fps.mp4"
                  type="video/mp4"
                />
                Your browser does not support the video tag.
              </video>
            </motion.div>


            {/* right Content (Text) */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-white max-w-xl"
            >
              <h1 className="text-5xl font-bold mb-8 leading-tight">
                Insights that matter, delivered instantly
              </h1>
              <p className="text-gray-400 text-xl leading-relaxed">
                Unlock key insights in real time with DocuPitch.{" "}
                <span className="text-orange-500 font-medium">
                  Track reader engagement, analyze time spent on pages, and
                </span>{" "}
                identify what truly matters—all with instant, actionable
                analytics to optimize your documents.
              </p>
            </motion.div>

       
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductSections;
